import React from "react";


export default function MainPage() {
  return(
   <>
   <nav className="bg-amber-500">
   ParkIt
   </nav>
   <body>
 <div className="container">
      <div className="left-pane">
        <h1>Left Side</h1>
        <p>This is the content for the left half of the page.</p>
      </div>
      <div className="right-pane flex " >
        <h1>Right Side</h1>
        <p>This is the content for the right half of the page.</p>
      </div>
    </div>
   </body>
   </>
  )
}