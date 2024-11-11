using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BES.Infrastructure.Persistence.Migrations
{
    public partial class Job_newFk : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DeliveryLines_Jobs_JobNumber",
                table: "DeliveryLines");

            migrationBuilder.DropForeignKey(
                name: "FK_PurchaseLines_Jobs_JobNumber",
                table: "PurchaseLines");

            migrationBuilder.DropForeignKey(
                name: "FK_Schedules_Jobs_JobNumber",
                table: "Schedules");

            migrationBuilder.DropIndex(
                name: "IX_Schedules_JobNumber",
                table: "Schedules");

            migrationBuilder.DropIndex(
                name: "IX_PurchaseLines_JobNumber",
                table: "PurchaseLines");

            migrationBuilder.DropIndex(
                name: "IX_DeliveryLines_JobNumber",
                table: "DeliveryLines");

            migrationBuilder.DropColumn(
                name: "JobNumber",
                table: "Schedules");

            migrationBuilder.DropColumn(
                name: "JobNumber",
                table: "PurchaseLines");

            migrationBuilder.DropColumn(
                name: "JobNumber",
                table: "DeliveryLines");

            migrationBuilder.AddColumn<int>(
                name: "JobId",
                table: "Schedules",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "JobId",
                table: "PurchaseLines",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<long>(
                name: "ParentJobNumber",
                table: "Jobs",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "JobId",
                table: "DeliveryLines",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Schedules_JobId",
                table: "Schedules",
                column: "JobId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseLines_JobId",
                table: "PurchaseLines",
                column: "JobId");

            migrationBuilder.CreateIndex(
                name: "IX_DeliveryLines_JobId",
                table: "DeliveryLines",
                column: "JobId");

            migrationBuilder.AddForeignKey(
                name: "FK_DeliveryLines_Jobs_JobId",
                table: "DeliveryLines",
                column: "JobId",
                principalTable: "Jobs",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_PurchaseLines_Jobs_JobId",
                table: "PurchaseLines",
                column: "JobId",
                principalTable: "Jobs",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Schedules_Jobs_JobId",
                table: "Schedules",
                column: "JobId",
                principalTable: "Jobs",
                principalColumn: "ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DeliveryLines_Jobs_JobId",
                table: "DeliveryLines");

            migrationBuilder.DropForeignKey(
                name: "FK_PurchaseLines_Jobs_JobId",
                table: "PurchaseLines");

            migrationBuilder.DropForeignKey(
                name: "FK_Schedules_Jobs_JobId",
                table: "Schedules");

            migrationBuilder.DropIndex(
                name: "IX_Schedules_JobId",
                table: "Schedules");

            migrationBuilder.DropIndex(
                name: "IX_PurchaseLines_JobId",
                table: "PurchaseLines");

            migrationBuilder.DropIndex(
                name: "IX_DeliveryLines_JobId",
                table: "DeliveryLines");

            migrationBuilder.DropColumn(
                name: "JobId",
                table: "Schedules");

            migrationBuilder.DropColumn(
                name: "JobId",
                table: "PurchaseLines");

            migrationBuilder.DropColumn(
                name: "ParentJobNumber",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "JobId",
                table: "DeliveryLines");

            migrationBuilder.AddColumn<long>(
                name: "JobNumber",
                table: "Schedules",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "JobNumber",
                table: "PurchaseLines",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "JobNumber",
                table: "DeliveryLines",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_Schedules_JobNumber",
                table: "Schedules",
                column: "JobNumber",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseLines_JobNumber",
                table: "PurchaseLines",
                column: "JobNumber");

            migrationBuilder.CreateIndex(
                name: "IX_DeliveryLines_JobNumber",
                table: "DeliveryLines",
                column: "JobNumber");

            migrationBuilder.AddForeignKey(
                name: "FK_DeliveryLines_Jobs_JobNumber",
                table: "DeliveryLines",
                column: "JobNumber",
                principalTable: "Jobs",
                principalColumn: "JobNumber");

            migrationBuilder.AddForeignKey(
                name: "FK_PurchaseLines_Jobs_JobNumber",
                table: "PurchaseLines",
                column: "JobNumber",
                principalTable: "Jobs",
                principalColumn: "JobNumber");

            migrationBuilder.AddForeignKey(
                name: "FK_Schedules_Jobs_JobNumber",
                table: "Schedules",
                column: "JobNumber",
                principalTable: "Jobs",
                principalColumn: "JobNumber");
        }
    }
}
