using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class updatedrelatioships : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProviderServices_Posts_ProviderServiceId",
                table: "ProviderServices");

            migrationBuilder.AlterColumn<int>(
                name: "ProviderServiceId",
                table: "ProviderServices",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.CreateIndex(
                name: "IX_Posts_ProviderServiceId",
                table: "Posts",
                column: "ProviderServiceId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_ProviderServices_ProviderServiceId",
                table: "Posts",
                column: "ProviderServiceId",
                principalTable: "ProviderServices",
                principalColumn: "ProviderServiceId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_ProviderServices_ProviderServiceId",
                table: "Posts");

            migrationBuilder.DropIndex(
                name: "IX_Posts_ProviderServiceId",
                table: "Posts");

            migrationBuilder.AlterColumn<int>(
                name: "ProviderServiceId",
                table: "ProviderServices",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddForeignKey(
                name: "FK_ProviderServices_Posts_ProviderServiceId",
                table: "ProviderServices",
                column: "ProviderServiceId",
                principalTable: "Posts",
                principalColumn: "PostId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
