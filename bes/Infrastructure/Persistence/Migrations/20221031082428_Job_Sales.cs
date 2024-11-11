using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BES.Infrastructure.Persistence.Migrations
{
    public partial class Job_Sales : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_SalesInformations_JobID",
                table: "SalesInformations");

            migrationBuilder.CreateIndex(
                name: "IX_SalesInformations_JobID",
                table: "SalesInformations",
                column: "JobID",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_SalesInformations_JobID",
                table: "SalesInformations");

            migrationBuilder.CreateIndex(
                name: "IX_SalesInformations_JobID",
                table: "SalesInformations",
                column: "JobID");
        }
    }
}
