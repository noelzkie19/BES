using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BES.Infrastructure.Persistence.Migrations
{
    public partial class Material_Quotes_FK : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddUniqueConstraint(
                name: "AK_Quotes_Number",
                table: "Quotes",
                column: "Number");

            migrationBuilder.CreateIndex(
                name: "IX_Materials_QuoteNumber",
                table: "Materials",
                column: "QuoteNumber");

            migrationBuilder.AddForeignKey(
                name: "FK_Materials_Quotes_QuoteNumber",
                table: "Materials",
                column: "QuoteNumber",
                principalTable: "Quotes",
                principalColumn: "Number");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Materials_Quotes_QuoteNumber",
                table: "Materials");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_Quotes_Number",
                table: "Quotes");

            migrationBuilder.DropIndex(
                name: "IX_Materials_QuoteNumber",
                table: "Materials");
        }
    }
}
