import "./App.css";
import Homepage from "./Pages/Homepage";
import { Route } from "react-router-dom";
import axios from "axios";
import Search from "./Pages/Search";

function App() {
  axios.defaults.baseURL = "https://search-frontend-234.herokuapp.com/";

  return (
    <div className="bg-black flex">
      <Route path="/" component={Homepage} exact />
      <Route path="/search" component={Search} exact />
    </div>
  );
}

export default App;
