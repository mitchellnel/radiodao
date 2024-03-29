import React, { useEffect, useState } from "react";

import { Modal, Box, Typography, Link } from "@mui/material";

import ModalCloseButton from "../NFTModalFeatures/ModalCloseButton";

import { SuccessNotification } from "../../../types";

const ETHERSCAN_TXN_URL = "https://goerli.etherscan.io/tx/";

const modalBoxStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "primary.light",
  border: "2px solid #e8bd30",
  boxShadow: 24,
  p: 2,
  outline: "none",
};

interface NotificationModalProps {
  isVisible: boolean;
  onClose: () => void;
  successNotification: SuccessNotification;
}

function NotificationModal({
  isVisible,
  onClose,
  successNotification,
}: NotificationModalProps) {
  const [txnHash, setTxnHash] = useState<string>("");
  const [txnName, setTxnName] = useState<string>("");

  useEffect(() => {
    if (successNotification !== undefined) {
      setTxnHash(successNotification.receipt.transactionHash);
      setTxnName(successNotification.transactionName as string);
    }
  }, [successNotification]);

  const [displayMsg, setDisplayMsg] = useState<string>("");

  useEffect(() => {
    if (txnName === "Buy NFT") {
      setDisplayMsg("You have successfully purchased a RadioDAO NFT!");
    } else if (txnName === "Sell NFT") {
      setDisplayMsg("You have successfully listed your RadioDAO NFT for sale!");
    } else if (txnName === "Delist NFT") {
      setDisplayMsg(
        "You have successfully delisted your RadioDAO NFT from the marketplace!"
      );
    } else if (txnName === "Self Delegate") {
      setDisplayMsg("You have successfully registered to vote!");
    } else if (txnName === "Propose to Queue Song") {
      setDisplayMsg("You have succesfully proposed a song to be queued!");
    } else if (txnName === "Cast a vote on a proposal") {
      setDisplayMsg("You have successfully cast your vote on a proposal!");
    } else if (txnName === "Queue proposal to RadioDAO") {
      setDisplayMsg("You have successfully queued the proposal!");
    } else if (txnName === "Execute proposal on Radio") {
      setDisplayMsg("You have successfulyl executed the proposal!");
    }
  }, [txnName]);

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
          <div className="flex flex-col gap-y-2">
            <Typography
              id="modal-notification-modal-success"
              variant="h2"
              component="h2"
              color="primary.contrastText"
              fontFamily="Outfit"
              fontWeight="600"
            >
              Success!
            </Typography>
            <Typography
              id="modal-notification-modal-display-msg"
              variant="h6"
              component="h6"
              color="primary.contrastText"
              fontFamily="Outfit"
              fontWeight="600"
            >
              {displayMsg}
            </Typography>
            <Typography
              id="modal-notification-modal-display-txn-hash"
              variant="h6"
              component="h6"
              color="primary.contrastText"
              fontFamily="Outfit"
              fontWeight="600"
            >
              Your transaction hash is:{" "}
              <Link
                href={ETHERSCAN_TXN_URL + txnHash}
                color="inherit"
                sx={{ "&:hover": { color: "#af9f6a" } }}
              >
                {txnHash}
              </Link>
            </Typography>
          </div>
          <div className="self-start">
            <ModalCloseButton onClick={onClose} />
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default NotificationModal;
