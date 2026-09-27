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
    loading,
    removeFromPlan,
    removeSaved,
  } = usePlan();

  const [activeTab, setActiveTab] = useState<Tab>("plan");
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  const [done, setDone] = useState<number[]>([]);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    const tab = query.get("tab");

    if (tab === "saved") {
      setActiveTab("saved");
    }
  }, []);

  const currentWorkouts = activeTab === "plan" ? plan : saved;

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
    (total, workout) => total + workout.caloriesBurned,
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
            <div className="mt-1 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <h1 className="text-3xl font-black uppercase leading-none tracking-[-0.03em] text-white sm:text-4xl">
                  MY PLAN
                </h1>

                <p className="mt-2 max-w-[500px] text-[10px] leading-[1.6] text-[#858990]">
                  Cap of five lifts for today. Finish them, then load more.
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

           
            {loading ? (
              <LoadingState />
            ) : sortedWorkouts.length === 0 ? (
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
                    onRemove={() => handleRemove(workout)}
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



function LoadingState() {
  return (
    <div className="mt-3 flex min-h-[120px] items-center justify-center rounded-xl border border-[#292d34] bg-[#15181e]">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 animate-pulse rounded-full bg-[#c8ff00]" />

        <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-[#777b83]">
          Loading workouts…
        </p>
      </div>
    </div>
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
        className="overflow-hidden rounded-xl border border-[#292d34] bg-[#15181e] transition"
      >
        <div className="flex min-h-[105px] items-stretch">
          {/* IMAGE */}
          <div className="relative w-[105px] shrink-0 bg-[#20242a] sm:w-[155px]">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              unoptimized
              sizes="155px"
              className="object-cover"
            />
          </div>
  
          {/* MIDDLE CONTENT */}
          <div className="min-w-0 flex-1 px-3 py-3 sm:px-4">
            <div className="min-w-0">
              <h2 className="truncate text-[11px] font-black uppercase text-white sm:text-[12px]">
                {workout.name}
              </h2>
  
              <p className="mt-1 truncate text-[8px] text-[#777b83]">
                {workout.equipment}
              </p>
            </div>
  
            {/* STATS */}
            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[7px] text-[#9da1a9]">
              <span className="flex items-center gap-1">
                <ClockIcon />
                {workout.duration} min
              </span>
  
              <span className="flex items-center gap-1">
                <FlameIcon />
                {workout.caloriesBurned} kcal
              </span>
  
              <span className="flex items-center gap-1">
                <StarIcon />
                {workout.rating.toFixed(1)}
              </span>
            </div>
          </div>
  
          {/* ACTIONS */}
          <div className="flex shrink-0 items-center gap-2 px-3 sm:px-4">
            <Link
              href={`/Workouts/${workout.id}`}
              className="flex h-[34px] items-center justify-center rounded-full border border-[#41464f] px-4 text-[8px] font-medium text-white transition hover:border-[#69707a] hover:bg-[#20242a]"
            >
              View Details
            </Link>
  
            {activeTab === "plan" && (
              <button
                type="button"
                onClick={onDone}
                disabled={isDone}
                className={[
                  "flex h-[34px] items-center justify-center gap-1.5 rounded-full px-4 text-[8px] font-black transition",
                  isDone
                    ? "cursor-default bg-[#536b16] text-[#c8ff00]"
                    : "bg-[#c8ff00] text-black hover:bg-[#d8ff45]",
                ].join(" ")}
              >
                <CheckIcon />
  
                {isDone ? "Done" : "Mark as Done"}
              </button>
            )}
  
            {/* REMOVE */}
            <button
              type="button"
              onClick={onRemove}
              aria-label={`Remove ${workout.name}`}
              className="ml-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#777b83] transition hover:bg-[#252930] hover:text-white"
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      </article>
    );
  }


function ClockIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="8.5"
        stroke="#c8ff00"
        strokeWidth="2"
      />

      <path
        d="M12 7.5V12L15 14"
        stroke="#c8ff00"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}



function FlameIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M13.5 2.5C14 6 11 7.5 11 10.5C11 12 12 13 13.5 13C15.5 13 16.5 11.5 16 9.5C19 12 20 14.5 20 17C20 20.3 16.9 22 12 22C7.1 22 4 19.2 4 15C4 11.8 5.8 8.9 9 6.5C8.8 9 10 10 11 10.5C10.5 6.5 12 4.2 13.5 2.5Z"
        fill="#c8ff00"
      />
    </svg>
  );
}



function StarIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 3.5L14.6 8.8L20.5 9.7L16.2 13.9L17.2 19.8L12 17L6.8 19.8L7.8 13.9L3.5 9.7L9.4 8.8L12 3.5Z"
        fill="#c8ff00"
      />
    </svg>
  );
}


function CheckIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12.5L10 17L19 7"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


function CloseIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EmptyState({ activeTab }: { activeTab: Tab }) {
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
          Browse the library and add a lift to get today moving.
        </p>

        <Link
          href="/"
          className="mt-4 inline-flex rounded-md bg-[#c8ff00] px-4 py-2.5 text-[8px] font-black uppercase text-black transition hover:bg-[#d8ff45]"
        >
          Go To Workouts
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
        Nothing Here Yet
      </h2>

      <p className="mx-auto mt-2 max-w-[300px] text-[8px] leading-[1.6] text-[#777b83]">
        Browse the library and add a lift to get today moving.
      </p>

      <Link
        href="/"
        className="mt-4 inline-flex rounded-md bg-[#c8ff00] px-4 py-2.5 text-[8px] font-black uppercase text-black transition hover:bg-[#d8ff45]"
      >
        Go To Workouts
      </Link>
    </div>
  );
}