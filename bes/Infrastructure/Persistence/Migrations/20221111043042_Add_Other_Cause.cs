using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BES.Infrastructure.Persistence.Migrations
{
    public partial class Add_Other_Cause : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "OtherCause",
                table: "NonConformances",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OtherCause",
                table: "NonConformances");
        }
    }
}
