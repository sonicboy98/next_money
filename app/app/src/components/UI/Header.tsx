import { FC, useState } from "react";
import { ToggleButton } from "./ToggleButton";
import { Navigation } from "./Navigation";

const Header: FC = () => {
  const [open, setOpen] = useState(false);
  const toggleFunction = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <main>
        <div className="h-12 w-screen fixed top-0 z-50 bg-orange-300">
        <ToggleButton
            open={open}
            controls="navigation"
            label="メニューを開きます"
            onClick={toggleFunction}
        />
        <Navigation id="navigation" open={open} />
        </div>

    </main>

  );
};
export default Header;