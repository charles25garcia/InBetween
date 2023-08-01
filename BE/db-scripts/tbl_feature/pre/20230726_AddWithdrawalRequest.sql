INSERT INTO `inbetween-db`.`tbl_feature` (`featureName`, `isActive`, `level`, `icon`) VALUES ('Withdrawal Request', '1', '1', 'money-bill-transfer');

INSERT INTO `inbetween-db`.`tbl_feature` (`featureName`, `featurePage`, `isActive`, `parentFeatureId`, `level`, `icon`) VALUES ('Chips', 'user/CH', '1', '31', '2', 'coin');

INSERT INTO `inbetween-db`.`tbl_feature` (`featureName`, `featurePage`, `isActive`, `parentFeatureId`, `level`, `icon`) VALUES ('Chips', 'admin/chips', '1', '31', '1', 'coins');



INSERT INTO `inbetween-db`.`tbl_role_feature` (`roleId`, `permissionId`, `featureId`) VALUES ('3', '3', '31');
INSERT INTO `inbetween-db`.`tbl_role_feature` (`roleId`, `permissionId`, `featureId`) VALUES ('3', '3', '32');


INSERT INTO `inbetween-db`.`tbl_role_feature` (`roleId`, `permissionId`, `featureId`) VALUES ('2', '3', '31');
INSERT INTO `inbetween-db`.`tbl_role_feature` (`roleId`, `permissionId`, `featureId`) VALUES ('2', '3', '32');

INSERT INTO `inbetween-db`.`tbl_role_feature` (`roleId`, `permissionId`, `featureId`) VALUES ('1', '3', '31');
INSERT INTO `inbetween-db`.`tbl_role_feature` (`roleId`, `permissionId`, `featureId`) VALUES ('1', '3', '33');