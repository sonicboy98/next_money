
import React, { useCallback, useContext, useEffect, useLayoutEffect } from 'react'
import Doughnut from './Doughnut';
import Money from './money';
import { TableUI } from './TableUI';
import axios from "axios";
import { useState } from "react";
import Tags from '../../../class/Main/Tags'
import DoughuntData from '../../../class/Main/DoughnutData'
import { Context } from '@/lib/store/context';
import { useQRCode } from 'next-qrcode';
import router from 'next/router';
import Image from 'next/image';

type Props = {
    //date:Date;
    onClick:() => void;
    //changeMonth:(key:string) => void;
};

type MonthDataTable = {
    DATE:string;
    ITEM_NAME:string;
    MONEY:number;
    PAYMENT:number;
    USER_ID:string;
    USER_EMAIL:string;
    TAG:string;
    EXPENSES_KEY:string;
}

type TableData = {
    DATE:string;
    ITEM_NAME:string;
    MONEY:number;
    PAYMENT:string;
    USER_ID:string;
    USER_EMAIL:string;
    TAG:string;
    EXPENSES_KEY:string;
}



const initMonthData = () => {
    const data:MonthDataTable[] = [];
    return data;
}


const tags = new Tags();




// グラフのコンポーネントの関数を作成
export const Card = ({onClick}:Props) => {

    //アカウント情報グローバル
    const { context, setContext } = useContext(Context);

    //QR表示管理
    const [isQRModal, setQRModal] = useState(false);
    //QRコード生成
    const { Canvas } = useQRCode();

    // ({
    //     text: process.env.NEXTAUTH_URL + '/?expenses_key=' + context.EXPENSES_KEY,
    //     options: {
    //       level: 'H', //誤り訂正レベル
    //       margin: 3, //QRコードの周りの空白マージン
    //       scale: 1, 
    //       width: 200,
    //     },
    // });
    

    //月単位のデータ---------------------------------------------------------------------------
    const [CurrentMonthList,setCurrentMonthList] = useState(initMonthData());
    useLayoutEffect(() => {

        //リダイレクト処理
        if(!context.USER_ID){
            router.replace('/')
        }

        let monthData:MonthDataTable[] = [];
        let monthDataTable:MonthDataTable[] = [];
        const aaa = {EXPENSES_KEY:context.EXPENSES_KEY};
        const res = axios.post('/api/getMonthData',aaa)
        res.then(data => {
            monthData = data.data;

            if(monthData){
                monthData.map(data => {
                    monthDataTable.push({
                        DATE:data.DATE,
                        ITEM_NAME:data.ITEM_NAME,
                        MONEY:data.MONEY,
                        PAYMENT:data.PAYMENT,
                        USER_ID:data.USER_ID,
                        USER_EMAIL:data.USER_EMAIL,
                        TAG:data.TAG,
                        EXPENSES_KEY:data.EXPENSES_KEY
                    })
                })
            }

            setCurrentMonthList(monthDataTable);
            createGraphDataSets(monthDataTable);
            sumInMoney(monthDataTable);
            sumOutMoney(monthDataTable);

        })
        .catch(err => {
            console.log(err)
        })

    },[context]);

    //入金計算----------------------------------------------
    const [inMoney,setInMoney] = useState(0);

    const sumInMoney = (monthDataTable:MonthDataTable[]) => {
        let num = 0;

        if(!monthDataTable){
            return num;
        }

        monthDataTable.map(data => {
            if(data.PAYMENT === 0){
                num += data.MONEY
            }
        })
        setInMoney(num)
    }

    //出金計算----------------------------------------------
    const [outMoney,setOutMoney] = useState(0);
    const sumOutMoney = (monthDataTable:MonthDataTable[]) => {
        let num = 0;

        if(!monthDataTable){
            return num;
        }

        monthDataTable.map(data => {
            if(data.PAYMENT !== 0){
                num += data.MONEY
            }
        })
        setOutMoney(num)
    }

    //テーブルデータ作成--------------------------------------
    const createTableData = () => {
        let data:TableData[] = [];

        if(!CurrentMonthList){
            return data;
        }

        CurrentMonthList.map(list => {
            data.push({
                DATE:list.DATE,
                ITEM_NAME:list.ITEM_NAME,
                MONEY:list.MONEY,
                PAYMENT:(list.PAYMENT === 0) ? '入金':'出金',
                USER_ID:list.USER_ID,
                USER_EMAIL:list.USER_EMAIL,
                TAG:list.TAG,
                EXPENSES_KEY:list.EXPENSES_KEY,
            })
        })

        return data;
    }

    //ドーナッツグラフデータ作成-------------------------------
    const [GraphDataSets,setGraphDataSets] = useState(new DoughuntData());


    const createGraphDataSets = (monthDataTable:MonthDataTable[]) => {

        let datasets = new DoughuntData();
        const inDatasets = inGraphData(monthDataTable);
        const outDatasets = outGraphData(monthDataTable);

        //入金-出金で差を出す
        outDatasets.data.map(out => {
            inDatasets.data[0] -= out;
        })
        inDatasets.data[0] > 0 ? inDatasets.data[0] : inDatasets.data[0] = 0;

        //マージ
        const margeLabel = [...outDatasets.labels,...inDatasets.labels];
        const margeData = [...outDatasets.data,...inDatasets.data];
        const margeBackgroundColor = [...outDatasets.backgroundColor,...inDatasets.backgroundColor];
        const margeBorderColor = [...outDatasets.borderColor,...inDatasets.borderColor];

        //セット
        datasets.labels = margeLabel;
        datasets.data = margeData;
        datasets.backgroundColor = margeBackgroundColor;
        datasets.borderColor = margeBorderColor;

        console.log(inDatasets)
        setGraphDataSets(datasets);
       
    }

    const inGraphData = (monthDataTable:MonthDataTable[]) => {
        const datasets = new DoughuntData();

        let tmp:{
            data:number,
            id:string 
        }[]= [];
        tags.tags.map(tag => {

            let sum = 0;

            monthDataTable.map(list => {
                if(list.TAG === tag.ID && list.PAYMENT === 0){
                    sum += list.MONEY;
                }
            });
            if(sum !== 0){
                tmp.push({
                    data:sum,
                    id:tag.ID,
                })
            }

        })

        //ここでtmpソートする
        tmp.sort(function(a, b) {
            if (a.data > b.data) {
              return 1;
            } else {
              return -1;
            }
          })

        tmp.map(tm => {
            datasets.data.push(tm.data);

            tags.tags.map(tag => {
                if(tm.id === tag.ID){
                    datasets.backgroundColor.push(tag.BACK_GROUND_COLOR);
                    datasets.borderColor.push(tag.BORDER_COLOR);
                    datasets.labels.push(tag.NAME);
                }
            })
        })

        return datasets;
    }

    const outGraphData = (monthDataTable:MonthDataTable[]) => {

        const datasets = new DoughuntData();

        let tmp:{
            data:number,
            id:string 
        }[]= [];

        tags.tags.map(tag => {

            let sum = 0;

            monthDataTable.map(list => {
                if(list.TAG === tag.ID && list.PAYMENT === 1){
                    sum += list.MONEY;
                }
            });

            if(sum !== 0){
                tmp.push({
                    data:sum,
                    id:tag.ID,
                })
            }

        })

        //ここでtmpソートする
        tmp.sort(function(a, b) {
            if (a.data > b.data) {
              return 1;
            } else {
              return -1;
            }
          })

        tmp.map(tm => {
            datasets.data.push(tm.data);

            tags.tags.map(tag => {
                if(tm.id === tag.ID){
                    datasets.backgroundColor.push(tag.BACK_GROUND_COLOR);
                    datasets.borderColor.push(tag.BORDER_COLOR);
                    datasets.labels.push(tag.NAME);
                }
            })
        })

        return datasets;
    }

    const popUp = () => {
        onClick();
    }

    const show_QR = () => {
        setQRModal(true);
    }

    const close_QR = () => {
        setQRModal(false);
    }

  return (

    <div className="bg-white rounded overflow-hidden shadow-2xl p-2 mx-6 z-50">

        {/* 共有 */}
        <div className=" absolute right-9 top-14 text-black">
            <button onClick={show_QR} >
              <Image className=" h-full w-full items-center p-1" src="/Main/share.png" alt="share" width={25} height={25} />
            </button>
        </div>

        {/* タイトル */}
        <div className="text-4xl text-black text-center py-5">{context.EXPENSES_NAME}</div>

        {/* ドーナッツグラフ表示 */}
        <Doughnut data={{
            labels: GraphDataSets.labels,
            datasets: [{
                data: GraphDataSets.data,
                backgroundColor: GraphDataSets.backgroundColor,
                borderColor: GraphDataSets.borderColor
            }],

        }} />


        {/* お金表示 */}
        <div className="px-3 py-2">
            <Money money1={inMoney - outMoney} money2={inMoney} money3={outMoney}  />
        </div>

        <div className='flex flex-row-reverse p-2 rounded-3xl'>
            <button onClick={popUp} className="bg-gradient-to-r from-pink-300 to-orange-300 rounded-xl  m-2 w-full ">収支入力</button>
        </div>

        <TableUI MonthData={createTableData()}/>

        {/* 入力モーダル画面 */}
        {
            (isQRModal) ?
            <div onClick={close_QR} className="fixed z-50 top-0 w-screen h-screen left-0 ">
                <div className=' fixed w-full h-full bg-black opacity-60 z-10'></div>
                <div className='fixed w-full top-1/3 flex justify-center z-[10000]'>
                    <Canvas
                        text={'http://yzexpenses.com:3000/view/ShareExpenses/?expenses_key=' + context.EXPENSES_KEY}
                        options={{
                            level: 'H',
                            margin: 3,
                            scale: 4,
                            width: 200,
                            color: {
                            dark: '#010599FF',
                            light: '#FFBF60FF',
                            },
                        }}
                    />
                </div>

            </div>
            :
            <div>

            </div>
        }



    </div>
  );
}
export default Card

