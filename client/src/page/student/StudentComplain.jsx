import React from 'react'
import StudentSidebar from './StudentSidebar'
import { useLocation } from 'react-router-dom';

const StudentComplain = () => {
  const location = useLocation(); 
  const id = location.state;
  
  return (
    <>
    <div className="dashboard ">
        <StudentSidebar id= {id}/>
        <section className='bside pr2-bg'>
        <div className="WelcomeCard">
          <div><h1>Complain Box</h1></div>
          <div> <img src={process.env.PUBLIC_URL + '/images/Designergirl.png'} alt="Home Icon" /></div>
          </div>
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

export default StudentComplain
