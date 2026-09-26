"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { usePlan } from "../components/PlanContext";
import type { Workout } from "../components/Library";

type Tab = "plan" | "saved";
type SortOption = "duration" | "calories" | "rating";

export default function MyPlanPage() {
  const {
    plan,
    saved,
    removeFromPlan,
    removeSaved,
  } = usePlan();

  const [activeTab, setActiveTab] = useState<Tab>("plan");
  const [sortBy, setSortBy] =
    useState<SortOption>("duration");

  const [done, setDone] = useState<number[]>([]);

  useEffect(() => {
    const query = new URLSearchParams(
      window.location.search
    );

    const tab = query.get("tab");

    if (tab === "saved") {
      setActiveTab("saved");
    }
  }, []);

  const currentWorkouts =
    activeTab === "plan" ? plan : saved;

  const sortedWorkouts = useMemo(() => {
    const copy = [...currentWorkouts];

    copy.sort((a, b) => {
      if (sortBy === "duration") {
        return a.duration - b.duration;
      }

      if (sortBy === "calories") {
        return b.caloriesBurned - a.caloriesBurned;
      }

      return b.rating - a.rating;
    });

    return copy;
  }, [currentWorkouts, sortBy]);

  const totalMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) =>
      total + workout.caloriesBurned,
    0
  );

  function handleDone(workout: Workout) {
    setDone((current) => {
      if (current.includes(workout.id)) {
        return current;
      }

      return [...current, workout.id];
    });

    toast.success(`${workout.name} marked as done.`);
  }

  function handleRemove(workout: Workout) {
    if (activeTab === "plan") {
      removeFromPlan(workout.id);
    } else {
      removeSaved(workout.id);
    }

    setDone((current) =>
      current.filter((id) => id !== workout.id)
    );

    toast.info(
      activeTab === "plan"
        ? `${workout.name} removed from your plan.`
        : `${workout.name} removed from saved workouts.`
    );
  }

  return (
    <>
      <main className="min-h-screen bg-[#0b0d10] px-3 py-8 sm:px-5">
        <div className="mx-auto max-w-[900px]">
          <header className="mb-6">
            <p className="text-[9px] font-black uppercase tracking-[0.12em] text-[#c8ff00]">
              YOUR WORKOUTS
            </p>

            <div className="mt-1 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <h1 className="text-3xl font-black uppercase leading-none tracking-[-0.03em] text-white sm:text-4xl">
                  MY PLAN
                </h1>

                <p className="mt-2 max-w-[500px] text-[10px] leading-[1.6] text-[#858990]">
                  Build today&apos;s workout plan, keep
                  useful lifts saved, and track what you&apos;ve
                  completed.
                </p>
              </div>
            </div>
          </header>

          <section className="grid grid-cols-3 gap-2">
            <Metric
              label="EXERCISES"
              value={String(plan.length)}
            />

            <Metric
              label="MINUTES"
              value={String(totalMinutes)}
            />

            <Metric
              label="CALORIES"
              value={String(totalCalories)}
            />
          </section>

          <section className="mt-5">
            <div className="flex flex-col gap-3 border-b border-[#272b31] pb-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("plan")}
                  className={[
                    "rounded-md px-4 py-2 text-[9px] font-black uppercase transition",
                    activeTab === "plan"
                      ? "bg-[#c8ff00] text-black"
                      : "bg-[#15181e] text-[#777b83] hover:text-white",
                  ].join(" ")}
                >
                  Today&apos;s Plan
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("saved")}
                  className={[
                    "rounded-md px-4 py-2 text-[9px] font-black uppercase transition",
                    activeTab === "saved"
                      ? "bg-[#c8ff00] text-black"
                      : "bg-[#15181e] text-[#777b83] hover:text-white",
                  ].join(" ")}
                >
                  Saved
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[8px] font-bold uppercase text-[#777b83]">
                  Sort By
                </span>

                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(event) =>
                      setSortBy(
                        event.target.value as SortOption
                      )
                    }
                    className="appearance-none rounded-md border border-[#30343c] bg-[#15181e] py-2 pl-3 pr-7 text-[9px] font-bold text-white outline-none transition focus:border-[#c8ff00]"
                  >
                    <option value="duration">
                      Duration
                    </option>

                    <option value="calories">
                      Calories
                    </option>

                    <option value="rating">
                      Rating
                    </option>
                  </select>

                  <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-[#8b9099]">
                    ↓
                  </span>
                </div>
              </div>
            </div>

            {sortedWorkouts.length === 0 ? (
              <EmptyState activeTab={activeTab} />
            ) : (
              <div className="mt-3 space-y-2">
                {sortedWorkouts.map((workout) => (
                  <PlanWorkoutCard
                    key={workout.id}
                    workout={workout}
                    activeTab={activeTab}
                    isDone={done.includes(workout.id)}
                    onDone={() => handleDone(workout)}
                    onRemove={() =>
                      handleRemove(workout)
                    }
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <ToastContainer
        position="top-left"
        autoClose={2200}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-[#292d34] bg-[#15181e] px-3 py-4">
      <p className="text-[7px] font-bold uppercase tracking-[0.08em] text-[#777b83]">
        {label}
      </p>

      <p className="mt-1 text-xl font-black leading-none text-white">
        {value}
      </p>
    </div>
  );
}

function PlanWorkoutCard({
  workout,
  activeTab,
  isDone,
  onDone,
  onRemove,
}: {
  workout: Workout;
  activeTab: Tab;
  isDone: boolean;
  onDone: () => void;
  onRemove: () => void;
}) {
  return (
    <article
      className={[
        "overflow-hidden rounded-xl border bg-[#15181e] transition",
        isDone
          ? "border-[#536b16]"
          : "border-[#292d34]",
      ].join(" ")}
    >
      <div className="flex min-h-[105px]">
        <div className="relative w-[105px] shrink-0 bg-[#20242a] sm:w-[125px]">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            unoptimized
            sizes="125px"
            className={[
              "object-cover",
              isDone ? "opacity-50" : "",
            ].join(" ")}
          />
        </div>

        <div className="min-w-0 flex-1 p-3">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex flex-wrap gap-1">
                {workout.muscleGroups
                  .slice(0, 3)
                  .map((muscle) => (
                    <span
                      key={muscle}
                      className="rounded-[3px] bg-[#c8ff00] px-1.5 py-[2px] text-[6px] font-black uppercase leading-none text-black"
                    >
                      {muscle}
                    </span>
                  ))}
              </div>

              <h2
                className={[
                  "mt-1.5 truncate text-[10px] font-black uppercase text-white",
                  isDone
                    ? "line-through opacity-60"
                    : "",
                ].join(" ")}
              >
                {workout.name}
              </h2>

              <p className="mt-1 truncate text-[7px] text-[#777b83]">
                {workout.equipment}
              </p>
            </div>

            <button
              type="button"
              onClick={onRemove}
              aria-label={`Remove ${workout.name}`}
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[#777b83] transition hover:bg-[#252930] hover:text-white"
            >
              ×
            </button>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[7px] text-[#8b9099]">
            <span>
              {workout.duration} min
            </span>

            <span>
              {workout.caloriesBurned} kcal
            </span>

            <span>
              {workout.sets} sets
            </span>

            <span>
              {workout.reps} reps
            </span>

            <span>
              ★ {workout.rating.toFixed(1)}
            </span>
          </div>

          <div className="mt-3 flex gap-2">
            <Link
              href={`/Workouts/${workout.id}`}
              className="flex h-[27px] items-center justify-center rounded-md border border-[#30343c] px-3 text-[7px] font-black uppercase text-white transition hover:bg-[#20242a]"
            >
              View Details
            </Link>

            {activeTab === "plan" && (
              <button
                type="button"
                onClick={onDone}
                disabled={isDone}
                className={[
                  "flex h-[27px] items-center justify-center gap-1 rounded-md px-3 text-[7px] font-black uppercase transition",
                  isDone
                    ? "cursor-default bg-[#283414] text-[#c8ff00]"
                    : "bg-[#c8ff00] text-black hover:bg-[#d8ff45]",
                ].join(" ")}
              >
                <span className="text-[10px]">
                  {isDone ? "✓" : "✓"}
                </span>

                {isDone
                  ? "Done"
                  : "Mark as Done"}
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function EmptyState({
  activeTab,
}: {
  activeTab: Tab;
}) {
  if (activeTab === "saved") {
    return (
      <div className="mt-3 rounded-xl border border-dashed border-[#30343c] bg-[#111419] px-6 py-12 text-center">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-[#30343c] text-lg text-[#777b83]">
          ♡
        </div>

        <h2 className="mt-4 text-[11px] font-black uppercase text-white">
          No saved workouts
        </h2>

        <p className="mx-auto mt-2 max-w-[300px] text-[8px] leading-[1.6] text-[#777b83]">
          Save exercises from the workout library and
          they&apos;ll appear here.
        </p>

        <Link
          href="/"
          className="mt-4 inline-flex rounded-md bg-[#c8ff00] px-4 py-2.5 text-[8px] font-black uppercase text-black transition hover:bg-[#d8ff45]"
        >
          Browse Workouts
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-3 rounded-xl border border-dashed border-[#30343c] bg-[#111419] px-6 py-12 text-center">
      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-[#30343c] text-lg text-[#777b83]">
        +
      </div>

      <h2 className="mt-4 text-[11px] font-black uppercase text-white">
        Your plan is empty
      </h2>

      <p className="mx-auto mt-2 max-w-[300px] text-[8px] leading-[1.6] text-[#777b83]">
        Pick workouts from the library and add them to
        today&apos;s plan.
      </p>

      <Link
        href="/"
        className="mt-4 inline-flex rounded-md bg-[#c8ff00] px-4 py-2.5 text-[8px] font-black uppercase text-black transition hover:bg-[#d8ff45]"
      >
        Browse Workouts
      </Link>
    </div>
  );
}