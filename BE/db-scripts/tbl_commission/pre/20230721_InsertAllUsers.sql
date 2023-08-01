INSERT INTO `inbetween-db`.`tbl_commission`
(`userId`,
`amount`,
`lastUpdated`) select u.id, 0, CURDATE()  from tbl_user u