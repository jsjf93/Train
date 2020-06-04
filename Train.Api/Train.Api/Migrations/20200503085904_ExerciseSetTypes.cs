using Microsoft.EntityFrameworkCore.Migrations;

namespace Train.Api.Migrations
{
    public partial class ExerciseSetTypes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ExerciseDurationId",
                table: "ExerciseSets",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RestDurationId",
                table: "ExerciseSets",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "StrengthSet_RestDurationId",
                table: "ExerciseSets",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "StrengthSet_Weight",
                table: "ExerciseSets",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ExerciseSets_ExerciseDurationId",
                table: "ExerciseSets",
                column: "ExerciseDurationId");

            migrationBuilder.CreateIndex(
                name: "IX_ExerciseSets_RestDurationId",
                table: "ExerciseSets",
                column: "RestDurationId");

            migrationBuilder.CreateIndex(
                name: "IX_ExerciseSets_StrengthSet_RestDurationId",
                table: "ExerciseSets",
                column: "StrengthSet_RestDurationId");

            migrationBuilder.AddForeignKey(
                name: "FK_ExerciseSets_Duration_ExerciseDurationId",
                table: "ExerciseSets",
                column: "ExerciseDurationId",
                principalTable: "Duration",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ExerciseSets_Duration_RestDurationId",
                table: "ExerciseSets",
                column: "RestDurationId",
                principalTable: "Duration",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ExerciseSets_Duration_StrengthSet_RestDurationId",
                table: "ExerciseSets",
                column: "StrengthSet_RestDurationId",
                principalTable: "Duration",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ExerciseSets_Duration_ExerciseDurationId",
                table: "ExerciseSets");

            migrationBuilder.DropForeignKey(
                name: "FK_ExerciseSets_Duration_RestDurationId",
                table: "ExerciseSets");

            migrationBuilder.DropForeignKey(
                name: "FK_ExerciseSets_Duration_StrengthSet_RestDurationId",
                table: "ExerciseSets");

            migrationBuilder.DropIndex(
                name: "IX_ExerciseSets_ExerciseDurationId",
                table: "ExerciseSets");

            migrationBuilder.DropIndex(
                name: "IX_ExerciseSets_RestDurationId",
                table: "ExerciseSets");

            migrationBuilder.DropIndex(
                name: "IX_ExerciseSets_StrengthSet_RestDurationId",
                table: "ExerciseSets");

            migrationBuilder.DropColumn(
                name: "ExerciseDurationId",
                table: "ExerciseSets");

            migrationBuilder.DropColumn(
                name: "RestDurationId",
                table: "ExerciseSets");

            migrationBuilder.DropColumn(
                name: "StrengthSet_RestDurationId",
                table: "ExerciseSets");

            migrationBuilder.DropColumn(
                name: "StrengthSet_Weight",
                table: "ExerciseSets");
        }
    }
}
