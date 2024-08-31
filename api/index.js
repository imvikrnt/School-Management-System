//imports
import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';

import authRoutes from './src/routes/auth.js';
import forgotPwd from './src/routes/forgotPwd.js';
import adminsRoutes from './src/routes/admins.js';
import studentRoutes from './src/routes/student.js';
import teacherRoutes from './src/routes/teacher.js';
import homeRoutes from './src/routes/home.js'

//defines
const PORT = 5000;
const app = express();




//middleware
// const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
 
}));

app.use(express.json());
app.use(bodyParser.json());
app.use(express.static('public'))

//USE ROUTES
app.use("/api/auth", authRoutes);
app.use('/api/forgot', forgotPwd )
app.use('/api/admins', adminsRoutes)
app.use('/api/student', studentRoutes )
app.use('/api/teacher', teacherRoutes )
app.use('/api/home', homeRoutes )




app.listen(PORT, () => {
    console.log("Lestinh!!")
});















// import express from 'express';
// import cors from 'cors';

// import cookieParser from 'cookie-parser';
// import bcrypt from 'bcrypt';
// import bodyParser from 'body-parser';
// import nodemailer from 'nodemailer';


// import authRoutes from './src/routes/auth.js'
// // import adminsRoutes from './src/routes/admins.js'
// // import studentRoutes from './src/routes/student.js'
// // import teacherRoutes from './src/routes/teacher.js'
// const app = express();
// const port = 5000;
// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.json());
// app.use(cookieParser());

// import { db } from './config/dbconnection.js';

// // const db = mysql.createConnection({
// //     host: "localhost",
// //     user: "root",
// //     password: "systum",
// //     database: "esms"
// // })

// // db.connect(err => {
// //     if (err) {
// //         throw err;
// //     }
// //     console.log('MySQL connected');
// // });




// app.use("/api/auth", authRoutes)
// // app.use("/api/admims",adminsRoutes)
// // app.use("/api/teacher", teacherRoutes)
// // app.use("/api.student", studentRoutes)
// // app.get()
// app.get('/', (req, res) => {
//     const sql = "SELECT * FROM esms.student";
//     db.query(sql, (err, data) => {
//         if (err) return res.json(err);
//         return res.json(data);
//     })
// })

// // // for Admin User Reagistation
// // app.post('/register', async (req, res) => {
// //     const username = req.body.username;
// //     const email = req.body.email;
// //     const salt = await bcrypt.genSalt(10);
// //     const password = await bcrypt.hash(req.body.password, salt);
// //     console.log(username, email, password)

// //     const sql = "INSERT INTO `esms`.`admins` (`username`, `email`, `password`) VALUES (?)"
// //     const values = [
// //         username,
// //         email,
// //         password
// //     ]
// //     db.query(sql, [values], (err, responseData) => {
// //         if (err) return res.json({ Error: "Inserting datad error in server side" })
// //         return res.json({ status: "Success" });

// //     })

// // })

// // // for/admin login 
// // app.post('/login', (req, res) => {

// //     const sql = "SELECT * FROM esms.admins WHERE username = ?";
// //     db.query(sql, [req.body.username], (err, data) => {
// //         if (err) return res.json({ Error: "Login Error in Server" })
// //         if (data.length > 0) {
// //             bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
// //                 if (err) return res.json({ Error: "Password compare error in Server" })
// //                 if (response) {

// //                     res.status(200).json({ status: "Success", data: response });
// //                     // return res.json({ status: "Success" })
// //                 } else {
// //                     return res.json({ Error: "Password not matched!!" });

// //                 }
// //             })
// //         } else {
            
// //             return res.json({ Error: "No username existed" });
// //         }
// //     })
// // })








// //forgot password admin

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'esmshelpline@gmail.com',
//         pass: 'twri tgyn qlej qpyc'
//     }
// });

// app.post('/api/admin/forgotpassword', (req, res) => {
//     const email = req.body.email;

//     const otp = Math.floor(100000 + Math.random() * 900000);
//     const updateotp = 'UPDATE esms.admins SET otp = ? WHERE email=?; '
//     db.query(updateotp, [otp, email], (err, response) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({ error: "Error in Server" });
//         } else {
//             console.log("OTP updated!!")
//         }
//     })

//     const sql = "SELECT * FROM esms.admins WHERE email = ?";
//     db.query(sql, [email], (err, data) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({ error: "Error in Server" });
//         }

//         if (data.length > 0) {
//             let mailOptions = {
//                 from: 'esmshelpline@gmail.com',
//                 to: email,
//                 subject: 'Password Reset Request',
//                 text: `Your OTP for password reset is: ${otp}. This OTP will expire in 5 minutes.`
//             };

//             transporter.sendMail(mailOptions, function (error, info) {
//                 if (error) {
//                     console.error(error);
//                     return res.status(500).json({ error: "Error sending email" });
//                 } else {
//                     console.log('Email sent: ' + info.response);
//                     return res.status(200).json({ message: "Email sent successfully", status: "Success", email });
//                 }
//             });
//         } else {
//             return res.status(404).json({ error: "User not found" });
//         }
//     });
// });






// app.post('/api/admin/verifyOtp', async (req, res) => {
//     const otp = req.body.otp;
//     const email = req.body.email;
//     // console.log(otp, email)
//     const sql = "SELECT otp FROM esms.admins WHERE email =?"
//     db.query(sql, [email], (err, data) => {
//         if (err) return res.json({ Error: " Error in Server" })
//         if (data.length > 0) {
//             if (data[0].otp === req.body.otp){
//                 return res.status(200).json({ message: "Email Otp Verified", status: "Success", email});
//             } else {
//                 return res.json({ Error: "Incorrect OTP" });
//             }
           
//         } else {
//             return res.json({ Error:  "No user with this email exists" });
//         }
//     })
// })

// app.post('/api/admin/newPassword', async (req, res) => {
//     const email = req.body.email;

//     const salt = await bcrypt.genSalt(10);
//     const password = await bcrypt.hash(req.body.password, salt);
//     const sql = "SELECT * FROM esms.admins WHERE email = ?";
    
//     db.query(sql, [email], (err, data) => {
//         if (err) return res.json({ Error: "Error in Server" });
//         if (data.length > 0) {
//             bcrypt.compare(req.body.password.toString(), data[0].password, async (err, response) => {
//                 if (err) return res.json({ Error: "Password compare error in Server" });
//                 if (response) {
//                     res.status(200).json({ status: "Success", data: response, message: "New password is same as old password" });
//                 } else {
//                     if (req.body.password === req.body.repassword) {
//                         const sqlupdate = 'UPDATE esms.admins SET password = ? WHERE email=?;';
//                         db.query(sqlupdate, [password, req.body.email], (err, data) => {
//                             if (err) {
//                                 console.error(err);
//                                 return res.status(500).json({ error: "Error in Server" });
//                             } else {
//                                 console.log("Password Updated!!");
//                                 res.status(200).json({ status: "Success", message: "Password updated successfully" });
//                             }
//                         });
//                     } else {
//                         res.status(400).json({ error: "Passwords do not match" });
//                     }
//                 }
//             });
//         } else {
//             res.status(404).json({ error: "User not found" });
//         }
//     });
// });



// // for teacher ragistation 
// app.post('/api/teachregister', async (req, res) => {
//     const username = req.body.username;
//     const email = req.body.email;
//     const salt = await bcrypt.genSalt(10);
//     const password = await bcrypt.hash(req.body.password, salt);

//     const sql = "INSERT INTO `esms`.`teacher` (`username`, `email`, `password`) VALUES (?)"

//     const values = [
//         username,
//         email,
//         password
//     ]

//     db.query(sql, [values], (err, result) => {
//         if (err) return res.json({ Error: "Inserting data error in server side" })
//         return res.json({ status: "Success" });


//     })

// })
// // for teacher Login 
// app.post('/api/teacherlogin', (req, res) => {

//     const sql = "SELECT * FROM esms.teacher WHERE username = ?";
//     db.query(sql, [req.body.username], (err, data) => {
//         if (err) return res.json({ Error: "Login Error in Server" })
//         if (data.length > 0) {
//             bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
//                 if (err) return res.json({ Error: "Password compare error in Server" })
//                 if (response) {


//                     return res.json({ status: "Success" })
//                 } else {
//                     return res.json({ Error: "Password not matched!!" });

//                 }
//             })
//         } else {
//             return res.json({ Error: "No username existed" });
//         }
//     })
// })

// // for student ragistation 
// app.post('/api/studentregister', async (req, res) => {
//     const username = req.body.username;
//     const email = req.body.email;
//     const salt = await bcrypt.genSalt(10);
//     const password = await bcrypt.hash(req.body.password, salt);

//     const sql = "INSERT INTO `esms`.`student` (`name`, `email`, `password`) VALUES (?)"

//     const values = [
//         username,
//         email,
//         password
//     ]
//     console.log(values)
//     db.query(sql, [values], (err, result) => {
//         if (err) return res.json({ Error: "Password compare error in Server" })
//         return res.json({ status: "Success" });


//     })
// })


// // for teacher Login 
// app.post('/api/studentlogin', (req, res) => {

//     const sql = "SELECT * FROM esms.student WHERE username = ? and rollnum = ?";
//     db.query(sql, [req.body.username, req.body.rollnum], (err, data) => {
//         if (err) return res.json({ Error: "Login Error in Server" })
//         if (data.length > 0) {
//             bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
//                 if (err) return res.json({ Error: "Password compare error in Server" })
//                 if (response) {


//                     return res.json({ status: "Success" })
//                 } else {
//                     return res.json({ Error: "Password not matched!!" });

//                 }
//             })
//         } else {
//             return res.json({ Error: "No username existed" });
//         }
//     })
// })


// // for Parent ragistation 
// app.post('/api/parentregister', async (req, res) => {
//     const username = req.body.username;
//     const email = req.body.email;
//     const salt = await bcrypt.genSalt(10);
//     const password = await bcrypt.hash(req.body.password, salt);

//     const sql = "INSERT INTO `esms`.`parent` (`username`, `email`, `password`) VALUES (?)"

//     const values = [
//         username,
//         email,
//         password
//     ]
//     // console.log(values)
//     db.query(sql, [values], (err, result) => {
//         if (err) return res.json({ err })
//         return res.json({ status: "Success" });


//     })
// })


// // for parent Login 
// app.post('/api/parentslogin', (req, res) => {

//     const sql = "SELECT * FROM esms.parent WHERE username = ?";
//     db.query(sql, [req.body.username], (err, data) => {
//         if (err) return res.json({ Error: "Login Error in Server" })
//         if (data.length > 0) {
//             bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
//                 if (err) return res.json({ Error: "Password compare error in Server" })
//                 if (response) {


//                     return res.json({ status: "Success" })
//                 } else {
//                     return res.json({ Error: "Password not matched!!" });

//                 }
//             })
//         } else {
//             return res.json({ Error: "No username existed" });
//         }
//     })
// })

// app.listen(port, () => {
//     console.log("Lestinh!!")
// });
