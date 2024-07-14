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
      props.requestsArray.filter((req) => req._id.toString() !== props.id)
    );
  };

  const rejectHandler = () => {
    props.openRejectHandler();
    props.setChosenRequestId(props.id);
  };
  const statusClasses =
    props.status === 'pending'
      ? 'waiting'
      : props.isValid
      ? 'accepted'
      : 'rejected';

  const descriptionClasses =(props.tableType === 'close-client' ||
  props.tableType === 'history-admin') && 
    props.isValid === true || props.status === 'pending'
      ? 'no-description'
      : ''

  return (
    <tr key={props.id}>
      {(props.tableType === 'open-admin' ||
        props.tableType === 'history-admin') && <td>{props.email}</td>}
      <td>{props.type}</td>
      <td>{props.description}</td>
      <td>{date}</td>
      {props.tableType !== 'open-admin' && (
        <td className={statusClasses}>
          {props.status === 'pending'
            ? 'ממתין...'
            : props.isValid
            ? 'אושר'
            : 'נדחה'}
        </td>
      )}
      {(props.tableType === 'close-client' ||
        props.tableType === 'history-admin') && (
        <td className={descriptionClasses}>
          {props.isValid === true || props.status === 'pending'
            ? ''
            : props.reasonIfNeeded}
        </td>
      )}
      {props.tableType === 'open-admin' && (
        <td className="requestitem">
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
