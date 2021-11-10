import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./component/Home";

require("dotenv").config();

function App() {
  return (
    <div className="App d-flex justify-content-center align-items-center">
      <Home/>
    </div>
  );
}

export default App;
