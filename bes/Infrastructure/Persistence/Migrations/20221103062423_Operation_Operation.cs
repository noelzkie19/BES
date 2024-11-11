using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BES.Infrastructure.Persistence.Migrations
{
    public partial class Operation_Operation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OperationOperator",
                columns: table => new
                {
                    OperationId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.ForeignKey(
                        name: "FK_OperationOperator_Operations_OperationId",
                        column: x => x.OperationId,
                        principalTable: "Operations",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OperationOperator_UserAccounts_UserId",
                        column: x => x.UserId,
                        principalTable: "UserAccounts",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OperationResources_ResourcesId",
                table: "OperationResources",
                column: "ResourcesId");

            migrationBuilder.CreateIndex(
                name: "IX_OperationOperator_OperationId",
                table: "OperationOperator",
                column: "OperationId");

            migrationBuilder.CreateIndex(
                name: "IX_OperationOperator_UserId",
                table: "OperationOperator",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_OperationResources_Resources_ResourcesId",
                table: "OperationResources",
                column: "ResourcesId",
                principalTable: "Resources",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OperationResources_Resources_ResourcesId",
                table: "OperationResources");

            migrationBuilder.DropTable(
                name: "OperationOperator");

            migrationBuilder.DropIndex(
                name: "IX_OperationResources_ResourcesId",
                table: "OperationResources");
        }
    }
}
