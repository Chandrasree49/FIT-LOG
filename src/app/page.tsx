import Banner from "./components/Banner";
import Library, { Workout } from "./components/Library";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

async function getWorkouts(): Promise<Workout[]> {
  const response = await fetch(API_URL, {
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }

  return response.json();
}

export default async function HomePage() {
  const workouts = await getWorkouts();

  return (
    <main className="min-h-screen bg-[#0b0d10] px-2 py-4 sm:px-4">
      <div className="mx-auto w-full max-w-[900px]">
        <Banner />

        <div className="mt-4">
          <Library workouts={workouts} />
        </div>
      </div>
    </main>
  );
}