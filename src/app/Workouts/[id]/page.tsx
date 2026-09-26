"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import type { Workout } from "../../components/Library";
import WorkoutActions from "./WorkoutActions";

export default function WorkoutPage() {
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get workout ID from:
    // /Workouts/3
    const parts = window.location.pathname
      .split("/")
      .filter(Boolean);

    const id = parts[parts.length - 1];

    if (!id) {
      setLoading(false);
      return;
    }

    // The Library page stores the selected workout here
    // before navigating to the detail page.
    const savedWorkout = sessionStorage.getItem(
      `fitlog-workout-${id}`
    );

    if (!savedWorkout) {
      setLoading(false);
      return;
    }

    try {
      const workoutData: Workout = JSON.parse(savedWorkout);
      setWorkout(workoutData);
    } catch (error) {
      console.error("Could not read workout:", error);
    }

    setLoading(false);
  }, []);

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0b0d10] px-4 py-8 sm:px-6">
        <div className="mx-auto w-full max-w-[1100px]">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="h-[496px] animate-pulse rounded-[10px] bg-[#15181e]" />

            <div className="animate-pulse">
              <div className="h-8 w-3/4 rounded bg-[#15181e]" />
              <div className="mt-4 h-12 rounded bg-[#15181e]" />
              <div className="mt-5 h-[231px] rounded-[12px] bg-[#15181e]" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
     NOT FOUND
  ========================================================= */

  if (!workout) {
    return (
      <main className="min-h-screen bg-[#0b0d10] px-4 py-8 sm:px-6">
        <div className="mx-auto w-full max-w-[1100px]">
          <div className="rounded-[10px] border border-[#292d34] bg-[#15181e] p-6">
            <h1 className="text-lg font-black uppercase text-white">
              Workout not found
            </h1>

            <p className="mt-2 text-[10px] leading-5 text-[#777b83]">
              Please go back to the library and select a workout.
            </p>
          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
     DETAIL PAGE
  ========================================================= */

  return (
    <main className="min-h-screen bg-[#0b0d10] px-4 py-8 sm:px-6">
      <div className="mx-auto w-full max-w-[1100px]">

        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-[38px]">

          {/* =================================================
              LEFT SIDE — IMAGE
          ================================================= */}

          <div className="relative h-[496px] overflow-hidden rounded-[10px] bg-[#15181e]">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              unoptimized
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <div className="min-w-0">

            {/* TITLE */}

            <h1 className="text-[27px] font-black uppercase leading-none tracking-[-0.04em] text-white">
              {workout.name}
            </h1>

            {/* DESCRIPTION */}

            <p className="mt-[9px] max-w-[500px] text-[10px] leading-[1.55] text-[#858990]">
              {workout.description}
            </p>

            {/* CATEGORY TAGS */}

            <div className="mt-[11px] flex flex-wrap gap-[7px]">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full bg-[#c8ff00] px-[10px] py-[4px] text-[7px] font-black uppercase leading-none text-black"
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* =================================================
                KEY SPECS
            ================================================= */}

            <section className="mt-[18px]">
              <div className="overflow-hidden rounded-[12px] border border-[#292d34] bg-[#15181e]">

                <SpecRow
                  label="EQUIPMENT"
                  value={workout.equipment}
                />

                <SpecRow
                  label="DIFFICULTY"
                  value={workout.difficulty}
                />

                <SpecRow
                  label="SETS"
                  value={String(workout.sets)}
                />

                <SpecRow
                  label="REPS"
                  value={workout.reps}
                />

                <SpecRow
                  label="DURATION"
                  value={`${workout.duration} min`}
                />

                <SpecRow
                  label="CALORIES"
                  value={`${workout.caloriesBurned} kcal`}
                />

                <SpecRow
                  label="RATING"
                  value={workout.rating.toFixed(1)}
                  last
                />

              </div>
            </section>

            {/* =================================================
                INSTRUCTIONS
            ================================================= */}

            <section className="mt-[22px]">
              <h2 className="text-[10px] font-black uppercase tracking-[0.03em] text-white">
                INSTRUCTIONS
              </h2>

              <ol className="mt-[10px] space-y-[7px]">
                {workout.instructions.map(
                  (instruction, index) => (
                    <li
                      key={index}
                      className="flex gap-[9px] text-[9px] leading-[1.45] text-[#a0a4ab]"
                    >
                      <span className="shrink-0 text-[8px] text-[#a0a4ab]">
                        {index + 1}.
                      </span>

                      <span>{instruction}</span>
                    </li>
                  )
                )}
              </ol>
            </section>

            {/* =================================================
                BUTTONS
                DO NOT REBUILD THEM HERE.
                WorkoutActions handles:
                - Add to plan
                - Save for later
                - duplicate checking
                - 5 item limit
                - toast messages
            ================================================= */}

            <WorkoutActions workout={workout} />

          </div>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   KEY SPECS ROW
========================================================= */

function SpecRow({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex h-[33px] items-center justify-between px-[15px] ${
        !last ? "border-b border-[#292d34]" : ""
      }`}
    >
      <span className="text-[7px] font-medium uppercase tracking-[0.04em] text-[#a0a4ab]">
        {label}
      </span>

      <span className="text-[8px] font-normal text-[#f1f2f3]">
        {value}
      </span>
    </div>
  );
}