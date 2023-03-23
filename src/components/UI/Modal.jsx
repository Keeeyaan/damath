import ReactDOM from "react-dom";

const Backdrop = ({ onClick, children }) => {
  return (
    <div
      className="fixed inset-0 z-10 h-vw w-full bg-[rgba(0,0,0,0.30)]"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const ModalOverlay = ({ className, children }) => {
  return (
    <div
      className={`${className} fixed top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 z-20`}
    >
      {children}
    </div>
  );
};

const Modal = ({ className, children }) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, document.getElementById("overlay"))}
      {ReactDOM.createPortal(
        <ModalOverlay className={className}>{children}</ModalOverlay>,
        document.getElementById("overlay")
      )}
    </>
  );
};

export default Modal;
