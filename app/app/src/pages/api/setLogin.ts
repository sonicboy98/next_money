import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql2'
import { cpSync } from 'fs';
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
    const password = req.body.PASSWORD;
    const email = req.body.EMAIL;
    const createDate = new Date().toLocaleString();
    const saltRounds = 10;

    //ハッシュ化
    let hashed_password = bcrypt.hashSync(password, saltRounds);

    //ランダム文字列を作成
    // const S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    // const N=16;
    // const rondom = Array.from(Array(N)).map(()=>S[Math.floor(Math.random()*S.length)]).join('');
    

    const sql = `INSERT INTO USER_TABLE(USER_ID, PASSWORD, EMAIL, CREATE_DATE) VALUES ('${id}','${hashed_password}','${email}','${createDate}')`;

    con.query(sql, (err, result) => {
        if(err) {
        return res.status(400).json({"error": err.message})
        }
        return res.json(result);
    })

}