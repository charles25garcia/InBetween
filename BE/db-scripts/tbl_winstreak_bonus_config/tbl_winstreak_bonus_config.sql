

CREATE TABLE `inbetween-db`.`tbl_winstreak_bonus_config` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `winStreak` INT NULL,
  `bonusPercent` DOUBLE NULL,
  `potBonusAmount` DECIMAL(10,2) NULL,
  PRIMARY KEY (`id`));
