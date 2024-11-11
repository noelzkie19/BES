using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BES.Infrastructure.Persistence.Migrations
{
    public partial class Remove_DeliveryId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_Deliveries_DeliveryID",
                table: "Jobs");

            migrationBuilder.RenameColumn(
                name: "DeliveryID",
                table: "Jobs",
                newName: "DeliveryId");

            migrationBuilder.RenameIndex(
                name: "IX_Jobs_DeliveryID",
                table: "Jobs",
                newName: "IX_Jobs_DeliveryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_Deliveries_DeliveryId",
                table: "Jobs",
                column: "DeliveryId",
                principalTable: "Deliveries",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_Deliveries_DeliveryId",
                table: "Jobs");

            migrationBuilder.RenameColumn(
                name: "DeliveryId",
                table: "Jobs",
                newName: "DeliveryID");

            migrationBuilder.RenameIndex(
                name: "IX_Jobs_DeliveryId",
                table: "Jobs",
                newName: "IX_Jobs_DeliveryID");

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_Deliveries_DeliveryID",
                table: "Jobs",
                column: "DeliveryID",
                principalTable: "Deliveries",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
