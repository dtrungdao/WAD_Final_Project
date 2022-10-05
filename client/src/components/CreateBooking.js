import React, { useState } from "react";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";

//Create reservation is received in Backend, but there is a problem afterwards, that the site cannot be changed to /booking, but the login FIXED
//Content of Time and Court not saved and appeared in screen afterwards

export default function CreateBooking() {
 const [form, setForm] = useState({
   date: "",
   time: "",
   court: "",
 });
 const navigate = useNavigate();

 //Update state properties
 function updateForm(value){
    return setForm((prev) => {
        return {...prev, ...value};
    });
 }

 return (
    <div>
      <h2>Reserve a booking</h2>

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            className="form-control"
            id="booking-date"
            onclick="disableDay()"
            value={form.date}
            onChange={(e) => updateForm({ date: e.target.value })}
          />
        </div>

        <div className="form-group">

        <label htmlFor="time">Time</label>
        <select id="time" name="Time">
            <option value="Select">Select time</option>
            <option value="08:00">08:00 - 09:00</option>
            <option value="09:00">09:00 - 10:00</option>
            <option value="10:00">10:00 - 11:00</option>
            <option value="11:00">11:00 - 12:00</option>
            <option value="12:00">12:00 - 13:00</option>
            <option value="13:00">13:00 - 14:00</option>
            <option value="14:00">14:00 - 15:00</option>
            <option value="15:00">15:00 - 16:00</option>
            <option value="16:00">16:00 - 17:00</option>
            <option value="17:00">17:00 - 18:00</option>
            <option value="18:00">18:00 - 19:00</option>
            <option value="19:00">19:00 - 20:00</option>
            <option value="20:00">20:00 - 21:00</option>
            <option value="21:00">21:00 - 22:00</option>
            value={form.time}
            onChange={(e) => updateForm({ time: e.target.value })}
        </select>
        
        </div>


        <div className="form-group">

          <label htmlFor="court">Court</label>
          <select id="court" name="Court">
              <option value="Select">Select court</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              value={form.court}
            onChange={(e) => updateForm({ court: e.target.value })}
          </select>
          
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Reserve"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
 );

 //submission
 async function onSubmit(e){
  e.preventDefault();

  navigate("/");

  //Add new booking to database
  const newBooking = {...form};

  await fetch ("http://localhost:5000/booking/add",{
      method:"POST",
      headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBooking),
  })
  .catch(error => {
      window.alert(error);
      return;
    });

    setForm({ date: "", time: "", court: "" });
    navigate("/");
}

}