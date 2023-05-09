import Doughnut from "../UI/Doughnut";
import Money from "../UI/money";
import Card from '../UI/Card'
import { Button, Carousel, Dropdown, Modal } from "flowbite-react";
import { useState } from "react";
import { InputNum } from "../UI/InputNum";
import axios from "axios";

//定義---------------------------------------------
//APIからの月単位データ型
type MonthData = {
    DATE:Date;
    ITEM_NAME:string;
    MONEY:number;
    PAYMENT:number;
}
//-------------------------------------------------

//初期表示用の月配列取得
const initMonthList =() => {
    let monthList:Date[] = [];

    //現在月の前後3ヶ月分出す
    for (let i = -3; i < 2; i++){
        const date = new Date();
        date.setMonth(date.getMonth() + i);
        monthList.push(date);
    }
    return monthList;
}






//メイン画面----------------------------------------------------------------------------
export const Main = () => {

    //入力モーダル画面制御------------------------------------------
    const [isModal, setModal] = useState(false);//表示管理

    const onClick = (date:Date) => {
        setCurrentDate(date);
        setModal(true);
    }
    const onClose = () => {
        setModal(false);
    }
    //-----------------------------------------------------------

    //カルーセル制御-----------------------------------------------
    const [MonthList,setMonthList] = useState(() => initMonthList());
    const [CurrentDate,setCurrentDate] = useState(new Date());



    //データベースInsert処理
    const setMonthData = (data:MonthData) =>{
        setModal(false);
        const req = {
            DATE:`${data.DATE.getFullYear()}/${data.DATE.getMonth()+1}/${data.DATE.getDate()}`,
            ITEM_NAME:data.ITEM_NAME,
            MONEY:data.MONEY,
            PAYMENT:data.PAYMENT
        }
        const res = axios.post('/api/setMonthData',req)
        res.then(data => {
            setMonthList(initMonthList())
            console.log(data);

        })
        .catch(err => {
            console.log(err)
        })
    }

    //-----------------------------------------------------------

    return(
        <div className=" text-xl mt-12 h-[calc(100vh_-_48px)] ">
        
            {/* メイン画面 */}
            <Carousel slide={false}  >
                {MonthList.map(date => 
                    <Card date={date} onClick={onClick} key={date.getMilliseconds()}/>
                )}
            </Carousel>



            {/* 入力モーダル画面 */}
            {
                (isModal) ?
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-end">
                    <div className="w-11/12 h-5/6 bg-orange-300 rounded-t-2xl p-3">
                        <div className="flex flex-row-reverse w-full h-1/9">
                            <Button className="bg-transparent" onClick={onClose}>X</Button>
                        </div>
                        <InputNum date={CurrentDate} onClose={onClose} InsDb={setMonthData}/>                    
                    </div>

                </div>
                :
                <div className="">

                </div>
            }

    </div>
    )
}



