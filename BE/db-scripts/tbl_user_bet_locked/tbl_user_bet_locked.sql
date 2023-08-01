CREATE TABLE `inbetween-db`.`tbl_user_bet_locked` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userId` VARCHAR(100) NULL,
  `points` INT NULL,
  `chips` INT NULL,
  `betType` TINYINT(1) NULL,
  `lastBetDateTime` DATETIME NULL,
  PRIMARY KEY (`id`));
