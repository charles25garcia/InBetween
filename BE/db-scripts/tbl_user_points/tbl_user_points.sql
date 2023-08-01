

CREATE TABLE tbl_user_points (
	id int NOT NULL AUTO_INCREMENT,
    userId VARCHAR(100) NOT NULL,
    points DECIMAL(10, 2),
    dateTime DATETIME,
	PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;