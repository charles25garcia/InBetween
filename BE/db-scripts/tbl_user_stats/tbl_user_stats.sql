CREATE TABLE `inbetween-db`.`tbl_user_stats` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userId` VARCHAR(100) NULL,
  `points` DOUBLE NULL,
  `chips` DOUBLE NULL,
  `winStreakCount` INT NULL,
  `lastUpdatedDateTime` DATETIME NULL,
  PRIMARY KEY (`id`));
