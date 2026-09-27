"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
};

type LibraryProps = {
  workouts: Workout[];
};

export default function Library({ workouts }: LibraryProps) {
  return (
    <section id="library">
      <header className="mb-3">
        <h2 className="text-[20px] font-black uppercase tracking-tight text-white sm:text-sm">
          THE LIBRARY
        </h2>

        <p className="mt-0.5 text-[12px] leading-relaxed text-[#858990] sm:text-[9px]">
          Twelve lifts covering every major muscle group.
        </p>
      </header>

      {workouts.length === 0 ? (
        <div className="flex min-h-[180px] items-center justify-center rounded-lg border border-[#292d34] bg-[#15181e]">
          <p className="text-[10px] text-[#777b83]">
            No workouts available.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function WorkoutCard({
  workout,
}: {
  workout: Workout;
}) {
  function handleClick() {

    sessionStorage.setItem(
      `fitlog-workout-${workout.id}`,
      JSON.stringify(workout)
    );
  }

  return (
    <Link
      href={`/Workouts/${workout.id}`}
      onClick={handleClick}
      className="group block overflow-hidden rounded-[9px] border border-[#292d34] bg-[#15181e] outline-none transition-all duration-200 hover:border-[#555b65] hover:bg-[#181b21] focus-visible:ring-2 focus-visible:ring-[#c8ff00]"
    >
      <div className="relative h-[120px] w-full overflow-hidden bg-[#20242a] sm:h-[125px]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>

      <div className="px-2.5 pb-2.5 pt-2">
        <div className="mb-1.5 flex min-h-[13px] flex-wrap gap-1">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-[3px] bg-[#c8ff00] px-1.5 py-[2px] text-[6px] font-black uppercase leading-none text-black"
            >
              {muscle}
            </span>
          ))}
        </div>

        <h3 className="truncate text-[9px] font-black uppercase leading-tight text-white">
          {workout.name}
        </h3>

        <p className="mt-[3px] truncate text-[7px] text-[#7f838b]">
          {workout.equipment}
        </p>

        <div className="my-2 border-t border-[#292d34]" />

        <div className="flex items-center gap-2 text-[6px] text-[#92969f]">
          <Stat
            icon={<ClockIcon />}
            value={`${workout.duration} min`}
          />

          <Stat
            icon={<FlameIcon />}
            value={`${workout.caloriesBurned} kcal`}
          />

          <Stat
            icon={<StarIcon />}
            value={workout.rating.toFixed(1)}
          />
        </div>
      </div>
    </Link>
  );
}

function Stat({
  icon,
  value,
}: {
  icon: ReactNode;
  value: string;
}) {
  return (
    <span className="flex items-center gap-1 whitespace-nowrap">
      {icon}
      {value}
    </span>
  );
}

function ClockIcon() {
  return (
    <svg
      width="8"
      height="8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function FlameIcon() {
  return (
    <svg
      width="8"
      height="8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M12 22c4.4 0 8-3.2 8-7.5 0-3.3-1.9-5.7-4.7-8.2.1 2.1-.7 3.6-1.8 4.6-0.2-3.9-2.4-6.8-5.1-8.9.2 3.1-2.4 5.1-2.4 8.6C6 18.5 8.7 22 12 22Z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      width="8"
      height="8"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
    </svg>
  );
}