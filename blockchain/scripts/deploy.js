const hre = require("hardhat");
const path = require("path");
const fs = require("fs");

async function main() {
  console.log("Deployment started!");

  const [deployer] = await ethers.getSigners();
  const address = await deployer.getAddress();
  console.log(`Deploying the contract with the account: ${address}`);

  const Ailice = await hre.ethers.getContractFactory("Ailice");
  const contract = await Ailice.deploy();

  await contract.waitForDeployment();

  console.log(`Ailice deployed to ${contract.target}`);

  saveContractFiles(contract);
}

function saveContractFiles(contract) {
  const contractDir = path.join(
    __dirname,
    "..",
    "..",
    "frontend",
    "src",
    "contracts"
  );

  if (!fs.existsSync(contractDir)) {
    fs.mkdirSync(contractDir);
  }

  fs.writeFileSync(
    path.join(contractDir, `contract-address-${network.name}.json`),
    JSON.stringify({ Ailice: contract.target }, null, 2)
  );

  const AiliceArtifact = artifacts.readArtifactSync("Ailice");

  fs.writeFileSync(
    path.join(contractDir, "Ailice.json"),
    JSON.stringify(AiliceArtifact, null, 2)
  );
}

main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});

// npx hardhat run scripts/deploy.js --network hardhat
