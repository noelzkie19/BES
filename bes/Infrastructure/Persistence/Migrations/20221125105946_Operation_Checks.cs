using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BES.Infrastructure.Persistence.Migrations
{
    public partial class Operation_Checks : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FirstFocName",
                table: "Operations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "FirstFocOperatorId",
                table: "Operations",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FirstPcName",
                table: "Operations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "FirstPcOperatorId",
                table: "Operations",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FourthFocName",
                table: "Operations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "FourthFocOperatorId",
                table: "Operations",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FourthPcName",
                table: "Operations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "FourthPcOperatorId",
                table: "Operations",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SecondFocName",
                table: "Operations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "SecondFocOperatorId",
                table: "Operations",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SecondPcName",
                table: "Operations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "SecondPcOperatorId",
                table: "Operations",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ThirdFocName",
                table: "Operations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "ThirdFocOperatorId",
                table: "Operations",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ThirdPcName",
                table: "Operations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "ThirdPcOperatorId",
                table: "Operations",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Note",
                table: "JobNotes",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(200)",
                oldMaxLength: 200);

            migrationBuilder.CreateIndex(
                name: "IX_Operations_FirstFocOperatorId",
                table: "Operations",
                column: "FirstFocOperatorId");

            migrationBuilder.CreateIndex(
                name: "IX_Operations_FirstPcOperatorId",
                table: "Operations",
                column: "FirstPcOperatorId");

            migrationBuilder.CreateIndex(
                name: "IX_Operations_FourthFocOperatorId",
                table: "Operations",
                column: "FourthFocOperatorId");

            migrationBuilder.CreateIndex(
                name: "IX_Operations_FourthPcOperatorId",
                table: "Operations",
                column: "FourthPcOperatorId");

            migrationBuilder.CreateIndex(
                name: "IX_Operations_SecondFocOperatorId",
                table: "Operations",
                column: "SecondFocOperatorId");

            migrationBuilder.CreateIndex(
                name: "IX_Operations_SecondPcOperatorId",
                table: "Operations",
                column: "SecondPcOperatorId");

            migrationBuilder.CreateIndex(
                name: "IX_Operations_ThirdFocOperatorId",
                table: "Operations",
                column: "ThirdFocOperatorId");

            migrationBuilder.CreateIndex(
                name: "IX_Operations_ThirdPcOperatorId",
                table: "Operations",
                column: "ThirdPcOperatorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Operations_UserAccounts_FirstFocOperatorId",
                table: "Operations",
                column: "FirstFocOperatorId",
                principalTable: "UserAccounts",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Operations_UserAccounts_FirstPcOperatorId",
                table: "Operations",
                column: "FirstPcOperatorId",
                principalTable: "UserAccounts",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Operations_UserAccounts_FourthFocOperatorId",
                table: "Operations",
                column: "FourthFocOperatorId",
                principalTable: "UserAccounts",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Operations_UserAccounts_FourthPcOperatorId",
                table: "Operations",
                column: "FourthPcOperatorId",
                principalTable: "UserAccounts",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Operations_UserAccounts_SecondFocOperatorId",
                table: "Operations",
                column: "SecondFocOperatorId",
                principalTable: "UserAccounts",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Operations_UserAccounts_SecondPcOperatorId",
                table: "Operations",
                column: "SecondPcOperatorId",
                principalTable: "UserAccounts",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Operations_UserAccounts_ThirdFocOperatorId",
                table: "Operations",
                column: "ThirdFocOperatorId",
                principalTable: "UserAccounts",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Operations_UserAccounts_ThirdPcOperatorId",
                table: "Operations",
                column: "ThirdPcOperatorId",
                principalTable: "UserAccounts",
                principalColumn: "ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Operations_UserAccounts_FirstFocOperatorId",
                table: "Operations");

            migrationBuilder.DropForeignKey(
                name: "FK_Operations_UserAccounts_FirstPcOperatorId",
                table: "Operations");

            migrationBuilder.DropForeignKey(
                name: "FK_Operations_UserAccounts_FourthFocOperatorId",
                table: "Operations");

            migrationBuilder.DropForeignKey(
                name: "FK_Operations_UserAccounts_FourthPcOperatorId",
                table: "Operations");

            migrationBuilder.DropForeignKey(
                name: "FK_Operations_UserAccounts_SecondFocOperatorId",
                table: "Operations");

            migrationBuilder.DropForeignKey(
                name: "FK_Operations_UserAccounts_SecondPcOperatorId",
                table: "Operations");

            migrationBuilder.DropForeignKey(
                name: "FK_Operations_UserAccounts_ThirdFocOperatorId",
                table: "Operations");

            migrationBuilder.DropForeignKey(
                name: "FK_Operations_UserAccounts_ThirdPcOperatorId",
                table: "Operations");

            migrationBuilder.DropIndex(
                name: "IX_Operations_FirstFocOperatorId",
                table: "Operations");

            migrationBuilder.DropIndex(
                name: "IX_Operations_FirstPcOperatorId",
                table: "Operations");

            migrationBuilder.DropIndex(
                name: "IX_Operations_FourthFocOperatorId",
                table: "Operations");

            migrationBuilder.DropIndex(
                name: "IX_Operations_FourthPcOperatorId",
                table: "Operations");

            migrationBuilder.DropIndex(
                name: "IX_Operations_SecondFocOperatorId",
                table: "Operations");

            migrationBuilder.DropIndex(
                name: "IX_Operations_SecondPcOperatorId",
                table: "Operations");

            migrationBuilder.DropIndex(
                name: "IX_Operations_ThirdFocOperatorId",
                table: "Operations");

            migrationBuilder.DropIndex(
                name: "IX_Operations_ThirdPcOperatorId",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "FirstFocName",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "FirstFocOperatorId",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "FirstPcName",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "FirstPcOperatorId",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "FourthFocName",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "FourthFocOperatorId",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "FourthPcName",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "FourthPcOperatorId",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "SecondFocName",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "SecondFocOperatorId",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "SecondPcName",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "SecondPcOperatorId",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "ThirdFocName",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "ThirdFocOperatorId",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "ThirdPcName",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "ThirdPcOperatorId",
                table: "Operations");

            migrationBuilder.AlterColumn<string>(
                name: "Note",
                table: "JobNotes",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");
        }
    }
}
