import { Context } from "@/lib/store/context";
import { Button } from "flowbite-react";
import { useSession } from "next-auth/react";
import { useContext, useLayoutEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Tags from '../../../class/Main/Tags'

const tags = new Tags();

//APIからの月単位データ型
type MonthData = {
    DATE:Date;
    ITEM_NAME:string;
    MONEY:number;
    PAYMENT:number;
    USER_ID:string;
    USER_EMAIL:string;
    TAG:string;
    EXPENSES_KEY:string;
}

type Props = {
    onClose: () => void;
    InsDb: (data:MonthData)  => void;
  };


  const iniTag = () => {
    return '3'
}


export const InputNum = ({onClose,InsDb}:Props) => {

    const { context, setContext } = useContext(Context);
    const { data: session } = useSession();


    //日付選択---------------------------------------------
    const [selectDay,setSelectDay] = useState(new Date())


    //収支選択---------------------------------------------
    const [payment,setPayment] = useState(1);
    

    const changePayment = () => {
        const str = document.getElementById("selectPayment") as HTMLSelectElement;
        const pay = str.value;
        changeTag();
        setPayment(parseInt(pay));
    }

    //タグ選択---------------------------------------------
    const [tag,setTag] = useState(iniTag());

    const changeTag = () => {
        const str = document.getElementById("selectTag") as HTMLSelectElement;
        setTag(str.value);
    }

    //タグリスト作成
    interface Tag {
        ID:string;
        NAME:string;
        BACK_GROUND_COLOR:string;
        BORDER_COLOR:string;
        PAYMENT:number;
    }
    const createTagsList = (payment:number) => {
        const tagList = [] as Tag[];
        tags.tags.map(tag => {
            if(tag.PAYMENT.toString() === payment.toString()){
                tagList.push(tag);
            }
        })
        return tagList;
    }
    

    //入力値制御-------------------------------------------
    const [inNum, setNum] = useState('');
    //----------------------------------------------------

    //文字入力制御------------------------------------------
    const [inStr, setStr] = useState('');
    //----------------------------------------------------

    //OKボタンクリック処理
    const OnOkClick = () => {

        if(!context.USER_ID){
            return;
        }

        //タグ選択してない時にも選択させるため
        changeTag();

        let id = context.USER_ID;
        let email = context.EMAIL
        if(session){
            id = session.user?.name as string;
            email = session.user?.email as string
        }
         
        const req_data:MonthData = {
            DATE:selectDay,
            ITEM_NAME:inStr,
            MONEY:parseInt(inNum),
            PAYMENT:payment,
            USER_ID:id,
            USER_EMAIL:email,
            TAG:tag,
            EXPENSES_KEY:context.EXPENSES_KEY
        }
        InsDb(req_data);
    }

    //収支区分変更
    useLayoutEffect(() => {

        if(payment === 0){
            setTag('1')//給料タグ
        }
        else{
            setTag('3')//食費タグ
        }

    },[payment]);

    return(
        <div className="w-full h-full relative">

            {/* 文字入力部分 */}
            <div className=" w-full text-black">
                <div className="bg-gray-200 ">
                    <div className="p-2">
                        日付
                    </div>
                </div>
                <DatePicker className="w-full border-gray-200" dateFormat="yyyy/MM/dd" selected={selectDay} onChange={(date) => setSelectDay(date as Date)} />
            </div>

            {/* 数字表示部分 */}
            <div className="w-full ">
                <div className="bg-gray-200 ">
                    <div className="p-2 text-black">
                        収支
                    </div>
                </div>
                <div className="flex justify-center w-full h-4/5 text-right bg-white text-gray-700 border border-gray-200">
                    {/* 入出選択 */}
                    <div className="w-1/3">
                        <select id="selectPayment" className="w-full h-full text-lg border-transparent" onChange={() => changePayment()}>
                            <option value={1}>出金</option>
                            <option value={0}>入金</option>
                        </select>
                    </div>
                    {/* 入力欄 */}
                    <div className="w-2/3 flex flex-wrap items-center right p-2">
                        <input className="w-full h-full border-transparent bg-orange-100" type="tel" value={inNum} onChange={(event) => setNum(event.target.value)}></input>
                    </div>
                    {/* <div className="w-2/3 flex flex-wrap items-center right p-2">
                        <div className="w-full text-right text-5xl">{inNum}</div>
                    </div> */}
                </div>
            </div>

            {/* 文字入力部分 */}
            <div className=" w-full">
                <div className="bg-gray-200 ">
                    <div className="p-2 text-black">
                        タグ
                    </div>
                </div>
                <div className="flex justify-center w-full h-4/5 text-right bg-white text-gray-700 border border-gray-200">
                    {/* 入出選択 */}
                    <div className="w-full">
                        <select id="selectTag" className="w-full h-full text-lg border-transparent" onChange={() => changeTag()}>
                            {createTagsList(payment).map(tag =>
                                <option value={tag.ID} key={tag.ID}>{tag.NAME}</option>
                            )}
                        </select>
                    </div>
                    {/* 入力欄 */}
                    {/* <div className="w-2/3 flex flex-wrap items-center right p-2">
                        <input className="w-full h-full border-transparent" type="text" value={inStr} onChange={(event) => setStr(event.target.value)}></input>
                    </div> */}
                </div>
            </div>


            {/* 文字入力部分 */}
            <div className=" w-full">
                <div className="bg-gray-200 ">
                    <div className="p-2 text-black">
                        備考
                    </div>
                </div>
                <div className="flex justify-center w-full h-4/5 text-right bg-white text-gray-700 border border-gray-200">
                    {/* 入力欄 */}
                    <div className="w-full flex flex-wrap items-center right p-2">
                        <input className="w-full h-full border-transparent" type="text" value={inStr} onChange={(event) => setStr(event.target.value)}></input>
                    </div>
                </div>
            </div>
            
            <div className="w-full h-1/6">
            </div>
            {/* OK、Cancelボタン */}
                <div className="fixed flex justify-center bottom-0 w-11/12">
                <div className=" w-full flex bg-white text-gray-700 gap-3 p-2 border-t border-stone-300">
                    <Button onClick={onClose} className="w-1/2 bg-gray-300">Cancel</Button>
                    <Button onClick={OnOkClick} className="w-1/2 bg-orange-300">OK</Button>
                </div>
            </div>


        </div>
    )



}