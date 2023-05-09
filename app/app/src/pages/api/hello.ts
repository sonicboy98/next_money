// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql2'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const con = mysql.createConnection({
    host: 'mysql',//'mysql.csaxahmtsgnd.ap-southeast-2.rds.amazonaws.com',
    port: 3306,
    user: 'test',
    password: 'test',
    database: 'sample'
  });
  //res.status(200).json({ name: 'John Doe' })
  const aaa = req.body.name;
  console.log(aaa)
  const sql = `SELECT * FROM ITEM_TABLE WHERE ITEM_NAME = '${aaa}'`

  con.query(sql, (err, result) => {
    // エラーが発生した場合はエラーメッセージを返す
    if(err) {
      return res.status(400).json({"error": err.message})
    }

    return res.json(result);
  })

}
