using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BES.Infrastructure.Persistence.Migrations
{
    public partial class SupplierAddress_Add_PostalSuburbStatePostCode : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PostalPostCode",
                table: "SupplierAddresses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PostalState",
                table: "SupplierAddresses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PostalSuburb",
                table: "SupplierAddresses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PostalPostCode",
                table: "SupplierAddresses");

            migrationBuilder.DropColumn(
                name: "PostalState",
                table: "SupplierAddresses");

            migrationBuilder.DropColumn(
                name: "PostalSuburb",
                table: "SupplierAddresses");
        }
    }
}
