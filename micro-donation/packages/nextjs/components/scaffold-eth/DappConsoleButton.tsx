"use client";

/**
 * FaucetButton button which lets you grab eth.
 */
export const DappConsoleButton = () => {
  const openSuperchainFaucet = () => {
    window.open("https://console.optimism.io/?utm_source=scaffoldop", "_blank");
  };

  return (
    <div className={"ml-1"} data-tip="Enter Dapp Developer Console">
      <button className="btn bg-base-100 btn-md rounded-full flex-nowrap" onClick={() => openSuperchainFaucet()}>
        Dapp Console
      </button>
    </div>
  );
};
