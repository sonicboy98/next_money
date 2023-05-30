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

  const sql = `SELECT * FROM USER_TABLE WHERE USER_ID = '${id}'`;

  con.query(sql, async (err, result) => {

    //エラーの場合
    if(err) {
      return res.status(400).json({"error": err.message})
    }

    //パスワード認証
    try{
      const json = JSON.parse(JSON.stringify(result));
      const juddge = await bcrypt.compare(password,json[0].PASSWORD);
      if(!juddge) {
        return res.status(400).json({"error": "パスワードが認証できませんでした。"})
      }
    }
    catch{
      return res.status(400).json({"error": "パスワードが認証できませんでした。"})
    }


    return res.json(result);
  })

}