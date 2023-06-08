import { FC, useContext, useState } from "react";
import { ToggleButton } from "./ToggleButton";
import { Navigation } from "./Navigation";
import { useSession, signOut  } from "next-auth/react";
import Image from 'next/image';
import { Context } from "@/lib/store/context";
import { State } from "@/lib/interfaces";
import router from "next/router";
import { constants } from "buffer";



const Header: FC = () => {

  //アカウント情報
  const { context, setContext } = useContext(Context);

  // //アカウントメニュー表示フラグ
  const [open, setOpen] = useState(false);

  const onAcountMenu = () => {
    open ? setOpen(false) : setOpen(true);
  }


  if(context.USER_ID){
    return (
      <main>
        <div className="h-12 w-screen fixed top-0 z-50 bg-white border-b border-gray-300 flex p-1">

          {/* アカウント情報 */}
          <div onClick={onAcountMenu} className="w-2/3 h-full flex border border-gray-300">
            {/* アバター */}
            <div className="w-1/6 flex justify-center p-[2px]">
              <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden border border-gray-400 bg-red-100 rounded-full dark:bg-gray-600">
                  <span className="font-medium text-gray-600 dark:text-gray-300">{context.USER_ID.slice( 0, 1 )}</span>
              </div>
            </div>

            {/* ユーザー名 */}
            <div className="w-4/6 text-black">
              <div className="text-sm">{context.USER_ID}</div>
              <div className=" text-xs">{context.EMAIL}</div>
            </div>
            {/* <ToggleButton
              open={open}
              controls="navigation"
              label="メニューを開きます"
              onClick={toggleFunction}
            /> */}

            {/* 下矢印 */}
            <div className="w-1/6 flex flex-row-reverse justify-center　text-black">
              <div className="text-sm text-black items-center p-[10px]">▼</div>
            </div>

          </div>

            {/* サインアウト */}
          {/* <div className="flex flex-row-reverse w-1/3">
            <button className="w-3/10 " onClick={logout}>
              <Image className=" h-full w-full items-center p-1" src="/Main/logout.png" alt="menu" width={35} height={35} />
            </button> 
          </div> */}
        
        <Navigation id="navigation" open={open} />
        
        </div>

    </main>

    )
  }

  return (
    <main>


    </main>

  );
};
export default Header;