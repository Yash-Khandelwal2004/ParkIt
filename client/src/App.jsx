import { useState } from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import './App.css'
import MainPage from './Pages/Main-Page';
import SearchPage from './Pages/Search-City-Page';


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage/>} />
      <Route path='city' element={<SearchPage/>}/>
    </Routes>
  </BrowserRouter>
    
  )
}

export default App
