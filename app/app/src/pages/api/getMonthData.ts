import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql2'


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

  const date = req.body.date;
  const sql = `SELECT * FROM MONEY_HISTRY_TABLE WHERE DATE_FORMAT(DATE, '%Y%m') = ${date}`;

  con.query(sql, (err, result) => {
    if(err) {
      return res.status(400).json({"error": err.message})
    }
    return res.json(result);
  })

}
