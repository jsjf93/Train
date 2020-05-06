using Microsoft.EntityFrameworkCore.Migrations;

namespace Train.Api.Migrations
{
    public partial class BodyPartsDbSet : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BodyPart_Exercises_ExerciseId",
                table: "BodyPart");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BodyPart",
                table: "BodyPart");

            migrationBuilder.RenameTable(
                name: "BodyPart",
                newName: "BodyParts");

            migrationBuilder.RenameIndex(
                name: "IX_BodyPart_ExerciseId",
                table: "BodyParts",
                newName: "IX_BodyParts_ExerciseId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BodyParts",
                table: "BodyParts",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_BodyParts_Exercises_ExerciseId",
                table: "BodyParts",
                column: "ExerciseId",
                principalTable: "Exercises",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BodyParts_Exercises_ExerciseId",
                table: "BodyParts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BodyParts",
                table: "BodyParts");

            migrationBuilder.RenameTable(
                name: "BodyParts",
                newName: "BodyPart");

            migrationBuilder.RenameIndex(
                name: "IX_BodyParts_ExerciseId",
                table: "BodyPart",
                newName: "IX_BodyPart_ExerciseId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BodyPart",
                table: "BodyPart",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_BodyPart_Exercises_ExerciseId",
                table: "BodyPart",
                column: "ExerciseId",
                principalTable: "Exercises",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
