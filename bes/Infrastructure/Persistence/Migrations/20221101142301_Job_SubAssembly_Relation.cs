using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BES.Infrastructure.Persistence.Migrations
{
    public partial class Job_SubAssembly_Relation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_JobSubAssemblies_ParentJobNumber",
                table: "JobSubAssemblies",
                column: "ParentJobNumber");

            migrationBuilder.AddForeignKey(
                name: "FK_JobSubAssemblies_Jobs_ParentJobNumber",
                table: "JobSubAssemblies",
                column: "ParentJobNumber",
                principalTable: "Jobs",
                principalColumn: "JobNumber");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JobSubAssemblies_Jobs_ParentJobNumber",
                table: "JobSubAssemblies");

            migrationBuilder.DropIndex(
                name: "IX_JobSubAssemblies_ParentJobNumber",
                table: "JobSubAssemblies");
        }
    }
}
