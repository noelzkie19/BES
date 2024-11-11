using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BES.Infrastructure.Persistence.Migrations
{
    public partial class Modify_Material_Table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Material_Supplier",
                table: "Materials");

            migrationBuilder.AddColumn<bool>(
                name: "GST",
                table: "Materials",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Materials",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "Materials",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TotalPrice",
                table: "Materials",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UnitPrice",
                table: "Materials",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Materials_Suppliers_SupplierID",
                table: "Materials",
                column: "SupplierID",
                principalTable: "Suppliers",
                principalColumn: "ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Materials_Suppliers_SupplierID",
                table: "Materials");

            migrationBuilder.DropColumn(
                name: "GST",
                table: "Materials");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Materials");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "Materials");

            migrationBuilder.DropColumn(
                name: "TotalPrice",
                table: "Materials");

            migrationBuilder.DropColumn(
                name: "UnitPrice",
                table: "Materials");

            migrationBuilder.AddForeignKey(
                name: "FK_Material_Supplier",
                table: "Materials",
                column: "SupplierID",
                principalTable: "Suppliers",
                principalColumn: "ID");
        }
    }
}
