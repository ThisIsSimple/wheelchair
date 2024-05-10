import { Toaster } from "react-hot-toast";
import { Router } from "./routes/router";
import { useEffect } from "react";
import { Loading } from "./shared/components/loading";

import "swiper/css";

function App() {
  let vh = 0;

  useEffect(() => {
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, []);

  return (
    <>
      <Router />
      <Toaster />
      <Loading />
    </>
  );
}

export default App;
