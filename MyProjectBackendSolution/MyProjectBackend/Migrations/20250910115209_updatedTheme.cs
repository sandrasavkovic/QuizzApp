using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyProjectBackend.Migrations
{
    /// <inheritdoc />
    public partial class updatedTheme : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Themes_Quizzes_QuizzId",
                table: "Themes");

            migrationBuilder.AlterColumn<int>(
                name: "QuizzId",
                table: "Themes",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Themes_Quizzes_QuizzId",
                table: "Themes",
                column: "QuizzId",
                principalTable: "Quizzes",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Themes_Quizzes_QuizzId",
                table: "Themes");

            migrationBuilder.AlterColumn<int>(
                name: "QuizzId",
                table: "Themes",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Themes_Quizzes_QuizzId",
                table: "Themes",
                column: "QuizzId",
                principalTable: "Quizzes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
