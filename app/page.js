import Image from "next/image";
import recipeLogo from "./../public/assests/images/recipes-icon-png-2975.png";
import Link from "next/link";

export default function Home() {
  // const currentConfig = Amplify.getConfig();
  // console.log(currentConfig);
  return (
    <main className="bg-gradient-to-r from-red-500 to-orange-500 flex min-h-screen flex-col items-center ">
      <div className="home-header flex justify-between">
        <div className="flex">
          <Image width={100} height={100} src={recipeLogo}></Image>
          <h1 className="leading-[60px] text-[35px]">Recipe Keeper</h1>
        </div>
        <div className="home-nav-links text-xl leading-[120px]">
          <nav>
            <Link href="dashboard">Sing Up</Link>
            <Link href="dashboard">Log In</Link>
            <Link href="contact">Contact</Link>
          </nav>
        </div>
      </div>
      <div className="w-3/5">
        <div className="items-center text-center ">
          <p className="text-[40px] pt-6 font-bold blue_gradient">
            The easiest way to organize your recipes
          </p>
          <p className="text-[25px] pt-6">
            Recipe Keeper is the quick and easy way to collect, organize and
            store all your favorite recipes on cloud and access anywhere.
          </p>
        </div>
      </div>
    </main>
  );
}
