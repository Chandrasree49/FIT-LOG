import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Workout = {
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

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

async function getWorkout(id: string): Promise<Workout | null> {
  const response = await fetch(API_URL, {
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    return null;
  }

  const workouts: Workout[] = await response.json();

  return (
    workouts.find(
      (workout) => workout.id === Number(id)
    ) ?? null
  );
}

export default async function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const workout = await getWorkout(id);

  if (!workout) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0b0d10] px-3 py-5 sm:px-5">
      <div className="mx-auto max-w-[900px]">

        {/* Back button */}
        <Link
          href="/"
          className="mb-4 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-wide text-[#c8ff00] transition hover:text-white"
        >
          ← Back to Library
        </Link>

        {/* Detail card */}
        <article className="overflow-hidden rounded-xl border border-[#292d34] bg-[#15181e]">

          {/* Image */}
          <div className="relative h-[260px] w-full overflow-hidden bg-[#20242a] sm:h-[400px]">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              unoptimized
              sizes="100vw"
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-5 sm:p-8">

            {/* Tags */}
            <div className="mb-4 flex flex-wrap gap-1.5">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-[3px] bg-[#c8ff00] px-2 py-1 text-[8px] font-black uppercase text-black"
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* Name */}
            <h1 className="text-3xl font-black uppercase leading-[0.95] text-white sm:text-5xl">
              {workout.name}
            </h1>

            {/* Equipment */}
            <p className="mt-3 text-sm text-[#858990]">
              {workout.equipment}
            </p>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-3 gap-2">
              <DetailStat
                label="DURATION"
                value={`${workout.duration} min`}
              />

              <DetailStat
                label="CALORIES"
                value={`${workout.caloriesBurned} kcal`}
              />

              <DetailStat
                label="RATING"
                value={workout.rating.toFixed(1)}
              />
            </div>

            {/* Description */}
            <section className="mt-8">
              <h2 className="text-[10px] font-black uppercase tracking-wide text-[#c8ff00]">
                ABOUT
              </h2>

              <p className="mt-2 text-sm leading-7 text-[#a1a5ad]">
                {workout.description}
              </p>
            </section>

            {/* Workout information */}
            <section className="mt-8">
              <h2 className="text-[10px] font-black uppercase tracking-wide text-[#c8ff00]">
                WORKOUT
              </h2>

              <div className="mt-3 grid grid-cols-3 gap-2">
                <InfoBox
                  label="SETS"
                  value={String(workout.sets)}
                />

                <InfoBox
                  label="REPS"
                  value={workout.reps}
                />

                <InfoBox
                  label="LEVEL"
                  value={workout.difficulty}
                />
              </div>
            </section>

            {/* Instructions */}
            <section className="mt-8">
              <h2 className="text-[10px] font-black uppercase tracking-wide text-[#c8ff00]">
                INSTRUCTIONS
              </h2>

              <ol className="mt-4 space-y-3">
                {workout.instructions.map(
                  (instruction, index) => (
                    <li
                      key={`${index}-${instruction}`}
                      className="flex gap-3 text-sm leading-6 text-[#a1a5ad]"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#c8ff00] text-[9px] font-black text-black">
                        {index + 1}
                      </span>

                      <span>{instruction}</span>
                    </li>
                  )
                )}
              </ol>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}

/* =========================
   DETAIL STAT
========================= */

function DetailStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-[#292d34] bg-[#101216] p-3">
      <p className="text-[7px] font-bold uppercase text-[#777c85]">
        {label}
      </p>

      <p className="mt-1 text-sm font-black text-white">
        {value}
      </p>
    </div>
  );
}

/* =========================
   INFO BOX
========================= */

function InfoBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-[#292d34] bg-[#101216] p-3">
      <p className="text-[7px] font-bold uppercase text-[#777c85]">
        {label}
      </p>

      <p className="mt-1 truncate text-sm font-black uppercase text-white">
        {value}
      </p>
    </div>
  );
}
