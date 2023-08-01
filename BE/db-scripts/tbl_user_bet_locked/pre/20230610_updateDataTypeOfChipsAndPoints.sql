ALTER TABLE `inbetween-db`.`tbl_user_bet_locked` 
CHANGE COLUMN `points` `points` BIGINT NULL DEFAULT NULL ,
CHANGE COLUMN `chips` `chips` BIGINT NULL DEFAULT NULL ;
