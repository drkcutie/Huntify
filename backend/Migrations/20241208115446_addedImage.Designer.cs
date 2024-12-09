﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using backend.Models.User;

#nullable disable

namespace backend.Migrations
{
    [DbContext(typeof(SeekrDbContext))]
    [Migration("20241208115446_addedImage")]
    partial class addedImage
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("backend.Models.Chat.Chat", b =>
                {
                    b.Property<int>("ChatId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ChatId"));

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime>("UpdatedOn")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("UserAId")
                        .HasColumnType("integer");

                    b.Property<int>("UserBId")
                        .HasColumnType("integer");

                    b.Property<int?>("UserModelId")
                        .HasColumnType("integer");

                    b.HasKey("ChatId");

                    b.HasIndex("UserAId");

                    b.HasIndex("UserBId");

                    b.HasIndex("UserModelId");

                    b.ToTable("Chats");
                });

            modelBuilder.Entity("backend.Models.Chat.ChatMessage", b =>
                {
                    b.Property<int>("ChatMessageId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ChatMessageId"));

                    b.Property<int>("ChatId")
                        .HasColumnType("integer");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("character varying(255)");

                    b.Property<DateTime>("DateCreated")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("DateRead")
                        .HasColumnType("timestamp with time zone");

                    b.Property<bool>("ReadStatus")
                        .HasColumnType("boolean");

                    b.Property<int>("SentBy")
                        .HasColumnType("integer");

                    b.HasKey("ChatMessageId");

                    b.HasIndex("ChatId");

                    b.ToTable("ChatMessages");
                });

            modelBuilder.Entity("backend.Models.Posts.Post", b =>
                {
                    b.Property<int>("PostId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("PostId"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("PostId");

                    b.HasIndex("UserId");

                    b.ToTable("Posts");
                });

            modelBuilder.Entity("backend.Models.Posts.PostImage", b =>
                {
                    b.Property<int>("PostImageId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("PostImageId"));

                    b.Property<string>("ImagePath")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("PostId")
                        .HasColumnType("integer");

                    b.Property<int>("PostImageOrder")
                        .HasColumnType("integer");

                    b.HasKey("PostImageId");

                    b.HasIndex("PostId");

                    b.ToTable("PostImages");
                });

            modelBuilder.Entity("backend.Models.Posts.PostLike", b =>
                {
                    b.Property<int>("PostLikeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("PostLikeId"));

                    b.Property<bool>("Like")
                        .HasColumnType("boolean");

                    b.Property<int>("PostId")
                        .HasColumnType("integer");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("PostLikeId");

                    b.HasIndex("PostId");

                    b.HasIndex("UserId");

                    b.ToTable("PostLikes");
                });

            modelBuilder.Entity("backend.Models.Service.Service", b =>
                {
                    b.Property<int>("ServiceId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ServiceId"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Image")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int?>("ServiceProviderModelServiceProviderId")
                        .HasColumnType("integer");

                    b.Property<string>("ServiceType")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("ServiceId");

                    b.HasIndex("ServiceProviderModelServiceProviderId");

                    b.ToTable("Services");
                });

            modelBuilder.Entity("backend.Models.Services.ProviderService", b =>
                {
                    b.Property<int>("ProviderServiceId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ProviderServiceId"));

                    b.Property<int>("ServiceId")
                        .HasColumnType("integer");

                    b.Property<int>("ServiceProviderId")
                        .HasColumnType("integer");

                    b.HasKey("ProviderServiceId");

                    b.HasIndex("ServiceId");

                    b.HasIndex("ServiceProviderId");

                    b.ToTable("ProviderServices");
                });

            modelBuilder.Entity("backend.Models.Skills_and_Reviews.Review", b =>
                {
                    b.Property<int>("ReviewId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ReviewId"));

                    b.Property<int>("ClientId")
                        .HasColumnType("integer");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("Rating")
                        .HasColumnType("integer");

                    b.Property<int>("ServiceProviderId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("UpdatedOn")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("ReviewId");

                    b.HasIndex("ClientId");

                    b.HasIndex("ServiceProviderId");

                    b.ToTable("Reviews");
                });

            modelBuilder.Entity("backend.Models.Skills_and_Reviews.ServiceOrder", b =>
                {
                    b.Property<int>("ServiceOrderId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ServiceOrderId"));

                    b.Property<int>("ClientId")
                        .HasColumnType("integer");

                    b.Property<float>("Price")
                        .HasColumnType("real");

                    b.Property<int>("Quantity")
                        .HasColumnType("integer");

                    b.Property<DateTime>("ServiceEndDateTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("ServiceId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("ServiceStartDateTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("ServiceType")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("ServiceOrderId");

                    b.HasIndex("ClientId");

                    b.HasIndex("ServiceId");

                    b.ToTable("ServiceOrder");
                });

            modelBuilder.Entity("backend.Models.Skills_and_Reviews.ServiceProviderSkill", b =>
                {
                    b.Property<int>("ServiceProviderSkillId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ServiceProviderSkillId"));

                    b.Property<int>("ServiceProviderId")
                        .HasColumnType("integer");

                    b.Property<int>("SkillId")
                        .HasColumnType("integer");

                    b.HasKey("ServiceProviderSkillId");

                    b.HasIndex("ServiceProviderId");

                    b.HasIndex("SkillId");

                    b.ToTable("ServiceProviderSkills");
                });

            modelBuilder.Entity("backend.Models.Skills_and_Reviews.Skill", b =>
                {
                    b.Property<int>("SkillId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("SkillId"));

                    b.Property<string>("SkillIcon")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("SkillName")
                        .HasColumnType("text");

                    b.HasKey("SkillId");

                    b.ToTable("Skills");
                });

            modelBuilder.Entity("backend.Models.User.Client", b =>
                {
                    b.Property<int>("ClientId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ClientId"));

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("ClientId");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("Clients");
                });

            modelBuilder.Entity("backend.Models.User.ServiceProviderModel", b =>
                {
                    b.Property<int>("ServiceProviderId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ServiceProviderId"));

                    b.Property<string>("ResumePath")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("character varying(255)");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("ServiceProviderId");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("ServiceProviders");
                });

            modelBuilder.Entity("backend.Models.User.UserModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Biography")
                        .HasMaxLength(255)
                        .HasColumnType("character varying(255)");

                    b.Property<DateOnly>("CreatedOn")
                        .HasColumnType("date");

                    b.Property<DateOnly>("DateOfBirth")
                        .HasColumnType("date");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("character varying(255)");

                    b.Property<string>("ProfilePicture")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateOnly>("UpdatedOn")
                        .HasColumnType("date");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("backend.Models.Chat.Chat", b =>
                {
                    b.HasOne("backend.Models.User.UserModel", "UserA")
                        .WithMany()
                        .HasForeignKey("UserAId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("backend.Models.User.UserModel", "UserB")
                        .WithMany()
                        .HasForeignKey("UserBId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("backend.Models.User.UserModel", null)
                        .WithMany("Chats")
                        .HasForeignKey("UserModelId");

                    b.Navigation("UserA");

                    b.Navigation("UserB");
                });

            modelBuilder.Entity("backend.Models.Chat.ChatMessage", b =>
                {
                    b.HasOne("backend.Models.Chat.Chat", "Chat")
                        .WithMany("ChatMessages")
                        .HasForeignKey("ChatId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Chat");
                });

            modelBuilder.Entity("backend.Models.Posts.Post", b =>
                {
                    b.HasOne("backend.Models.User.UserModel", "User")
                        .WithMany("Posts")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("backend.Models.Posts.PostImage", b =>
                {
                    b.HasOne("backend.Models.Posts.Post", "Post")
                        .WithMany("PostImages")
                        .HasForeignKey("PostId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Post");
                });

            modelBuilder.Entity("backend.Models.Posts.PostLike", b =>
                {
                    b.HasOne("backend.Models.Posts.Post", "Post")
                        .WithMany("PostLikes")
                        .HasForeignKey("PostId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("backend.Models.User.UserModel", "User")
                        .WithMany("PostLikes")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Post");

                    b.Navigation("User");
                });

            modelBuilder.Entity("backend.Models.Service.Service", b =>
                {
                    b.HasOne("backend.Models.User.ServiceProviderModel", null)
                        .WithMany("Services")
                        .HasForeignKey("ServiceProviderModelServiceProviderId");
                });

            modelBuilder.Entity("backend.Models.Services.ProviderService", b =>
                {
                    b.HasOne("backend.Models.Service.Service", "Service")
                        .WithMany("ProviderServices")
                        .HasForeignKey("ServiceId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("backend.Models.User.ServiceProviderModel", "ServiceProvider")
                        .WithMany("ProviderServices")
                        .HasForeignKey("ServiceProviderId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Service");

                    b.Navigation("ServiceProvider");
                });

            modelBuilder.Entity("backend.Models.Skills_and_Reviews.Review", b =>
                {
                    b.HasOne("backend.Models.User.Client", "Client")
                        .WithMany("Reviews")
                        .HasForeignKey("ClientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("backend.Models.User.ServiceProviderModel", "ServiceProviderModel")
                        .WithMany("Reviews")
                        .HasForeignKey("ServiceProviderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Client");

                    b.Navigation("ServiceProviderModel");
                });

            modelBuilder.Entity("backend.Models.Skills_and_Reviews.ServiceOrder", b =>
                {
                    b.HasOne("backend.Models.User.Client", "Client")
                        .WithMany("ServiceOrders")
                        .HasForeignKey("ClientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("backend.Models.Service.Service", "Service")
                        .WithMany("ServiceOrders")
                        .HasForeignKey("ServiceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Client");

                    b.Navigation("Service");
                });

            modelBuilder.Entity("backend.Models.Skills_and_Reviews.ServiceProviderSkill", b =>
                {
                    b.HasOne("backend.Models.User.ServiceProviderModel", "ServiceProvider")
                        .WithMany("ServiceProviderSkills")
                        .HasForeignKey("ServiceProviderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("backend.Models.Skills_and_Reviews.Skill", "Skill")
                        .WithMany("ServiceProviderSkills")
                        .HasForeignKey("SkillId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ServiceProvider");

                    b.Navigation("Skill");
                });

            modelBuilder.Entity("backend.Models.User.Client", b =>
                {
                    b.HasOne("backend.Models.User.UserModel", "User")
                        .WithOne("Client")
                        .HasForeignKey("backend.Models.User.Client", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("backend.Models.User.ServiceProviderModel", b =>
                {
                    b.HasOne("backend.Models.User.UserModel", "User")
                        .WithOne("ServiceProvider")
                        .HasForeignKey("backend.Models.User.ServiceProviderModel", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("backend.Models.Chat.Chat", b =>
                {
                    b.Navigation("ChatMessages");
                });

            modelBuilder.Entity("backend.Models.Posts.Post", b =>
                {
                    b.Navigation("PostImages");

                    b.Navigation("PostLikes");
                });

            modelBuilder.Entity("backend.Models.Service.Service", b =>
                {
                    b.Navigation("ProviderServices");

                    b.Navigation("ServiceOrders");
                });

            modelBuilder.Entity("backend.Models.Skills_and_Reviews.Skill", b =>
                {
                    b.Navigation("ServiceProviderSkills");
                });

            modelBuilder.Entity("backend.Models.User.Client", b =>
                {
                    b.Navigation("Reviews");

                    b.Navigation("ServiceOrders");
                });

            modelBuilder.Entity("backend.Models.User.ServiceProviderModel", b =>
                {
                    b.Navigation("ProviderServices");

                    b.Navigation("Reviews");

                    b.Navigation("ServiceProviderSkills");

                    b.Navigation("Services");
                });

            modelBuilder.Entity("backend.Models.User.UserModel", b =>
                {
                    b.Navigation("Chats");

                    b.Navigation("Client");

                    b.Navigation("PostLikes");

                    b.Navigation("Posts");

                    b.Navigation("ServiceProvider");
                });
#pragma warning restore 612, 618
        }
    }
}
