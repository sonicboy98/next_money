import { Component } from "react";
import { FC } from "react";

type Props = {
  open: boolean;
  id: string;
};

  export const Navigation = ({open,id}:Props) => {
    return (
        <div>
            {open ? 
            <nav className=" fixed flex flex-col w-4/5 h-screen items-center top-12 right-0 left-0 bg-slate-100 shadow-2xl">
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