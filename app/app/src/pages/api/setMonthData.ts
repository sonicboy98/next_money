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
  console.log(req.body)
  const date = req.body.DATE;
  const payment = req.body.PAYMENT;
  const money = req.body.MONEY;
  const name = req.body.ITEM_NAME;
  const id = req.body.USER_ID;
  const email = req.body.USER_EMAIL;
  const sql = `INSERT INTO MONEY_HISTRY_TABLE(DATE, PAYMENT, MONEY, ITEM_NAME,USER_ID,USER_EMAIL) VALUES ('${date}','${payment}','${money}','${name}','${id}','${email}')`;

  con.query(sql, (err, result) => {
    if(err) {
      return res.status(400).json({"error": err.message})
    }
    return res.json(result);
  })

}
