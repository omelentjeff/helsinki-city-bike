import pandas as pd
import mysql.connector
import chardet
import glob
import logging
import sys
import os
from dotenv import load_dotenv
from multiprocessing import Pool

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s', stream=sys.stdout)

load_dotenv()

# MySQL connection details
db_config = {
    'host': os.getenv('DB_HOST'),
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD'),
    'database': os.getenv('DB_NAME')
}

# Corrected paths for the CSV files
station_csv = os.getenv('STATION_CSV')
journey_files_pattern = os.getenv('JOURNEY_FILES_PATTERN')



def detect_encoding(file_path):
    with open(file_path, 'rb') as f:
        result = chardet.detect(f.read())
    return result['encoding']

def create_tables(cursor):
    create_stations_table_query = """
        CREATE TABLE IF NOT EXISTS stations (
            id INT PRIMARY KEY,
            name VARCHAR(255),
            address VARCHAR(255),
            city VARCHAR(255),
            x FLOAT,
            y FLOAT
        );
    """
    cursor.execute(create_stations_table_query)

    create_journeys_table_query = """
    CREATE TABLE IF NOT EXISTS journeys (
        id INT AUTO_INCREMENT PRIMARY KEY,
        departure DATETIME,
        `return` DATETIME,
        departure_station_id INT,
        return_station_id INT,
        covered_distance INT,
        duration INT,
        FOREIGN KEY (departure_station_id) REFERENCES stations(id),
        FOREIGN KEY (return_station_id) REFERENCES stations(id)
    );
    """
    cursor.execute(create_journeys_table_query)

def is_table_empty(cursor, table_name):
    cursor.execute(f"SELECT COUNT(*) FROM {table_name}")
    count = cursor.fetchone()[0]
    return count == 0

def import_stations(cursor):
    encoding = detect_encoding(station_csv)
    data = pd.read_csv(station_csv, encoding=encoding)
    
    # Select only the required columns for the 'stations' table
    data = data[['ID', 'Nimi', 'Osoite', 'Kaupunki', 'x', 'y']]

    # Replace empty strings and NaN in the 'Kaupunki' column with 'Helsinki' EI TOIMI!!
    data['Kaupunki'].replace('', 'Helsinki', inplace=True)  # Replace empty strings
    data['Kaupunki'].fillna('Helsinki', inplace=True)       # Replace NaN values
    
    # Rename the columns to match the database schema
    data.columns = ['id', 'name', 'address', 'city', 'x', 'y']

    # Batch insert
    insert_query = """
    INSERT INTO stations (id, name, address, city, x, y)
    VALUES (%s, %s, %s, %s, %s, %s)
    """
    cursor.executemany(insert_query, data.values.tolist())


def process_journey_file(journey_csv, station_ids):
    # Detect file encoding
    encoding = detect_encoding(journey_csv)
    data = pd.read_csv(journey_csv, encoding=encoding)

    # Select and filter relevant columns for the 'journeys' table
    filtered_data = data[
        (data['Duration (sec.)'] >= 10) &
        (data['Covered distance (m)'] >= 10) &
        (data['Departure station id'].isin(station_ids)) &
        (data['Return station id'].isin(station_ids))
    ][['Departure', 'Return', 'Departure station id', 'Return station id', 'Covered distance (m)', 'Duration (sec.)']]

    # Rename columns to match the database schema
    filtered_data.columns = ['departure', 'return', 'departure_station_id', 'return_station_id', 'covered_distance', 'duration']

    # Return the filtered and cleaned data as a list of lists (for batch insertion)
    return filtered_data.values.tolist()

def import_journeys(cursor):
    # Fetch station IDs from the 'stations' table to validate the journeys data
    cursor.execute("SELECT id FROM stations")
    station_ids = {row[0] for row in cursor.fetchall()}  # Set of valid station IDs

    # Get all journey CSV files
    journey_files = glob.glob(journey_files_pattern)

    # Use multiprocessing to process the files in parallel
    with Pool() as pool:
        # Each journey file is processed by 'process_journey_file'
        results = pool.starmap(process_journey_file, [(journey_csv, station_ids) for journey_csv in journey_files])

    # SQL query for inserting journeys into the database
    insert_query = """
    INSERT INTO journeys (
        departure, `return`, departure_station_id,
        return_station_id, covered_distance, duration
    ) VALUES (%s, %s, %s, %s, %s, %s)
    """

    # Batch insert the filtered data into the 'journeys' table
    for result in results:
        cursor.executemany(insert_query, result)


def main():
    logging.info("Connecting to the database...")
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    create_tables(cursor)

    if is_table_empty(cursor, 'stations'):
        logging.info("Importing stations data...")
        import_stations(cursor)
        conn.commit()
        logging.info("Stations data imported successfully.")
    else:
        logging.info("Stations table is not empty, skipping import.")

    if is_table_empty(cursor, 'journeys'):
        logging.info("Importing journeys data...")
        import_journeys(cursor)
        conn.commit()
        logging.info("Journeys data imported successfully.")
    else:
        logging.info("Journeys table is not empty, skipping import.")

    cursor.close()
    conn.close()
    logging.info("Database connection closed.")

if __name__ == "__main__":
    main()
