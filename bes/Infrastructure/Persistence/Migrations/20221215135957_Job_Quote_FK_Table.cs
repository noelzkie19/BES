using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BES.Infrastructure.Persistence.Migrations
{
    public partial class Job_Quote_FK_Table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Jobs_QuoteNumberSource",
                table: "Jobs",
                column: "QuoteNumberSource");

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_Quotes_QuoteNumberSource",
                table: "Jobs",
                column: "QuoteNumberSource",
                principalTable: "Quotes",
                principalColumn: "ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_Quotes_QuoteNumberSource",
                table: "Jobs");

            migrationBuilder.DropIndex(
                name: "IX_Jobs_QuoteNumberSource",
                table: "Jobs");
        }
    }
}
