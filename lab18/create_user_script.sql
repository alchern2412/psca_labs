USE [lab14node]
GO
create login test_user_login with password = 'Password1';

go

CREATE USER test_user for login test_user_login;
GO

grant control on database::lab14node to test_user;
go