import "./App.css";
import axios from "axios";

function App() {
  axios.defaults.baseURL = "http://localhost:2000/";

  return <div className="bg-black flex"></div>;
}

export default App;
