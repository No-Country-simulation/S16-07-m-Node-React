import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AccessHub, Events, Home, Landing } from "./pages";
import ProtecteRoute from "./components/ProtecteRoute";
import QrScanner from "./components/QrScanner";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<AccessHub />} />
        <Route
          path="/home"
          element={<ProtecteRoute element={<Home />} redirectTo={"/login"} />}
        />
        <Route path="/scanner" element={<QrScanner />} />
        <Route path="/eventos" element={<Events />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
