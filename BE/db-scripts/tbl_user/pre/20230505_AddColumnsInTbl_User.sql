

ALTER TABLE tbl_user
ADD resetPasswordToken varchar(255) default NULL;

ALTER TABLE tbl_user
ADD resetPasswordExpire datetime default NULL;

ALTER TABLE tbl_user
ADD loginAttempt int(10) default 0
