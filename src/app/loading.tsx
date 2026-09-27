export default function Loading() {
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