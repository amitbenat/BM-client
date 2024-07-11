import { format } from 'date-fns';

const RequestItem = (props) => {
  const date = format(new Date(props.date), 'dd/MM, HH:mm');
  
  return (
    <tr key={props.id}>
      <td>{props.type}</td>
      <td>{props.description}</td>
      <td>{date}</td>
      <td>{props.isOpen ?'ממתין...' : (props.isValid? 'אושר': 'נדחה')}</td>
      {!props.isOpen && <td>{props.isValid?'-----':props.reasonIfNeeded}</td>}
    </tr>
    
  );
};

export default RequestItem;
