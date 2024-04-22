import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/footer/Footer";
import Main from "./pages/Main";
import Filter from "./pages/Filter";
import Pins from "./pages/Pins";
import "./assets/header.scss";
import "./assets/footer.scss";
import "./assets/main.scss";
import "./assets/filter.scss";
import "./assets/verticalCard.scss";
import "./assets/horizontalCard.scss";
import "./assets/recommendAndPin.scss";
import "./assets/flow.scss";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route index path="" element={<Main />} />
          <Route path="/news" element={<Filter />} />
          <Route path="/pins" element={<Pins />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
