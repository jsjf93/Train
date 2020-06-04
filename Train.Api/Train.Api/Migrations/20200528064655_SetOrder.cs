using Microsoft.EntityFrameworkCore.Migrations;

namespace Train.Api.Migrations
{
    public partial class SetOrder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "OrderId",
                table: "ExerciseSets",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OrderId",
                table: "ExerciseSets");
        }
    }
}
