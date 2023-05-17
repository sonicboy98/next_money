import Card from '../UI/Card'
import { Button, Carousel, Dropdown, Modal } from "flowbite-react";
import { useState } from "react";
import { InputNum } from "../UI/InputNum";
import axios from "axios";
import { useSession } from "next-auth/react";

//定義---------------------------------------------
//APIからの月単位データ型
type MonthData = {
    DATE:Date;
    ITEM_NAME:string;
    MONEY:number;
    PAYMENT:number;
    USER_ID:string;
    USER_EMAIL:string;
}

//-------------------------------------------------



//メイン画面----------------------------------------------------------------------------
export const Main = () => {

    //入力モーダル画面制御------------------------------------------

    const [isModal, setModal] = useState(false);//表示管理

    const onClick = (date:Date) => {
        const date2 = new Date(date.getFullYear(),date.getMonth(),date.getDate())
        setMonth(date2);
        setModal(true);
    }
    const onClose = () => {
        setModal(false);
    }
    //-----------------------------------------------------------

    //カルーセル制御-----------------------------------------------
    //const [MonthList,setMonthList] = useState(() => initMonthList());
    const [Month,setMonth] = useState(new Date());

    const changeMonth = (key:string) =>{
        if(key === 'right'){
            const date = new Date(Month.getFullYear(),Month.getMonth() + 1,Month.getDate())
            setMonth(date)
        }
        else{
            const date = new Date(Month.getFullYear(),Month.getMonth() - 1,Month.getDate())
            setMonth(date) 
        }
    }



    //データベースInsert処理
    const setMonthData = (req_data:MonthData) =>{
        setModal(false);
        const req = {
            DATE:`${req_data.DATE.getFullYear()}/${req_data.DATE.getMonth()+1}/${req_data.DATE.getDate()}`,
            ITEM_NAME:req_data.ITEM_NAME,
            MONEY:req_data.MONEY,
            PAYMENT:req_data.PAYMENT,
            USER_ID:req_data.USER_ID,
            USER_EMAIL:req_data.USER_EMAIL
        }
        const res = axios.post('/api/setMonthData',req)
        res.then(res_data => {
            const date = new Date(Month.getFullYear(),Month.getMonth(),Month.getDate())
            setMonth(date)
            console.log(res_data);

        })
        .catch(err => {
            console.log(err)
        })
    }

    //-----------------------------------------------------------

    return(
        <div className=" text-xl mt-12  ">
        
            {/* メイン画面 */}
            {/* <Carousel slide={false}  >
                {MonthList.map(date => 
                    <Card date={date} onClick={onClick} key={date.getMilliseconds()}/>
                )}
            </Carousel> */}
            <Card date={Month} onClick={onClick} changeMonth={changeMonth} key={Month.getMilliseconds()} />



            {/* 入力モーダル画面 */}
            {
                (isModal) ?
                <div className="fixed z-50 top-0 left-0 w-full h-full flex justify-center items-end">
                    <div className="w-11/12 h-full overflow-scroll bg-orange-300 rounded-t-2xl p-3">
                        <div className="flex flex-row-reverse w-full h-1/9">
                            <Button className="bg-transparent" onClick={onClose}>X</Button>
                        </div>
                        <InputNum date={Month} onClose={onClose} InsDb={setMonthData}/>                    
                    </div>

                </div>
                :
                <div className="">

                </div>
            }

    </div>
    )
}



