using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BES.Infrastructure.Persistence.Migrations
{
    public partial class Job_Notes_Config : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Note",
                table: "JobNotes",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(200)",
                oldMaxLength: 200);

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

            migrationBuilder.AlterColumn<string>(
                name: "Note",
                table: "JobNotes",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

        }
    }
}
