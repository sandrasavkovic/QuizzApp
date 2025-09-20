using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyProjectBackend.Migrations
{
    /// <inheritdoc />
    public partial class brisanjeKviza : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuestionQuizz_Questions_QuestionsId",
                table: "QuestionQuizz");

            migrationBuilder.DropForeignKey(
                name: "FK_QuestionQuizz_Quizzes_QuizzesId",
                table: "QuestionQuizz");

            migrationBuilder.RenameColumn(
                name: "QuizzesId",
                table: "QuestionQuizz",
                newName: "QuizzId");

            migrationBuilder.RenameColumn(
                name: "QuestionsId",
                table: "QuestionQuizz",
                newName: "QuestionId");

            migrationBuilder.RenameIndex(
                name: "IX_QuestionQuizz_QuizzesId",
                table: "QuestionQuizz",
                newName: "IX_QuestionQuizz_QuizzId");

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionQuizz_Questions_QuestionId",
                table: "QuestionQuizz",
                column: "QuestionId",
                principalTable: "Questions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionQuizz_Quizzes_QuizzId",
                table: "QuestionQuizz",
                column: "QuizzId",
                principalTable: "Quizzes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuestionQuizz_Questions_QuestionId",
                table: "QuestionQuizz");

            migrationBuilder.DropForeignKey(
                name: "FK_QuestionQuizz_Quizzes_QuizzId",
                table: "QuestionQuizz");

            migrationBuilder.RenameColumn(
                name: "QuizzId",
                table: "QuestionQuizz",
                newName: "QuizzesId");

            migrationBuilder.RenameColumn(
                name: "QuestionId",
                table: "QuestionQuizz",
                newName: "QuestionsId");

            migrationBuilder.RenameIndex(
                name: "IX_QuestionQuizz_QuizzId",
                table: "QuestionQuizz",
                newName: "IX_QuestionQuizz_QuizzesId");

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionQuizz_Questions_QuestionsId",
                table: "QuestionQuizz",
                column: "QuestionsId",
                principalTable: "Questions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionQuizz_Quizzes_QuizzesId",
                table: "QuestionQuizz",
                column: "QuizzesId",
                principalTable: "Quizzes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
