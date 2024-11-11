using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BES.Infrastructure.Persistence.Migrations
{
    public partial class DeliveryLines_Additional_Columns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DeliveryLines_Deliveries_DeliveryId",
                table: "DeliveryLines");

            migrationBuilder.DropIndex(
                name: "IX_DeliveryLines_DeliveryId",
                table: "DeliveryLines");

            migrationBuilder.AddColumn<string>(
                name: "Courier",
                table: "DeliveryLines",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "CourierCost",
                table: "DeliveryLines",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "Notes",
                table: "DeliveryLines",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Deliveries_DeliveryNumber",
                table: "Deliveries",
                column: "DeliveryNumber");

            migrationBuilder.CreateIndex(
                name: "IX_DeliveryLines_DeliveryNumber",
                table: "DeliveryLines",
                column: "DeliveryNumber");

            migrationBuilder.CreateIndex(
                name: "IX_DeliveryLines_JobNumber",
                table: "DeliveryLines",
                column: "JobNumber");

            migrationBuilder.AddForeignKey(
                name: "FK_DeliveryLines_Deliveries_DeliveryNumber",
                table: "DeliveryLines",
                column: "DeliveryNumber",
                principalTable: "Deliveries",
                principalColumn: "DeliveryNumber");

            migrationBuilder.AddForeignKey(
                name: "FK_DeliveryLines_Jobs_JobNumber",
                table: "DeliveryLines",
                column: "JobNumber",
                principalTable: "Jobs",
                principalColumn: "JobNumber");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DeliveryLines_Deliveries_DeliveryNumber",
                table: "DeliveryLines");

            migrationBuilder.DropForeignKey(
                name: "FK_DeliveryLines_Jobs_JobNumber",
                table: "DeliveryLines");

            migrationBuilder.DropIndex(
                name: "IX_DeliveryLines_DeliveryNumber",
                table: "DeliveryLines");

            migrationBuilder.DropIndex(
                name: "IX_DeliveryLines_JobNumber",
                table: "DeliveryLines");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_Deliveries_DeliveryNumber",
                table: "Deliveries");

            migrationBuilder.DropColumn(
                name: "Courier",
                table: "DeliveryLines");

            migrationBuilder.DropColumn(
                name: "CourierCost",
                table: "DeliveryLines");

            migrationBuilder.DropColumn(
                name: "Notes",
                table: "DeliveryLines");

            migrationBuilder.CreateIndex(
                name: "IX_DeliveryLines_DeliveryId",
                table: "DeliveryLines",
                column: "DeliveryId");

            migrationBuilder.AddForeignKey(
                name: "FK_DeliveryLines_Deliveries_DeliveryId",
                table: "DeliveryLines",
                column: "DeliveryId",
                principalTable: "Deliveries",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
