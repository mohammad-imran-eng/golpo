import '../src/style.css'
import Home from "./components/Home"
import Login from "./components/Login";
import Registration from './components/Registration';
import {BrowserRouter,Routes,Route} from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/'  element={<Home />}/>
          <Route path='/login' element={<Login />} />
          <Route path='/registration' element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
