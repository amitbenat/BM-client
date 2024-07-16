import { useContext, useRef } from 'react';
import PopUp from '../generic/PopUp';
import { adminUpdateRequest } from './adminUpdateRequest';
import AuthContext from '../../store/auth-context';
const AdminRejectDescription = (props) => {
  const descriptionInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const submitFormHandler = () => {
    adminUpdateRequest(
      false,
      props.chosenRequestId,
      authCtx,
      descriptionInputRef.current.value
    );
    props.onClose();
    props.setRequestsArray(
      props.requestsArray.filter(
        (req) => req._id.toString() !== props.chosenRequestId
      )
    );
  };
  return (
    <PopUp onClose={props.onClose}>
      <button onClick={props.onClose}>X</button>
      <h3>תיאור סיבת דחייה</h3>
      <form>
        <textarea type="text" ref={descriptionInputRef} />
      </form>
      <button onClick={submitFormHandler}>דחיית הבקשה</button>
    </PopUp>
  );
};

export default AdminRejectDescription;
