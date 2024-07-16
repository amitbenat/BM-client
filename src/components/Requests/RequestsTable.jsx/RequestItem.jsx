import { format } from 'date-fns';
import './RequestItem.css';
import { adminUpdateRequest } from '../../Admin/adminUpdateRequest';
import { useContext } from 'react';
import AuthContext from '../../../store/auth-context';

const RequestItem = ({request, setRequestsArray, requestsArray, openRejectHandler,tableType, setChosenRequestId}) => {
  const date = format(new Date(request.createdAt), 'dd/MM, HH:mm');
  const authCtx = useContext(AuthContext);
  console.log(request);

  const acceptHandler = () => {
    adminUpdateRequest(true, request.id, authCtx);
    setRequestsArray(
      requestsArray.filter((req) => req._id.toString() !== request.id)
    );
  };

  const rejectHandler = () => {
    openRejectHandler();
    setChosenRequestId(request.id);
  };
  const statusClasses =
    request.status === 'pending'
      ? 'waiting'
      : request.isValid
      ? 'accepted'
      : 'rejected';

  const descriptionClasses =
    ((tableType === 'close-client' ||
      tableType === 'history-admin') &&
      request.isValid === true) ||
    request.status === 'pending'
      ? 'no-description'
      : '';

  return (
    <tr key={request.id}>
      {(tableType === 'open-admin' ||
        tableType === 'history-admin') && <td>{request.owner.email}</td>}
      <td>{request.type}</td>
      <td>{request.description}</td>
      <td>{date}</td>
      {tableType !== 'open-admin' && (
        <td className={statusClasses}>
          {request.status === 'pending'
            ? 'ממתין...'
            : request.isValid
            ? 'אושר'
            : 'נדחה'}
        </td>
      )}
      {(tableType === 'close-client' ||
        tableType === 'history-admin') && (
        <td className={descriptionClasses}>
          {request.isValid === true || request.status === 'pending'
            ? ''
            : request.reasonIfNeeded}
        </td>
      )}
      {tableType === 'open-admin' && (
        <td className="request-item">
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
