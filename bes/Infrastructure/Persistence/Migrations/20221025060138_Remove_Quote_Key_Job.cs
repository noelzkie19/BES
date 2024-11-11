using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BES.Infrastructure.Persistence.Migrations
{
    public partial class Remove_Quote_Key_Job : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Operations_Quotes_QuoteID",
                table: "Operations");

            migrationBuilder.DropForeignKey(
                name: "FK_Quotes_Jobs_JobID",
                table: "Quotes");

            migrationBuilder.DropIndex(
                name: "IX_Quotes_JobID",
                table: "Quotes");

            migrationBuilder.DropIndex(
                name: "IX_Operations_QuoteID",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "JobID",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "QuoteID",
                table: "Operations");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "JobID",
                table: "Quotes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "QuoteID",
                table: "Operations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Quotes_JobID",
                table: "Quotes",
                column: "JobID");

            migrationBuilder.CreateIndex(
                name: "IX_Operations_QuoteID",
                table: "Operations",
                column: "QuoteID");

            migrationBuilder.AddForeignKey(
                name: "FK_Operations_Quotes_QuoteID",
                table: "Operations",
                column: "QuoteID",
                principalTable: "Quotes",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Quotes_Jobs_JobID",
                table: "Quotes",
                column: "JobID",
                principalTable: "Jobs",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
