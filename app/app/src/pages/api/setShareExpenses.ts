import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql2'
const bcrypt = require('bcrypt');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const con = mysql.createConnection({
        host: 'mysql',
        port: 3306,
        user: 'test',
        password: 'test',
        database: 'sample'
    });

    const id = req.body.USER_ID;
    const email = req.body.EMAIL;
    const name = req.body.EXPENSES_NAME
    const key = req.body.EXPENSES_KEY
    const createDate = new Date().toLocaleString();
    
    const sql = `INSERT INTO USER_EXPENSES_TABLE(USER_ID, EMAIL, EXPENSES_KEY, CREATE_DATE, EXPENSES_NAME) VALUES ('${id}','${email}','${key}','${createDate}','${name}')`;

    con.query(sql, (err, result) => {
        if(err) {
        return res.status(400).json({"error": err.message})
        }
        return res.json(result);
    })

}