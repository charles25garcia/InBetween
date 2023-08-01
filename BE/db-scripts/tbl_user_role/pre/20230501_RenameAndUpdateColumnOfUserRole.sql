


ALTER TABLE tbl_userroles RENAME tbl_user_role;

ALTER TABLE tbl_user_role
RENAME COLUMN roleID to id;

ALTER TABLE tbl_user_role
RENAME COLUMN updatedBy to updatedById;