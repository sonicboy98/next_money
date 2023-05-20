import React from 'react'

type Props = {
    money1:number;          //該当月残金
    money2:number;          //該当月入金
    money3:number;          //該当月出金
  };

// グラフのコンポーネントの関数を作成
export const Money = ({money1,money2,money3}:Props) => {

  return (
    <div className=' w-full text-right text-gray-700'>

        {/* 残金 */}
        <div className='flex justify-center text-4xl text-right mt-2'>
        <div className='px-4'>残金</div>
            <div>{money1.toLocaleString()}</div>
        </div>

        {/* 入金 */}
        <div className='flex mt-2 gap-1'>
          <div className='flex justify-center text-xl text-right mt-3 w-1/2'>
            <div className='flex justify-center bg-sky-200 rounded-3xl'>
              <div className='px-4'>+</div>
              <div className='px-4'>{money2.toLocaleString()}</div>
            </div>
          </div>

          {/* 出金 */}
          <div className='flex justify-center flex-col-reverse text-xl text-right mt-3 w-1/2'>
            <div className='flex justify-center bg-red-200 rounded-3xl'>
              <div className='px-4'>-</div>
              <div className='px-4'>{money3.toLocaleString()}</div>
            </div>
          </div>
        </div>


    </div>
  );
}
export default Money