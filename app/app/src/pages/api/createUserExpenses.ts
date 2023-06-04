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
    const createDate = new Date().toLocaleString();

    //ランダム文字列を作成
    const S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    const N=16;
    const rondom = Array.from(Array(N)).map(()=>S[Math.floor(Math.random()*S.length)]).join('');

    //ハッシュ化
    const saltRounds = 10;
    let hashed_key = bcrypt.hashSync(rondom, saltRounds);
    
    const sql = `INSERT INTO USER_EXPENSES_TABLE(USER_ID, EMAIL, EXPENSES_KEY, CREATE_DATE, EXPENSES_NAME) VALUES ('${id}','${email}','${hashed_key}','${createDate}','${name}')`;

    con.query(sql, (err, result) => {
        if(err) {
        return res.status(400).json({"error": err.message})
        }
        return res.json(result);
    })

}