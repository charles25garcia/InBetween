

CREATE TABLE tbl_user_role (
  id int NOT NULL AUTO_INCREMENT,
  roleDescription varchar(45) NOT NULL,
  lastUpdated DATETIME DEFAULT NULL,
  updatedById varchar(100) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
