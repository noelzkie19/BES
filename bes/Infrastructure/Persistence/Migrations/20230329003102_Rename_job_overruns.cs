using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BES.Infrastructure.Persistence.Migrations
{
    public partial class Rename_job_overruns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "QtyAllowOverruns",
                table: "Jobs",
                newName: "QtyAuthorisedOverruns");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "QtyAuthorisedOverruns",
                table: "Jobs",
                newName: "QtyAllowOverruns");
        }
    }
}
