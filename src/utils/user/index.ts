import { Temporal } from "temporal-polyfill";
import type { User, SavedData } from "@/types/user";
import type { Destination } from "@/types/destination";
import type { Provider } from "@/types/provider";
import type { Resource } from "@/types/resource";

/**
 * Checks if a destination is already saved in the user profile.
 */
export function isDestinationSaved(
  profile: User,
  destinationId: string,
): boolean {
  return profile.saved.some(
    (s) => s.type === "Destination" && s.data.id === destinationId,
  );
}

/**
 * Finds a saved destination in the user profile.
 */
export function getSavedDestination(
  profile: User,
  destinationId: string,
): SavedData | undefined {
  return profile.saved.find(
    (s) => s.type === "Destination" && s.data.id === destinationId,
  );
}

/**
 * Adds a destination to the saved list in the user profile.
 */
export function saveDestination(profile: User, destination: Destination): User {
  if (isDestinationSaved(profile, destination.id)) {
    return profile;
  }

  const newSave: SavedData = {
    id: crypto.randomUUID(),
    type: "Destination",
    timestamp: Temporal.Now.instant().toString(),
    data: destination,
  };

  return {
    ...profile,
    saved: [newSave, ...profile.saved],
  };
}

/**
 * Checks if a resource is already saved in the user profile.
 */
export function isResourceSaved(profile: User, resourceUrl: string): boolean {
  return profile.saved.some(
    (s) => s.type === "Resource" && s.data.url === resourceUrl,
  );
}

/**
 * Finds a saved resource in the user profile.
 */
export function getSavedResource(
  profile: User,
  resourceUrl: string,
): SavedData | undefined {
  return profile.saved.find(
    (s) => s.type === "Resource" && s.data.url === resourceUrl,
  );
}

/**
 * Adds a resource to the saved list in the user profile.
 */
export function saveResource(profile: User, resource: Resource): User {
  if (isResourceSaved(profile, resource.url)) {
    return profile;
  }

  const newSave: SavedData = {
    id: crypto.randomUUID(),
    type: "Resource",
    timestamp: Temporal.Now.instant().toString(),
    data: resource,
  };

  return {
    ...profile,
    saved: [newSave, ...profile.saved],
  };
}

/**
 * Checks if a provider is already saved in the user profile.
 */
export function isProviderSaved(profile: User, providerId: string): boolean {
  return profile.saved.some(
    (s) => s.type === "Provider" && s.data.id === providerId,
  );
}

/**
 * Finds a saved provider in the user profile.
 */
export function getSavedProvider(
  profile: User,
  providerId: string,
): SavedData | undefined {
  return profile.saved.find(
    (s) => s.type === "Provider" && s.data.id === providerId,
  );
}

/**
 * Adds a provider to the saved list in the user profile.
 */
export function saveProvider(profile: User, provider: Provider): User {
  if (isProviderSaved(profile, provider.id)) {
    return profile;
  }

  const newSave: SavedData = {
    id: crypto.randomUUID(),
    type: "Provider",
    timestamp: Temporal.Now.instant().toString(),
    data: provider,
  };

  return {
    ...profile,
    saved: [newSave, ...profile.saved],
  };
}

/**
 * Removes a saved item from the user profile by its save ID.
 */
export function removeSavedItem(profile: User, saveId: string): User {
  return {
    ...profile,
    saved: profile.saved.filter((s) => s.id !== saveId),
  };
}
