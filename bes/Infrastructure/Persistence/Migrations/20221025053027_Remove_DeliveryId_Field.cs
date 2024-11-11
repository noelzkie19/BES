using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BES.Infrastructure.Persistence.Migrations
{
    public partial class Remove_DeliveryId_Field : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_Deliveries_DeliveryId",
                table: "Jobs");

            migrationBuilder.DropIndex(
                name: "IX_Jobs_DeliveryId",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "DeliveryId",
                table: "Jobs");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DeliveryId",
                table: "Jobs",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Jobs_DeliveryId",
                table: "Jobs",
                column: "DeliveryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_Deliveries_DeliveryId",
                table: "Jobs",
                column: "DeliveryId",
                principalTable: "Deliveries",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
