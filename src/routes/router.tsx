import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "../features/home/page";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};
