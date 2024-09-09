-- Create the database
CREATE DATABASE IF NOT EXISTS `city_bike`;

-- Switch to the new database
USE `city_bike`;

-- Create the stations and journeys tables
CREATE TABLE IF NOT EXISTS stations (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    address VARCHAR(255),
    city VARCHAR(255),
    x FLOAT,
    y FLOAT
);

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

DROP USER IF EXISTS 'citybike'@'%';
-- Create the user and grant privileges
CREATE USER 'citybike'@'%' IDENTIFIED BY 'CitybikePW1!';
GRANT ALL PRIVILEGES ON `city_bike`.* TO 'citybike'@'%';
FLUSH PRIVILEGES;
