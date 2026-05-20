import type { Destination } from "@/types/destination";
import type { Resource } from "@/types/resource";
import type { Provider } from "@/types/provider";

export type SaveType = "Destination" | "Resource" | "Provider" | "Comparison";

export type SavedData =
  | {
      id: string;
      type: "Destination";
      timestamp: string;
      data: Destination;
    }
  | {
      id: string;
      type: "Resource";
      timestamp: string;
      data: Resource;
    }
  | {
      id: string;
      type: "Provider";
      timestamp: string;
      data: Provider;
    }
  | {
      id: string;
      type: "Comparison";
      timestamp: string;
      data: readonly Destination[];
    };

export type User = Readonly<{
  saved: readonly SavedData[];
}>;
