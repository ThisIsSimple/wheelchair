import { observer } from "mobx-react";
import { navigationStore } from "../../stores/navigation-store";
import { mapStore } from "../../stores/map-store";
import { headingDistanceTo, to } from "geolocation-utils";
import { useEffect, useState } from "react";
import { toJS } from "mobx";

export const NavigationBar = observer(() => {
  navigationStore.currentNavigationInfo;

  const [distance, setDistance] = useState<number | null>(null);

  useEffect(() => {
    let minimumDistance = 10000;
    navigationStore.currentNavigationInfo?.features.forEach((feature) => {
      if (feature.geometry.type === "Point") {
        const hd = headingDistanceTo(mapStore.currentLocation, {
          lat: feature.geometry.coordinates[1] as number,
          lon: feature.geometry.coordinates[0] as number,
        });
        if (hd.distance < minimumDistance) {
          minimumDistance = hd.distance;
          navigationStore.currentInfo = feature.properties;
        }
      } else {
        feature.geometry.coordinates.forEach((coordinate) => {
          const hd = headingDistanceTo(mapStore.currentLocation, {
            lat: coordinate[1] as number,
            lon: coordinate[0] as number,
          });
          if (hd.distance < minimumDistance) {
            minimumDistance = hd.distance;
            navigationStore.currentInfo = feature.properties;
          }
        });
        feature.geometry.coordinates;
      }
    });
    setDistance(minimumDistance);
    console.log(minimumDistance, toJS(navigationStore.currentInfo));
  }, [mapStore.currentLocation]);

  if (!navigationStore.currentNavigationInfo) return null;
  return (
    <div className="bg-white rounded-xl shadow p-5 flex items-center gap-5">
      <i className="fa-solid fa-arrow-up fa-2xl"></i>

      <div className="">
        <p className="font-bold text-lg">
          {navigationStore.currentInfo?.description}
        </p>

        {distance !== null ? `${Math.floor(distance)}m 남음` : ""}
      </div>
    </div>
  );
});
