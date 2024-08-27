import pandas as pd
import mysql.connector
import chardet
import os
import glob

# MySQL connection details
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'CitybikePW1!',
    'database': 'city_bike'
}

# Paths to the CSV files
station_csv = '../bike_data/stations_data/stations.csv'
journey_files_pattern = '../bike_data/journeys_data/chunked_journeys_data/*_part_*.csv'

# Function to detect the encoding of a CSV file
def detect_encoding(file_path):
    with open(file_path, 'rb') as f:
        result = chardet.detect(f.read())
    return result['encoding']

# Function to create the tables if they don't exist
def create_tables(cursor):
    create_stations_table_query = """
       CREATE TABLE IF NOT EXISTS stations (
           id INT PRIMARY KEY,
           name VARCHAR(255),
           address VARCHAR(255),
           city VARCHAR(255),
           x FLOAT,  -- Assuming x is a floating point number (e.g., longitude)
           y FLOAT   -- Assuming y is a floating point number (e.g., latitude)
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

# Function to check if a table is empty
def is_table_empty(cursor, table_name):
    cursor.execute(f"SELECT COUNT(*) FROM {table_name}")
    count = cursor.fetchone()[0]
    return count == 0

# Function to import data from a CSV file into a table
def import_stations(cursor):
    encoding = detect_encoding(station_csv)
    data = pd.read_csv(station_csv, encoding=encoding)
    insert_query = """
    INSERT INTO stations (id, name, address, city,x ,y)
    VALUES (%s, %s, %s, %s, %s, %s)
    """
    for index, row in data.iterrows():
        cursor.execute(insert_query, (
            row['ID'], row['Nimi'], row['Osoite'], row['Kaupunki'], row['x'], row['y']
        ))

def import_journeys(cursor):
    # Fetch all station ids
    cursor.execute("SELECT id FROM stations")
    station_ids = {row[0] for row in cursor.fetchall()}

    insert_query = """
    INSERT INTO journeys (
        departure, `return`, departure_station_id,
        return_station_id, covered_distance, duration
    ) VALUES (%s, %s, %s, %s, %s, %s)
    """
    journey_files = glob.glob(journey_files_pattern)
    for journey_csv in journey_files:
        encoding = detect_encoding(journey_csv)
        data = pd.read_csv(journey_csv, encoding=encoding)
        filtered_data = data[
            (data['Duration (sec.)'] >= 10) &
            (data['Covered distance (m)'] >= 10) &
            (data['Departure station id'].isin(station_ids)) &
            (data['Return station id'].isin(station_ids))
        ]
        for index, row in filtered_data.iterrows():
            cursor.execute(insert_query, (
                row['Departure'], row['Return'],
                row['Departure station id'],
                row['Return station id'],
                row['Covered distance (m)'], row['Duration (sec.)']
            ))

# Main function to manage the import process
def main():
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    # Create tables if they don't exist
    create_tables(cursor)

    # Import data if the tables are empty
    if is_table_empty(cursor, 'stations'):
        import_stations(cursor)
        conn.commit()
        print("Stations data imported successfully.")

    if is_table_empty(cursor, 'journeys'):
        import_journeys(cursor)
        conn.commit()
        print("Journeys data imported successfully.")

    cursor.close()
    conn.close()

if __name__ == "__main__":
    main()
