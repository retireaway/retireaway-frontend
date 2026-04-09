import React, { createContext, useContext, useState, useCallback } from "react";
import type { Destination } from "@/types/destination";

interface ComparisonContextType {
  hidden: boolean;
  toggleHidden: () => void;
  selectedDestinations: Destination[];
  toggleDestination: (destination: Destination) => void;
  clearDestinations: () => void;
  isDestinationSelected: (id: string) => boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(
  undefined,
);

export function ComparisonProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hidden, setHidden] = React.useState(false);
  const [selectedDestinations, setSelectedDestinations] = useState<
    Destination[]
  >([]);

  const toggleDestination = useCallback((destination: Destination) => {
    setSelectedDestinations((prev) => {
      const isSelected = prev.some((d) => d.id === destination.id);

      if (isSelected) {
        return prev.filter((d) => d.id !== destination.id);
      }

      if (prev.length === 2) {
        const [_, ...rest] = prev;
        return [...rest, destination];
      }

      return [...prev, destination];
    });
  }, []);

  const clearDestinations = useCallback(() => {
    setSelectedDestinations([]);
  }, []);

  const isDestinationSelected = useCallback(
    (id: string) => {
      return selectedDestinations.some((d) => d.id === id);
    },
    [selectedDestinations],
  );

  const toggleHidden = useCallback(() => {
    setHidden((hidden) => !hidden);
  }, []);

  return (
    <ComparisonContext.Provider
      value={{
        hidden,
        toggleHidden,
        selectedDestinations,
        toggleDestination,
        clearDestinations,
        isDestinationSelected,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error("useComparison must be used within a ComparisonProvider");
  }
  return context;
}
