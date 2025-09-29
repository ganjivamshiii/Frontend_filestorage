import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  confirmText,
  cancelText,
  onConfirm,
  ConfirmationButtonClass = "bg-blue-600 text-white",
  size = "md",
}) => {
  const sizes = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-2xl",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Modal Box */}
          <motion.div
            className={`bg-gray-700 rounded-2xl shadow-lg w-full ${sizes[size]} p-6 relative`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-blue-600 hover:text-red-500"
              onClick={onClose}
            >
              ✕
            </button>

            {/* Title */}
            {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}

            {/* Content */}
            <div className="mb-6">{children}</div>

            {/* Actions */}
            {(confirmText || cancelText) && (
              <div className="flex justify-end gap-3">
                {cancelText && (
                  <button
                    className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-gray-400"
                    onClick={onClose}
                  >
                    {cancelText}
                  </button>
                )}
                {confirmText && (
                  <button
                    className={`px-4 py-2 rounded-lg ${ConfirmationButtonClass}`}
                    onClick={onConfirm}
                  >
                    {confirmText}
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
