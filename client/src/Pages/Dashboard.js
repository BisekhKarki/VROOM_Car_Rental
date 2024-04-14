import React, { useEffect, useState } from 'react'
import "../css/Dashboard.css"
import SideNav from '../components/SideNav'


export const Dashboard = (props) => {
  const [users, setUsers] = useState([]);
  const [distributors, setDistributors] = useState([]);



  const showUsers = async () => {
    try {
      const response = await fetch("http://localhost:4000/show-users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.log("Users error", error);
    }
  }


  const showDistributors = async () => {
    try {
      const response = await fetch("http://localhost:4000/show-distributors", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setDistributors(data.distributors);
    } catch (error) {
      console.log("Distributors error", error);
    }
  }


  useEffect(() => {
    showUsers();
    showDistributors();

  },[]);

  // console.log(users)


  

  return (
    <>
    <div className='dashboardPage'>
      <SideNav />
      <div className='dashboard'>
        <h1>Dashboard</h1>
        <div className='dash'>
          <div className='TotalUsers'>
            <h1 className='total_user'>Total Users</h1>
            <p className='show_users'>{users.length}</p>

          </div>
          <div className='TotalDistributers'>
            <h1 className='total_distributer'>Total Distributers</h1>
            <p className='show_distributer'>{distributors.length}</p>

          </div>
          <div className='TotalCars'>
            <h1 className='total_cars'>Total Cars</h1>
            <p className='show_cars'>-</p>

          </div>
          <div className='TotalUsers'>
            <h1 className='total_user'>Total ---</h1>
            <p className='show_users'>-</p>

          </div>
        </div>
      </div>
      
    </div>
    
    
    </>
  )
}
