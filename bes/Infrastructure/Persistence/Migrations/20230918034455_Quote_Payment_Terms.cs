using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BES.Infrastructure.Persistence.Migrations
{
    public partial class Quote_Payment_Terms : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Is30DaysFromInv",
                table: "Quotes",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsCod",
                table: "Quotes",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDepositReceivedCOD",
                table: "Quotes",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "ProgressPaymentRequired",
                table: "Quotes",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Is30DaysFromInv",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "IsCod",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "IsDepositReceivedCOD",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "ProgressPaymentRequired",
                table: "Quotes");
        }
    }
}
