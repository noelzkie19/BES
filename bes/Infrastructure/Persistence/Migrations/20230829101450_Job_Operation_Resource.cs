using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BES.Infrastructure.Persistence.Migrations
{
    public partial class Job_Operation_Resource : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Operations_Resources_ResourceId",
                table: "Operations");

            migrationBuilder.DropIndex(
                name: "IX_Operations_ResourceId",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "ResourceId",
                table: "Operations");

            migrationBuilder.AddColumn<string>(
                name: "Resource",
                table: "Operations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Resource",
                table: "Operations");

            migrationBuilder.AddColumn<int>(
                name: "ResourceId",
                table: "Operations",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Operations_ResourceId",
                table: "Operations",
                column: "ResourceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Operations_Resources_ResourceId",
                table: "Operations",
                column: "ResourceId",
                principalTable: "Resources",
                principalColumn: "ID");
        }
    }
}
