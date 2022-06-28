import React, { useContext } from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/home/Home'
import TopBar from "./components/topbar/TopBar";
import Login from './pages/login/Login'
import Register from "./pages/register/Register";
import Single from './pages/single/Single'
import Write from './pages/write/Write'
import Settings from './pages/settings/Settings'
import { Context } from "./context/Context";

const App = () => {
  const {user} = useContext(Context);
  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={user ? <Home/> : <Register/>}/>
        <Route path="/login" element={user ? <Home/> : <Login/>}/>
        <Route path="/write" element={user ? <Write/> : <Home/>}/>
        <Route path="/settings" element={user ? <Settings/> : <Home/>}/>
        <Route path="/post/:postId" element={<Single/>}/>
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;
