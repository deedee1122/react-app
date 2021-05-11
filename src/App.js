import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SelectCurrency from "./SelectCurrency";
import DetailPage from "./DetailPage";
function App() {
  return (
    <div className="App container">
      <Router>
        <SelectCurrency />
      </Router>
    </div>
  );
}

export default App;
