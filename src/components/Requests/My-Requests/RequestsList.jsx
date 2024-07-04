import RequestItem from './RequestItem';
import './RequestsList.css'
const RequestsList = (props) => {
  return (
    <>
      {props.requestArray.length === 0 && <p>אין בקשות מסוג זה!</p>}
      {props.requestArray.length !== 0 &&
        <div className="table-container">

      <table>
      <thead>
        <tr>
          <th>סוג בקשה</th>
          <th> תיאור הבקשה</th>
          <th>תאריך הגשה</th>
          <th>סטטוס</th>
          {!props.isOpen && <th>פירוט</th>}
        </tr>
      </thead>
      <tbody>
        {props.requestArray.map((request) => (
          <RequestItem
            id={request.id}
            type={request.type}
            description={request.description}
            date={request.createdAt}
            isValid={request.isValid}
            isOpen={props.isOpen}
            reasonIfNeeded={request.reasonIfNeeded}
          />
    ))}
          </tbody>
      </table>
    </div>
}
</>
);
}


export default RequestsList;