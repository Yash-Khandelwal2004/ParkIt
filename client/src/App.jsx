import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import './App.css'
import MainPage from './Pages/Main-Page';
import Signup from "./Pages/auth/Sign-up-auth";
import Signin from "./Pages/auth/Sign-in-auth";
import RentOutParking from "./Pages/Parking/Rent-Out-Parking";
import MyOwnedParkings from "./Pages/Parking/My-Parking";
import BookingForm from "./Pages/Parking/Book-Parking";
import MyBookings from "./Pages/Parking/My-Bookings";
import AllParkings from "./Pages/Parking/All-Parking";

function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path="/" element={<MainPage/>} />
      <Route path='/rent-parking' element={<RentOutParking/>}/>
      <Route path='/my-parkings' element={<MyOwnedParkings/>}/>
     <Route path="/book/:parkingId" element={<BookingForm />} />
     <Route path="/my-bookings" element={<MyBookings />} />
     <Route path="/all-parkings" element={<AllParkings />} />
    

    </Routes>
  </BrowserRouter>
    
  )
}

export default App
