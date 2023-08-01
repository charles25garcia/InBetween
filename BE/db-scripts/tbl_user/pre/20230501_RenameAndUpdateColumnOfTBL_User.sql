

ALTER TABLE tbl_users RENAME tbl_user;

ALTER TABLE tbl_user
RENAME COLUMN userID to id;

ALTER TABLE tbl_user
RENAME COLUMN roleID to userRoleId;

ALTER TABLE tbl_user   
MODIFY COLUMN id varchar(100);