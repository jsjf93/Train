using Microsoft.EntityFrameworkCore.Migrations;

namespace Train.Api.Migrations
{
    public partial class UpdatedProperties : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ExerciseSets_ExercisesData_ExerciseData<ExerciseSet>Id",
                table: "ExerciseSets");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkoutExercises_ExercisesData_ExerciseDataId",
                table: "WorkoutExercises");

            migrationBuilder.DropIndex(
                name: "IX_WorkoutExercises_ExerciseDataId",
                table: "WorkoutExercises");

            migrationBuilder.DropIndex(
                name: "IX_ExerciseSets_ExerciseData<ExerciseSet>Id",
                table: "ExerciseSets");

            migrationBuilder.DropColumn(
                name: "ExerciseDataId",
                table: "WorkoutExercises");

            migrationBuilder.DropColumn(
                name: "ExerciseData<ExerciseSet>Id",
                table: "ExerciseSets");

            migrationBuilder.AddColumn<int>(
                name: "ExerciseDataId",
                table: "ExerciseSets",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "WorkoutExerciseId",
                table: "ExercisesData",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ExerciseSets_ExerciseDataId",
                table: "ExerciseSets",
                column: "ExerciseDataId");

            migrationBuilder.CreateIndex(
                name: "IX_ExercisesData_WorkoutExerciseId",
                table: "ExercisesData",
                column: "WorkoutExerciseId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ExercisesData_WorkoutExercises_WorkoutExerciseId",
                table: "ExercisesData",
                column: "WorkoutExerciseId",
                principalTable: "WorkoutExercises",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ExerciseSets_ExercisesData_ExerciseDataId",
                table: "ExerciseSets",
                column: "ExerciseDataId",
                principalTable: "ExercisesData",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ExercisesData_WorkoutExercises_WorkoutExerciseId",
                table: "ExercisesData");

            migrationBuilder.DropForeignKey(
                name: "FK_ExerciseSets_ExercisesData_ExerciseDataId",
                table: "ExerciseSets");

            migrationBuilder.DropIndex(
                name: "IX_ExerciseSets_ExerciseDataId",
                table: "ExerciseSets");

            migrationBuilder.DropIndex(
                name: "IX_ExercisesData_WorkoutExerciseId",
                table: "ExercisesData");

            migrationBuilder.DropColumn(
                name: "ExerciseDataId",
                table: "ExerciseSets");

            migrationBuilder.DropColumn(
                name: "WorkoutExerciseId",
                table: "ExercisesData");

            migrationBuilder.AddColumn<int>(
                name: "ExerciseDataId",
                table: "WorkoutExercises",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ExerciseData<ExerciseSet>Id",
                table: "ExerciseSets",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_WorkoutExercises_ExerciseDataId",
                table: "WorkoutExercises",
                column: "ExerciseDataId");

            migrationBuilder.CreateIndex(
                name: "IX_ExerciseSets_ExerciseData<ExerciseSet>Id",
                table: "ExerciseSets",
                column: "ExerciseData<ExerciseSet>Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ExerciseSets_ExercisesData_ExerciseData<ExerciseSet>Id",
                table: "ExerciseSets",
                column: "ExerciseData<ExerciseSet>Id",
                principalTable: "ExercisesData",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkoutExercises_ExercisesData_ExerciseDataId",
                table: "WorkoutExercises",
                column: "ExerciseDataId",
                principalTable: "ExercisesData",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
