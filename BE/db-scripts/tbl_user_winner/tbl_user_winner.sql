
CREATE TABLE `inbetween-db`.`tbl_user_winner` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userId` VARCHAR(100) NULL,
  `amount` DECIMAL NULL,
  `roundId` VARCHAR(100) NULL,
  `userWinstreakCount` INT NULL,
  PRIMARY KEY (`id`));
