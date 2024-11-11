using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BES.Infrastructure.Persistence.Migrations
{
    public partial class Operation_Rename_Resource : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Operations_Resources_ResourcesId",
                table: "Operations");

            migrationBuilder.DropTable(
                name: "OperationOperator");

            migrationBuilder.DropTable(
                name: "OperationResource");

            migrationBuilder.RenameColumn(
                name: "ResourcesId",
                table: "Operations",
                newName: "ResourceId");

            migrationBuilder.RenameIndex(
                name: "IX_Operations_ResourcesId",
                table: "Operations",
                newName: "IX_Operations_ResourceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Operations_Resources_ResourceId",
                table: "Operations",
                column: "ResourceId",
                principalTable: "Resources",
                principalColumn: "ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Operations_Resources_ResourceId",
                table: "Operations");

            migrationBuilder.RenameColumn(
                name: "ResourceId",
                table: "Operations",
                newName: "ResourcesId");

            migrationBuilder.RenameIndex(
                name: "IX_Operations_ResourceId",
                table: "Operations",
                newName: "IX_Operations_ResourcesId");

            migrationBuilder.CreateTable(
                name: "OperationOperator",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OperationId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OperationOperator", x => x.Id);
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

            migrationBuilder.CreateTable(
                name: "OperationResource",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OperationId = table.Column<int>(type: "int", nullable: false),
                    ResourcesId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OperationResource", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OperationResource_Operations_OperationId",
                        column: x => x.OperationId,
                        principalTable: "Operations",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OperationResource_Resources_ResourcesId",
                        column: x => x.ResourcesId,
                        principalTable: "Resources",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OperationOperator_OperationId",
                table: "OperationOperator",
                column: "OperationId");

            migrationBuilder.CreateIndex(
                name: "IX_OperationOperator_UserId",
                table: "OperationOperator",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_OperationResource_OperationId",
                table: "OperationResource",
                column: "OperationId");

            migrationBuilder.CreateIndex(
                name: "IX_OperationResource_ResourcesId",
                table: "OperationResource",
                column: "ResourcesId");

            migrationBuilder.AddForeignKey(
                name: "FK_Operations_Resources_ResourcesId",
                table: "Operations",
                column: "ResourcesId",
                principalTable: "Resources",
                principalColumn: "ID");
        }
    }
}
