import React, { useEffect, useState} from 'react'
import TeacherSidebar from './TeacherSidebar'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
const TeacherProfile = () => {
  const[data,setData]=useState();
  const location = useLocation(); 
  const id = location.state;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/teacher/teacherinfo', {
          params: { id: id }
        });
        if (res.data.status === "Success") {
          setData(res.data); // Assuming res.data contains the necessary data object
        } else {
          console.error("Error:", res.data.Error);
          // Handle error more gracefully, set an error state or display a message
        }
      } catch (error) {
        console.error("Error:", error);
        // Handle error more gracefully, set an error state or display a message
      }
    };

    fetchData(); // Call fetchData directly within useEffect to fetch data on component mount

  }, [id]); // useEffect will re-run whenever `id` changes

  
  return (
    <>
    <div className="dashboard ">
        <TeacherSidebar id={id}/>
        <section className='bside pr2-bg'>
        <div className="WelcomeCard">
          <div><h1>Profilee</h1></div>
          <div> <img src={process.env.PUBLIC_URL + '/images/Designergirl.png'} alt="Home Icon" /></div>
          </div>
      

          <div className="profile">
            <div className="pic-side">
              <img src={process.env.PUBLIC_URL + '/icons/profileimg.png'} alt="Home Icon" />
              <h2>Username</h2>
            </div>
            <div className="userinfo">
              <span>Name: Vikarnt Kumar</span>
              <span>DoB: 1 sep 2001</span>
              <span>Father Name: Rajesk Kumar</span>
              <span>Mother Name: Jaleshari Devi</span>
              <span>Moblie: 1234567852</span>
              <span>Email: eample@gmail.com</span>
              <span>Address: block delhi, india</span>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default TeacherProfile
