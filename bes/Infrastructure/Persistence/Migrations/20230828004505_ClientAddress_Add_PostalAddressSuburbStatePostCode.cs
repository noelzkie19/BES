using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BES.Infrastructure.Persistence.Migrations
{
    public partial class ClientAddress_Add_PostalAddressSuburbStatePostCode : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PostalAddress",
                table: "ClientAddresses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PostalPostCode",
                table: "ClientAddresses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PostalState",
                table: "ClientAddresses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PostalSuburb",
                table: "ClientAddresses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PostalAddress",
                table: "ClientAddresses");

            migrationBuilder.DropColumn(
                name: "PostalPostCode",
                table: "ClientAddresses");

            migrationBuilder.DropColumn(
                name: "PostalState",
                table: "ClientAddresses");

            migrationBuilder.DropColumn(
                name: "PostalSuburb",
                table: "ClientAddresses");
        }
    }
}
