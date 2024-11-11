using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BES.Infrastructure.Persistence.Migrations
{
    public partial class Change_reviewofcorrectiveAction : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "ReviewOfCorrectiveAction",
                table: "NonConformances",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "ReviewOfCorrectiveAction",
                table: "NonConformances",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");
        }
    }
}
