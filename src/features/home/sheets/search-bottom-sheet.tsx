import { observer } from "mobx-react";
import { BottomSheet } from "react-spring-bottom-sheet";
import { searchStore } from "../stores/search-store";

export const SearchBottomSheet = observer(() => {
  return (
    <BottomSheet
      open={searchStore.isOpen}
      snapPoints={({ maxHeight }) => [maxHeight / 3, maxHeight]}
      blocking={false}
    >
      <>
        {searchStore.results.map((result) => (
          <div key={result.id} className="p-3 border-t">
            <h3 className="font-bold">{result.displayName.text}</h3>
            <p className="text-sm text-gray-400">{result.formattedAddress}</p>
          </div>
        ))}
      </>
    </BottomSheet>
  );
});
