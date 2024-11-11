using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BES.Infrastructure.Persistence.Migrations
{
    public partial class Job_SubAssembly_Details : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JobSubAssembly_Clients_ClientId",
                table: "JobSubAssembly");

            migrationBuilder.DropForeignKey(
                name: "FK_JobSubAssembly_JobTypes_JobTypeId",
                table: "JobSubAssembly");

            migrationBuilder.DropForeignKey(
                name: "FK_SubSalesInformations_JobSubAssembly_JobNumber",
                table: "SubSalesInformations");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_JobSubAssembly_JobNumber",
                table: "JobSubAssembly");

            migrationBuilder.DropPrimaryKey(
                name: "PK_JobSubAssembly",
                table: "JobSubAssembly");

            migrationBuilder.RenameTable(
                name: "JobSubAssembly",
                newName: "JobSubAssemblies");

            migrationBuilder.RenameIndex(
                name: "IX_JobSubAssembly_JobTypeId",
                table: "JobSubAssemblies",
                newName: "IX_JobSubAssemblies_JobTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_JobSubAssembly_ClientId",
                table: "JobSubAssemblies",
                newName: "IX_JobSubAssemblies_ClientId");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_JobSubAssemblies_JobNumber",
                table: "JobSubAssemblies",
                column: "JobNumber");

            migrationBuilder.AddPrimaryKey(
                name: "PK_JobSubAssemblies",
                table: "JobSubAssemblies",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_JobSubAssemblies_Clients_ClientId",
                table: "JobSubAssemblies",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_JobSubAssemblies_JobTypes_JobTypeId",
                table: "JobSubAssemblies",
                column: "JobTypeId",
                principalTable: "JobTypes",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_SubSalesInformations_JobSubAssemblies_JobNumber",
                table: "SubSalesInformations",
                column: "JobNumber",
                principalTable: "JobSubAssemblies",
                principalColumn: "JobNumber");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JobSubAssemblies_Clients_ClientId",
                table: "JobSubAssemblies");

            migrationBuilder.DropForeignKey(
                name: "FK_JobSubAssemblies_JobTypes_JobTypeId",
                table: "JobSubAssemblies");

            migrationBuilder.DropForeignKey(
                name: "FK_SubSalesInformations_JobSubAssemblies_JobNumber",
                table: "SubSalesInformations");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_JobSubAssemblies_JobNumber",
                table: "JobSubAssemblies");

            migrationBuilder.DropPrimaryKey(
                name: "PK_JobSubAssemblies",
                table: "JobSubAssemblies");

            migrationBuilder.RenameTable(
                name: "JobSubAssemblies",
                newName: "JobSubAssembly");

            migrationBuilder.RenameIndex(
                name: "IX_JobSubAssemblies_JobTypeId",
                table: "JobSubAssembly",
                newName: "IX_JobSubAssembly_JobTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_JobSubAssemblies_ClientId",
                table: "JobSubAssembly",
                newName: "IX_JobSubAssembly_ClientId");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_JobSubAssembly_JobNumber",
                table: "JobSubAssembly",
                column: "JobNumber");

            migrationBuilder.AddPrimaryKey(
                name: "PK_JobSubAssembly",
                table: "JobSubAssembly",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_JobSubAssembly_Clients_ClientId",
                table: "JobSubAssembly",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_JobSubAssembly_JobTypes_JobTypeId",
                table: "JobSubAssembly",
                column: "JobTypeId",
                principalTable: "JobTypes",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_SubSalesInformations_JobSubAssembly_JobNumber",
                table: "SubSalesInformations",
                column: "JobNumber",
                principalTable: "JobSubAssembly",
                principalColumn: "JobNumber");
        }
    }
}
