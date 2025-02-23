/** @format */
import abi from "@/assets/json/abi.json";
import { ethers } from "ethers";

const FAILED_KEY = "failed";

async function switchOrAddcreator(ethProvider) {
  try {
    const chainId = await ethProvider.provider.request({
      method: "eth_chainId",
    });
    const creatorChainId = `0x${Number(66665).toString(16)}`;
    // Check if the current chain is creator Testnet
    if (chainId !== creatorChainId) {
      // Try to switch to creator Testnet
      await ethProvider.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: creatorChainId }], // creator Testnet Chain ID
      });
      console.log("Switched to creator Testnet");

      if (error.code === 4902) {
        await ethProvider.provider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: creatorChainId,
              chainName: "creator Testnet",
              nativeCurrency: {
                name: "creator Ether",
                symbol: "ETH",
                decimals: 18,
              },
              rpcUrls: ["https://rpc.creatorchain.io"],
              blockExplorerUrls: ["https://explorer.creatorchain.io/"],
            },
          ],
        });
        console.log("creator Testnet added and switched");
      } else {
        console.error("Failed to switch to creator Testnet:", error);
      }
    } else {
      console.log("Already connected to creator Testnet");
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
  await switchOrAddcreator(signer.provider);
  return new ethers.Contract(
    "0x0c56Dfe5228C69011bB006adbd5E9c2B748b04B2",
    abi,
    signer
  );
};

export const addPointService = async (weight) => {
  try {
    const lifeSourceManager = await getContract();
    const tx = await lifeSourceManager.addPointFromWeight(Math.trunc(weight));
    await tx.wait(1);
    return `Added ${weight} points`;
  } catch (error) {
    console.log(error);
    return `${FAILED_KEY} to add ${weight} points`;
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

export const redeemCodeService = async (points) => {
  try {
    const lifeSourceManager = await getContract();
    const tx = await lifeSourceManager.redeemCode(Math.trunc(points));
    await tx.wait(1);
    return `redeemed ${points} points`;
  } catch (error) {
    console.log(error);
    return `${FAILED_KEY} to redeem ${points} points`;
  }
};

export const rethrowFailedResponse = (response) => {
  if (String(response).includes(FAILED_KEY)) {
    throw new Error(response);
  }
  return response;
};
