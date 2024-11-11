using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BES.Infrastructure.Persistence.Migrations
{
    public partial class Job_Operation_Revise : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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
                name: "FirstFocHr",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "FirstFocOperatorId",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "FirstPcHr",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "FirstPcOperatorId",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "FourthFocHr",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "FourthFocOperatorId",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "FourthPcHr",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "FourthPcOperatorId",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "SecondFocHr",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "SecondFocOperatorId",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "SecondPcHr",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "SecondPcOperatorId",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "ThirdFocHr",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "ThirdFocOperatorId",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "ThirdPcHr",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "ThirdPcOperatorId",
                table: "Operations");

            migrationBuilder.AddColumn<bool>(
                name: "ProInsFirst1",
                table: "Operations",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "ProInsFirst2",
                table: "Operations",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "ProInsFirst3",
                table: "Operations",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "ProInsINS",
                table: "Operations",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProInsFirst1",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "ProInsFirst2",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "ProInsFirst3",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "ProInsINS",
                table: "Operations");

            migrationBuilder.AddColumn<int>(
                name: "FirstFocHr",
                table: "Operations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "FirstFocOperatorId",
                table: "Operations",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "FirstPcHr",
                table: "Operations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "FirstPcOperatorId",
                table: "Operations",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "FourthFocHr",
                table: "Operations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "FourthFocOperatorId",
                table: "Operations",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "FourthPcHr",
                table: "Operations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "FourthPcOperatorId",
                table: "Operations",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SecondFocHr",
                table: "Operations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SecondFocOperatorId",
                table: "Operations",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SecondPcHr",
                table: "Operations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SecondPcOperatorId",
                table: "Operations",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ThirdFocHr",
                table: "Operations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ThirdFocOperatorId",
                table: "Operations",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ThirdPcHr",
                table: "Operations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ThirdPcOperatorId",
                table: "Operations",
                type: "int",
                nullable: true);

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
    }
}
