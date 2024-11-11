using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BES.Infrastructure.Persistence.Migrations
{
    public partial class UpdateDeliveryLines : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Courier",
                table: "DeliveryLines");

            migrationBuilder.DropColumn(
                name: "CourierCost",
                table: "DeliveryLines");

            migrationBuilder.DropColumn(
                name: "Notes",
                table: "DeliveryLines");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
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
        }
    }
}
