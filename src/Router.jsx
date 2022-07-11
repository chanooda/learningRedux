import { BrowserRouter, Routes, Route } from "react-router-dom";
import Detail from "./router/Detail";
import Home from "./router/Home";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
