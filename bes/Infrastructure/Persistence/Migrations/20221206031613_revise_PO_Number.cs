using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BES.Infrastructure.Persistence.Migrations
{
    public partial class revise_PO_Number : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PurchaseLine_Purchase",
                table: "PurchaseLines");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_Purchases_PurchaseNumber",
                table: "Purchases");

            migrationBuilder.DropIndex(
                name: "IX_PurchaseLines_PurchaseNumber",
                table: "PurchaseLines");

            migrationBuilder.AlterColumn<string>(
                name: "PurchaseNumber",
                table: "Purchases",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<string>(
                name: "PurchaseNumber",
                table: "PurchaseLines",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AddColumn<int>(
                name: "PurchaseId",
                table: "PurchaseLines",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseLines_PurchaseId",
                table: "PurchaseLines",
                column: "PurchaseId");

            migrationBuilder.AddForeignKey(
                name: "FK_PurchaseLines_Purchases_PurchaseId",
                table: "PurchaseLines",
                column: "PurchaseId",
                principalTable: "Purchases",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PurchaseLines_Purchases_PurchaseId",
                table: "PurchaseLines");

            migrationBuilder.DropIndex(
                name: "IX_PurchaseLines_PurchaseId",
                table: "PurchaseLines");

            migrationBuilder.DropColumn(
                name: "PurchaseId",
                table: "PurchaseLines");

            migrationBuilder.AlterColumn<long>(
                name: "PurchaseNumber",
                table: "Purchases",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<long>(
                name: "PurchaseNumber",
                table: "PurchaseLines",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Purchases_PurchaseNumber",
                table: "Purchases",
                column: "PurchaseNumber");

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseLines_PurchaseNumber",
                table: "PurchaseLines",
                column: "PurchaseNumber");

            migrationBuilder.AddForeignKey(
                name: "FK_PurchaseLine_Purchase",
                table: "PurchaseLines",
                column: "PurchaseNumber",
                principalTable: "Purchases",
                principalColumn: "PurchaseNumber");
        }
    }
}
