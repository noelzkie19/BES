using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BES.Infrastructure.Persistence.Migrations
{
    public partial class Schedule_Assignee : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AssigneeId",
                table: "Schedules",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Schedules_AssigneeId",
                table: "Schedules",
                column: "AssigneeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Schedules_UserAccounts_AssigneeId",
                table: "Schedules",
                column: "AssigneeId",
                principalTable: "UserAccounts",
                principalColumn: "ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Schedules_UserAccounts_AssigneeId",
                table: "Schedules");

            migrationBuilder.DropIndex(
                name: "IX_Schedules_AssigneeId",
                table: "Schedules");

            migrationBuilder.DropColumn(
                name: "AssigneeId",
                table: "Schedules");
        }
    }
}
