const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const axios = require('axios');
const mysql=require('mysql2');

const port = 4000;
const app = express();
app.use(cors())
app.use(bodyParser.json());

const pool = mysql.createPool({
    host: 'db4free.net',
    user: 'pavan_2614',
    password: 'Pavan@2614',
    database: 'bloodbuddy',
    connectTimeout: 60000
});
app.get('/', (req, res) => {
    const sql = 'SELECT * FROM Blinkit';
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error getting MySQL connection:', err.message);
        return res.json(err);
      }
      connection.query(sql, (queryErr, results) => {
        connection.release();
        if (queryErr) {
          console.error('Error executing MySQL query:', queryErr.message);
          return res.json(queryErr);
        }
        return res.json(results);
      });
    });
  });
  
  app.post('/login', async(req,res)=>{
    const {email,password}=req.body;
    const sql='SELECT * FROM Blinkit WHERE email= ?';
    pool.getConnection((err,connection)=>{
      if(err){
        console.log('Error While connecting',err)
        return res.status(500).json(err);
      }
      connection.query(sql,[email],async(queErr,result)=>{
        connection.release();
  
        if(queErr){
          console.error('Error while running query:',queErr)
          return res.status(500).json(queErr)
        }
        const user=result[0];
  
        if(user){
          const passwordMatch=await bcrypt.compare(password,user.password)
          if (passwordMatch){
            res.json({message: 'Login successful!',user})
          }
          else{
            console.log('Password not same');
            res.status(401).json({ message: 'Invalid  password' });
          }
        }
        else{
          console.log("no user");
          res.status(401).json({ message: 'user not found' });
        }
      })
    })
  })
  
  app.post('/', async (req, res) => {
    const { name, phoneNo, email, password, confirmPassword } = req.body;
    const checkEmailSql = 'SELECT * FROM Blinkit WHERE Email = ?';
    const insertUserSql = 'INSERT INTO Blinkit (Email, Password, Name, Phone) VALUES (?, ?, ?, ?)';
  
    try {
      const [checkResult] = await pool.promise().query(checkEmailSql, [email]);
      if (checkResult.length > 0) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
      }
        const hashedPassword = await bcrypt.hash(password, 10);
        const [insertResult] = await pool.promise().query(insertUserSql, [email, hashedPassword, name, phoneNo]);

      console.log('Data inserted:', insertResult);
      res.json({ message: 'User registered successfully!' });
    } catch (error) {
      console.error('Error during user registration:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
app.listen(port,()=>{
    console.log("server is listening");
})
