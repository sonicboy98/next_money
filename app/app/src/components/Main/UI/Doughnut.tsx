import React from 'react'
// chart.jsをインポートする
import { Chart, registerables } from "chart.js"
// eact-chartjs-2から、ドーナッツグラフをインポートする
import { Doughnut } from "react-chartjs-2"
// こちらのコードを書かないと画面にグラフを描画できない?
Chart.register(...registerables)

type Props = {
    data:{
        labels: string[],
        datasets: [
          {
            data: number[]
            backgroundColor:string[],
            borderColor:string[]
          }
        ]
    }

  };

// グラフのコンポーネントの関数を作成
export const DoughnutChart = ({data}:Props) => {

  return (
    <main className='flex justify-center' >
      {/* CSSをタグの中に書いてサイズを調整する */}
      <div className='flex justify-center'>
        <Doughnut data={data}　width={280}　height={280} />
      </div>
    </main>


  );
}
export default DoughnutChart