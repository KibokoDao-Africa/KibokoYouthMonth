import { execa } from "execa";
import inquirer from "inquirer";

(async () => {
  // First prompt for selecting networks including an "others" option

  if (process.argv.includes("--network-options")) {
    const answers = await inquirer.prompt([
      {
        type: "checkbox",
        message: "Select network(s) to deploy:",
        name: "networks",
        loop: false,
        choices: [
          { name: "Hardhat (local testnet)", value: "hardhat" },
          { name: "OP Sepolia", value: "optimismSepolia" },
          { name: "Base Sepolia", value: "baseSepolia" },
          { name: "Zora Sepolia", value: "zoraSepolia" },
          { name: "Lisk Sepolia", value: "liskSepolia" },
          { name: "Mode Sepolia", value: "modeSepolia" },
          { name: "All the above", value: "all" },
          { name: "Others (specify)", value: "others" }, // Add this line
        ],
        validate(answer) {
          if (answer.length < 1) {
            return "You must choose at least one option.";
          }
          return true;
        },
      },
    ]);

    let allNetworks = ["hardhat", "optimismSepolia", "baseSepolia", "zoraSepolia", "liskSepolia", "modeSepolia"];
    let selectedNetworks = answers.networks;

    // Check if "all the above" is selected
    if (selectedNetworks.includes("all")) {
      selectedNetworks = allNetworks;
    }

    // Check if "others" is selected and prompt for input
    if (selectedNetworks.includes("others")) {
      const { otherNetworks } = await inquirer.prompt([
        {
          type: "input",
          name: "otherNetworks",
          message:
            "Enter the network separated by commas (i.e. optimism, base). You can check network names in hardhat.config.js:",
        },
      ]);

      // Remove "others" from selected networks and add the user specified networks
      selectedNetworks = selectedNetworks
        .filter(n => n !== "others")
        .concat(otherNetworks.split(",").map(n => n.trim()));
    }

    // Deployment logic remains the same
    for (const network of selectedNetworks) {
      console.log(`Deploying to ${network}...`);
      await execa("hardhat", ["deploy", "--network", network], { stdio: "inherit" });
    }
  } else {
    // If "--network-options" was not provided, directly call "hardhat deploy" without network options
    const args = process.argv.slice(2).filter(arg => arg !== "--network-options");

    console.log(`Deploying with provided CLI arguments to`, args[1]);
    await execa("hardhat", ["deploy", ...args], { stdio: "inherit" });
  }
})();
