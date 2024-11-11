using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BES.Infrastructure.Persistence.Migrations
{
    public partial class Remove_SubAssembly : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "JobSubAssemblies");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_Jobs_JobNumber",
                table: "Jobs");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddUniqueConstraint(
                name: "AK_Jobs_JobNumber",
                table: "Jobs",
                column: "JobNumber");

            migrationBuilder.CreateTable(
                name: "JobSubAssemblies",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ClientId = table.Column<int>(type: "int", nullable: false),
                    JobTypeId = table.Column<int>(type: "int", nullable: false),
                    ParentJobNumber = table.Column<long>(type: "bigint", nullable: false),
                    CompletedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    DateScheduled = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Deleted = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Delivered = table.Column<bool>(type: "bit", nullable: false),
                    DeliveryCharge = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    DeliveryDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    DrawingNumber = table.Column<int>(type: "int", nullable: false),
                    DueDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    EstimatedHours = table.Column<int>(type: "int", nullable: false),
                    HeatNumber = table.Column<int>(type: "int", nullable: false),
                    InvoiceNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsByHour = table.Column<bool>(type: "bit", nullable: false),
                    IsQoutedJob = table.Column<bool>(type: "bit", nullable: false),
                    JobCardPrinted = table.Column<DateTime>(type: "datetime2", nullable: true),
                    JobNumber = table.Column<long>(type: "bigint", nullable: false),
                    LabourCost = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    LabourMarkup = table.Column<int>(type: "int", nullable: false),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MaterialCost = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    MaterialMarkup = table.Column<int>(type: "int", nullable: false),
                    NcrNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OrderNumber = table.Column<int>(type: "int", nullable: false),
                    OtherCost = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    QuantityDelivered = table.Column<int>(type: "int", nullable: false),
                    RevisionNumber = table.Column<int>(type: "int", nullable: false),
                    SalePerUnit = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    SalePrice = table.Column<decimal>(type: "money", nullable: false),
                    SalesPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    SetupText = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StartDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    SubJobId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ToBeInvoiced = table.Column<bool>(type: "bit", nullable: false),
                    TotalCost = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TotalPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobSubAssemblies", x => x.ID);
                    table.ForeignKey(
                        name: "FK_JobSubAssemblies_Clients_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Clients",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_JobSubAssemblies_Jobs_ParentJobNumber",
                        column: x => x.ParentJobNumber,
                        principalTable: "Jobs",
                        principalColumn: "JobNumber");
                    table.ForeignKey(
                        name: "FK_JobSubAssemblies_JobTypes_JobTypeId",
                        column: x => x.JobTypeId,
                        principalTable: "JobTypes",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_JobSubAssemblies_ClientId",
                table: "JobSubAssemblies",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_JobSubAssemblies_JobTypeId",
                table: "JobSubAssemblies",
                column: "JobTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_JobSubAssemblies_ParentJobNumber",
                table: "JobSubAssemblies",
                column: "ParentJobNumber");
        }
    }
}
