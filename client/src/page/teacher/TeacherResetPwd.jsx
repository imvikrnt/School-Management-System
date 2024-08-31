import React from 'react'
import { useLocation } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';

const TeacherResetPwd = () => {

    const location = useLocation();
    const id = location.state;


    React.useEffect(() => {
        console.log("Received id in DynamicComponent:", id);
    }, [id]);
    return (
        <>
        <div className="dashboard">
            <TeacherSidebar id={id} />

            <section className='bside pr2-bg'>
                <div className="WelcomeCard">
                    <div><h1>Change Password</h1></div>
                    <div><img src={`${process.env.PUBLIC_URL}/images/Designergirl.png`} alt="Home Icon" /></div>
                </div>

                <div className="formChangePwd">
                    <form  >
                        <div>
                            <label htmlFor='oldpassword'>Old Password</label>
                            <input
                                type="text"
                                name="oldpassword"
                                // onChange={e => setValues({ ...values, oldpassword: e.target.value })}
                            />
                        </div><br />
                        <div>
                            <label htmlFor='newpassword'>New Password</label>
                            <input
                                type="text"
                                name="newpassword"
                                // onChange={e => setValues({ ...values, newpassword: e.target.value })}
                            />
                        </div><br />
                        <div>
                            <label htmlFor='renewpassword'>Re-new Password :</label>
                            <input
                                type="text"
                                name="renewpassword"
                                // onChange={e => setValues({ ...values, renewpassword: e.target.value })}
                            />
                        </div>
                        <br />
                        <input type="submit" value="Submit" />
                    </form>
                </div>

            </section>
        </div>

    </>
    )
}

export default TeacherResetPwd