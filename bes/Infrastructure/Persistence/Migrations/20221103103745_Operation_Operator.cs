using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BES.Infrastructure.Persistence.Migrations
{
    public partial class Operation_Operator : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OperationOperator_Operations_OperationId",
                table: "OperationOperator");

            migrationBuilder.DropForeignKey(
                name: "FK_OperationOperator_UserAccounts_UserId",
                table: "OperationOperator");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OperationOperator",
                table: "OperationOperator");

            migrationBuilder.RenameTable(
                name: "OperationOperator",
                newName: "OperationOperators");

            migrationBuilder.RenameIndex(
                name: "IX_OperationOperator_UserId",
                table: "OperationOperators",
                newName: "IX_OperationOperators_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_OperationOperator_OperationId",
                table: "OperationOperators",
                newName: "IX_OperationOperators_OperationId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OperationOperators",
                table: "OperationOperators",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OperationOperators_Operations_OperationId",
                table: "OperationOperators",
                column: "OperationId",
                principalTable: "Operations",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OperationOperators_UserAccounts_UserId",
                table: "OperationOperators",
                column: "UserId",
                principalTable: "UserAccounts",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OperationOperators_Operations_OperationId",
                table: "OperationOperators");

            migrationBuilder.DropForeignKey(
                name: "FK_OperationOperators_UserAccounts_UserId",
                table: "OperationOperators");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OperationOperators",
                table: "OperationOperators");

            migrationBuilder.RenameTable(
                name: "OperationOperators",
                newName: "OperationOperator");

            migrationBuilder.RenameIndex(
                name: "IX_OperationOperators_UserId",
                table: "OperationOperator",
                newName: "IX_OperationOperator_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_OperationOperators_OperationId",
                table: "OperationOperator",
                newName: "IX_OperationOperator_OperationId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OperationOperator",
                table: "OperationOperator",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OperationOperator_Operations_OperationId",
                table: "OperationOperator",
                column: "OperationId",
                principalTable: "Operations",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OperationOperator_UserAccounts_UserId",
                table: "OperationOperator",
                column: "UserId",
                principalTable: "UserAccounts",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
