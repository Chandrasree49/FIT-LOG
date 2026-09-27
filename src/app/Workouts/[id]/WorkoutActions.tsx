"use client";

import { usePlan } from "../../components/PlanContext";
import type { Workout } from "../../components/Library";
import { toast } from "react-toastify";

export default function WorkoutActions({
  workout,
}: {
  workout: Workout;
}) {
  const { plan, saved, addToPlan, saveForLater } = usePlan();

  function handleAddToPlan() {
    const alreadyInPlan = plan.some(
      (item) => item.id === workout.id
    );

    if (alreadyInPlan) {
      toast.info("Already in today's plan");
      return;
    }

    if (plan.length >= 5) {
      toast.warning("Today's plan is full");
      return;
    }

    addToPlan(workout);
    toast.success("Added to today's plan");
  }

  function handleSave() {
    const alreadySaved = saved.some(
      (item) => item.id === workout.id
    );

    if (alreadySaved) {
      toast.info("Already saved");
      return;
    }

    saveForLater(workout);
    toast.success("Saved for later");
  }

  return (
    <div className="mt-7 flex items-center gap-3">
      <button
        type="button"
        onClick={handleAddToPlan}
        className="inline-flex h-8 items-center justify-center gap-2 rounded-[8px] bg-[#c8ff00] px-4 text-[9px] font-bold text-black transition hover:bg-[#d5ff33] active:scale-[0.98]"
      >
        <CalendarIcon />
        <span>Add to today's plan</span>
      </button>
      <button
        type="button"
        onClick={handleSave}
        className="inline-flex h-8 items-center justify-center gap-2 rounded-[8px] border border-[#30343c] bg-[#101216] px-4 text-[9px] font-medium text-white transition hover:border-[#555b65] hover:bg-[#15181e] active:scale-[0.98]"
      >
        <BookmarkIcon />
        <span>Save for later</span>
      </button>
    </div>
  );
}
function CalendarIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="3.5"
        y="5.5"
        width="17"
        height="15"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <path
        d="M7.5 3.5V7.5M16.5 3.5V7.5M3.5 9.5H20.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M8 13H8.01M12 13H12.01M16 13H16.01M8 17H8.01M12 17H12.01"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function BookmarkIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6.5 4.5C6.5 3.95 6.95 3.5 7.5 3.5H16.5C17.05 3.5 17.5 3.95 17.5 4.5V20L12 16.5L6.5 20V4.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}