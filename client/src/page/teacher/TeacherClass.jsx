import React from 'react'
import TeacherSidebar from './TeacherSidebar'
import { useLocation } from 'react-router-dom';
const TeacherClass = () => {

  const location = useLocation(); 
  const id = location.state;
  
  return (
    <>
    <div className="dashboard ">
        <TeacherSidebar  id={id}/>
        <section className='bside pr2-bg'>
        <div className="WelcomeCard">
          <div><h1>TeacherSide Class Info</h1></div>
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
        </section>
      </div>
    </>
  )
}

export default TeacherClass
