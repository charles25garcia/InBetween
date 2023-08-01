

ALTER TABLE tbl_user RENAME tbl_users;

ALTER TABLE tbl_users
RENAME COLUMN id to userID;

ALTER TABLE tbl_users
RENAME COLUMN userRoleId to roleID;

ALTER TABLE tbl_users  
MODIFY COLUMN userId int NOT NULL AUTO_INCREMENT;