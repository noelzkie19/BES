using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BES.Infrastructure.Persistence.Migrations
{
    public partial class Job_sales_remove : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SalesInformations");

            migrationBuilder.DropTable(
                name: "SubSalesInformations");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_JobSubAssemblies_JobNumber",
                table: "JobSubAssemblies");

            migrationBuilder.AddColumn<decimal>(
                name: "DeliveryCharge",
                table: "JobSubAssemblies",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "InvoiceNumber",
                table: "JobSubAssemblies",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "LabourCost",
                table: "JobSubAssemblies",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "MaterialCost",
                table: "JobSubAssemblies",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "OtherCost",
                table: "JobSubAssemblies",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "SalePerUnit",
                table: "JobSubAssemblies",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "SalesPrice",
                table: "JobSubAssemblies",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<bool>(
                name: "ToBeInvoiced",
                table: "JobSubAssemblies",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<decimal>(
                name: "TotalCost",
                table: "JobSubAssemblies",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "TotalPrice",
                table: "JobSubAssemblies",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "DeliveryCharge",
                table: "Jobs",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "InvoiceNumber",
                table: "Jobs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "LabourCost",
                table: "Jobs",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "MaterialCost",
                table: "Jobs",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "OtherCost",
                table: "Jobs",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "SalePerUnit",
                table: "Jobs",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "SalesPrice",
                table: "Jobs",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<bool>(
                name: "ToBeInvoiced",
                table: "Jobs",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<decimal>(
                name: "TotalCost",
                table: "Jobs",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "TotalPrice",
                table: "Jobs",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeliveryCharge",
                table: "JobSubAssemblies");

            migrationBuilder.DropColumn(
                name: "InvoiceNumber",
                table: "JobSubAssemblies");

            migrationBuilder.DropColumn(
                name: "LabourCost",
                table: "JobSubAssemblies");

            migrationBuilder.DropColumn(
                name: "MaterialCost",
                table: "JobSubAssemblies");

            migrationBuilder.DropColumn(
                name: "OtherCost",
                table: "JobSubAssemblies");

            migrationBuilder.DropColumn(
                name: "SalePerUnit",
                table: "JobSubAssemblies");

            migrationBuilder.DropColumn(
                name: "SalesPrice",
                table: "JobSubAssemblies");

            migrationBuilder.DropColumn(
                name: "ToBeInvoiced",
                table: "JobSubAssemblies");

            migrationBuilder.DropColumn(
                name: "TotalCost",
                table: "JobSubAssemblies");

            migrationBuilder.DropColumn(
                name: "TotalPrice",
                table: "JobSubAssemblies");

            migrationBuilder.DropColumn(
                name: "DeliveryCharge",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "InvoiceNumber",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "LabourCost",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "MaterialCost",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "OtherCost",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "SalePerUnit",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "SalesPrice",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "ToBeInvoiced",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "TotalCost",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "TotalPrice",
                table: "Jobs");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_JobSubAssemblies_JobNumber",
                table: "JobSubAssemblies",
                column: "JobNumber");

            migrationBuilder.CreateTable(
                name: "SalesInformations",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    JobID = table.Column<int>(type: "int", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Deleted = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DeliveryCharge = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    InvoiceNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LabourCost = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MaterialCost = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    OtherCost = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    SalePerUnit = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    SalesPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ToBeInvoiced = table.Column<bool>(type: "bit", nullable: false),
                    TotalCost = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TotalPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SalesInformations", x => x.ID);
                    table.ForeignKey(
                        name: "FK_SalesInformation_Job",
                        column: x => x.JobID,
                        principalTable: "Jobs",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "SubSalesInformations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    JobNumber = table.Column<long>(type: "bigint", nullable: false),
                    DeliveryCharge = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    InvoiceNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LabourCost = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    MaterialCost = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    OtherCost = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    SalePerUnit = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    SalesPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ToBeInvoiced = table.Column<bool>(type: "bit", nullable: false),
                    TotalCost = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TotalPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubSalesInformations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SubSalesInformations_JobSubAssemblies_JobNumber",
                        column: x => x.JobNumber,
                        principalTable: "JobSubAssemblies",
                        principalColumn: "JobNumber");
                });

            migrationBuilder.CreateIndex(
                name: "IX_SalesInformations_JobID",
                table: "SalesInformations",
                column: "JobID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SubSalesInformations_JobNumber",
                table: "SubSalesInformations",
                column: "JobNumber",
                unique: true);
        }
    }
}
