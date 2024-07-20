import { useAtom } from "jotai";
import { userAtom } from "../context/atoms";
import { useNavigate } from "react-router-dom";
import React, { Dispatch, useState } from "react";
import { SetStateAction } from "jotai/vanilla";

interface NavBarProps {
  openMenu: Dispatch<SetStateAction<boolean>>;
}

const Navbar: React.FC<NavBarProps> = ({ openMenu }) => {
  const [user] = useAtom(userAtom);

  let navigate = useNavigate();

  const handleClick = () => {
    if (user) openMenu(true);
    else navigate("/login");
  };

  return (
    <div className="naranja mx-auto flex h-[91px] items-center justify-between shadow-md shadow-gray-500 w-full">
      <img
        src="./public/Menu.png"
        className="curs ml-7 h-[35px] w-[35px]"
        alt="menu"
        onClick={handleClick}
      />
      <img
        src="./public/Union.svg"
        className="ml-7 h-[42px] w-[230px]"
        alt="logo"
      />
      <p className="mr-5 mt-1 text-sm">Iniciar sesión</p>
    </div>
  );
};

export default Navbar;
