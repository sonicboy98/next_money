import { FC, useState } from "react";
import { ToggleButton } from "./ToggleButton";
import { Navigation } from "./Navigation";
import { useSession, signOut  } from "next-auth/react";
import Image from 'next/image';

const Header: FC = () => {
  const [open, setOpen] = useState(false);
  const toggleFunction = () => {
    setOpen((prevState) => !prevState);
  };

  const { data: session } = useSession()
  if (session) {
    return (
      <main>
        <div className="h-12 w-screen fixed top-0 z-50 bg-transparent flex">
          <div className="w-1/2 h-full flex ">
            <ToggleButton
              open={open}
              controls="navigation"
              label="メニューを開きます"
              onClick={toggleFunction}
            />

          </div>
          <div className="flex flex-row-reverse w-1/2">
            <button className="w-3/10 " onClick={() => signOut()}>
              <Image className=" h-full w-full items-center p-1" src="/Main/logout.png" alt="menu" width={35} height={35} />
            </button> 
          </div>
        
        <Navigation id="navigation" open={open} />
        
        </div>

    </main>

    )
  }

  return (
    <main>
        <div className="h-12 w-screen fixed top-0 z-50 bg-orange-300">
        </div>

    </main>

  );
};
export default Header;