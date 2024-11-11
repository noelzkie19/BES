using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BES.Infrastructure.Persistence.Migrations
{
    public partial class EMAIL_AUTH_ENCRYPT : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PasswordSalt",
                table: "EmailAuths",
                newName: "Key");

            migrationBuilder.RenameColumn(
                name: "PasswordHash",
                table: "EmailAuths",
                newName: "InitVector");

            migrationBuilder.AddColumn<byte[]>(
                name: "EncryptPassword",
                table: "EmailAuths",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EncryptPassword",
                table: "EmailAuths");

            migrationBuilder.RenameColumn(
                name: "Key",
                table: "EmailAuths",
                newName: "PasswordSalt");

            migrationBuilder.RenameColumn(
                name: "InitVector",
                table: "EmailAuths",
                newName: "PasswordHash");
        }
    }
}
