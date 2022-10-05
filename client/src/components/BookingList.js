import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";


const Booking = (props) => (
    <tr>
        <td>{props.booking.date}</td>
        <td>{props.booking.time}</td>
        <td>{props.booking.court}</td>
        <td>
            <Link className="manage" to={`/edit/${props.booking._id}`}>Edit</Link>
            <button className="manage" onClick={() => {
                props.deleteBooking(props.booking._id);
            }} >Delete</button>
        </td>
    </tr>
);

export default function BookingList(){
    const [bookings, setBookings] = useState([]);

    //Fetch booking to database
    useEffect(() => {
        async function getBookings(){
            const response = await fetch(`http://localhost:5000/booking/`);
            if(!response.ok){
                const message = `Error in fetching: ${response.statusText}`
                window.alert(message);
                return;
            }
            const bookings = await response.json();
            setBookings(bookings);
        }
        getBookings();

        return;
    }, [bookings.length]);

    //Delete a booking
    async function deleteBooking(id){
        await fetch(`http://localhost:5000/${id}`,{
            method:"DELETE"
        });
        const newBooking = bookings.filter((value) => value._id !== id);
        setBookings(newBooking);
    }

    //Map bookings to table
    function listOfBookings(){
        return bookings.map((booking) =>{
            return(
                <Booking
                booking={booking}
                deleteBooking = {() => deleteBooking(booking._id)}
                key = {booking._id}
                />
            );
        });
    }


return(
    <div>
        <h2>List of all bookings</h2>
        <table className="table">
            <thead>
                <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Court</th>
                <th>Manage</th>
                <div className="create-new-booking" >
                    <NavLink className="nav-link" to="/create">
                    New booking
                    </NavLink>
                </div>
                </tr>
            </thead>
            <tbody>{listOfBookings()}</tbody>

        </table>
    </div>
);
}