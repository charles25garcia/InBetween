

CREATE TABLE `inbetween-db`.`tbl_feature` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `featureName` VARCHAR(100) NULL,
  `featurePage` VARCHAR(100) NULL,
  `isActive` TINYINT(1) NULL,
  `parentFeatureId` INT NULL,
  `level` INT NULL,
  `icon` VARCHAR(50) NULL,
  PRIMARY KEY (`id`));
