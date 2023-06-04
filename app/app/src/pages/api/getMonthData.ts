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

  const expenses = req.body.EXPENSES_KEY;
  const sql = `SELECT * FROM MONEY_HISTRY_TABLE WHERE EXPENSES_KEY = '${expenses}'`;

  con.query(sql, (err, result) => {
    if(err) {
      return res.status(400).json({"error": err.message})
    }
    return res.json(result);
  })

}
