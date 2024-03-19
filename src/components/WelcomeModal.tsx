// src/components/Modal.tsx
import React from "react";
import Modal from "./ui/Modal";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  grandPrizeHandler: () => void;
  doorPrizeHandler: () => void;
  imageUrl: string;
}

const WelcomeModal: React.FC<ModalProps> = ({
  isOpen,
  grandPrizeHandler,
  doorPrizeHandler,
  imageUrl,
  onClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      body={<img src={imageUrl} alt="Modal" className="mx-auto" />}
      actionButtons={[
        { onClick: grandPrizeHandler, color: "primary", label: "GrandPrize" },
        { onClick: doorPrizeHandler, color: "success", label: "DoorPrize" },
      ]}
    />
  );
};

export default WelcomeModal;
