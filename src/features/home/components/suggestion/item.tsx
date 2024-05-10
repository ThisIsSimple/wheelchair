import { Place } from "../../../../db/places/types";

interface Props {
  place: Place;
}

export const SuggestionItem = ({ place }: Props) => {
  return (
    <div className="bg-white rounded-xl p-3 shadow flex items-center gap-3 h-[72px]">
      {place.thumbnail ? (
        <img
          src={place.thumbnail}
          className="w-12 h-12 rounded-xl object-cover"
        />
      ) : null}

      <div>
        <h3 className="font-bold line-clamp-1">{place.name}</h3>
        <p className="text-gray-400 text-xs line-clamp-1">
          {Math.round(place?.distance ?? 0)}m
        </p>
      </div>
    </div>
  );
};
