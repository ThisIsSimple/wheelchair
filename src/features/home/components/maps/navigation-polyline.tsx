import { observer } from "mobx-react";
import { navigationStore } from "../../stores/navigation-store";
import { Polyline } from "@react-google-maps/api";
import { toJS } from "mobx";

export const NavigationPolyline = observer(() => {
  console.log(toJS(navigationStore.currentNavigationInfo));

  if (!navigationStore.currentNavigationInfo) return null;

  const path = [];
  navigationStore.currentNavigationInfo.features.forEach((feature) => {
    if (feature.geometry.type === "Point") {
      path.push({
        lat: feature.geometry.coordinates[1],
        lng: feature.geometry.coordinates[0],
      });
    } else if (feature.geometry.type === "LineString") {
      return feature.geometry.coordinates.forEach((coordinate) => {
        path.push({
          lat: coordinate[1],
          lng: coordinate[0],
        });
      });
    }
  });
  return (
    <>
      <Polyline
        path={path}
        options={{
          strokeColor: "#FF0000",
          strokeOpacity: 1,
          strokeWeight: 2,
        }}
      />
    </>
  );
});
