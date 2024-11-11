using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BES.Infrastructure.Persistence.Migrations
{
    public partial class Edit_NatureofNonConference : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "NatureOfNonConformance",
                table: "NonConformances",
                newName: "NatureOfNonConference");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "NatureOfNonConference",
                table: "NonConformances",
                newName: "NatureOfNonConformance");
        }
    }
}
