using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BES.Infrastructure.Persistence.Migrations
{
    public partial class Job_SubAssembly : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "JobSubAssembly",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ParentJobNumber = table.Column<long>(type: "bigint", nullable: false),
                    JobNumber = table.Column<long>(type: "bigint", nullable: false),
                    SubJobId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    DueDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    EstimatedHours = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    DrawingNumber = table.Column<int>(type: "int", nullable: false),
                    RevisionNumber = table.Column<int>(type: "int", nullable: false),
                    ClientId = table.Column<int>(type: "int", nullable: false),
                    OrderNumber = table.Column<int>(type: "int", nullable: false),
                    Delivered = table.Column<bool>(type: "bit", nullable: false),
                    QuantityDelivered = table.Column<int>(type: "int", nullable: false),
                    SalePrice = table.Column<decimal>(type: "money", nullable: false),
                    JobTypeId = table.Column<int>(type: "int", nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HeatNumber = table.Column<int>(type: "int", nullable: false),
                    MaterialMarkup = table.Column<int>(type: "int", nullable: false),
                    LabourMarkup = table.Column<int>(type: "int", nullable: false),
                    SetupText = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    JobCardPrinted = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NcrNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsQoutedJob = table.Column<bool>(type: "bit", nullable: false),
                    IsByHour = table.Column<bool>(type: "bit", nullable: false),
                    DateScheduled = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeliveryDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CompletedBy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Deleted = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobSubAssembly", x => x.ID);
                    table.UniqueConstraint("AK_JobSubAssembly_JobNumber", x => x.JobNumber);
                    table.ForeignKey(
                        name: "FK_JobSubAssembly_Clients_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Clients",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_JobSubAssembly_JobTypes_JobTypeId",
                        column: x => x.JobTypeId,
                        principalTable: "JobTypes",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "SubSalesInformations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    JobNumber = table.Column<long>(type: "bigint", nullable: false),
                    SalePerUnit = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    SalesPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    DeliveryCharge = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TotalPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    MaterialCost = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    LabourCost = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    OtherCost = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TotalCost = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ToBeInvoiced = table.Column<bool>(type: "bit", nullable: false),
                    InvoiceNumber = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubSalesInformations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SubSalesInformations_JobSubAssembly_JobNumber",
                        column: x => x.JobNumber,
                        principalTable: "JobSubAssembly",
                        principalColumn: "JobNumber");
                });

            migrationBuilder.CreateIndex(
                name: "IX_JobSubAssembly_ClientId",
                table: "JobSubAssembly",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_JobSubAssembly_JobTypeId",
                table: "JobSubAssembly",
                column: "JobTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_SubSalesInformations_JobNumber",
                table: "SubSalesInformations",
                column: "JobNumber",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SubSalesInformations");

            migrationBuilder.DropTable(
                name: "JobSubAssembly");
        }
    }
}
