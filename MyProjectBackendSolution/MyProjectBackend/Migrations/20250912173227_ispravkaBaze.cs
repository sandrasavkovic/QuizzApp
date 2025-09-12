using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyProjectBackend.Migrations
{
    /// <inheritdoc />
    public partial class ispravkaBaze : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "QuizzId",
                table: "Questions",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Questions_QuizzId",
                table: "Questions",
                column: "QuizzId");

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_Quizzes_QuizzId",
                table: "Questions",
                column: "QuizzId",
                principalTable: "Quizzes",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Questions_Quizzes_QuizzId",
                table: "Questions");

            migrationBuilder.DropIndex(
                name: "IX_Questions_QuizzId",
                table: "Questions");

            migrationBuilder.DropColumn(
                name: "QuizzId",
                table: "Questions");
        }
    }
}
