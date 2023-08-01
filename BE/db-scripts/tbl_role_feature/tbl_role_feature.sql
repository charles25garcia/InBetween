

CREATE TABLE `inbetween-db`.`tbl_role_feature` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `roleId` INT NULL,
  `permissionId` INT NOT NULL,
  `featureId` INT NULL,
  `assignedByUserId` VARCHAR(100),
  PRIMARY KEY (`id`));
