CREATE TABLE `inbetween-db`.`tbl_donation_history` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fromUserId` VARCHAR(100) NOT NULL,
  `toUserId` VARCHAR(100) NOT NULL,
  `points` DOUBLE NULL,
  `chips` DOUBLE NULL,
  `pointsBefore` DOUBLE NULL,
  `chipsBefore` DOUBLE NULL,
  `actualPoints` DOUBLE NULL,
  `actualChips` DOUBLE NULL,
  `dateTime` DATETIME NULL
  PRIMARY KEY (`id`));
