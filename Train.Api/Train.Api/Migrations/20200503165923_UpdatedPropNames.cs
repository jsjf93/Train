using Microsoft.EntityFrameworkCore.Migrations;

namespace Train.Api.Migrations
{
    public partial class UpdatedPropNames : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ExerciseSets_ExercisesData_ExerciseDataId",
                table: "ExerciseSets");

            migrationBuilder.DropTable(
                name: "ExercisesData");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WorkoutExercises",
                table: "WorkoutExercises");

            migrationBuilder.DropIndex(
                name: "IX_ExerciseSets_ExerciseDataId",
                table: "ExerciseSets");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "WorkoutExercises");

            migrationBuilder.DropColumn(
                name: "ExerciseDataId",
                table: "ExerciseSets");

            migrationBuilder.AddColumn<int>(
                name: "WorkoutExerciseId",
                table: "WorkoutExercises",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "WorkoutExerciseId",
                table: "ExerciseSets",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_WorkoutExercises",
                table: "WorkoutExercises",
                column: "WorkoutExerciseId");

            migrationBuilder.CreateIndex(
                name: "IX_ExerciseSets_WorkoutExerciseId",
                table: "ExerciseSets",
                column: "WorkoutExerciseId");

            migrationBuilder.AddForeignKey(
                name: "FK_ExerciseSets_WorkoutExercises_WorkoutExerciseId",
                table: "ExerciseSets",
                column: "WorkoutExerciseId",
                principalTable: "WorkoutExercises",
                principalColumn: "WorkoutExerciseId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ExerciseSets_WorkoutExercises_WorkoutExerciseId",
                table: "ExerciseSets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WorkoutExercises",
                table: "WorkoutExercises");

            migrationBuilder.DropIndex(
                name: "IX_ExerciseSets_WorkoutExerciseId",
                table: "ExerciseSets");

            migrationBuilder.DropColumn(
                name: "WorkoutExerciseId",
                table: "WorkoutExercises");

            migrationBuilder.DropColumn(
                name: "WorkoutExerciseId",
                table: "ExerciseSets");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "WorkoutExercises",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "ExerciseDataId",
                table: "ExerciseSets",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_WorkoutExercises",
                table: "WorkoutExercises",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "ExercisesData",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WorkoutExerciseId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExercisesData", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ExercisesData_WorkoutExercises_WorkoutExerciseId",
                        column: x => x.WorkoutExerciseId,
                        principalTable: "WorkoutExercises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

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
                name: "FK_ExerciseSets_ExercisesData_ExerciseDataId",
                table: "ExerciseSets",
                column: "ExerciseDataId",
                principalTable: "ExercisesData",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
