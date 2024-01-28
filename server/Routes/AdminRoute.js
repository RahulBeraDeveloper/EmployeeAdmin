const express = require('express');
const adminRouter = express.Router(); // Use adminRouter instead of Router
const con = require('../utils/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');
const upload = require('multer')(); // Assuming you have multer configured properly

adminRouter.post("/adminlogin", (req, res) => {
  const sql = "SELECT * from admin Where email = ? and password = ?";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email, id: result[0].id },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie('token', token);
      return res.json({ loginStatus: true });
    } else {
      return res.json({ loginStatus: false, Error:"wrong email or password" });
    }
  });
});

adminRouter.post('/addEmployee', upload.single('image'), (req, res) => {
  const sql = `INSERT INTO employee 
  (name, email, password, address, salary, image) 
  VALUES (?, ?, ?, ?, ?, ?)`;

  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) return res.json({ Status: false, Error: 'Password Hashing Error' });

    // Read the image file data
    const imageBuffer = fs.readFileSync(req.file.path);

    const values = [
      req.body.name,
      req.body.email,
      hash,
      req.body.address,
      req.body.salary,
      imageBuffer, // Use the image buffer directly
    ];

    con.query(sql, values, (err, result) => {
      if (err) {
        console.error('Database Error:', err);
        return res.json({ Status: false, Error: 'Database Error' });
      }

      // Remove the temporary file after it's been read
      fs.unlinkSync(req.file.path);

      return res.json({ Status: true });
    });
  });
});

adminRouter.get('/employee', (req, res) => {
  const sql = "SELECT * FROM employee";
  con.query(sql, (err, result) => {
    if(err) return res.json({Status: false, Error: "Query Error"});
    return res.json({Status: true, Result: result});
  });
});

module.exports = { adminRouter };
