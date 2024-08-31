import nodemailer from 'nodemailer';
import { db } from '../config/dbconnection.js';
import bcrypt from 'bcrypt';

//forgot password admin

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'esmshelpline@gmail.com',
        pass: 'twri tgyn qlej qpyc'
    }
});

export const adminPwd = (req, res) => {
    const email = req.body.email;

    const otp = Math.floor(100000 + Math.random() * 900000);
    const updateotp = 'UPDATE esms.admins SET otp = ? WHERE email=?; '
    db.query(updateotp, [otp, email], (err, response) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error in Server" });
        } else {
            console.log("OTP updated!!")
        }
    })

    const sql = "SELECT * FROM esms.admins WHERE email = ?";
    db.query(sql, [email], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error in Server" });
        }

        if (data.length > 0) {
            let mailOptions = {
                from: 'esmshelpline@gmail.com',
                to: email,
                subject: 'Password Reset Request',
                text: `Your OTP for password reset is: ${otp}. This OTP will expire in 5 minutes.`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.error(error);
                    return res.status(500).json({ error: "Error sending email" });
                } else {
                    console.log('Email sent: ' + info.response);
                    return res.status(200).json({ message: "Email sent successfully", status: "Success", email });
                }
            });
        } else {
            return res.status(404).json({ error: "User not found" });
        }
    });
};






export const adminVerifyOtp = async (req, res) => {
    // const otp = req.body.otp;
    const email = req.body.email;
    // console.log(otp, email)
    const sql = "SELECT otp FROM esms.admins WHERE email =?"
    db.query(sql, [email], (err, data) => {
        if (err) return res.json({ Error: " Error in Server" })
        if (data.length > 0) {
            if (data[0].otp === req.body.otp){
                return res.status(200).json({ message: "Email Otp Verified", status: "Success", email});
            } else {
                return res.json({ Error: "Incorrect OTP" });
            }
           
        } else {
            return res.json({ Error:  "No user with this email exists" });
        }
    })
};

export const adminNewPwd = async (req, res) => {
    const email = req.body.email;

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    const sql = "SELECT * FROM esms.admins WHERE email = ?";
    
    db.query(sql, [email], (err, data) => {
        if (err) return res.json({ Error: "Error in Server" });
        if (data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, async (err, response) => {
                if (err) return res.json({ Error: "Password compare error in Server" });
                if (response) {
                    res.status(200).json({ status: "Success", data: response, message: "New password is same as old password" });
                } else {
                    if (req.body.password === req.body.repassword) {
                        const sqlupdate = 'UPDATE esms.admins SET password = ? WHERE email=?;';
                        db.query(sqlupdate, [password, req.body.email], (err, data) => {
                            if (err) {
                                console.error(err);
                                return res.status(500).json({ error: "Error in Server" });
                            } else {
                                console.log("Password Updated!!");
                                res.status(200).json({ status: "Success", message: "Password updated successfully" });
                            }
                        });
                    } else {
                        res.status(400).json({ error: "Passwords do not match" });
                    }
                }
            });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    });
};

export const teacherPwd = (req, res) => {
    const email = req.body.email;

    const otp = Math.floor(100000 + Math.random() * 900000);
    const updateotp = 'UPDATE esms.teacher SET otp = ? WHERE email=?; '
    db.query(updateotp, [otp, email], (err, response) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error in Server" });
        } else {
            console.log("OTP updated!!")
        }
    })

    const sql = "SELECT * FROM esms.teacher WHERE email = ?";
    db.query(sql, [email], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error in Server" });
        }

        if (data.length > 0) {
            let mailOptions = {
                from: 'esmshelpline@gmail.com',
                to: email,
                subject: 'Password Reset Request',
                text: `Your OTP for password reset is: ${otp}. This OTP will expire in 5 minutes.`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.error(error);
                    return res.status(500).json({ error: "Error sending email" });
                } else {
                    console.log('Email sent: ' + info.response);
                    return res.status(200).json({ message: "Email sent successfully", status: "Success", email });
                }
            });
        } else {
            return res.status(404).json({ error: "User not found" });
        }
    });
};
export const teacherVerifyOtp = async (req, res) => {
    const otp = req.body.otp;
    const email = req.body.email;
    // console.log(otp, email)
    const sql = "SELECT otp FROM esms.teacher WHERE email =?"
    db.query(sql, [email], (err, data) => {
        if (err) return res.json({ Error: " Error in Server" })
        if (data.length > 0) {
            if (data[0].otp === req.body.otp){
                return res.status(200).json({ message: "Email Otp Verified", status: "Success", email});
            } else {
                return res.json({ Error: "Incorrect OTP" });
            }
           
        } else {
            return res.json({ Error:  "No user with this email exists" });
        }
    })
};

export const teacherNewPwd = async (req, res) => {
    const email = req.body.email;

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    const sql = "SELECT * FROM esms.teacher WHERE email = ?";
    
    db.query(sql, [email], (err, data) => {
        if (err) return res.json({ Error: "Error in Server" });
        if (data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, async (err, response) => {
                if (err) return res.json({ Error: "Password compare error in Server" });
                if (response) {
                    res.status(200).json({ status: "Success", data: response, message: "New password is same as old password" });
                } else {
                    if (req.body.password === req.body.repassword) {
                        const sqlupdate = 'UPDATE esms.teacher SET password = ? WHERE email=?;';
                        db.query(sqlupdate, [password, req.body.email], (err, data) => {
                            if (err) {
                                console.error(err);
                                return res.status(500).json({ error: "Error in Server" });
                            } else {
                                console.log("Password Updated!!");
                                res.status(200).json({ status: "Success", message: "Password updated successfully" });
                            }
                        });
                    } else {
                        res.status(400).json({ error: "Passwords do not match" });
                    }
                }
            });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    });
};

export const studentPwd = (req, res) => {
    const email = req.body.email;

    const otp = Math.floor(100000 + Math.random() * 900000);
    const updateotp = 'UPDATE esms.student SET otp = ? WHERE email=?; '
    db.query(updateotp, [otp, email], (err, response) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error in Server" });
        } else {
            console.log("OTP updated!!")
        }
    })

    const sql = "SELECT * FROM esms.student WHERE email = ?";
    db.query(sql, [email], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error in Server" });
        }

        if (data.length > 0) {
            let mailOptions = {
                from: 'esmshelpline@gmail.com',
                to: email,
                subject: 'Password Reset Request',
                text: `Your OTP for password reset is: ${otp}. This OTP will expire in 5 minutes.`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.error(error);
                    return res.status(500).json({ error: "Error sending email" });
                } else {
                    console.log('Email sent: ' + info.response);
                    return res.status(200).json({ message: "Email sent successfully", status: "Success", email });
                }
            });
        } else {
            return res.status(404).json({ error: "User not found" });
        }
    });
};
export const studentVerifyOtp = async (req, res) => {
    const otp = req.body.otp;
    const email = req.body.email;
    // console.log(otp, email)
    const sql = "SELECT otp FROM esms.student WHERE email =?"
    db.query(sql, [email], (err, data) => {
        if (err) return res.json({ Error: " Error in Server" })
        if (data.length > 0) {
            if (data[0].otp === req.body.otp){
                return res.status(200).json({ message: "Email Otp Verified", status: "Success", email});
            } else {
                return res.json({ Error: "Incorrect OTP" });
            }
           
        } else {
            return res.json({ Error:  "No user with this email exists" });
        }
    })
};

export const studentNewPwd = async (req, res) => {
    const email = req.body.email;

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    const sql = "SELECT * FROM esms.student WHERE email = ?";
    
    db.query(sql, [email], (err, data) => {
        if (err) return res.json({ Error: "Error in Server" });
        if (data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, async (err, response) => {
                if (err) return res.json({ Error: "Password compare error in Server" });
                if (response) {
                    res.status(200).json({ status: "Success", data: response, message: "New password is same as old password" });
                } else {
                    if (req.body.password === req.body.repassword) {
                        const sqlupdate = 'UPDATE esms.student SET password = ? WHERE email=?;';
                        db.query(sqlupdate, [password, req.body.email], (err, data) => {
                            if (err) {
                                console.error(err);
                                return res.status(500).json({ error: "Error in Server" });
                            } else {
                                console.log("Password Updated!!");
                                res.status(200).json({ status: "Success", message: "Password updated successfully" });
                            }
                        });
                    } else {
                        res.status(400).json({ error: "Passwords do not match" });
                    }
                }
            });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    });
};