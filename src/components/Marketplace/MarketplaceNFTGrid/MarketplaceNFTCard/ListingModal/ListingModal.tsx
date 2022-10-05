import React, { useEffect, useState } from "react";

import { BigNumber, Contract } from "ethers";
import { useContractFunction, useEthers } from "@usedapp/core";
import { Modal, Box, Typography, CircularProgress } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import ModalCloseButton from "../../../../shared/ModalFeatures/ModalCloseButton";
import ModalPlayer from "../../../../shared/ModalFeatures/ModalPlayer/ModalPlayer";

const modalBoxStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "primary.light",
  border: "2px solid #e8bd30",
  boxShadow: 24,
  p: 2,
  outline: "none",
};

interface ListingModalProps {
  isVisible: boolean;
  onClose: () => void;
  nftContract: Contract;
  tokenID: number;
  seller: string | undefined;
  songTitle: string | undefined;
  songArtist: string | undefined;
  imageURI: string | undefined;
  audioURI: string | undefined;
  price: BigNumber | undefined;
}

function ListingModal({
  isVisible,
  onClose,
  nftContract,
  tokenID,
  seller,
  songTitle,
  songArtist,
  imageURI,
  audioURI,
  price,
}: ListingModalProps) {
  const { account } = useEthers();

  const [loading, setLoading] = useState<boolean>(false);

  // work out if user is seller
  const isOwnedByUser = seller === account || seller === undefined;

  // create a buyNFT function that will call the buyNFT contract function
  const { state: buyNFTState, send: buyNFTSend } = useContractFunction(
    nftContract,
    "buyNFT",
    { transactionName: "Buy NFT" }
  );
  const buyNFT = (tokenID: number) => {
    buyNFTSend(tokenID);
  };

  // create a delistNFT function that will call the delistNFT contract function
  const { state: delistNFTState, send: delistNFTSend } = useContractFunction(
    nftContract,
    "delistNFT",
    { transactionName: "Delist NFT" }
  );
  const delistNFT = (tokenID: number) => {
    delistNFTSend(tokenID);
  };

  // handler for when the modal button is pressed
  const handleModalButtonClick = async (isOwnedByUser: boolean) => {
    setLoading(true);

    if (isOwnedByUser) {
      delistNFT(tokenID);
    } else {
      // TODO: need to approve NEL approval on front-end
      buyNFT(tokenID);
    }
  };

  // use transaction states to set loading button state
  useEffect(() => {
    if (
      buyNFTState.status === "PendingSignature" ||
      buyNFTState.status === "Mining" ||
      delistNFTState.status === "PendingSignature" ||
      delistNFTState.status === "Mining"
    ) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [buyNFTState, delistNFTState]);

  return (
    <Modal
      open={isVisible}
      onClose={onClose}
      aria-labelledby="modal-listing-modal"
      aria-describedby="modal-listing-modal-description"
    >
      <Box sx={modalBoxStyle}>
        <div
          className="flex flex-row items-center"
          style={{ justifyContent: "space-between" }}
        >
          <div className="flex flex-row items-end">
            <Typography
              id="modal-listing-modal"
              variant="h2"
              component="h2"
              color="primary.contrastText"
              fontFamily="Outfit"
              fontWeight="600"
            >
              {songTitle}
            </Typography>
            <Typography
              id="modal-listing-modal-description"
              variant="h4"
              component="h4"
              color="primary.contrastText"
              fontFamily="Outfit"
              fontWeight="600"
              sx={{
                marginBottom: "5px",
              }}
            >
              <div className="flex flex-row ml-3">{"by " + songArtist}</div>
            </Typography>
          </div>
          <ModalCloseButton onClick={onClose} />
        </div>
        <div className="flex flex-row mt-4 justify-center items-center">
          <div className="basis-1/2 pl-6">
            <img
              className=""
              src={imageURI}
              alt="nft song art"
              height="400"
              width="400"
              style={{ marginRight: "200px" }}
            />
          </div>

          <div className="basis-1/2 pt-20 px-10">
            <ModalPlayer audioURI={audioURI as string} />
          </div>
        </div>
        <div className="flex justify-center mt-16">
          <LoadingButton
            loading={loading}
            loadingIndicator={<CircularProgress color="secondary" size={24} />}
            variant="contained"
            color="secondary"
            sx={{ fontFamily: "Outfit", fontSize: "1rem", fontWeight: "600" }}
            onClick={() => handleModalButtonClick(isOwnedByUser)}
          >
            {isOwnedByUser ? "Delist NFT" : "Buy NFT"}
          </LoadingButton>
        </div>
      </Box>
    </Modal>
  );
}

export default ListingModal;