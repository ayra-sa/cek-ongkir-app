import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header className="py-5">
      <nav>
        <div className="container">
          <div className="flex items-center justify-between">
            <Link href={"/"}>App</Link>
            <ul className="flex items-center gap-5">
              <li>
                <Link href={"/"}>Home</Link>
              </li>
              <li>
                <Link href={"/cost"}>Cost</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
