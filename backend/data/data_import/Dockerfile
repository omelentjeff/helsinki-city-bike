# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Install necessary Python packages
RUN pip install pandas mysql-connector-python chardet

# Copy the data-importer script and data files
COPY ./data/data_import/data-importer.py .
COPY ./data/bike_data/ /app/bike_data/

# Command to run the data-importer script
CMD ["python3", "data-importer.py"]
