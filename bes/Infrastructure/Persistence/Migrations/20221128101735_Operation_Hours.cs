using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BES.Infrastructure.Persistence.Migrations
{
    public partial class Operation_Hours : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FirstFocName",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "FirstPcName",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "FourthFocName",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "FourthPcName",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "SecondFocName",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "SecondPcName",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "ThirdFocName",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "ThirdPcName",
                table: "Operations");

            migrationBuilder.AddColumn<int>(
                name: "FirstFocHr",
                table: "Operations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "FirstPcHr",
                table: "Operations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "FourthFocHr",
                table: "Operations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "FourthPcHr",
                table: "Operations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SecondFocHr",
                table: "Operations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SecondPcHr",
                table: "Operations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ThirdFocHr",
                table: "Operations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ThirdPcHr",
                table: "Operations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "MaterialCostVariable",
                table: "Jobs",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FirstFocHr",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "FirstPcHr",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "FourthFocHr",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "FourthPcHr",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "SecondFocHr",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "SecondPcHr",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "ThirdFocHr",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "ThirdPcHr",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "MaterialCostVariable",
                table: "Jobs");

            migrationBuilder.AddColumn<string>(
                name: "FirstFocName",
                table: "Operations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "FirstPcName",
                table: "Operations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "FourthFocName",
                table: "Operations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "FourthPcName",
                table: "Operations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "SecondFocName",
                table: "Operations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "SecondPcName",
                table: "Operations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ThirdFocName",
                table: "Operations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ThirdPcName",
                table: "Operations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
