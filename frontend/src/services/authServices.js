/** @format */
import abi from "@/assets/json/abi.json";
import { ethers } from "ethers";

async function switchOrAddcreative(ethProvider) {
  try {
    const chainId = await ethProvider.provider.request({
      method: "eth_chainId",
    });
    const creativeChainId = `0x${Number(66665).toString(16)}`;
    // Check if the current chain is creative Testnet
    if (chainId !== creativeChainId) {
      // Try to switch to creative Testnet
      await ethProvider.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: creativeChainId }], // creative Testnet Chain ID
      });
      console.log("Switched to creative Testnet");

      if (error.code === 4902) {
        await ethProvider.provider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: creativeChainId,
              chainName: "Creative Testnet",
              nativeCurrency: {
                name: "Creative Ether",
                symbol: "ETH",
                decimals: 18,
              },
              rpcUrls: ["https://rpc.creatorchain.io"],
              blockExplorerUrls: ["https://explorer.creatorchain.io/"],
            },
          ],
        });
        console.log("creative Testnet added and switched");
      } else {
        console.error("Failed to switch to creative Testnet:", error);
      }
    } else {
      console.log("Already connected to creative Testnet");
    }
  } catch (error) {}
}

const getSigner = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  return provider.getSigner();
};

const getContract = async () => {
  if (!window.ethereum) {
    toast.info(
      "MetaMask is not installed. Please install it to use this feature."
    );
    return;
  }
  const signer = getSigner();
  await switchOrAddcreative(signer.provider);
  return new ethers.Contract(
    "0x7b8DAfb189b8274FA34AE9965fB9e496Bdd609ED",
    abi,
    signer
  );
};

export const addPointService = async (weight) => {
  try {
    const lifeSourceManager = await getContract();
    const tx = await lifeSourceManager.addPointFromWeight(Math.trunc(weight));
    await tx.wait(1);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const getPointsService = async () => {
  try {
    const signer = getSigner();
    const lifeSourceManager = await getContract();

    const userAddress = await signer.getAddress();

    const points = await lifeSourceManager.userPoints(userAddress);
    return Number(points[0]);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const redeemCodeService = async (point) => {
  try {
    const lifeSourceManager = await getContract();
    const tx = await lifeSourceManager.redeemCode(Math.trunc(point));
    await tx.wait(1);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
