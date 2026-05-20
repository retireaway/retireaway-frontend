import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import type { UserProfile, SaveData } from "@/types/user";
import type { Destination } from "@/types/destination";

import { Temporal } from "temporal-polyfill";

interface UserContextType {
  profile: UserProfile;
  saveDestination: (destination: Destination) => void;
  removeSavedItem: (id: string) => void;
  isDestinationSaved: (id: string) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "retireaway_user_profile";

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse user profile", e);
      }
    }

    return { saved: [] };
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  const saveDestination = useCallback((destination: Destination) => {
    setProfile((prev) => {
      // Check if already saved
      if (
        prev.saved.some(
          (s) => s.type === "Destination" && s.data.id === destination.id,
        )
      ) {
        return prev;
      }

      const newSave: SaveData = {
        id: crypto.randomUUID(),
        type: "Destination",
        timestamp: Temporal.Now.instant().toString(),
        data: destination,
      };

      return {
        ...prev,
        saved: [newSave, ...prev.saved],
      };
    });
  }, []);

  const removeSavedItem = useCallback((id: string) => {
    setProfile((prev) => ({
      ...prev,
      saved: prev.saved.filter((s) => s.id !== id),
    }));
  }, []);

  const isDestinationSaved = useCallback(
    (destinationId: string) => {
      return profile.saved.some(
        (s) => s.type === "Destination" && s.data.id === destinationId,
      );
    },
    [profile.saved],
  );

  return (
    <UserContext.Provider
      value={{
        profile,
        saveDestination,
        removeSavedItem,
        isDestinationSaved,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
