import { runInAction } from "mobx";
import { observer } from "mobx-react";
import { mapStore } from "../stores/map-store";

export const FilterBar = observer(() => {
  const filters = [
    {
      name: "장애인지원시설",
      isActive: mapStore.showFacilities,
      action: () =>
        runInAction(() => (mapStore.showFacilities = !mapStore.showFacilities)),
      activeColor: "bg-red-500 text-white",
    },
    {
      name: "공중화장실",
      isActive: mapStore.showToilets,
      action: () =>
        runInAction(() => (mapStore.showToilets = !mapStore.showToilets)),
      activeColor: "bg-blue-500 text-white",
    },
  ];

  return (
    <div
      className="flex items-center gap-3 overflow-x-scroll no-scrollbar px-3 pb-3"
      onWheel={(e) => {
        // here im handling the horizontal scroll inline, without the use of hooks
        const strength = Math.abs(e.deltaY);
        if (e.deltaY === 0) return;

        const el = e.currentTarget;
        if (
          !(el.scrollLeft === 0 && e.deltaY < 0) &&
          !(
            el.scrollWidth - el.clientWidth - Math.round(el.scrollLeft) === 0 &&
            e.deltaY > 0
          )
        ) {
          // e.preventDefault();
        }
        el.scrollTo({
          left: el.scrollLeft + e.deltaY,
          // large scrolls with smooth animation behavior will lag, so switch to auto
          behavior: strength > 70 ? "auto" : "smooth",
        });
      }}
    >
      {filters.map(({ name, action, activeColor, isActive }) => (
        <button
          className={`flex-none px-2 py-1.5 rounded-lg bg-white shadow text-sm ${isActive ? activeColor : ""}`}
          onClick={action}
        >
          {name}
        </button>
      ))}
    </div>
  );
});
