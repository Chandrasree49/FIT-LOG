"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Workout } from "./Library";

type PlanContextType = {
  plan: Workout[];
  saved: Workout[];
  loading: boolean;
  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  saveForLater: (workout: Workout) => void;
  removeSaved: (id: number) => void;
};

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  // Load saved plan data from localStorage
  useEffect(() => {
    try {
      const savedPlan = localStorage.getItem("fitlog-plan");
      const savedWorkouts = localStorage.getItem("fitlog-saved");

      if (savedPlan) {
        setPlan(JSON.parse(savedPlan));
      }

      if (savedWorkouts) {
        setSaved(JSON.parse(savedWorkouts));
      }
    } catch (error) {
      console.error("Could not load FitLog data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save plan to localStorage
  useEffect(() => {
    if (loading) return;

    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan, loading]);

  // Save saved workouts to localStorage
  useEffect(() => {
    if (loading) return;

    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved, loading]);

  function addToPlan(workout: Workout) {
    if (plan.length >= 5) return;

    const alreadyExists = plan.some(
      (item) => item.id === workout.id
    );

    if (alreadyExists) return;

    setPlan((currentPlan) => [...currentPlan, workout]);
  }

  function removeFromPlan(id: number) {
    setPlan((currentPlan) =>
      currentPlan.filter((workout) => workout.id !== id)
    );
  }

  function saveForLater(workout: Workout) {
    const alreadyExists = saved.some(
      (item) => item.id === workout.id
    );

    if (alreadyExists) return;

    setSaved((currentSaved) => [...currentSaved, workout]);
  }

  function removeSaved(id: number) {
    setSaved((currentSaved) =>
      currentSaved.filter((workout) => workout.id !== id)
    );
  }

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        loading,
        addToPlan,
        removeFromPlan,
        saveForLater,
        removeSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error(
      "usePlan must be used inside PlanProvider"
    );
  }

  return context;
}