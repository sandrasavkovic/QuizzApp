using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyProjectBackend.Migrations
{
    /// <inheritdoc />
    public partial class addedColumnsForUserQuizz : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CorrectAnswersCount",
                table: "UserQuizzs",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TotalQuestionsCount",
                table: "UserQuizzs",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CorrectAnswersCount",
                table: "UserQuizzs");

            migrationBuilder.DropColumn(
                name: "TotalQuestionsCount",
                table: "UserQuizzs");
        }
    }
}
