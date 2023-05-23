
import { Button } from 'flowbite-react';
import React, { useCallback, useEffect } from 'react'
import Doughnut from './Doughnut';
import Money from './money';
import { TableUI } from './TableUI';
import axios from "axios";
import { useState } from "react";
import { useSession } from 'next-auth/react';
import Tags from '../../../class/Main/Tags'
import DoughuntData from '../../../class/Main/DoughnutData'

type Props = {
    date:Date;
    onClick: (date:Date) => void;
    changeMonth:(key:string) => void;
};

type MonthDataTable = {
    DATE:string;
    ITEM_NAME:string;
    MONEY:number;
    PAYMENT:number;
    USER_ID:string;
    USER_EMAIL:string;
    TAG:string
}

type TableData = {
    DATE:string;
    ITEM_NAME:string;
    MONEY:number;
    PAYMENT:string;
    USER_ID:string;
    USER_EMAIL:string;
    TAG:string
}



const initMonthData = () => {
    const data:MonthDataTable[] = [];
    return data;
}


const addMonthZero = (month:number) =>{
    if(month.toString().length < 1){
        return month.toString();
    }
    else{
        return '0' + month.toString();
    }
}

const tags = new Tags();



// グラフのコンポーネントの関数を作成
export const Card = ({date,onClick,changeMonth}:Props) => {

    const { data: session } = useSession();

    //月単位のデータ---------------------------------------------------------------------------
    const [CurrentMonthList,setCurrentMonthList] = useState(initMonthData());
    useEffect(() => {
        let monthData:MonthDataTable[] = [];
        let monthDataTable:MonthDataTable[] = [];
        const aaa = {date:`${date.getFullYear()}${addMonthZero(date.getMonth()+1)}`};
        const res = axios.post('/api/getMonthData',aaa)
        res.then(data => {
            monthData = data.data;
            console.log(monthData)
            if(monthData){
                monthData.map(data => {
                    monthDataTable.push({
                        DATE:data.DATE,
                        ITEM_NAME:data.ITEM_NAME,
                        MONEY:data.MONEY,
                        PAYMENT:data.PAYMENT,
                        USER_ID:data.USER_ID,
                        USER_EMAIL:data.USER_EMAIL,
                        TAG:data.TAG
                    })
                })
            }
            //console.log(monthDataTable)
            setCurrentMonthList(monthDataTable);
            createGraphDataSets(monthDataTable);

        })
        .catch(err => {
            console.log(err)
        })

    },[date]);

    //入金計算----------------------------------------------
    const inMoney = () => {
        let num = 0;

        if(!CurrentMonthList){
            return num;
        }

        CurrentMonthList.map(data => {
            if(data.PAYMENT === 0){
                num += data.MONEY
            }
        })

        return num
    }

    //出金計算----------------------------------------------
    const outMoney = () => {
        let num = 0;

        if(!CurrentMonthList){
            return num;
        }

        CurrentMonthList.map(data => {
            if(data.PAYMENT !== 0){
                num += data.MONEY
            }
        })

        return num
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
                TAG:list.TAG
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

        setGraphDataSets(datasets);
        console.log(datasets)
       
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


  return (

    <div className="bg-white rounded overflow-hidden shadow-2xl p-2 mx-6 z-50">

        {/* 年月表示 */}
        <div className="text-4xl text-black text-center py-5">{date.getFullYear()}年{date.getMonth()+1}月</div>

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
            <Money money1={inMoney() - outMoney()} money2={inMoney()} money3={outMoney()}  />
        </div>

        <div className='flex flex-row-reverse p-2 rounded-3xl'>
            <button onClick={() => onClick(date)} className="bg-gradient-to-r from-pink-300 to-orange-300 rounded-xl  m-2 w-full ">収支入力</button>
        </div>

        <TableUI MonthData={createTableData()}/>

        <div className=" w-12 h-12 opacity-50 absolute right-3 top-1/2 rounded-full bg-gray-400 flex justify-center">
            <button className="text-white items-center text-4xl" onClick={() => changeMonth('right')}>▶︎</button>
        </div>

        <div className=" w-12 h-12 opacity-50 absolute left-3 top-1/2 rounded-full bg-gray-400 flex justify-center">
            <button className="text-white items-center text-4xl" onClick={() => changeMonth('left')}>◀︎</button>
        </div>



    </div>
  );
}
export default Card

