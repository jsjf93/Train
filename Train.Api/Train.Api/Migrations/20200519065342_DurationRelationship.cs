using Microsoft.EntityFrameworkCore.Migrations;

namespace Train.Api.Migrations
{
    public partial class DurationRelationship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ExerciseSets_Duration_DurationId",
                table: "ExerciseSets");

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

            migrationBuilder.DropPrimaryKey(
                name: "PK_Duration",
                table: "Duration");

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
                name: "Id",
                table: "Duration");

            migrationBuilder.RenameTable(
                name: "Duration",
                newName: "Durations");

            migrationBuilder.AddColumn<int>(
                name: "ExerciseDurationDurationId",
                table: "ExerciseSets",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RestDurationDurationId",
                table: "ExerciseSets",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "StrengthSet_RestDurationDurationId",
                table: "ExerciseSets",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DurationId",
                table: "Durations",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "ExerciseSetId",
                table: "Durations",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Durations",
                table: "Durations",
                column: "DurationId");

            migrationBuilder.CreateIndex(
                name: "IX_ExerciseSets_ExerciseDurationDurationId",
                table: "ExerciseSets",
                column: "ExerciseDurationDurationId");

            migrationBuilder.CreateIndex(
                name: "IX_ExerciseSets_RestDurationDurationId",
                table: "ExerciseSets",
                column: "RestDurationDurationId");

            migrationBuilder.CreateIndex(
                name: "IX_ExerciseSets_StrengthSet_RestDurationDurationId",
                table: "ExerciseSets",
                column: "StrengthSet_RestDurationDurationId");

            migrationBuilder.AddForeignKey(
                name: "FK_ExerciseSets_Durations_DurationId",
                table: "ExerciseSets",
                column: "DurationId",
                principalTable: "Durations",
                principalColumn: "DurationId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ExerciseSets_Durations_ExerciseDurationDurationId",
                table: "ExerciseSets",
                column: "ExerciseDurationDurationId",
                principalTable: "Durations",
                principalColumn: "DurationId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ExerciseSets_Durations_RestDurationDurationId",
                table: "ExerciseSets",
                column: "RestDurationDurationId",
                principalTable: "Durations",
                principalColumn: "DurationId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ExerciseSets_Durations_StrengthSet_RestDurationDurationId",
                table: "ExerciseSets",
                column: "StrengthSet_RestDurationDurationId",
                principalTable: "Durations",
                principalColumn: "DurationId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ExerciseSets_Durations_DurationId",
                table: "ExerciseSets");

            migrationBuilder.DropForeignKey(
                name: "FK_ExerciseSets_Durations_ExerciseDurationDurationId",
                table: "ExerciseSets");

            migrationBuilder.DropForeignKey(
                name: "FK_ExerciseSets_Durations_RestDurationDurationId",
                table: "ExerciseSets");

            migrationBuilder.DropForeignKey(
                name: "FK_ExerciseSets_Durations_StrengthSet_RestDurationDurationId",
                table: "ExerciseSets");

            migrationBuilder.DropIndex(
                name: "IX_ExerciseSets_ExerciseDurationDurationId",
                table: "ExerciseSets");

            migrationBuilder.DropIndex(
                name: "IX_ExerciseSets_RestDurationDurationId",
                table: "ExerciseSets");

            migrationBuilder.DropIndex(
                name: "IX_ExerciseSets_StrengthSet_RestDurationDurationId",
                table: "ExerciseSets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Durations",
                table: "Durations");

            migrationBuilder.DropColumn(
                name: "ExerciseDurationDurationId",
                table: "ExerciseSets");

            migrationBuilder.DropColumn(
                name: "RestDurationDurationId",
                table: "ExerciseSets");

            migrationBuilder.DropColumn(
                name: "StrengthSet_RestDurationDurationId",
                table: "ExerciseSets");

            migrationBuilder.DropColumn(
                name: "DurationId",
                table: "Durations");

            migrationBuilder.DropColumn(
                name: "ExerciseSetId",
                table: "Durations");

            migrationBuilder.RenameTable(
                name: "Durations",
                newName: "Duration");

            migrationBuilder.AddColumn<int>(
                name: "ExerciseDurationId",
                table: "ExerciseSets",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RestDurationId",
                table: "ExerciseSets",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "StrengthSet_RestDurationId",
                table: "ExerciseSets",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Duration",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Duration",
                table: "Duration",
                column: "Id");

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
                name: "FK_ExerciseSets_Duration_DurationId",
                table: "ExerciseSets",
                column: "DurationId",
                principalTable: "Duration",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

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
    }
}
