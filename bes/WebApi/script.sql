BEGIN TRANSACTION;
GO

EXEC sp_rename N'[Resources].[InActive]', N'IsActive', N'COLUMN';
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20230525092503_Resource_Change_colName', N'6.0.7');
GO

COMMIT;
GO

