"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { usePlan } from "../../components/PlanContext";
import type { Workout } from "../../components/Library";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

export default function WorkoutDetailPage() {
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  const {
    plan,
    saved,
    addToPlan,
    saveForLater,
  } = usePlan();

  useEffect(() => {
    async function getWorkout() {
      try {
        const parts = window.location.pathname.split("/");
        const id = parts[parts.length - 1];

        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) {
          throw new Error("Workout not found");
        }

        const data: Workout = await response.json();

        setWorkout(data);
      } catch (error) {
        console.error("Error loading workout:", error);
      } finally {
        setLoading(false);
      }
    }

    getWorkout();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0d0f12] p-10 text-center text-white">
        Loading workout...
      </main>
    );
  }

  if (!workout) {
    return (
      <main className="min-h-screen bg-[#0d0f12] p-10 text-center text-white">
        <h1 className="text-xl font-bold">
          Workout not found
        </h1>

        <Link
          href="/"
          className="mt-4 inline-block rounded bg-[#c8ff00] px-4 py-2 text-black"
        >
          Back to workouts
        </Link>
      </main>
    );
  }

  // From this point, workout is definitely available
  const currentWorkout: Workout = workout;

  const alreadyInPlan = plan.some(
    (item) => item.id === currentWorkout.id
  );

  const alreadySaved = saved.some(
    (item) => item.id === currentWorkout.id
  );

  function handleAddToPlan() {
    if (alreadyInPlan) {
      toast.info("Workout is already in your plan.");
      return;
    }

    if (plan.length >= 5) {
      toast.error(
        "You can only have 5 workouts in your plan."
      );
      return;
    }

    addToPlan(currentWorkout);

    toast.success(
      "Workout added to your plan!"
    );
  }

  function handleSave() {
    if (alreadySaved) {
      toast.info("Workout is already saved.");
      return;
    }

    saveForLater(currentWorkout);

    toast.success(
      "Workout saved!"
    );
  }

  return (
    <main className="min-h-screen bg-[#0d0f12] px-4 py-10">
      <div className="mx-auto max-w-[840px]">

        <div className="grid grid-cols-1 overflow-hidden rounded-xl lg:grid-cols-2">

          {/* IMAGE */}

          <div className="relative h-[400px]">
            <Image
              src={currentWorkout.image}
              alt={currentWorkout.name}
              fill
              unoptimized
              className="object-cover"
            />
          </div>

          {/* CONTENT */}

          <div className="bg-[#111419] p-6">

            {/* TITLE */}

            <h1 className="text-3xl font-black uppercase text-white">
              {currentWorkout.name}
            </h1>

            {/* DESCRIPTION */}

            <p className="mt-3 text-sm leading-6 text-gray-400">
              {currentWorkout.description}
            </p>

            {/* MUSCLE GROUPS */}

            <div className="mt-4 flex flex-wrap gap-2">
              {currentWorkout.muscleGroups.map(
                (muscle) => (
                  <span
                    key={muscle}
                    className="rounded bg-[#c8ff00] px-3 py-1 text-xs font-bold uppercase text-black"
                  >
                    {muscle}
                  </span>
                )
              )}
            </div>

            {/* WORKOUT INFORMATION */}

            <div className="mt-5 rounded-xl border border-[#292d34] bg-[#0d0f12]">

              <Info
                name="Equipment"
                value={currentWorkout.equipment}
              />

              <Info
                name="Difficulty"
                value={currentWorkout.difficulty}
              />

              <Info
                name="Sets"
                value={String(currentWorkout.sets)}
              />

              <Info
                name="Reps"
                value={currentWorkout.reps}
              />

              <Info
                name="Duration"
                value={`${currentWorkout.duration} min`}
              />

              <Info
                name="Calories"
                value={`${currentWorkout.caloriesBurned} kcal`}
              />

              <Info
                name="Rating"
                value={currentWorkout.rating.toFixed(1)}
              />

            </div>

            {/* INSTRUCTIONS */}

            <h2 className="mt-6 text-sm font-bold uppercase text-white">
              Instructions
            </h2>

            <ol className="mt-3 space-y-2">
              {currentWorkout.instructions.map(
                (instruction, index) => (
                  <li
                    key={index}
                    className="text-sm leading-6 text-gray-400"
                  >
                    <span className="mr-2 text-[#c8ff00]">
                      {index + 1}.
                    </span>

                    {instruction}
                  </li>
                )
              )}
            </ol>

            {/* BUTTONS */}

            <div className="mt-6 flex gap-2">

              <button
                type="button"
                onClick={handleAddToPlan}
                className="flex-1 rounded-lg bg-[#c8ff00] px-3 py-3 text-xs font-bold uppercase text-black transition hover:bg-[#d7ff45]"
              >
                {alreadyInPlan
                  ? "Already in plan"
                  : "Add to today's plan"}
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="flex-1 rounded-lg border border-gray-700 px-3 py-3 text-xs font-bold uppercase text-white transition hover:border-gray-400"
              >
                {alreadySaved
                  ? "Saved"
                  : "Save for later"}
              </button>

            </div>

            {/* BACK BUTTON */}

            <Link
              href="/"
              className="mt-4 block text-center text-xs text-gray-500 hover:text-white"
            >
              ← Back to workouts
            </Link>

          </div>
        </div>
      </div>
    </main>
  );
}

function Info({
  name,
  value,
}: {
  name: string;
  value: string;
}) {
  return (
    <div className="flex justify-between border-b border-[#292d34] px-4 py-3 last:border-b-0">

      <span className="text-xs uppercase text-gray-500">
        {name}
      </span>

      <span className="text-right text-xs text-white">
        {value}
      </span>

    </div>
  );
}