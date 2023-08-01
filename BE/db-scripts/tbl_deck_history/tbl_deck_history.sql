CREATE TABLE `inbetween-db`.`tbl_deck_history` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `datetime` DATETIME NULL,
  `cardsOnDeck` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));
