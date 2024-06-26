import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import '../css/CarCart.css';
import { useParams } from 'react-router-dom';

const CarCart = () => {
  const [rentaldetails, setRentaldetails] = useState([]);
  const [priceperDay,setPriceperDay]=useState(0);
  const [driverCharge,setDriverCharge]=useState(500)
  const [serviceCharge,setServiceCharge]=useState(5000);
  const [bookingDays, setBookingDays] = useState(0);
  const [total,setTotal]=useState(0);

  const { userId } = useParams();

  

  const showRequest = async () => {
    try {
      const response = await fetch(`http://localhost:4000/show-user-request-status/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      if (result.success === true && result.data && result.data.length > 0 && result.data[0].carId) {
        setRentaldetails(result.data);
        console.log(result.data)
        setPriceperDay(parseInt(result.data[0].carId.price));

        const startDate = new Date(result.data[0].bookingDetails.startDate);
        const endDate = new Date(result.data[0].bookingDetails.endDate);
        const timeDiff = endDate.getTime() - startDate.getTime();
        const daysDiff = timeDiff > 0 ? Math.ceil(timeDiff / (1000 * 3600 * 24)) : 1;
        setBookingDays(daysDiff);
      }
    } catch (error) {
      console.log(error);
    }
  };



  //for renewing the car status
  const handleConfirm = async(carId)=>{
    console.log(carId._id) 
    try {
      const response = await fetch(`http://localhost:4000/confirm-request-user/${carId._id}`,{
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      if (result.success === true) {
        alert("Car confirmed")
        window.location.reload()  
       }

    } catch (error) {
      console.log(error)

      
    } 
  }

  //rejecting the car request 
  const handleReject = async(requestId,carId)=>{
    
    try {
      const response = await fetch(`http://localhost:4000/reject-confirm-request/${requestId._id}`,{
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          carId:carId._id,
          action : "reject"
        })
      });

      if (response.status === 200) {
        alert("Car rejected")
        window.location.reload()
      }
    } catch (error) {
      console.log(error)
      
    }
  }
 useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      showRequest();
    }
  }, []);

  useEffect(() => {
    const rentalCost = priceperDay * bookingDays;
    const driverCost = driverCharge * bookingDays;
    const totalCost = rentalCost + driverCost + serviceCharge;
    setTotal(totalCost);
  }, [priceperDay, bookingDays, driverCharge, serviceCharge]);

  return (
    <>
      <Nav />
      <div className='CarCart'>
        {rentaldetails.length > 0 && rentaldetails[0].carId ? (
          <div className="owner-vehicle-details">
            <img src={`http://localhost:4000/${rentaldetails[0].carId.carPhoto}`} alt="Vehicle" className="vehicle-image" />
            <div className="owner-details">
              <p>Owner Name:<span>{rentaldetails[0].carId.ownerName}</span></p>
              <hr className='lineline'></hr>
              <p>Owner Phone:<span>{rentaldetails[0].carId.ownerPhone}</span></p>
              <hr className='lineline'></hr>
              <p>Brand:<span>{rentaldetails[0].carId.carBrand}</span></p>
              <hr className='lineline'></hr>
              <p>Vehicle:<span>{rentaldetails[0].carId.carType}</span></p>
              <hr className='lineline'></hr>
              <p>Vehicle No:<span>{rentaldetails[0].carId.carNumber}</span></p>
            </div>
          </div>
        ) : (
          <div className="no-car-message">
            <p className="no-car-message">Currently, no car in the cart.</p>
          </div>
        )}
        {rentaldetails.length > 0 && rentaldetails[0].carId && (
          <section className='payment-details'>
            <div className="driver-details">
              <div className="detail">
                <h2>Distributor: {rentaldetails[0].receiverDistributor.distributionLocation}</h2>
                <hr className='lineline'></hr>
                {rentaldetails.length > 0 && rentaldetails[0].carId && (
                  <>
                    <p>Name :<span>{rentaldetails[0].receiverDistributor.fullname}</span></p>
                    <hr className='lineline'></hr>
                    <p>Email :<span>{rentaldetails[0].receiverDistributor.email}</span></p>
                    <hr className='lineline'></hr>
                    <p>Phone :<span>{rentaldetails[0].receiverDistributor.phone}</span></p>
                  </>
                )}
                <hr className='lineline'></hr>
              </div>
              <div className="detail">
                <h2>Driver Details</h2>
                <hr className='lineline'></hr>
                {rentaldetails.length > 0 && rentaldetails[0].carId && (
                  <>
                    <p>Driver Name:<span>{rentaldetails[0].carId.driverName}</span></p>
                    <hr className='lineline'></hr>
                    <p>Driver Phone:<span>{rentaldetails[0].carId.driverPhone}</span></p>
                  </>
                )}
                <hr className='lineline'></hr>
                <p className='thank'>Experienced Driver !!!</p>
              </div>
              
            </div>
            <div className='payment-section'>
              <h6>Payment details</h6>
              <div className='total-cost'>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <p>Booked for: [{rentaldetails[0].bookingDetails.startDate}] - [{rentaldetails[0].bookingDetails.endDate}]</p>
                  <p className='price'>{bookingDays} dayscd</p>
                </div>
                <hr className='lineline'></hr>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <p>Cost/day:</p>
                  <p className='price'>Rs. {priceperDay}</p>
                </div>
                <hr className='lineline'></hr>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <p>Driver charge:</p>
                  <p className='price'>{bookingDays} x {driverCharge} per day</p>
                </div>
                <hr className='lineline'></hr>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <p>Service charge:</p>
                  <p className='price'>Rs {serviceCharge}</p>
                </div>
                <hr className='lineline2'></hr>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <p >Total Cost:</p>
                  <p className='price'>Rs {total}</p>
                </div>
                <hr className='lineline'></hr>
                <p className='thank'>Additional charges may apply !!!</p>
                {rentaldetails[0].carId.status === "Pending" ? (<div style={{display:"flex",justifyContent:"space-between"}}>
                <button className='pay-button2' onClick={()=> handleReject(rentaldetails[0],rentaldetails[0].carId)}> Cancel </button>
                <button className='pay-button' onClick={()=>handleConfirm(rentaldetails[0].carId)}> Confirm </button>
                </div>) :
                  (
              <div>
                    <button className='pay-button3'> Booked </button>
                  </div>
              )}                
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}

export default CarCart;
