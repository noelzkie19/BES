using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BES.Infrastructure.Persistence.Migrations
{
    public partial class Operation_Resource_PK : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "OperationResources",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "OperationOperator",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OperationResources",
                table: "OperationResources",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OperationOperator",
                table: "OperationOperator",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_OperationResources",
                table: "OperationResources");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OperationOperator",
                table: "OperationOperator");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "OperationResources");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "OperationOperator");
        }
    }
}
