import { Button } from "flowbite-react";

type Props = {
    num:string;
    onClick: (num:string) => void;
  };


export const NumberButton = ({num,onClick}:Props) => {

    return(
        <Button onClick={() =>onClick(num)} color="gray" className="w-1/3 h-1/4 text-center text-4xl border border-gray-200">
            <div className="text-4xl">{num}</div>
        </Button>
    )



}