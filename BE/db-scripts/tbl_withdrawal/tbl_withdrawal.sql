CREATE TABLE `inbetween-db`.`tbl_withdrawal` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userId` VARCHAR(100) NULL,
  `amount` DOUBLE NULL,
  `type` CHAR(2) NOT NULL,
  `approverUserId` VARCHAR(100) NULL,
  `dateTime` DATETIME NULL,
  `lastUpdate` DATETIME NULL,
  `status` CHAR(2) NULL,
  `approverComments` VARCHAR(300) NULL,
  PRIMARY KEY (`id`));
