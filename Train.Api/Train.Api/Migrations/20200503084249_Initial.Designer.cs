﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Train.Api.Data;

namespace Train.Api.Migrations
{
    [DbContext(typeof(TrainContext))]
    [Migration("20200503084249_Initial")]
    partial class Initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Train.Api.Models.BodyPart", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("ExerciseId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ExerciseId");

                    b.ToTable("BodyPart");
                });

            modelBuilder.Entity("Train.Api.Models.Exercise", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ExerciseName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Exercises");
                });

            modelBuilder.Entity("Train.Api.Models.ExerciseData<Train.Api.Models.Sets.ExerciseSet>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.HasKey("Id");

                    b.ToTable("ExercisesData");
                });

            modelBuilder.Entity("Train.Api.Models.Sets.Duration", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Minutes")
                        .HasColumnType("int");

                    b.Property<int>("Seconds")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Duration");
                });

            modelBuilder.Entity("Train.Api.Models.Sets.ExerciseSet", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ExerciseData<ExerciseSet>Id")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ExerciseData<ExerciseSet>Id");

                    b.ToTable("ExerciseSets");

                    b.HasDiscriminator<string>("Discriminator").HasValue("ExerciseSet");
                });

            modelBuilder.Entity("Train.Api.Models.Workout", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("WorkoutName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Workouts");
                });

            modelBuilder.Entity("Train.Api.Models.WorkoutExercise", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("ExerciseDataId")
                        .HasColumnType("int");

                    b.Property<string>("ExerciseName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ExerciseType")
                        .HasColumnType("int");

                    b.Property<int>("WorkoutId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ExerciseDataId");

                    b.HasIndex("WorkoutId");

                    b.ToTable("WorkoutExercises");
                });

            modelBuilder.Entity("Train.Api.Models.Sets.StrengthSet", b =>
                {
                    b.HasBaseType("Train.Api.Models.Sets.ExerciseSet");

                    b.Property<int?>("DurationId")
                        .HasColumnType("int");

                    b.Property<int>("Reps")
                        .HasColumnType("int");

                    b.Property<int>("Weight")
                        .HasColumnType("int");

                    b.HasIndex("DurationId");

                    b.HasDiscriminator().HasValue("StrengthSet");
                });

            modelBuilder.Entity("Train.Api.Models.BodyPart", b =>
                {
                    b.HasOne("Train.Api.Models.Exercise", null)
                        .WithMany("BodyPartsUsed")
                        .HasForeignKey("ExerciseId");
                });

            modelBuilder.Entity("Train.Api.Models.Sets.ExerciseSet", b =>
                {
                    b.HasOne("Train.Api.Models.ExerciseData<Train.Api.Models.Sets.ExerciseSet>", null)
                        .WithMany("Sets")
                        .HasForeignKey("ExerciseData<ExerciseSet>Id");
                });

            modelBuilder.Entity("Train.Api.Models.WorkoutExercise", b =>
                {
                    b.HasOne("Train.Api.Models.ExerciseData<Train.Api.Models.Sets.ExerciseSet>", "ExerciseData")
                        .WithMany()
                        .HasForeignKey("ExerciseDataId");

                    b.HasOne("Train.Api.Models.Workout", "Workout")
                        .WithMany("Exercises")
                        .HasForeignKey("WorkoutId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Train.Api.Models.Sets.StrengthSet", b =>
                {
                    b.HasOne("Train.Api.Models.Sets.Duration", "Duration")
                        .WithMany()
                        .HasForeignKey("DurationId");
                });
#pragma warning restore 612, 618
        }
    }
}
