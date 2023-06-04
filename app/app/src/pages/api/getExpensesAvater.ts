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

    const key = req.body.EXPENSES_KEY;

    const sql = `SELECT * FROM USER_EXPENSES_TABLE WHERE EXPENSES_KEY = '${key}' ORDER BY EXPENSES_NO `;

    con.query(sql, (err, result) => {
        if(err) {
            return res.status(400).json({"error": err.message})
        }
        return res.json(result);
    })

}