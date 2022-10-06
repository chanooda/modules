import { Route, Routes } from "react-router-dom";
import Form from "../Controller/Form/Form";

import Home from "../Controller/Home/Home";

export default function GlobalRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </>
  );
}
