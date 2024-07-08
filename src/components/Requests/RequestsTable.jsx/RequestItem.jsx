import { format } from 'date-fns';
import './RequestItem.css'

const RequestItem = (props) => {
  const date = format(new Date(props.date), 'dd/MM, HH:mm');

  const acceptHandler = () => {
    alert('acc')
  }
  

  const rejectHandler = () => {
    alert('rej')
  }


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
          <button className='accept' onClick={acceptHandler}>אישור</button>
          <button className='reject' onClick={rejectHandler}>דחייה</button>
        </td>
      )}
    </tr>
  );
};

export default RequestItem;
