import React, { FC } from "react";
import { usePreventScroll } from "../../utils/hooks";

interface IModal {
  open: boolean;
  close: () => void;
}

const Modal: FC<IModal> = ({ children, close, open }) => {
  usePreventScroll(open);

  return (
    <div
      className="modal"
      style={{ height: open ? "100vh" : "0" }}
      // style={{ transform: open ? "scale(1)" : "scale(0)" }}
      onClick={(e) => {
        if (e.currentTarget === e.target) {
          close();
        }
      }}
    >
      <div className="body">{children}</div>
    </div>
  );
};

export default Modal;
