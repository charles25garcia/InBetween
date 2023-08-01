

CREATE TABLE tbl_user (
  id VARCHAR(100) NOT NULL,
  fullName varchar(45) NOT NULL,
  email varchar(45) NOT NULL,
  contactNo varchar(45) DEFAULT NULL,
  username varchar(45) NOT NULL,
  password varchar(200) NOT NULL,
  dateOfRegistration datetime DEFAULT NULL,
  resetPasswordToken varchar(255) default NULL,
  resetPasswordExpire datetime default NULL,
  loginAttempt int(10) default 0,
  `showMechanics` TINYINT NULL,
  userRoleId int NOT NULL,
  `isActive` TINYINT NULL,
  `lastUpdated` DATETIME NULL,
  `referralId` VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;