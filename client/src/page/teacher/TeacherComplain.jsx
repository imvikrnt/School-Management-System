import React from 'react'
import TeacherSidebar from './TeacherSidebar'
import "../../scssAndcss/complainbox.scss"
import { useLocation } from 'react-router-dom';
const TeacherComplain = () => {

  const location = useLocation(); 
  const id = location.state;
  
  return (
    <>
    <div className="dashboard ">
        <TeacherSidebar id={id}/>
        <section className='bside pr2-bg'>
        <div className="WelcomeCard">
          <div><h1>Complain Box</h1></div>
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
           <div className="complainbox">
            <h3>complain Here</h3>
            <form action="">
              <div>
                <label htmlFor="tittle"> Tittle:</label> <br />
                <input type="text" />
              </div>
              <div>
                <label htmlFor="date"> Date:</label><br />
                <input type="datetime" name="date" id="date" />
              </div>
              <div>
                <label htmlFor="subject"> Subject:</label> <br />
                <input type="text" />
              </div>
              <div>
                <label  id='dis' htmlFor="description">   Description:</label>
                <textarea id="description" className="description-input" placeholder="Enter the description here..."></textarea>
              </div>
              <div>
                <input className='button' type="submit" />
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  )
}

export default TeacherComplain
