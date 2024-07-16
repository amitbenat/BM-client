import './PopUp.css';
import ReactDOM from 'react-dom';

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return (
    <div className="popup">
      <div className="content">{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById('overlays');

const PopUp = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default PopUp;
