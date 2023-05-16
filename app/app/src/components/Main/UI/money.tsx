import React from 'react'

type Props = {
    money1:number;          //該当月残金
    money2:number;          //該当月入金
    money3:number;          //該当月出金
  };

// グラフのコンポーネントの関数を作成
export const Money = ({money1,money2,money3}:Props) => {

  return (
    <div className=' w-full p-5 text-right text-gray-700'>

        {/* 残金 */}
        <div className='flex flex-row-reverse text-4xl text-right mt-3'>
            <div>{money1.toLocaleString()}</div>
            <div className='px-4'>残金</div>
        </div>

        {/* 入金 */}
        <div className='flex flex-row-reverse text-xl text-right mt-3'>
            <div>{money2.toLocaleString()}</div>
            <div className='px-4'>入金</div>
        </div>

        {/* 出金 */}
        <div className='flex flex-row-reverse text-xl text-right mt-3'>
            <div>{money3.toLocaleString()}</div>
            <div className='px-4'>出金</div>
        </div>

    </div>
  );
}
export default Money