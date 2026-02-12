import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import './App.css'
import MainPage from './Pages/Main-Page';
import SearchPage from './Pages/Search-Parking-Page';
import Signup from "./Pages/auth/Sign-up-auth";
import Signin from "./Pages/auth/Sign-in-auth";
import RentParking from "./Pages/Parking/Rent-Parking";
import MyOwnedParkings from "./Pages/Parking/My-Parking";

function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path="/" element={<MainPage/>} />
      <Route path='city' element={<SearchPage/>}/>
      <Route path='/rent' element={<RentParking/>}/>
      <Route path='/myparkings' element={<MyOwnedParkings/>}/>

    </Routes>
  </BrowserRouter>
    
  )
}

export default App
