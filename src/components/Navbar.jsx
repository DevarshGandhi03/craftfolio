import { ScrollText } from "lucide-react";
import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <header className=" flex px-4 lg:px-6 py-4 items-center text-center shadow-sm ">
      <Link href="/" className="flex items-center justify-center ">
        <ScrollText size={40} />
        <p className="mx-2 text-xl">CraftFolio</p>
      </Link>
    </header>
  );
}

export default Navbar;
