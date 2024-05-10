import { FormEventHandler, useState } from "react";
import { searchStore } from "../stores/search-store";
import { appStore } from "../../../shared/stores/app-store";
import { observer } from "mobx-react";
import toast from "react-hot-toast";

export const SearchBar = observer(() => {
  const [query, setQuery] = useState("");

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    if (query.length < 2) return;

    try {
      appStore.isLoading = true;
      await searchStore.searchNearbyPlaces(query);
    } catch (e) {
      console.error(e);
      toast.error("검색에 실패했어요 :(");
    } finally {
      appStore.isLoading = false;
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        {searchStore.isOpen ? (
          <button
            type="button"
            className="flex-none rounded-xl bg-white shadow w-[40px] h-[40px]"
            onClick={() => {
              searchStore.closeSearch();
              setQuery("");
            }}
          >
            <i className="fa-solid fa-chevron-left" />
          </button>
        ) : null}
        <input
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          type="text"
          placeholder="장소를 검색하세요."
          className="rounded-xl bg-white shadow px-3 py-2 w-full"
        />
      </form>
    </div>
  );
});
