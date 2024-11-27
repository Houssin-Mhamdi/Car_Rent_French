import Link from "next/link";
import Image from "next/image";

import CustomButton from "./CustomButton";

const NavBar = ({ params }: any) => {
  console.log("params", params);
  return (
    <header className="w-full  absolute z-10 ">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 bg-transparent">
        <Link href="/" className="flex justify-center items-center" prefetch>
          <Image
            src="/logo.svg"
            alt="logo"
            width={118}
            height={18}
            className="object-contain"
          />
        </Link>
        <div className="flex justify-center items-center gap-28">
          <Link href="/vehicle" className="font-semibold" prefetch>
            Vehicle
          </Link>

          <Link href="/aboutus" className="font-semibold" prefetch>
            About Us
          </Link>
          <Link href="/contactus" className="font-semibold" prefetch>
            Contact Us
          </Link>
        </div>

        <CustomButton
          title="Sign in"
          btnType="button"
          containerStyles="text-primary-blue rounded-full bg-white min-w-[130px]"
        />
      </nav>
    </header>
  );
};

export default NavBar;
