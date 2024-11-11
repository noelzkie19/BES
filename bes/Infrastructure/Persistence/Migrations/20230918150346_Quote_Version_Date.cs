using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BES.Infrastructure.Persistence.Migrations
{
    public partial class Quote_Version_Date : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DateLatestVersion",
                table: "Quotes",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateLatestVersion",
                table: "Quotes");
        }
    }
}
