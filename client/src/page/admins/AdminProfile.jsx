import React, { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar'
import "../../scssAndcss/profile.scss"
import { useLocation } from 'react-router-dom'
import axios from 'axios'

const AdminProfile = () => {

  const [infoData, setInfoData] = useState('');
  const location = useLocation();
  const id = location.state;
  console.log(id)

  const fetchData = async () => {
    try {
      console.log("Fetching data for ID:", id); // Log the ID being used
      const res = await axios.get('http://localhost:5000/api/admins/getpersonaldata', {
        params: { id: id }
      });
      console.log("Response:", res.data); // Log the full response
      if (res.data.status === "Success") {
        console.log("Data received:", res.data.data);
        setInfoData(res.data.data);
      } else {
        console.error("Error:", res.data.Error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);


  console.log(infoData);
  const [file, setFile] = useState();
  const handelFile = (e) => {
    setFile(e.target.files[0])
  }
  const handelFileUpload = async () => {
    const formdata = new FormData();
    formdata.append('image', file);
    try {
      const res = await axios.post("http://localhost:5000/api/admins/upload", formdata)
      if (res.data.status === "Success") {
        console.log("Success");
        fetchData(); // Re-fetch the profile data to update the image
      } else {
        console.log("Failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <>
      <div className="dashboard ">
        <AdminSidebar id={id} />
        <section className='bside pr2-bg'>

          <div className="WelcomeCard">
            <div><h1>Profile</h1></div>
            <div> <img src={process.env.PUBLIC_URL + '/images/Designergirl.png'} alt="Home Icon" /></div>
          </div>

          <div className="profile">

            {infoData.length > 0 && (
              <>
                <div className="pic-side">
               
                  <img src={`http://localhost:5000/images/${infoData[0].profilepic}`} alt="Profile pic loading" />
                  <input type="file" onChange={handelFile} />
                  <input type="button" value="Upload" onClick={handelFileUpload} />
                  <h2>{infoData[0].username}</h2>
                </div>

                <div className="userinfo">
                  <span><strong>Name :</strong> {infoData[0].name}</span>
                  <span><strong>DoB :</strong> {infoData[0].DoB}</span>
                  <span><strong>Father Name :</strong> {infoData[0].fname}</span>
                  <span><strong>Mother Name :</strong>{infoData[0].mname}</span>
                  <span><strong>Mobile No. :</strong> {infoData[0].mobilenum}</span>
                  <span><strong>Email :</strong>{infoData[0].email}</span>
                  <span><strong>Addess :</strong> {infoData[0].address}</span>
                  {/* Render other user information */}
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </>
  )
}

export default AdminProfile;
