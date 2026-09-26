"use client";

import { useState } from "react";

import { usePlan } from "../../components/PlanContext";
import type { Workout } from "../../components/Library";

export default function WorkoutActions({ workout }: { workout: Workout }) {
  const { plan, saved, addToPlan, saveForLater, isInPlan, isSaved } = usePlan();

  const [toast, setToast] = useState("");

  function showToast(message: string) {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 2500);
  }

  function handleAddToPlan() {
    if (isInPlan(workout.id)) {
      showToast("Already in today's plan");
      return;
    }

    if (plan.length >= 5) {
      showToast("Today's plan is full");
      return;
    }

    addToPlan(workout);
    showToast("Added to today's plan");
  }

  function handleSave() {
    if (isSaved(workout.id)) {
      showToast("Already saved");
      return;
    }

    saveForLater(workout);
    showToast("Saved for later");
  }

  return (
    <>
      <div className="mt-6 flex gap-2">
        {/* ADD TO PLAN */}
        <button
          type="button"
          onClick={handleAddToPlan}
          className="flex h-[32px] flex-1 items-center justify-center gap-2 rounded-lg bg-[#c8ff00] px-3 text-[9px] font-black uppercase text-black transition hover:bg-[#d8ff45]"
        >
          <span className="text-[11px]">+</span>
          Add to today&apos;s plan
        </button>

        {/* SAVE */}
        <button
          type="button"
          onClick={handleSave}
          className="flex h-[32px] flex-1 items-center justify-center gap-2 rounded-lg border border-[#30343c] bg-[#101216] px-3 text-[9px] font-bold uppercase text-white transition hover:bg-[#191c21]"
        >
          <span className="text-[12px]">♡</span>
          Save for later
        </button>
      </div>

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-lg border border-[#30343c] bg-[#171a20] px-4 py-2.5 text-[9px] font-bold text-white shadow-xl">
          {toast}
        </div>
      )}
    </>
  );
}
