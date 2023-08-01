ALTER TABLE `inbetween-db`.`tbl_user_role` 
ADD COLUMN `defaultFeatureId` INT NULL AFTER `updatedById`;

UPDATE `inbetween-db`.`tbl_user_role` SET `defaultFeatureId` = '1' WHERE (`id` = '1');
UPDATE `inbetween-db`.`tbl_user_role` SET `defaultFeatureId` = '27' WHERE (`id` = '2');
UPDATE `inbetween-db`.`tbl_user_role` SET `defaultFeatureId` = '28' WHERE (`id` = '3');
UPDATE `inbetween-db`.`tbl_user_role` SET `defaultFeatureId` = '20' WHERE (`id` = '4');
