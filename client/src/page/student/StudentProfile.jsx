import React from 'react'
import StudentSidebar from './StudentSidebar'
import { useLocation } from 'react-router-dom';

const StudentProfile = () => {

  const location = useLocation(); 
  const id = location.state;
  return (
    <>
    <div className="dashboard ">
        <StudentSidebar id={id}/>
        <section className='bside pr2-bg'>
        <div className="WelcomeCard">
          <div><h1>Profile</h1></div>
          <div> <img src={process.env.PUBLIC_URL + '/images/Designergirl.png'} alt="Home Icon" /></div>
          </div>
          {/* <div className="cardslist">

            <div className="card">
              <img src={process.env.PUBLIC_URL + '/images/teacherimg.png'} alt="Logo" />
              <h5>Total Teacher</h5>
              <span>13</span>
              <input type="button" value="Get Start" />
            </div>


            <div className="card">
            <img src={process.env.PUBLIC_URL + '/images/studentimg.png'} alt="Logo" />
              <h5>Total Student</h5>
              <span>13</span>
              <input type="button" value="Get Start" />
            </div>
          </div> */}

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

export default StudentProfile
