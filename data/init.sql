-- db.init.sql
CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABASE};

USE ${MYSQL_DATABASE};

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
