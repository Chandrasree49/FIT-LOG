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

  addToPlan: (workout: Workout) => boolean;
  removeFromPlan: (id: number) => void;

  saveForLater: (workout: Workout) => boolean;
  removeSaved: (id: number) => void;

  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
};

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog-plan");
      const storedSaved = localStorage.getItem("fitlog-saved");

      if (storedPlan) {
        setPlan(JSON.parse(storedPlan));
      }

      if (storedSaved) {
        setSaved(JSON.parse(storedSaved));
      }
    } catch {
      localStorage.removeItem("fitlog-plan");
      localStorage.removeItem("fitlog-saved");
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan, hydrated]);

  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved, hydrated]);

  function addToPlan(workout: Workout) {
    let added = false;

    setPlan((current) => {
      if (current.some((item) => item.id === workout.id)) {
        return current;
      }

      if (current.length >= 5) {
        return current;
      }

      added = true;

      return [...current, workout];
    });

    return added;
  }

  function removeFromPlan(id: number) {
    setPlan((current) =>
      current.filter((workout) => workout.id !== id)
    );
  }

  function saveForLater(workout: Workout) {
    let savedSuccessfully = false;

    setSaved((current) => {
      if (current.some((item) => item.id === workout.id)) {
        return current;
      }

      savedSuccessfully = true;

      return [...current, workout];
    });

    return savedSuccessfully;
  }

  function removeSaved(id: number) {
    setSaved((current) =>
      current.filter((workout) => workout.id !== id)
    );
  }

  function isInPlan(id: number) {
    return plan.some((workout) => workout.id === id);
  }

  function isSaved(id: number) {
    return saved.some((workout) => workout.id === id);
  }

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        removeFromPlan,
        saveForLater,
        removeSaved,
        isInPlan,
        isSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error("usePlan must be used inside PlanProvider");
  }

  return context;
}