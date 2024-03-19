// src/components/ui/GenericModal.tsx
import React from "react";
import Button, { buttonColor } from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  header?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  actionButtons?: { onClick: () => void; color: buttonColor; label: string }[];
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  header,
  body,
  footer,
  actionButtons = [{ onClick: onClose, color: "primary", label: "Close" }],
}) => {
  return (
    <>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center pt-4 px-4 pb-20 text-center block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 w-1/2">
              {header && <div className="px-4 pt-5 pb-4">{header}</div>}

              {body && <div className="px-4 pt-5 pb-4">{body}</div>}

              {footer && (
                <div className="px-4 py-3 my-3 bg-gray-50">{footer}</div>
              )}

              {actionButtons && (
                <div className="px-4 py-3 my-3 bg-gray-50 flex flex-row justify-center mx-auto space-x-3">
                  {actionButtons.map((button, index) => (
                    <Button
                      key={index}
                      onClick={button.onClick}
                      color={button.color}
                    >
                      {button.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
