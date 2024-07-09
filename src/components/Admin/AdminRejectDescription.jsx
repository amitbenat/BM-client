import { useContext, useRef } from 'react';
import Modal from '../UI/Modal';
import { AdminUpdateRequest } from './AdminUpdateRequest';
import AuthContext from '../../store/auth-context';
const AdminRejectDescription = (props) => {
  const descriptionInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const submitFormHandler = () => {
    AdminUpdateRequest(false, props.chosenRequestId, authCtx, descriptionInputRef.current.value)
    props.onClose()
    props.setRequestsArray(
      props.requestsArray.filter((req) => req._id.toString() !== props.chosenRequestId)
    );
  }
  return (
    <Modal onClose={props.onClose}>
      <button onClick={props.onClose}>X</button>
      <h3>תיאור סיבת דחייה</h3>
      <form>
        <textarea type="text" ref={descriptionInputRef} />
      </form>
      <button onClick={submitFormHandler}>דחיית הבקשה</button>
    </Modal>
  );
};

export default AdminRejectDescription;
