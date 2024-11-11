using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BES.Infrastructure.Persistence.Migrations
{
    public partial class Schedule_Machine_Replace : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_Machines_MachineId",
                table: "Jobs");

            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_UserAccounts_StaffId",
                table: "Jobs");

            migrationBuilder.DropIndex(
                name: "IX_Jobs_MachineId",
                table: "Jobs");

            migrationBuilder.DropIndex(
                name: "IX_Jobs_StaffId",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "MachineId",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "StaffId",
                table: "Jobs");

            migrationBuilder.AddColumn<int>(
                name: "MachineId",
                table: "Operations",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "StaffId",
                table: "Operations",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Operations_MachineId",
                table: "Operations",
                column: "MachineId");

            migrationBuilder.CreateIndex(
                name: "IX_Operations_StaffId",
                table: "Operations",
                column: "StaffId");

            migrationBuilder.AddForeignKey(
                name: "FK_Operations_Machines_MachineId",
                table: "Operations",
                column: "MachineId",
                principalTable: "Machines",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Operations_UserAccounts_StaffId",
                table: "Operations",
                column: "StaffId",
                principalTable: "UserAccounts",
                principalColumn: "ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Operations_Machines_MachineId",
                table: "Operations");

            migrationBuilder.DropForeignKey(
                name: "FK_Operations_UserAccounts_StaffId",
                table: "Operations");

            migrationBuilder.DropIndex(
                name: "IX_Operations_MachineId",
                table: "Operations");

            migrationBuilder.DropIndex(
                name: "IX_Operations_StaffId",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "MachineId",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "StaffId",
                table: "Operations");

            migrationBuilder.AddColumn<int>(
                name: "MachineId",
                table: "Jobs",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "StaffId",
                table: "Jobs",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Jobs_MachineId",
                table: "Jobs",
                column: "MachineId");

            migrationBuilder.CreateIndex(
                name: "IX_Jobs_StaffId",
                table: "Jobs",
                column: "StaffId");

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_Machines_MachineId",
                table: "Jobs",
                column: "MachineId",
                principalTable: "Machines",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_UserAccounts_StaffId",
                table: "Jobs",
                column: "StaffId",
                principalTable: "UserAccounts",
                principalColumn: "ID");
        }
    }
}
