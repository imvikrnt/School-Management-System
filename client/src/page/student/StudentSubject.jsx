import React from 'react'
import StudentSidebar from './StudentSidebar'
import { useLocation } from 'react-router-dom';

const StudentSubject = () => {

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
          <div className="cardslist">

            
          <div className="card">
              <img src={process.env.PUBLIC_URL + '/images/text-books.png'} alt="Logo" />
              <h5>Subjects</h5>
              <span>9</span>
              <input type="button" value="Total Subject" />
            </div>


            {/* <div className="card">
            <img src={process.env.PUBLIC_URL + '/images/studentimg.png'} alt="Logo" />
              <h5>Total Student</h5>
              <span>13</span>
              <input type="button" value="Get Start" />
            </div> */}
          </div>
          <div className='table'>
              <table>
              <caption>Students Subjrct List</caption>
                <thead>
          
                  <tr>
                    <th>S No.</th>
                    <th>Subject Name</th>
        
                  </tr>
                </thead>
                <tbody>
                  <tr>
                  <td>data 1</td>
                  <td>data 1</td>
                  
                  </tr>
                  <tr>
                  
                  <td>data 1</td> 
                  <td>data 1</td>
                  </tr>
                  <tr>
                  <td>data 1</td>
                  <td>data 1</td>
                  
                  </tr>
                  <tr>
                  <td>data 1</td>
                  <td>data 1</td>
                  
                  </tr>
                  {/* {entities.map((entity, index) => (
            <tr key={index}>
              <td>{entity.name}</td>
              <td>{entity.fname}</td>
              <td>{entity.mname}</td>
              <td>{entity.email}</td>
              <td>{entity.mobile}</td>
            </tr> */}
                  {/* ))} */}
                </tbody>
              </table>

            </div>
        </section>
      </div>
    </>
  )
}

export default StudentSubject
