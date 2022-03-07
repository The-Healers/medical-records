// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.
async function main() {
  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  // ethers is available in the global scope
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  // const Token = await ethers.getContractFactory("Token");
  // const token = await Token.deploy();
  // await token.deployed();

  // console.log("Token address:", token.address);

  const RoleControl = await ethers.getContractFactory("RoleControl");
  const roleControl = await RoleControl.deploy();
  await roleControl.deployed();

  console.log("RoleControl address:", roleControl.address);

  const Documents = await ethers.getContractFactory("Documents");
  const documents = await Documents.deploy();
  await documents.deployed();

  console.log("Documents address:", documents.address);

  // We also save the contract's artifacts and address in the frontend directory
  // saveFrontendFiles(token);
  saveFrontendFiles(roleControl, documents);
}

function saveFrontendFiles(roleControl, documents) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../frontend/src/contracts";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + "/contract-address.json",
    JSON.stringify({ "RoleControl": roleControl.address, "Documents": documents.address }, undefined, 2)
  );

  const RoleControlArtifact = artifacts.readArtifactSync("RoleControl");
  const DocumentsArtifact = artifacts.readArtifactSync("Documents");

  fs.writeFileSync(
    contractsDir + "/RoleControl.json",
    JSON.stringify(RoleControlArtifact, null, 2)
  );

  fs.writeFileSync(
    contractsDir + "/Documents.json",
    JSON.stringify(DocumentsArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
