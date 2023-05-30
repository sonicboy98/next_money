import { Context } from "@/lib/store/context";
import { Component, useContext } from "react";
import { FC } from "react";

type Props = {
  open: boolean;
  id: string;
};

  export const Navigation = ({open,id}:Props) => {

    const { context, setContext } = useContext(Context);

    return (
        <div>
            {open ? 
            <nav className=" fixed flex flex-col w-4/5 h-screen text-black items-center rounded-xl top-12 right-0 left-0 bg-slate-100 shadow-2xl">
            <div>{context.USER_ID}</div>
            <ul>
                <li><a>List</a></li>
                <li>works</li>
                <li>contact</li>
            </ul>
            </nav>
            :
            <div></div>
            }
        </div>
      )
   };