import React from "react";
import Modal from "./Modal";

const Confirmation = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  ConfirmationButtonClass = "bg-red-700 ",
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title={title}
      confirmText={confirmText}
      cancelText={cancelText}
      ConfirmationButtonClass={ConfirmationButtonClass}
      size="sm"
    >
      <p className="text-white">{message}</p>
    </Modal>
  );
};

export default Confirmation;
