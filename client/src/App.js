import React from "react";
import "./css/Welcome2.css";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app

import Welcome2 from "./components/Welcome2";
import BookingList from "./components/BookingList";
import CreateBooking from "./components/CreateBooking";
import EditBooking from "./components/EditBooking";

const App = () => {
 return (
   <div>

     <Routes>
       <Route exact path="/login" element={<Welcome2 />} />
       <Route exact path="/" element={<BookingList />} />
       <Route exact path="/create" element={<CreateBooking />} />
       <Route exact path="/edit/:id" element={<EditBooking />} />
     </Routes>
   </div>
 );
};
 
export default App;