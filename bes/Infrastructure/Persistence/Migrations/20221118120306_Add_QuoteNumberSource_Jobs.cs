using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BES.Infrastructure.Persistence.Migrations
{
    public partial class Add_QuoteNumberSource_Jobs : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // migrationBuilder.DropForeignKey(
            //     name: "FK_SupplierAddress_Supplier",
            //     table: "SupplierAddresses");

            migrationBuilder.AddColumn<int>(
                name: "QuoteNumberSource",
                table: "Jobs",
                type: "int",
                nullable: true);

            // migrationBuilder.AddForeignKey(
            //     name: "FK_SupplierAddresses_Suppliers_SupplierId",
            //     table: "SupplierAddresses",
            //     column: "SupplierId",
            //     principalTable: "Suppliers",
            //     principalColumn: "ID",
            //     onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // migrationBuilder.DropForeignKey(
            //     name: "FK_SupplierAddresses_Suppliers_SupplierId",
            //     table: "SupplierAddresses");

            migrationBuilder.DropColumn(
                name: "QuoteNumberSource",
                table: "Jobs");

            // migrationBuilder.AddForeignKey(
            //     name: "FK_SupplierAddress_Supplier",
            //     table: "SupplierAddresses",
            //     column: "SupplierId",
            //     principalTable: "Suppliers",
            //     principalColumn: "ID",
            //     onDelete: ReferentialAction.Cascade);
        }
    }
}
