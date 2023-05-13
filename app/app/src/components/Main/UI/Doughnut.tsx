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
        datasets: [{
          data: number[]
          }
        ]
    }

  };

// グラフのコンポーネントの関数を作成
export const DoughnutChart = ({data}:Props) => {

  return (
    <main className=' flex justify-center' >
      {/* CSSをタグの中に書いてサイズを調整する */}
      <div className='w-5/6  px-5'>
        <Doughnut data={data} />
      </div>
    </main>


  );
}
export default DoughnutChart