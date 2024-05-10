import { observer } from "mobx-react";
import { BottomSheet } from "react-spring-bottom-sheet";
import { searchStore } from "../stores/search-store";

export const SearchBottomSheet = observer(() => {
  return (
    <BottomSheet
      open={searchStore.isOpen}
      snapPoints={({ maxHeight }) => [maxHeight / 3, maxHeight]}
      blocking={false}
      expandOnContentDrag
    >
      <>
        {searchStore.results.map((result) => (
          <div key={result.id} className="flex items-center gap-3 p-3 border-t">
            <div className="relative flex-none w-12 h-12">
              {result.thumbnail ? (
                <img
                  src={result.thumbnail}
                  alt={result.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              )}
              {result.is_accessibility_parking ||
              result.is_accessibility_entrance ? (
                <i className="bg-white rounded-full text-blue-600 absolute w-5 h-5 right-0 bottom-0 fa-solid fa-badge-check fa-lg flex justify-center items-center" />
              ) : null}
            </div>
            <div>
              <h3 className="font-bold">{result.name}</h3>
              <p className="text-sm text-gray-400">{result.address}</p>
            </div>
          </div>
        ))}
      </>
    </BottomSheet>
  );
});
