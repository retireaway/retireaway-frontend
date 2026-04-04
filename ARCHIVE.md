```tsx

      <div className="mb-0 grid h-36 w-full grid-cols-[40fr_60fr] gap-0 px-0">
        <div className="relative overflow-hidden border-0 border-neutral-200 bg-neutral-50">
          <img
            className="absolute top-0 left-0 size-full object-cover object-center"
            src={`/images/destinations/${matches[2]!.id}/${matches[2]!.id}.webp`}
          />

          <div className="absolute top-0 left-0 size-full bg-linear-to-b from-black/10 to-black/60" />

          <div className="absolute bottom-0 left-0 p-2">
            <h4 className="text-xl font-semibold text-white">
              {matches[2]!.name}
            </h4>
          </div>
        </div>
        <div className="relative overflow-hidden border-0 border-neutral-200 bg-neutral-50">
          <img
            className="absolute top-0 left-0 size-full object-cover object-center"
            src={`/images/destinations/${matches[1]!.id}/${matches[1]!.id}.webp`}
          />

          <div className="absolute top-0 left-0 size-full bg-linear-to-b from-black/0 to-black/60" />

          <div className="absolute bottom-0 left-0 p-2">
            <h4 className="text-xl font-semibold text-white">
              {matches[1]!.name}
            </h4>
          </div>
        </div>
      </div>

      <div className="mb-0 grid h-36 w-full grid-cols-[60fr_40fr] gap-0 px-0">
        <div className="relative overflow-hidden border-0 border-neutral-200 bg-neutral-50">
          <img
            className="absolute top-0 left-0 size-full object-cover object-center"
            src={`/images/destinations/${matches[0]!.id}/${matches[0]!.id}.webp`}
          />

          <div className="absolute top-0 left-0 size-full bg-linear-to-b from-black/0 to-black/60" />

          <div className="absolute bottom-0 left-0 p-2">
            <div className="w-min rounded-s-full rounded-e-full bg-accent px-2 py-0.5 text-[10px] font-bold whitespace-nowrap text-white uppercase">
              top match
            </div>

            <h4 className="text-xl font-semibold text-white">
              {matches[0]!.name}
            </h4>
          </div>
        </div>
        <div className="relative overflow-hidden border-0 border-neutral-200 bg-neutral-50">
          <img
            className="absolute top-0 left-0 size-full object-cover object-center"
            src={`/images/destinations/${matches[3]!.id}/${matches[3]!.id}.webp`}
          />

          <div className="absolute top-0 left-0 size-full bg-linear-to-b from-black/10 to-black/60" />

          <div className="absolute bottom-0 left-0 p-2">
            <h4 className="text-xl font-semibold text-white">
              {matches[3]!.name}
            </h4>
          </div>
        </div>
      </div>

      <div className="mb-6 grid h-36 w-full grid-cols-2 gap-0 px-0">
        <div className="relative overflow-hidden border-0 border-neutral-200 bg-neutral-50">
          <img
            className="absolute top-0 left-0 size-full object-cover object-center"
            src={`/images/destinations/${matches[5]!.id}/${matches[5]!.id}.webp`}
          />

          <div className="absolute top-0 left-0 size-full bg-linear-to-b from-black/10 to-black/60" />

          <div className="absolute bottom-0 left-0 p-2">
            <h4 className="text-xl font-semibold text-white">
              {matches[5]!.name}
            </h4>
          </div>
        </div>
        <div className="relative overflow-hidden border-0 border-neutral-200 bg-neutral-50">
          <img
            className="absolute top-0 left-0 size-full object-cover object-center"
            src={`/images/destinations/${matches[6]!.id}/${matches[6]!.id}.webp`}
          />

          <div className="absolute top-0 left-0 size-full bg-linear-to-b from-black/0 to-black/60" />

          <div className="absolute bottom-0 left-0 p-2">
            <h4 className="text-xl font-semibold text-white">
              {matches[6]!.name}
            </h4>
          </div>
        </div>
      </div>

```
