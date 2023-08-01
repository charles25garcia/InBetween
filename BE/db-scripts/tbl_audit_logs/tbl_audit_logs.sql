CREATE TABLE `inbetween-db`.`tbl_audit_logs` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userId` VARCHAR(100) NULL,
  `title` VARCHAR(100) NULL,
  `description` VARCHAR(1000) NULL,
  `loggerDateTime` DATETIME NULL,
  `type` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));
