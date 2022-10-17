import { useCall } from "@usedapp/core";
import { Contract, utils } from "ethers";

function useGetNextSong(
  radioABI: any,
  radioAddress: string
): string | undefined {
  const radioInterface = new utils.Interface(radioABI);
  const radioContract = new Contract(radioAddress, radioInterface);

  const { value, error } =
    useCall({
      contract: radioContract,
      method: "getNextSong",
      args: [],
    }) ?? {};

  if (error) {
    return undefined;
  }

  if (value !== undefined) return value[0];
  else return value;
}

export { useGetNextSong };
