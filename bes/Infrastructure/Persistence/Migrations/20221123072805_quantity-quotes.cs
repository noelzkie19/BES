using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BES.Infrastructure.Persistence.Migrations
{
    public partial class quantityquotes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Materials_Suppliers_SupplierID",
                table: "Materials");

            migrationBuilder.AlterColumn<int>(
                name: "Quantity",
                table: "Materials",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Material_Supplier",
                table: "Materials",
                column: "SupplierID",
                principalTable: "Suppliers",
                principalColumn: "ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Material_Supplier",
                table: "Materials");

            migrationBuilder.AlterColumn<int>(
                name: "Quantity",
                table: "Materials",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Materials_Suppliers_SupplierID",
                table: "Materials",
                column: "SupplierID",
                principalTable: "Suppliers",
                principalColumn: "ID");
        }
    }
}
