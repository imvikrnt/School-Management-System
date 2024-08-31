import { db } from '../config/dbconnection.js';

export const dashInfo = (req, res) => {
    const id = req.query.id;
    // const id = req.body.id;
    console.log(id);

    const sql = "SELECT name, inchargeof FROM esms.teacher WHERE id=?;";
    db.query(sql, [id], (err, teacherinfo) => {
        if (err) return res.status(500).json({ Error: "Error fetching teacher info" });

        if (!teacherinfo.length) return res.status(404).json({ Error: "Teacher not found" });
        
        console.log(teacherinfo);
        const inchargeof = teacherinfo[0].inchargeof;
        console.log(inchargeof);

        const countSub = `SELECT COUNT(cs.subject_code) AS subject_count
                          FROM class_subject cs
                          JOIN class c ON cs.class_id = c.class_id
                          WHERE c.class_name = '4';`;

        db.query(countSub, (err, countt) => { // Remove [inchargeof] from query parameters for countSub
            if (err) return res.status(500).json({ Error: "Error fetching count of subjects" });
            console.log("count", countt);

            const countStd = "SELECT COUNT(id) AS student_count FROM esms.student WHERE class =?";
            db.query(countStd, [inchargeof], (err, countStd) => {
                if (err) return res.status(500).json({ Error: "Error fetching count of students" });
                console.log("count", countStd);

                const response = {
                   
                    teacherinfo: teacherinfo[0], // Send the first (and presumably only) entry in teacherinfo
                    subject_count: countt[0].subject_count, // Send the subject count
                    student_count: countStd[0].student_count // Send the student count
                };

                res.status(200).json( { status: "Success",response});
            });
        });
    });
};



// export const dashInfo = (req, res) => {
//     const id = req.query.id;
//     // const id = req.body.id;
//     console.log(id)
//     const sql = "SELECT name, inchargeof FROM esms.teacher WHERE id=?;"
//     db.query(sql, [id], (err, teacherinfo) => {
//         if (err) return res.status(500).json({ Error: "Error fetching additional data 1" });
//         console.log(teacherinfo)
//         const inchargeof = teacherinfo[0].inchargeof;
//         console.log(inchargeof)


//         const countSub = ` SELECT COUNT(cs.subject_code) AS subject_count
//                 FROM class_subject cs
//                 JOIN class c ON cs.class_id = c.class_id
//                 WHERE c.class_name = '4';
//                 `
//         db.query(countSub, [inchargeof], (err, countt) => {
//             // if (err) return res.status(500).json({ Error: "Error fetching in count of sunject " });
//             // console.log("count", countt)
//             // res.status(200).json({
//             //     status: "Success",
//             //     countt
//             // });
        
//                 const countStd = "SELECT COUNT() FROM esms.student WHERE class =?"
//                 db.query(countStd, [inchargeof], (err, countStd) => {
//                     if (err) return res.status(500).json({ Error: "Error fetching in count of student " });
//                     console.log("count", countStd)
//                     res.status(200).json({
//                         status: "Success",
//                         countStd
//                     });
//                 });
//         });
//         // res.status(200).json({
//         //     status: "Success",
//         //     teacherinfo
//         // });
//     });







// }

// // export const getSum = (req, res) => {
// //     const additionalSql1 = "SELECT COUNT(id) AS sum1 FROM esms.teacher";
// //     const additionalSql2 = "SELECT COUNT(id) AS sum2 FROM esms.student";
// //     const additionalSql3 = "SELECT COUNT(Class_Id) AS sum3 FROM esms.class";

// //     db.query(additionalSql1, (err, teacherSum) => {
// //         if (err) return res.status(500).json({ Error: "Error fetching additional data 1" });


// //         db.query(additionalSql2, (err, studentSum) => {
// //             if (err) return res.status(500).json({ Error: "Error fetching additional data 2" });


// //             db.query(additionalSql3, (err, classSum) => {
// //                 if (err) return res.status(500).json({ Error: "Error fetching additional data 3" });


// //                 const additionalData = {
// //                     sum1: teacherSum[0].sum1,
// //                     sum2: studentSum[0].sum2,
// //                     sum3: classSum[0].sum3
// //                 };

// //                 // Send the consolidated response
// //                 res.status(200).json({
// //                     status: "Success",
// //                     additionalData
// //                 });
// //             });
// //         });
// //     });
// // }