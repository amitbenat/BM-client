import { format } from 'date-fns';
import './RequestItem.css';
import { AdminUpdateRequest } from '../../Admin/AdminUpdateRequest';
import { useContext } from 'react';
import AuthContext from '../../../store/auth-context';

const RequestItem = (props) => {
  const date = format(new Date(props.date), 'dd/MM, HH:mm');
  const authCtx = useContext(AuthContext);

  const acceptHandler = () => {
    AdminUpdateRequest(true, props.id, authCtx);
    props.setRequestsArray(
      props.requestArray.filter((req) => req._id.toString() !== props.id)
    );
  };

  const rejectHandler = () => {
    props.openRejectHandler()
    props.setChosenRequestId(props.id)
  };

  return (
    <tr key={props.id}>
      {props.tableType === 'open-admin' && <td>{props.email}</td>}
      <td>{props.type}</td>
      <td>{props.description}</td>
      <td>{date}</td>
      {props.tableType !== 'open-admin' && (
        <td>
          {props.tableType === 'open-client'
            ? 'ממתין...'
            : props.isValid
            ? 'אושר'
            : 'נדחה'}
        </td>
      )}
      {props.tableType === 'close-client' && (
        <td>{props.isValid ? '-----' : props.reasonIfNeeded}</td>
      )}
      {props.tableType === 'open-admin' && (
        <td>
          <button className="accept" onClick={acceptHandler}>
            אישור
          </button>
          <button className="reject" onClick={rejectHandler}>
            דחייה
          </button>
        </td>
      )}
    </tr>
  );
};

export default RequestItem;
