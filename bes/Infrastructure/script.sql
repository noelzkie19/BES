BEGIN TRANSACTION;
GO

ALTER TABLE [PurchaseLines] ADD [GstAmount] decimal(18,2) NOT NULL DEFAULT 0.0;
GO

ALTER TABLE [PurchaseLines] ADD [Internal] bit NOT NULL DEFAULT CAST(0 AS bit);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20230913082020_PO_Gst_Amount', N'6.0.7');
GO

COMMIT;
GO

