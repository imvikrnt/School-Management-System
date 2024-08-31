import { db } from '../config/dbconnection.js';

export const contentForm = (req, res) => {
    console.log(req.body);

    const name = req.body.name;
    const email = req.body.email;
    const mobile = req.body.mobile;
    const message = req.body.message;  // Corrected from 'messsge' to 'message'

    const sql = "INSERT INTO esms.contect (`name`, `email`, `mobile`, `message`) VALUES (?)";
    const values = [
        name,
        email,
        mobile,
        message
    ];

    db.query(sql, [values], (err, data) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).json({ Error: "Error inserting data" });
        }
        return res.status(201).json({ status: "Success", Message: "Contact Form Submitted Successfully" });
    });

    console.log("Request processing completed");
};
