using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BES.Infrastructure.Persistence.Migrations
{
    public partial class Change_Corrective_Notes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "OtherCorrectiveAction",
                table: "NonConformances",
                newName: "CorrectiveNotes");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CorrectiveNotes",
                table: "NonConformances",
                newName: "OtherCorrectiveAction");
        }
    }
}
