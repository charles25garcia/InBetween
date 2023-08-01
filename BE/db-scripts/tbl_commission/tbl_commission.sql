CREATE TABLE `inbetween-db`.`tbl_commission` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userId` VARCHAR(100) NULL,
  `amount` DOUBLE NULL,
  `lastUpdated` DATETIME NULL,
  PRIMARY KEY (`id`));
