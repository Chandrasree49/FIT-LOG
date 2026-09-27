"use client";

import { useEffect, useState } from "react";
import Banner from "./Banner";
import Library, { Workout } from "./Library";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

export default function HomeContent() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadWorkouts() {
      try {
        setLoading(true);

        const startTime = Date.now();

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data: Workout[] = await response.json();

        const elapsed = Date.now() - startTime;
        const remaining = Math.max(700 - elapsed, 0);

        await new Promise((resolve) =>
          setTimeout(resolve, remaining)
        );

        setWorkouts(data);
      } catch (error) {
        console.error("Failed to load workouts:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0b0d10] px-2 py-4 sm:px-3">
        <div className="mx-auto flex min-h-[70vh] w-full max-w-[1200px] items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#292d34] border-t-[#c8ff00]" />

            <p className="mt-4 text-[9px] font-black uppercase tracking-[0.14em] text-[#777b83]">
              Loading workouts…
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#0b0d10] px-2 py-4 sm:px-3">
        <div className="mx-auto flex min-h-[70vh] w-full max-w-[1200px] items-center justify-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#777b83]">
            Failed to load workouts
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0d10] px-2 py-4 sm:px-3">
      <div className="mx-auto w-full max-w-[1200px]">
        <Banner />

        <div className="mt-4">
          <Library workouts={workouts} />
        </div>
      </div>
    </main>
  );
}