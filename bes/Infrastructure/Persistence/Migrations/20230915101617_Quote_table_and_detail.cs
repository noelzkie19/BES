using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BES.Infrastructure.Persistence.Migrations
{
    public partial class Quote_table_and_detail : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CompletedBy",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "CostPerItem",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "Date",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "Delivered",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "DeliveryDate",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "DrawingNumber",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "DueDate",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "EstLeadTime",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "EstimatedCost",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "EstimatedHours",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "JobTypeId",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "NcrNumber",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "OrderNumber",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "OriginalVersion",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "PaymentTerms",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "QuantityDelivered",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "RevisionNumber",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "StartDate",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "TotalCost",
                table: "Quotes");

            migrationBuilder.RenameColumn(
                name: "SetupText",
                table: "Quotes",
                newName: "ContactName");

            migrationBuilder.CreateTable(
                name: "QuoteDetails",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Drawing = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Revision = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    CostPerUnit = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TotalCost = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    EstLeadTime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    QuoteId = table.Column<int>(type: "int", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Deleted = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuoteDetails", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Quote_Id",
                        column: x => x.QuoteId,
                        principalTable: "Quotes",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_QuoteDetails_QuoteId",
                table: "QuoteDetails",
                column: "QuoteId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "QuoteDetails");

            migrationBuilder.RenameColumn(
                name: "ContactName",
                table: "Quotes",
                newName: "SetupText");

            migrationBuilder.AddColumn<string>(
                name: "CompletedBy",
                table: "Quotes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "CostPerItem",
                table: "Quotes",
                type: "money",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                table: "Quotes",
                type: "datetime",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "Delivered",
                table: "Quotes",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeliveryDate",
                table: "Quotes",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DrawingNumber",
                table: "Quotes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "DueDate",
                table: "Quotes",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EstLeadTime",
                table: "Quotes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "EstimatedCost",
                table: "Quotes",
                type: "money",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "EstimatedHours",
                table: "Quotes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "JobTypeId",
                table: "Quotes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "NcrNumber",
                table: "Quotes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "OrderNumber",
                table: "Quotes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "OriginalVersion",
                table: "Quotes",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "PaymentTerms",
                table: "Quotes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "Quotes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "QuantityDelivered",
                table: "Quotes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "RevisionNumber",
                table: "Quotes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDate",
                table: "Quotes",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "TotalCost",
                table: "Quotes",
                type: "money",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
