import { Filters } from "@/components/_pages/explore/filters";
import { Chip } from "@/components/chip";
import { useFilters } from "@/hooks/filters";

export function FilterModal({ handleClose }: { handleClose: () => void }) {
  const [, reset] = useFilters();

  return (
    <div className="fixed z-100 h-svh w-screen overflow-hidden bg-black/10 backdrop-blur-xs">
      <div className="absolute inset-4 flex flex-col rounded-xl border-1 border-neutral-200 bg-white p-4">
        <div className="flex grow flex-col gap-8 overflow-y-scroll pb-4">
          <Filters />
        </div>

        <div className="flex flex-row justify-end gap-1 border-t-1 border-neutral-200 pt-4">
          <button onClick={() => reset()}>
            <Chip color="red" fill="light" size="sm">
              Reset
            </Chip>
          </button>
          <button onClick={() => handleClose()}>
            <Chip color="primary" fill="dark" size="sm">
              Apply
            </Chip>
          </button>
        </div>
      </div>
    </div>
  );
}
