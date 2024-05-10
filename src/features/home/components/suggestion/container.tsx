import { observer } from "mobx-react";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { suggestionStore } from "../../stores/suggestion-store";
import { SuggestionItem } from "./item";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";

export const SuggestionContainer = observer(() => {
  useEffect(() => {
    suggestionStore.init();
  }, []);

  return (
    <div>
      <header className="pl-5">
        <h1 className="font-bold text-sm">내 주변 휠체어 안심존</h1>
      </header>
      <Swiper
        spaceBetween={12}
        slidesPerView={1.5}
        modules={[FreeMode]}
        className="p-3"
      >
        {suggestionStore.places.map((place) => (
          <SwiperSlide key={place.google_place_id}>
            <SuggestionItem place={place} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
});
