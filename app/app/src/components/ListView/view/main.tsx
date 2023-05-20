import Card from '../../Main/UI/Card'
import { Button, Carousel, Dropdown, Modal } from "flowbite-react";
import { useState } from "react";
import axios from "axios";

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

const initMonth = () => {
    const currMonth = new Date();
    const MonthList = [];
    for (let i = -3; i < 4; i++){
        const month = currMonth.getMonth() + i;
        MonthList.push(new Date(currMonth.getFullYear(),month));
    }

    return MonthList;
}



//メイン画面----------------------------------------------------------------------------
export default function Main(){

    const [MonthList, setMonthList] = useState(initMonth());//表示管理

    //-----------------------------------------------------------

    return(
        <div className="mt-12">
        
            {/* メイン画面 */}
            <div>
                {MonthList.map(month => 
                    <div className='text-black' key={month.getMonth()}>{month.toLocaleString()}</div>
                )}
            </div>



    </div>
    )
}



