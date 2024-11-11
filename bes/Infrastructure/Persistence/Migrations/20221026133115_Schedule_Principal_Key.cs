using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BES.Infrastructure.Persistence.Migrations
{
    public partial class Schedule_Principal_Key : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Schedules_Jobs_JobNumber",
                table: "Schedules");

            migrationBuilder.AlterColumn<long>(
                name: "JobNumber",
                table: "Schedules",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Schedules_Jobs_JobNumber",
                table: "Schedules",
                column: "JobNumber",
                principalTable: "Jobs",
                principalColumn: "JobNumber");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Schedules_Jobs_JobNumber",
                table: "Schedules");

            migrationBuilder.AlterColumn<int>(
                name: "JobNumber",
                table: "Schedules",
                type: "int",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AddForeignKey(
                name: "FK_Schedules_Jobs_JobNumber",
                table: "Schedules",
                column: "JobNumber",
                principalTable: "Jobs",
                principalColumn: "ID");
        }
    }
}
