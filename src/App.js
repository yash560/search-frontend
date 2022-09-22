import "./App.css";
import Homepage from "./Pages/Homepage";
import { Route } from "react-router-dom";
import axios from "axios";
import Search from "./Pages/Search";

function App() {
  axios.defaults.baseURL = "http://localhost:2000/";

  return (
    <div className="bg-black flex">
      <Route path="/" component={Homepage} exact />
      <Route path="/search" component={Search} exact />
    </div>
  );
}

export default App;
