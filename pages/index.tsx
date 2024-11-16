import { ConnectWallet } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { NextPage } from "next";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Hero2 from "./components/Hero2";
import Investment from "./components/Vote";

const Home: NextPage = () => {
  return (
    <main className='relative'>
    <Navbar />
    <section className='xl:padding-l wide:padding-r padding-b'>
<Hero/>
    </section>
    <section className="padding">
<Hero2/>
    </section>
    {/* <section className="padding">
<Investment/>
    </section>
         */}
       
    
    </main>
  );
};

export default Home;
