using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyProjectBackend.Migrations
{
    /// <inheritdoc />
    public partial class fixingAttemptDate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Questions_Themes_ThemeId",
                table: "Questions");

            migrationBuilder.DropTable(
                name: "QuizzTheme");

            migrationBuilder.RenameColumn(
                name: "AttempDate",
                table: "UserQuizzs",
                newName: "AttemptDate");

            migrationBuilder.AddColumn<int>(
                name: "QuizzId",
                table: "Themes",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Themes_QuizzId",
                table: "Themes",
                column: "QuizzId");

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_Themes_ThemeId",
                table: "Questions",
                column: "ThemeId",
                principalTable: "Themes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

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
                name: "FK_Questions_Themes_ThemeId",
                table: "Questions");

            migrationBuilder.DropForeignKey(
                name: "FK_Themes_Quizzes_QuizzId",
                table: "Themes");

            migrationBuilder.DropIndex(
                name: "IX_Themes_QuizzId",
                table: "Themes");

            migrationBuilder.DropColumn(
                name: "QuizzId",
                table: "Themes");

            migrationBuilder.RenameColumn(
                name: "AttemptDate",
                table: "UserQuizzs",
                newName: "AttempDate");

            migrationBuilder.CreateTable(
                name: "QuizzTheme",
                columns: table => new
                {
                    QuizzesId = table.Column<int>(type: "int", nullable: false),
                    ThemesId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuizzTheme", x => new { x.QuizzesId, x.ThemesId });
                    table.ForeignKey(
                        name: "FK_QuizzTheme_Quizzes_QuizzesId",
                        column: x => x.QuizzesId,
                        principalTable: "Quizzes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_QuizzTheme_Themes_ThemesId",
                        column: x => x.ThemesId,
                        principalTable: "Themes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_QuizzTheme_ThemesId",
                table: "QuizzTheme",
                column: "ThemesId");

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_Themes_ThemeId",
                table: "Questions",
                column: "ThemeId",
                principalTable: "Themes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
