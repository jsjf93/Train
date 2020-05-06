using Microsoft.EntityFrameworkCore.Migrations;

namespace Train.Api.Migrations
{
    public partial class Testing : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BodyParts_Exercises_ExerciseId",
                table: "BodyParts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ExerciseSets",
                table: "ExerciseSets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Exercises",
                table: "Exercises");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BodyParts",
                table: "BodyParts");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "ExerciseSets");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "ExerciseSets");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Exercises");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "BodyParts");

            migrationBuilder.AddColumn<int>(
                name: "ExerciseSetId",
                table: "ExerciseSets",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "ExerciseType",
                table: "ExerciseSets",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "ExerciseName",
                table: "Exercises",
                maxLength: 256,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ExerciseId",
                table: "Exercises",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "BodyParts",
                maxLength: 256,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ExerciseId",
                table: "BodyParts",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "BodyPartId",
                table: "BodyParts",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ExerciseSets",
                table: "ExerciseSets",
                column: "ExerciseSetId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Exercises",
                table: "Exercises",
                column: "ExerciseId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BodyParts",
                table: "BodyParts",
                column: "BodyPartId");

            migrationBuilder.AddForeignKey(
                name: "FK_BodyParts_Exercises_ExerciseId",
                table: "BodyParts",
                column: "ExerciseId",
                principalTable: "Exercises",
                principalColumn: "ExerciseId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BodyParts_Exercises_ExerciseId",
                table: "BodyParts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ExerciseSets",
                table: "ExerciseSets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Exercises",
                table: "Exercises");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BodyParts",
                table: "BodyParts");

            migrationBuilder.DropColumn(
                name: "ExerciseSetId",
                table: "ExerciseSets");

            migrationBuilder.DropColumn(
                name: "ExerciseType",
                table: "ExerciseSets");

            migrationBuilder.DropColumn(
                name: "ExerciseId",
                table: "Exercises");

            migrationBuilder.DropColumn(
                name: "BodyPartId",
                table: "BodyParts");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "ExerciseSets",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "ExerciseSets",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "ExerciseName",
                table: "Exercises",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 256);

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Exercises",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "BodyParts",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 256);

            migrationBuilder.AlterColumn<int>(
                name: "ExerciseId",
                table: "BodyParts",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "BodyParts",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ExerciseSets",
                table: "ExerciseSets",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Exercises",
                table: "Exercises",
                column: "Id");

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
    }
}
