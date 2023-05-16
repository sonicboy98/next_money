import { Button } from "flowbite-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { NumberButton } from "./NumberButton";

//APIからの月単位データ型
type MonthData = {
    DATE:Date;
    ITEM_NAME:string;
    MONEY:number;
    PAYMENT:number;
    USER_ID:string;
    USER_EMAIL:string;
}

type Props = {
    onClose: () => void;
    InsDb: (data:MonthData)  => void;
    date:Date;
  };


export const InputNum = ({onClose,date,InsDb}:Props) => {

    const { data: session } = useSession();

    //収支選択---------------------------------------------
    const [payment,setPayment] = useState(0);

    const changePayment = () => {
        const str = document.getElementById("selectPayment") as HTMLSelectElement;
        const pay = str.value;
        setPayment(parseInt(pay));
    }



    //入力値制御-------------------------------------------
    const [inNum, setNum] = useState('');
    //追加処理
    const addNum = (num:string) => {
        if(inNum.length < 7){
            setNum(inNum + num);
        }
    }
    //削除処理
    const delNum = () => {
        setNum(inNum.slice( 0, -1 ));
    }
    //----------------------------------------------------

    //文字入力制御------------------------------------------
    const [inStr, setStr] = useState('');
    //----------------------------------------------------

    const OnOkClick = () => {

        if(!session?.user?.name && !session?.user?.email){
            return;
        }
         
        const req_data:MonthData = {
            DATE:date,
            ITEM_NAME:inStr,
            MONEY:parseInt(inNum),
            PAYMENT:payment,
            USER_ID:session.user.name as string,
            USER_EMAIL:session.user.email as string
        }
        InsDb(req_data);
    }


    

    const numList = ['7','8','9','4','5','6','1','2','3','0','00'];

    return(
        <div className="w-full h-full p-2 bg-orange-300">

            {/* 数字表示部分 */}
            <div className="flex justify-center w-full h-1/6 ">
                <div className="flex w-full h-4/5 text-right bg-white text-gray-700 border border-gray-200">
                    {/* 入出選択 */}
                    <div className="w-1/3">
                        <select id="selectPayment" className="w-full h-full text-2xl border-transparent" onChange={() => changePayment()}>
                            <option value={0}>入金</option>
                            <option value={1}>出金</option>
                        </select>
                    </div>
                    {/* 入力欄 */}
                    <div className="w-2/3 flex flex-wrap items-center right p-2">
                        <div className="w-full text-right text-5xl">{inNum}</div>
                    </div>
                </div>
            </div>


            {/* 文字入力部分 */}
            <div className="flex justify-center w-full h-1/6 ">
                <div className="flex w-full h-4/5 text-right bg-white text-gray-700 border border-gray-200">
                    {/* 入出選択 */}
                    <div className="w-1/3">
                        <select id="selectPayment" className="w-full h-full text-2xl border-transparent" onChange={() => changePayment()}>
                            <option value={0}>給料</option>
                            <option value={1}>食費</option>
                            <option value={2}>光熱費</option>
                        </select>
                    </div>
                    {/* 入力欄 */}
                    <div className="w-2/3 flex flex-wrap items-center right p-2">
                        <input className="w-full h-full border-transparent" type="text" value={inStr} onChange={(event) => setStr(event.target.value)}></input>
                    </div>
                </div>
            </div>

            {/* 入力制御部分 */}
            <div className="w-full h-3/6 bg-white p-2 text-gray-700">

                {/* 番号 */}
                <div className="flex flex-wrap h-full justify-center items-center">
                {numList.map(num => 
                    <NumberButton num={num} key={num} onClick={() => addNum(num)} />
                )}

                {/* バックスペース */}
                <Button color="gray" className="w-1/3 h-1/4 text-center text-4xl border border-gray-200">
                    <div onClick={delNum} className="text-4xl">←</div>
                </Button>
                </div>

            </div>

            {/* OK、Cancelボタン */}
            <div className="flex w-full h-1/6 bg-white p-2 text-gray-700">
                <Button onClick={onClose} className="w-1/2 m-2 bg-orange-300">Cancel</Button>
                <Button onClick={OnOkClick} className="w-1/2 m-2 bg-orange-300">OK</Button>
            </div>

        </div>
    )



}