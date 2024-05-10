import { observer } from "mobx-react";
import "animate.css";
import { appStore } from "../stores/app-store";
import ScrollLock from "react-scrolllock";

export const Loading = observer(() => {
  if (!appStore.isLoading) return null;
  return (
    <div className="w-screen h-screen fixed left-0 top-0 flex flex-col justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="animate__animated animate__bounce animate__infinite">
        <i className="fa-solid fa-steering-wheel text-white text-6xl" />
      </div>

      <ScrollLock isActive={appStore.isLoading} />
    </div>
  );
});
