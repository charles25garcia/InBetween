CREATE TABLE `inbetween-db`.`tbl_deal_history` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userId` VARCHAR(100) NULL,
  `inBetween` INT NULL,
  `outBeyond` INT NULL,
  `pair` INT NULL,
  `trio` INT NULL,
  `winAmount` INT NULL,
  `lostAmount` INT NULL,
  `roundResult` TINYINT NULL,
  `dealNo` INT NULL,
  `dateTime` DATETIME NULL,
  `type` VARCHAR(10) NULL,
  PRIMARY KEY (`id`));
