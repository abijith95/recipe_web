import "./App.css";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import {Home} from './folders/Home';
import {Auth} from "./folders/Auth";
import {Creation} from "./folders/Creation";
import {Saved} from "./folders/Saved";
import {Navbar} from "./components/nav";
const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/creation" element={<Creation />} />
        <Route path="/saved" element={<Saved />} />
      </Routes>
      </Router>    
   </div>
  )
};

export default App;
