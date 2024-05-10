import { FormEventHandler, useState } from "react";
import { googleTextSearch } from "../../../api/google-text-search";
import { searchStore } from "../stores/search-store";
import { runInAction } from "mobx";

export const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    if (query.length < 2) return;

    const places = await googleTextSearch(query);
    runInAction(() => {
      searchStore.results = places ?? [];
      searchStore.isOpen = true;
    });
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <input
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          type="text"
          placeholder="장소를 검색하세요."
          className="rounded-xl bg-white shadow-lg px-3 py-2 w-full"
        />
      </form>
    </div>
  );
};
