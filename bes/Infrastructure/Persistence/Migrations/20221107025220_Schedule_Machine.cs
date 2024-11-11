using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BES.Infrastructure.Persistence.Migrations
{
    public partial class Schedule_Machine : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MachineId",
                table: "Jobs",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Jobs_MachineId",
                table: "Jobs",
                column: "MachineId");

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_Machines_MachineId",
                table: "Jobs",
                column: "MachineId",
                principalTable: "Machines",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_Machines_MachineId",
                table: "Jobs");

            migrationBuilder.DropIndex(
                name: "IX_Jobs_MachineId",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "MachineId",
                table: "Jobs");
        }
    }
}
