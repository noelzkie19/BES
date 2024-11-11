using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BES.Infrastructure.Persistence.Migrations
{
    public partial class Operation_Resource_Remove : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OperationOperators_Operations_OperationId",
                table: "OperationOperators");

            migrationBuilder.DropForeignKey(
                name: "FK_OperationOperators_UserAccounts_UserId",
                table: "OperationOperators");

            migrationBuilder.DropForeignKey(
                name: "FK_OperationResources_Operations_OperationId",
                table: "OperationResources");

            migrationBuilder.DropForeignKey(
                name: "FK_OperationResources_Resources_ResourcesId",
                table: "OperationResources");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OperationResources",
                table: "OperationResources");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OperationOperators",
                table: "OperationOperators");

            migrationBuilder.DropColumn(
                name: "Operator",
                table: "Operations");

            migrationBuilder.RenameTable(
                name: "OperationResources",
                newName: "OperationResource");

            migrationBuilder.RenameTable(
                name: "OperationOperators",
                newName: "OperationOperator");

            migrationBuilder.RenameIndex(
                name: "IX_OperationResources_ResourcesId",
                table: "OperationResource",
                newName: "IX_OperationResource_ResourcesId");

            migrationBuilder.RenameIndex(
                name: "IX_OperationResources_OperationId",
                table: "OperationResource",
                newName: "IX_OperationResource_OperationId");

            migrationBuilder.RenameIndex(
                name: "IX_OperationOperators_UserId",
                table: "OperationOperator",
                newName: "IX_OperationOperator_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_OperationOperators_OperationId",
                table: "OperationOperator",
                newName: "IX_OperationOperator_OperationId");

            migrationBuilder.AddColumn<int>(
                name: "OperatorId",
                table: "Operations",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ResourcesId",
                table: "Operations",
                type: "int",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_OperationResource",
                table: "OperationResource",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OperationOperator",
                table: "OperationOperator",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Operations_OperatorId",
                table: "Operations",
                column: "OperatorId");

            migrationBuilder.CreateIndex(
                name: "IX_Operations_ResourcesId",
                table: "Operations",
                column: "ResourcesId");

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

            migrationBuilder.AddForeignKey(
                name: "FK_OperationResource_Operations_OperationId",
                table: "OperationResource",
                column: "OperationId",
                principalTable: "Operations",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OperationResource_Resources_ResourcesId",
                table: "OperationResource",
                column: "ResourcesId",
                principalTable: "Resources",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Operations_Resources_ResourcesId",
                table: "Operations",
                column: "ResourcesId",
                principalTable: "Resources",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Operations_UserAccounts_OperatorId",
                table: "Operations",
                column: "OperatorId",
                principalTable: "UserAccounts",
                principalColumn: "ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OperationOperator_Operations_OperationId",
                table: "OperationOperator");

            migrationBuilder.DropForeignKey(
                name: "FK_OperationOperator_UserAccounts_UserId",
                table: "OperationOperator");

            migrationBuilder.DropForeignKey(
                name: "FK_OperationResource_Operations_OperationId",
                table: "OperationResource");

            migrationBuilder.DropForeignKey(
                name: "FK_OperationResource_Resources_ResourcesId",
                table: "OperationResource");

            migrationBuilder.DropForeignKey(
                name: "FK_Operations_Resources_ResourcesId",
                table: "Operations");

            migrationBuilder.DropForeignKey(
                name: "FK_Operations_UserAccounts_OperatorId",
                table: "Operations");

            migrationBuilder.DropIndex(
                name: "IX_Operations_OperatorId",
                table: "Operations");

            migrationBuilder.DropIndex(
                name: "IX_Operations_ResourcesId",
                table: "Operations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OperationResource",
                table: "OperationResource");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OperationOperator",
                table: "OperationOperator");

            migrationBuilder.DropColumn(
                name: "OperatorId",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "ResourcesId",
                table: "Operations");

            migrationBuilder.RenameTable(
                name: "OperationResource",
                newName: "OperationResources");

            migrationBuilder.RenameTable(
                name: "OperationOperator",
                newName: "OperationOperators");

            migrationBuilder.RenameIndex(
                name: "IX_OperationResource_ResourcesId",
                table: "OperationResources",
                newName: "IX_OperationResources_ResourcesId");

            migrationBuilder.RenameIndex(
                name: "IX_OperationResource_OperationId",
                table: "OperationResources",
                newName: "IX_OperationResources_OperationId");

            migrationBuilder.RenameIndex(
                name: "IX_OperationOperator_UserId",
                table: "OperationOperators",
                newName: "IX_OperationOperators_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_OperationOperator_OperationId",
                table: "OperationOperators",
                newName: "IX_OperationOperators_OperationId");

            migrationBuilder.AddColumn<string>(
                name: "Operator",
                table: "Operations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OperationResources",
                table: "OperationResources",
                column: "Id");

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

            migrationBuilder.AddForeignKey(
                name: "FK_OperationResources_Operations_OperationId",
                table: "OperationResources",
                column: "OperationId",
                principalTable: "Operations",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OperationResources_Resources_ResourcesId",
                table: "OperationResources",
                column: "ResourcesId",
                principalTable: "Resources",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
