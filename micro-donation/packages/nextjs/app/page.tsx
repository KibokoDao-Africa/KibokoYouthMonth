"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Logo } from "~~/components/Logo";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <section className="flex items-center flex-col flex-grow pt-10">
      <div className="px-5 flex flex-col gap-2 items-center">
        <h1 className="text-center">
          <span className="block text-base mb-2">Welcome to</span>
          <span className="flex items-end gap-4 text-5xl font-bold">
            <Logo size={48} /> Scaffold-Lisk{" "}
          </span>
        </h1>
        <div className="flex btn btn-md bg-base-100 w-fit justify-center mb-4 items-center space-x-2">
          <p className="my-2 font-medium">Connected Address:</p>
          <Address address={connectedAddress} />
        </div>
        <p className="text-center text-base text-slate-400">
          Get started by editing{" "}
          <code className="italic bg-base-100 text-white p-1 rounded-md text-base font-bold max-w-full break-words break-all inline-block">
            packages/nextjs/app/page.tsx
          </code>
        </p>
        <p className="text-center text-base text-slate-400">
          Edit your smart contract{" "}
          <code className="italic bg-base-100 text-white p-1 rounded-md text-base font-bold max-w-full break-words break-all inline-block">
            YourContract.sol
          </code>{" "}
          in{" "}
          <code className="italic bg-base-100 text-white p-1 rounded-md text-base font-bold max-w-full break-words break-all inline-block">
            packages/hardhat/contracts
          </code>
        </p>
      </div>

      <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
        <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
          <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
            <BugAntIcon className="h-8 w-8" />
            <p>
              Tinker with your smart contract using the{" "}
              <Link href="/debug" passHref className="link">
                Debug Contracts
              </Link>{" "}
              tab.
            </p>
          </div>
          <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
            <MagnifyingGlassIcon className="h-8 w-8" />
            <p>
              Explore your local transactions with the{" "}
              <Link href="/blockexplorer" passHref className="link">
                Block Explorer
              </Link>{" "}
              tab.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
