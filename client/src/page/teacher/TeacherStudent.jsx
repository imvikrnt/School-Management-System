import React from 'react'
import TeacherSidebar from './TeacherSidebar'
import { useLocation } from 'react-router-dom';

const TeacherStudent = () => {
  const location = useLocation();
  const id = location.state;

  return (
    <>
      <div className="dashboard ">
        <TeacherSidebar id={id} />
        <section className='bside pr2-bg'
        
        
        
        
        
        >
          <div className="WelcomeCard">
            <div><h1>Students Details</h1></div>
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

          <table>
            <caption>Students List</caption>
            <thead>

              <tr>
                <th>S No.</th>
                <th>Name</th>
                <th>Roll Num</th>
                <th>Father Name</th>
                <th>Mother Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Address</th>
                {/* <th>
                    <img src={process.env.PUBLIC_URL + '/icons/home.png'} alt="Home Icon" />
                    <img src={process.env.PUBLIC_URL + '/icons/home.png'} alt="Home Icon" /><img src={process.env.PUBLIC_URL + '/icons/home.png'} alt="Home Icon" />

                    </th> */}

              </tr>
            </thead>
            <tbody>
              <tr>
                <td>data 1</td>
                <td>data 1</td>
                <td>data 1</td>
                <td>data 1</td>
                <td>data 1</td>
                <td>data 1</td>
                <td>data 1</td>
                <td>data 1</td>

              </tr>
              <tr>

                <td>data 1</td>
                <td>data 1</td>
                <td>data 1</td>
                <td>data 1</td>
                <td>data 1</td>
                <td>data 1</td>
                <td>data 1</td>
                <td>data 1</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 1</td>
                <td>data 1</td>
                <td>data 1</td>
                <td>data 1</td>
                <td>data 1</td>
                <td>data 1</td>
                <td>data 1</td>

              </tr>
              <tr>

                <td>data 1</td>
                <td>data 1</td>
                <td>data 1</td>
                <td>data 1</td>
                <td>data 1</td>
                <td>data 1</td>
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

        </section>
      </div>
    </>
  )
}

export default TeacherStudent
