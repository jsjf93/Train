﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Train.Api.Data;
using Train.Api.Models.Enums;

namespace Train.Api.Migrations
{
    [DbContext(typeof(TrainContext))]
    [Migration("20200517134347_BodyPartsEdit")]
    partial class BodyPartsEdit
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
                    b.Property<int>("BodyPartId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("BodyPartName")
                        .IsRequired()
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<int>("ExerciseId")
                        .HasColumnType("int");

                    b.HasKey("BodyPartId");

                    b.HasIndex("ExerciseId");

                    b.ToTable("BodyParts");
                });

            modelBuilder.Entity("Train.Api.Models.Exercise", b =>
                {
                    b.Property<int>("ExerciseId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ExerciseName")
                        .IsRequired()
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.HasKey("ExerciseId");

                    b.ToTable("Exercises");
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
                    b.Property<int>("ExerciseSetId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("ExerciseType")
                        .HasColumnType("int");

                    b.Property<int>("WorkoutExerciseId")
                        .HasColumnType("int");

                    b.HasKey("ExerciseSetId");

                    b.HasIndex("WorkoutExerciseId");

                    b.ToTable("ExerciseSets");

                    b.HasDiscriminator<int>("ExerciseType");
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
                    b.Property<int>("WorkoutExerciseId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ExerciseName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ExerciseType")
                        .HasColumnType("int");

                    b.Property<int>("WorkoutId")
                        .HasColumnType("int");

                    b.HasKey("WorkoutExerciseId");

                    b.HasIndex("WorkoutId");

                    b.ToTable("WorkoutExercises");
                });

            modelBuilder.Entity("Train.Api.Models.Sets.DurationSet", b =>
                {
                    b.HasBaseType("Train.Api.Models.Sets.ExerciseSet");

                    b.Property<int?>("DurationId")
                        .HasColumnType("int");

                    b.HasIndex("DurationId");

                    b.HasDiscriminator().HasValue(0);
                });

            modelBuilder.Entity("Train.Api.Models.Sets.IntervalSet", b =>
                {
                    b.HasBaseType("Train.Api.Models.Sets.ExerciseSet");

                    b.Property<int?>("ExerciseDurationId")
                        .HasColumnType("int");

                    b.Property<int?>("RestDurationId")
                        .HasColumnType("int");

                    b.Property<int>("Weight")
                        .HasColumnType("int");

                    b.HasIndex("ExerciseDurationId");

                    b.HasIndex("RestDurationId");

                    b.HasDiscriminator().HasValue(1);
                });

            modelBuilder.Entity("Train.Api.Models.Sets.StrengthSet", b =>
                {
                    b.HasBaseType("Train.Api.Models.Sets.ExerciseSet");

                    b.Property<int>("Reps")
                        .HasColumnType("int");

                    b.Property<int?>("RestDurationId")
                        .HasColumnName("StrengthSet_RestDurationId")
                        .HasColumnType("int");

                    b.Property<int>("Weight")
                        .HasColumnName("StrengthSet_Weight")
                        .HasColumnType("int");

                    b.HasIndex("RestDurationId");

                    b.HasDiscriminator().HasValue(2);
                });

            modelBuilder.Entity("Train.Api.Models.BodyPart", b =>
                {
                    b.HasOne("Train.Api.Models.Exercise", null)
                        .WithMany("BodyPartsUsed")
                        .HasForeignKey("ExerciseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Train.Api.Models.Sets.ExerciseSet", b =>
                {
                    b.HasOne("Train.Api.Models.WorkoutExercise", null)
                        .WithMany("Sets")
                        .HasForeignKey("WorkoutExerciseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Train.Api.Models.WorkoutExercise", b =>
                {
                    b.HasOne("Train.Api.Models.Workout", null)
                        .WithMany("WorkoutExercises")
                        .HasForeignKey("WorkoutId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Train.Api.Models.Sets.DurationSet", b =>
                {
                    b.HasOne("Train.Api.Models.Sets.Duration", "Duration")
                        .WithMany()
                        .HasForeignKey("DurationId");
                });

            modelBuilder.Entity("Train.Api.Models.Sets.IntervalSet", b =>
                {
                    b.HasOne("Train.Api.Models.Sets.Duration", "ExerciseDuration")
                        .WithMany()
                        .HasForeignKey("ExerciseDurationId");

                    b.HasOne("Train.Api.Models.Sets.Duration", "RestDuration")
                        .WithMany()
                        .HasForeignKey("RestDurationId");
                });

            modelBuilder.Entity("Train.Api.Models.Sets.StrengthSet", b =>
                {
                    b.HasOne("Train.Api.Models.Sets.Duration", "RestDuration")
                        .WithMany()
                        .HasForeignKey("RestDurationId");
                });
#pragma warning restore 612, 618
        }
    }
}
