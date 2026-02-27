using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GameStore.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddedDeleteCascadeOnImageWhenGameDelete : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Games_Images_ImageId",
                table: "Games");

            migrationBuilder.DropIndex(
                name: "IX_Games_ImageId",
                table: "Games");

            migrationBuilder.CreateIndex(
                name: "IX_Games_ImageId",
                table: "Games",
                column: "ImageId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Games_Images_ImageId",
                table: "Games",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Games_Images_ImageId",
                table: "Games");

            migrationBuilder.DropIndex(
                name: "IX_Games_ImageId",
                table: "Games");

            migrationBuilder.CreateIndex(
                name: "IX_Games_ImageId",
                table: "Games",
                column: "ImageId");

            migrationBuilder.AddForeignKey(
                name: "FK_Games_Images_ImageId",
                table: "Games",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "Id");
        }
    }
}
