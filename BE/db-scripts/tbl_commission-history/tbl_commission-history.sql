CREATE TABLE  `inbetween-db`.`tbl_commission-history`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) NOT NULL,
  `adminCommission` decimal(20, 2) NULL,
  `platinumCommission` decimal(20, 2) NULL,
  `goldCommission` decimal(20, 2) NULL,
  `platinumReferralById` varchar(50) NULL,
  `goldReferralById` varchar(50) NULL,
  `createdAt` timestamp(0) NULL DEFAULT current_timestamp(0),
  PRIMARY KEY (`id`)
)
