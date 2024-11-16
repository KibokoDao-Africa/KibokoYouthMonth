import { DebugContracts } from "./_components/DebugContracts";
import type { NextPage } from "next";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Debug Contracts",
  description: "Debug your deployed 🏗 Scaffold-Lisk contracts in an easy way",
});

const Debug: NextPage = () => {
  return (
    <section className="flex flex-col items-center gap-4 w-full">
      <DebugContracts />
      <div className="p-8 flex flex-col gap-4 items-center rounded-lg border border-[#16203E] bg-base-200">
        <h1 className="text-2xl my-0">Debug Contracts</h1>
        <p className="text-slate-400 text-center">
          You can debug & interact with your deployed contracts here.
          <br /> Check{" "}
          <code className="italic bg-base-100 text-white p-1 rounded-md text-base font-bold max-w-full break-words break-all inline-block">
            packages/nextjs/app/debug/page.tsx
          </code>{" "}
        </p>
      </div>
    </section>
  );
};

export default Debug;
