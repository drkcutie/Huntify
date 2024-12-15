using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class LocationInPosts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // migrationBuilder.AddColumn<string>(
            //     name: "Description",
            //     table: "ProviderServices",
            //     type: "character varying(255)",
            //     maxLength: 255,
            //     nullable: false,
            //     defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // migrationBuilder.DropColumn(
            //     name: "Description",
            //     table: "ProviderServices");
        }
    }
}
