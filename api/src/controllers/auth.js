import bcrypt from 'bcrypt';
import { db } from '../config/dbconnection.js';


db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected');
});


export const checkAuth = (req, res) => {
    res.send("maxaa aa gya")
}
// admin registation
export const adminRegister = (req, res) => {
    // get data from backend to check user exists or not
    const q = "SELECT * FROM esms.admins WHERE username = ?";

    db.query(q, [req.body.username], async (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("User already exists!");
        //CREATE A NEW USER
        //Hash the password
        const username = req.body.username;
        const email = req.body.email;
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);
        console.log(username, email, password)

        const sql = "INSERT INTO esms.admins (`username`, `email`, `password`) VALUES (?)"
        const values = [
            username,
            email,
            password
        ]
        db.query(sql, [values], (err, responseData) => {
            if (err) return res.json({ Error: "Inserting datad error in server side" })
            return res.json({ status: "Success" });
        })
    });
}

// admin login
// export const adminLogin = (req, res) => {

//     const sql = "SELECT * FROM esms.admins WHERE username = ?";
//         db.query(sql, [req.body.username], (err, data) => {
//             if (err) return res.json({ Error: "Login Error in Server" })
//             if (data.length > 0) {
//                 bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
//                     if (err) return res.json({ Error: "Password compare error in Server" })
//                     if (response) {
//                         const id = data[0].id
//                         res.status(200).json({ status: "Success", id});

//                     } else {
//                         return res.json({ Error: "Password not matched!!" });

//                     }
//                 })
//             } else {

//                 return res.json({ Error: "No username existed" });
//             }
//         })

// }
export const adminLogin = (req, res) => {
    console.log(req.body.password, req.body.username)
    const sql = "SELECT * FROM esms.admins WHERE username = ?";

    db.query(sql, [req.body.username], (err, data) => {
        if (err) return res.status(500).json({ Error: "Login Error in Server" });

        if (data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if (err) return res.status(500).json({ Error: "Password compare error in Server" });

                if (response) {
                    const id = data[0].id;
                    const user = {
                        username: data[0].username,
                        email: data[0].email,
                    };
                    res.status(200).json({
                        status: "Success",
                        id,
                        user
                    });

                } else {
                    return res.status(400).json({  status: "Failed", Error: "Password not matched!!" });
                }
            });
        } else {
            return res.status(404).json({ Error: "No username existed" });
        }
    });
};


//student login
export const studentLogin = (req, res) => {
    const sql = "SELECT * FROM esms.student WHERE username = ? and rollnumber = ?";
    db.query(sql, [req.body.username, req.body.rollnum], (err, data) => {
        if (err) return res.json({ Error: "Login Error in Server" })
        if (data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if (err) return res.json({ Error: "Password compare error in Server" })
                if (response) {
                    const id = data[0].id
                    return res.json({ status: "Success", id })
                } else {
                    return res.json({ status: "Failed", Error: "Password not matched!!" });

                }
            })
        } else {
            return res.json({ Error: "No username existed" });
        }
    })
}

//techer login
export const teacherLogin = (req, res) => {

    const sql = "SELECT * FROM esms.teacher WHERE username = ?";
    db.query(sql, [req.body.username], (err, data) => {
        if (err) return res.json({ Error: "Login Error in Server" })
        if (data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if (err) return res.json({ Error: "Password compare error in Server" })
                if (response) {
                    const id = data[0].id
                    return res.json({ status: "Success", id })
                } else {
                    return res.json({ Error: "Password not matched!!" });

                }
            })
        } else {
            return res.json({ Error: "No username existed" });
        }
    })
}