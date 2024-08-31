import { db } from '../config/dbconnection.js';
import bcrypt from 'bcrypt';


export const uploadProfile = (req, res) => {

    const image = req.file.filename;
    const sql = "UPDATE admins SET profilepic = ?"
    db.query(sql, [image], (err, data) => {
        if (err) return res.status(500).json({ error: "Database error" });
        return res.json({ status: "Success" })
    })
}



export const getSum = (req, res) => {
    const additionalSql1 = "SELECT COUNT(id) AS sum1 FROM esms.teacher";
    const additionalSql2 = "SELECT COUNT(id) AS sum2 FROM esms.student";
    const additionalSql3 = "SELECT COUNT(Class_Id) AS sum3 FROM esms.class";

    db.query(additionalSql1, (err, teacherSum) => {
        if (err) return res.status(500).json({ Error: "Error fetching additional data 1" });


        db.query(additionalSql2, (err, studentSum) => {
            if (err) return res.status(500).json({ Error: "Error fetching additional data 2" });


            db.query(additionalSql3, (err, classSum) => {
                if (err) return res.status(500).json({ Error: "Error fetching additional data 3" });


                const additionalData = {
                    sum1: teacherSum[0].sum1,
                    sum2: studentSum[0].sum2,
                    sum3: classSum[0].sum3
                };

                // Send the consolidated response
                res.status(200).json({
                    status: "Success",
                    additionalData
                });
            });
        });
    });
}
export const getPersonalData = (req, res) => {
    try {
        const sql = "SELECT * FROM esms.admins WHERE id=?";
        const id = req.query.id;  // Change from req.body.id to req.query.id
        console.log(`Received ID: ${id}`);
        console.log(typeof id, id);
        db.query(sql, [id], (err, data) => {
            if (err) {
                console.error("Error fetching additional data:", err);
                return res.status(500).json({ Error: "Error fetching additional data" });
            }

            res.status(200).json({
                status: "Success",
                data: data
            });
        });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ Error: "Internal server error" });
    }
}



// export const addStudent = async (req, res) => {
//     try {
//         const { username, name, classs, rollnumber, DoB, gender, fname, mname, mobile, address, email, password } = req.body;

//         // Check if the student already exists
//         const checkUserQuery = "SELECT * FROM esms.student WHERE username = ?";
//         const existingUser = await db.query(checkUserQuery, [username]);

//         if (existingUser.length > 0) {
//             return res.status(409).json({ error: "Student already exists!" });
//         }

//         // Hash the password
//         const saltRounds = 10;
//         const hashedPassword = await bcrypt.hash(password, saltRounds);

//         // Insert the new student
//         const insertQuery = "INSERT INTO esms.student (username, name, rollnumber, class, DoB, gender, fname, mname, mobile, address, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
//         const values = [username, name, rollnumber, classs, DoB, gender, fname, mname, mobile, address, email, hashedPassword];

//         // await db.query(insertQuery, values);
//         // return res.status(201).json({ status: "Success" });
//         db.query(insertQuery, [values], (err, responseData) => {
//             if (err) return res.status(500).json({ error: "Error inserting data" });
//             return res.status(201).json({ status: "Success" });
//         });
//     } catch (error) {
//         console.error("Error:", error);
//         return res.status(500).json({ error: "Server error" });
//     }
// };

export const addStudent = async (req, res) => {
    try {
        const { username, name, classs, rollnumber, DoB, gender, fname, mname, mobile, address, email, password } = req.body;
        // Check if the student already exists
        console.log(username, name, classs, rollnumber, DoB, gender, fname, mname, mobile, address, email, password)
        const checkUserQuery = "SELECT * FROM esms.student WHERE username = ?";
        db.query(checkUserQuery, [username], async (err, data) => {
            if (err) return res.status(500).json({ error: "Database error" });
            if (data.length) return res.status(409).json({ error: "Student already exists!" });

            // Hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Insert the new student
            const insertQuery = "INSERT INTO esms.student (`username`, `name`,`rollnumber`, `class`,  `DoB`, `gender`, `fname`, `mname`, `mobile`, `address`, `email`, `password`) VALUES (?)";
            const values = [
                username,
                name,
                rollnumber,
                classs,
                DoB,
                gender,
                fname,
                mname,
                mobile,
                address,
                email,
                hashedPassword
            ];

            db.query(insertQuery, [values], (err, responseData) => {
                if (err) return res.status(500).json({ error: "Error inserting data" });
                return res.status(201).json({ status: "Success" });
            });
        });
    } catch (error) {
        return res.status(500).json({ error: "Server error" });
    }
}
export const studentData = (req, res) => {
    const sql = "SELECT id, username, name, class, rollnumber, DoB, gender, fname, mname, mobile, address, email FROM esms.student;"
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json({ Error: "Error fetching student data!!" });
        res.status(200).json(data);
    })
}
export const deleteStudent = (req, res) => {
    const studentId = req.body.id;
    if (!studentId) {
        return res.status(400).send('Student ID is required');
    }

    const query = 'DELETE FROM esms.student WHERE id = ?';
    db.query(query, [studentId], (err, result) => {
        if (err) {
            console.error('Error deleting student:', err);
            res.status(500).send('Error deleting student');
            return;
        }

        if (result.affectedRows === 0) {
            res.status(404).send('Student not found');
        } else {
            res.send(`Student with ID ${studentId} deleted successfully`);
        }
    });

}
export const currentStudentData = (req, res) => {

    const { id } = req.query;
    // const { id } = req.body;
    console.log(" This is Id that use to Fatch data at Backend", id)
    const sql = " SELECT username, name, class, rollnumber, DoB, gender, fname, mname, mobile, address, email FROM esms.student WHERE id=?; "
    db.query(sql, [id], (err, data) => {
        if (err) return res.status(500).json({ Error: "Error fetching student data!!" });
        res.status(200).json(data);
        console.log(data)
    })
}
export const updateStudent = (req, res) => {

    const { currentStudentId, updateData } = req.body;

    console.log("This is currentStudentId data that used in backend to updation", currentStudentId);
    console.log("This is updateData data that used in backend to updation", updateData);
    console.log("This is updateData data ", updateData.username);
    const values = [
        updateData.username,
        updateData.name,
        updateData.class,
        updateData.rollnumber,
        updateData.DoB,
        updateData.gender,
        updateData.fname,
        updateData.mname,
        updateData.mobile,
        updateData.address,
        updateData.email,
        currentStudentId,

    ]
    const query = " UPDATE esms.student SET  username = ?, name = ?, class = ?, rollnumber = ?, DoB = ?, gender = ?, fname = ?, mname = ?, mobile = ?, address = ?, email = ? WHERE  id = ?"


    // Execute the query with the values
    db.query(query, values, (error, results, fields) => {
        if (error) {
            console.error('Error updating student data:', error);
        } else {
            res.status(200).json({
                status: "Success",
                message: "Student data Updated"
            });
            console.log('Student data updated successfully');
        }
    });
}
export const teacherData = (req, res) => {
    const sql = "SELECT id, inchargeof,  username, name,  DoB, gender, fname, mname, mobile, email, address FROM esms.teacher;"
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json({ Error: "Error fetching student data!!" });
        res.status(200).json(data);
    })
}
export const addTeacher = async (req, res) => {
    try {
        const { inchargeof, username, name, DoB, gender, fatherName, motherName, mobileNumber, address, email, password } = req.body;



        if (!username) {
            return res.status(400).send('teacher Username is required');
        }
        // Check if the student already exists

        const checkUserQuery = "SELECT * FROM esms.teacher WHERE username = ?";
        db.query(checkUserQuery, [username], async (err, data) => {
            if (err) return res.status(500).json({ error: "Database error at teacher ckecking" });
            if (data.length) return res.status(409).json({ error: "This Teacher already exists!" });

            // Hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Insert the new student
            const insertQuery = "INSERT INTO esms.teacher (`inchargeof`,`username`, `name`,  `DoB`, `gender`, `fname`, `mname`, `mobile`, `address`, `email`, `password`) VALUES (?)";
            const values = [
                inchargeof,
                username,
                name,
                DoB,
                gender,
                fatherName,
                motherName,
                mobileNumber,
                address,
                email,
                hashedPassword
            ];

            db.query(insertQuery, [values], (err, responseData) => {
                if (err) return res.status(500).json({ error: "Error inserting data" });
                return res.status(201).json({ status: "Success" });
            });
        });
    } catch (error) {
        return res.status(500).json({ error: "Server error ao teacher add" });
    }
}
export const deleteTeacher = (req, res) => {
    const teacherId = req.body.id;
    if (!teacherId) {
        return res.status(400).send('teacher ID is required');
    }

    const query = 'DELETE FROM esms.teacher WHERE id = ?';
    db.query(query, [teacherId], (err, result) => {
        if (err) {
            console.error('Error deleting Teacher:', err);
            res.status(500).send('Error deleting Teacher');
            return;
        }

        if (result.affectedRows === 0) {
            res.status(404).send('Teacher not found');
        } else {
            res.send(`Teacher with ID ${teacherId} deleted successfully`);
        }
    });

}
export const currentTeacherData = (req, res) => {

    const { id } = req.query;
    // const { id } = req.body;
    console.log(" This is Id that use to Fatch data at Backend", id)
    const sql = " SELECT  inchargeof, username, name, DoB, gender, fname, mname, mobile, address, email FROM esms.teacher WHERE id=?; "
    db.query(sql, [id], (err, data) => {
        if (err) return res.status(500).json({ Error: "Error fetching student data!!" });
        res.status(200).json(data);
        console.log(data)
    })
}
export const updateTeacher = (req, res) => {

    const { currentTeacherId, updateData } = req.body;

    console.log("This is currentTeacherId data that used in backend to updation", currentTeacherId);
    console.log("This is updateData data that used in backend to updation", updateData);
    console.log("This is updateData data ", updateData.username);
    const values = [
        updateData.inchargeof,
        updateData.username,
        updateData.name,
        updateData.DoB,
        updateData.gender,
        updateData.fname,
        updateData.mname,
        updateData.mobile,
        updateData.address,
        updateData.email,
        currentTeacherId,

    ]
    const query = " UPDATE esms.teacher SET  inchargeof = ? ,username = ?, name = ?, DoB = ?, gender = ?, fname = ?, mname = ?, mobile = ?, address = ?, email = ? WHERE  id = ?"


    // Execute the query with the values
    db.query(query, values, (error, results, fields) => {
        if (error) {
            console.error('Error updating student data:', error);
        } else {
            res.status(200).json({
                status: "Success",
                message: "Teacher data Updated"
            });
            console.log('Teacher data updated successfully');
        }
    });
}
export const announcementData = (req, res) => {
    const sql = "SELECT * FROM esms.announcement;"
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json({ Error: "Error fetching student data!!" });
        res.status(200).json(data);
    })
}
export const addAnnouncement = async (req, res) => {
    try {
        const { advtNo, title, date, discription } = req.body;
        // Check if the advtNo already exists
        const checkUserQuery = "SELECT * FROM esms.announcement WHERE advtNo = ?";
        db.query(checkUserQuery, [advtNo], async (err, data) => {
            if (err) return res.status(500).json({ error: "Database error" });
            if (data.length) return res.status(409).json({ error: "Advt No. already exists!" });
            const insertQuery = "INSERT INTO esms.announcement (advtNo, title, date, discription) VALUES (?)";
            const values = [
                advtNo,
                title,
                date,
                discription
            ];

            db.query(insertQuery, [values], (err, responseData) => {
                if (err) return res.status(500).json({ error: "Error inserting data" });
                return res.status(201).json({ status: "Success" });
            });
        });
    } catch (error) {
        return res.status(500).json({ error: "Server error" });
    }
}
export const deleteAnnouncement = (req, res) => {
    const AnnId = req.body.id;
    if (!AnnId) {
        return res.status(400).send('Announcement ID is required');
    }

    const query = 'DELETE FROM esms.announcement WHERE id = ?';
    db.query(query, [AnnId], (err, result) => {
        if (err) {
            console.error('Error deleting Announcement:', err);
            res.status(500).send('Error deleting Announcement');
            return;
        }

        if (result.affectedRows === 0) {
            res.status(404).send('Announcement not found');
        } else {
            res.send(`Announcement with ID ${AnnId} deleted successfully`);
        }
    });

}
export const currentAnnData = (req, res) => {
    const { id } = req.query;
    // const { id } = req.body;
    console.log(" This is Id that use to Fatch data at Backend", id)
    const sql = " SELECT  * FROM esms.announcement WHERE id=?; "
    db.query(sql, [id], (err, data) => {
        if (err) return res.status(500).json({ Error: "Error fetching student data!!" });
        res.status(200).json(data);
        console.log(data)
    })
}
export const updateAnn = (req, res) => {
    const { currentAnnId, updateData } = req.body;


    const values = [
        updateData.advtNo,
        updateData.title,
        updateData.date,
        updateData.discription,
        currentAnnId,

    ]
    console.log(values)
    const query = " UPDATE esms.announcement SET  advtNo = ? ,title = ?, date = ?, discription = ? WHERE  id = ?"
    // Execute the query with the values
    db.query(query, values, (error, results, fields) => {
        if (error) {
            console.error('Error updating currentAnnouncement data:', error);
        } else {
            res.status(200).json({
                status: "Success",
                message: "currentAnnouncement data Updated"
            });
            console.log('currentAnnouncement data updated successfully');
        }
    });
}
export const addClass = (req, res) => {
    try {
        const { class: classes, session } = req.body;
        console.log(classes)
        // Check if the advtNo already exists
        const checkUserQuery = "SELECT * FROM esms.class WHERE class_Name = ?";
        db.query(checkUserQuery, [classes], (err, data) => {

            if (err) return res.status(500).json({ error: "Database error" });
            if (data.length) return res.status(409).json({ error: "class already exists!" });
            const insertQuery = "INSERT INTO esms.class (class_name, session_year) VALUES (?)";
            const values = [
                classes,
                session
            ];

            db.query(insertQuery, [values], (err, responseData) => {
                if (err) return res.status(500).json({ error: "Error inserting data" });
                return res.status(201).json({ status: "Success" });
            });
        });
    } catch (error) {
        return res.status(500).json({ error: "Server error" });
    }
}
export const addSubject = (req, res) => {
    try {
        const { subjectName, subjectcode } = req.body;
        console.log(subjectName, subjectcode)
        // Check if the advtNo already exists
        const checkUserQuery = "SELECT * FROM esms.subject WHERE subject_code = ?";
        db.query(checkUserQuery, [subjectcode], (err, data) => {

            if (err) return res.status(500).json({ error: "Database error" });
            if (data.length) return res.status(409).json({ error: "class already exists!" });
            const insertQuery = "INSERT INTO esms.subject (subject_name, subject_code) VALUES (?)";
            const values = [
                subjectName,
                subjectcode
            ];

            db.query(insertQuery, [values], (err, responseData) => {
                if (err) return res.status(500).json({ error: "Error inserting data" });
                return res.status(201).json({ status: "Success" });
            });
        });
    } catch (error) {
        return res.status(500).json({ error: "Server error" });
    }
}
export const getClassData = (req, res) => {
    const sql = "SELECT * FROM esms.class;"
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json({ Error: "Error fetching class data!!" });
        res.status(200).json(data);
    })
}
export const getSubjectData = (req, res) => {
    const sql = "SELECT * FROM esms.subject;"
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json({ Error: "Error fetching subject data!!" });
        res.status(200).json(data);
    })
}
export const asignClassSubject = (req, res) => {
    const { class_id, subject_code } = req.body;
    console.log(class_id, subject_code);

    const selectSql = "SELECT * FROM esms.class_subject WHERE class_id = ? AND subject_code = ?;";
    db.query(selectSql, [class_id, subject_code], (err, data) => {
        if (err) {
            console.error("Error fetching class & subject data:", err);
            return res.status(500).json({ Error: "Error fetching class & subject data!!" });
        }

        if (data.length) {
            return res.status(200).json({ Message: "Class & subject data exists!!" });
        }

        if (!data.length) {
            const insertSql = "INSERT INTO esms.class_subject (class_id, subject_code) VALUES (?, ?);";
            db.query(insertSql, [class_id, subject_code], (err, result) => {
                if (err) {
                    console.error("Error inserting class & subject data:", err);
                    return res.status(500).json({ Error: "Error inserting class & subject data!!" });
                }

                res.status(200).json({ status: "Success", message: "Class and subject inserted successfully" });
            });
        }
    });
};
export const deleteClass = (req, res) => {
    const classId = req.body.id;
    if (!classId) {
        return res.status(400).send('class ID is required');
    }
    // First, check if the subject is assigned to any class
    const checkAssignmentQuery = 'SELECT class_id FROM esms.class_subject WHERE class_id = ?';
    db.query(checkAssignmentQuery, [classId], (err, data) => {
        if (err) {
            console.error('Error checking classId assignment:', err);
            return res.status(500).send('Error checking classId assignment');
        }

        if (data.length > 0) {
            res.status(400).send('Cannot delete classId, as it is assigned to a class');
        }

        // Proceed with deletion if the subject is not assigned
        if (!data.length) {

            const query = 'DELETE FROM esms.class WHERE class_id = ?';
            db.query(query, [classId], (err, result) => {
                if (err) {
                    console.error('Error deleting class:', err);
                    res.status(500).send('Error deleting class');
                    return;
                }

                if (result.affectedRows === 0) {
                    res.status(404).send('class not found');
                } else {
                    res.send(`class with ID ${classId} deleted successfully`);
                }
            });
        }
    });
}
export const deleteSubject = (req, res) => {
    const subjectId = req.body.id;
    console.log(subjectId)
    if (!subjectId) {
        return res.status(400).send('Subject ID is required');
    }

    // First, check if the subject is assigned to any class
    const checkAssignmentQuery = 'SELECT subject_code FROM esms.class_subject WHERE subject_code = ?';
    db.query(checkAssignmentQuery, [subjectId], (err, data) => {
        if (err) {
            console.error('Error checking subject assignment:', err);
            return res.status(500).send('Error checking subject assignment');
        }

        if (data.length > 0) {
            res.status(400).send('Cannot delete subject, as it is assigned to a class');
        }

        // Proceed with deletion if the subject is not assigned
        if (!data.length) {

            const deleteQuery = 'DELETE FROM esms.subject WHERE subject_code = ?';
            db.query(deleteQuery, [subjectId], (err, result) => {
                if (err) {
                    console.error('Error deleting subject:', err);
                    return res.status(500).send('Error deleting subject');
                }

                if (result.affectedRows === 0) {
                    return res.status(404).send('Subject not found');
                } else {
                    return res.send(`Subject with ID ${subjectId} deleted successfully`);
                }
            });
        }
    });
};
export const currentClassData = (req, res) => {
    const { id } = req.query;
    // const { id } = req.body;
    console.log(" This is Id that use to Fatch data at Backend", id)
    const sql = " SELECT  * FROM esms.class WHERE class_id=?; "
    db.query(sql, [id], (err, data) => {
        if (err) return res.status(500).json({ Error: "Error fetching student data!!" });
        res.status(200).json(data);
        console.log(data)
    })
}
export const currentSubjectData = (req, res) => {
    const { id } = req.query;
    // const { id } = req.body;
    console.log(" This is sub-code that use to Fatch data at Backend", id)
    const sql = " SELECT  * FROM esms.subject WHERE subject_code=?; "
    db.query(sql, [id], (err, data) => {
        if (err) return res.status(500).json({ Error: "Error fetching subject data!!" });
        res.status(200).json(data);
        console.log(data)
    })
}
export const updateClass = (req, res) => {

    const { updateClassData } = req.body;

    console.log("This is updateData data that used in backend to updation", updateClassData);

    const values = [
        updateClassData.class_name,
        updateClassData.session_year,
        updateClassData.class_id,

    ]

    const checkAssignmentQuery = 'SELECT class_id FROM esms.class_subject WHERE class_id = ?';
    db.query(checkAssignmentQuery, [updateClassData.class_id], (err, data) => {
        if (err) {
            console.error('Error checking class assignment:', err);
            return res.status(500).send('Error checking class assignment');
        }

        if (data.length > 0) {
            res.status(400).send('Cannot do updation in class,  as it is assigned to a class');
        }
        if (!data.length) {
            const query = " UPDATE esms.class SET  class_name = ?, session_year = ? WHERE  class_id = ?;"


            // Execute the query with the values
            db.query(query, values, (error, results, fields) => {
                if (error) {
                    console.error('Error updating class data:', error);
                } else {
                    res.status(200).json({
                        status: "Success",
                        message: "class data Updated"
                    });
                    console.log('class data updated successfully');
                }
            });
        }
    })

}
export const updateSubject = (req, res) => {

    const { updateSubjectData } = req.body;

    console.log("This is updateData data that used in backend to updation", updateSubjectData);

    const values = [
        updateSubjectData.subject_name,
        updateSubjectData.subject_code,
        updateSubjectData.subject_id,

    ]

    const checkAssignmentQuery = 'SELECT subject_code FROM esms.class_subject WHERE subject_code = ?';
    db.query(checkAssignmentQuery, [updateSubjectData.subject_code], (err, data) => {
        if (err) {
            console.error('Error checking class assignment:', err);
            return res.status(500).send('Error checking class assignment');
        }

        if (data.length > 0) {
            res.status(400).send('Cannot do updation in subject,  as it is assigned to a class');
        }
        if (!data.length) {
            const query = " UPDATE esms.subject SET  subject_name = ?, subject_code = ? WHERE  subject_id = ?;"

            // Execute the query with the values
            db.query(query, values, (error, results, fields) => {
                if (error) {
                    console.error('Error updating student data:', error);
                } else {
                    res.status(200).json({
                        status: "Success",
                        message: "Student data Updated"
                    });
                    console.log('Student data updated successfully');
                }
            });
        }
    })

}

// const bcrypt = require('bcrypt');
// const db = require('./db'); // Assuming you have a database module

export const resetPassword = async (req, res) => {
    const { id, oldpassword, newpassword, renewpassword } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'ID is required' });
    }

    if (newpassword !== renewpassword) {
        return res.status(400).json({ error: 'New Password and Re-New Password do not match' });
    }

    const sql = "SELECT password FROM esms.admins WHERE id = ?";

    try {
        db.query(sql, [id], async (err, data) => {
            if (err) {
                return res.status(500).json({ error: "Error fetching data from the server" });
            }

            if (data.length === 0) {
                return res.status(404).json({ error: "No user found with the provided ID" });
            }

            const isMatch = await bcrypt.compare(oldpassword, data[0].password);

            if (!isMatch) {
                return res.status(400).json({ error: "Old password is incorrect" });
            }

            const salt = await bcrypt.genSalt(10);
            const hashpassword = await bcrypt.hash(newpassword, salt);

            const updateSql = "UPDATE esms.admins SET password = ? WHERE id = ?";
            db.query(updateSql, [hashpassword, id], (err, result) => {
                if (err) {
                    return res.status(500).json({ error: "Error updating the password" });
                }

                res.status(200).json({
                    message: 'Password reset successfully',
                    status: "Success"
                });
            });
        });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
