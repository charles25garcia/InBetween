


ALTER TABLE tbl_user_role RENAME tbl_userroles;

ALTER TABLE tbl_userroles
RENAME COLUMN id to roleID;

ALTER TABLE tbl_userroles
RENAME COLUMN updatedById to updatedBy;