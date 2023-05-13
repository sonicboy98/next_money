import { FC, MouseEventHandler } from "react";
import Image from 'next/image';

type Props = {
  open: boolean;
  onClick: MouseEventHandler;
  controls: string;
  label: string;
};

export const ToggleButton: FC<Props> = ({ open, controls, label, onClick }) => {
  return (
    <button
      type="button"
      aria-controls={controls}
      aria-expanded={open}
      aria-label={label}
      onClick={onClick}
      className="h-7 w-8 ml-3 mt-3"
    >
        <Image className=" h-full w-full" src="/Main/menu.png" alt="menu" width={50} height={50} />

    </button>
  );
};