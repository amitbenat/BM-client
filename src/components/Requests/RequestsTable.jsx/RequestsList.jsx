import RequestItem from './RequestItem';
import './RequestsList.css';
const RequestsList = (props) => {
  return (
    <>
      {props.requestArray.length === 0 && <p>אין בקשות מסוג זה!</p>}
      {props.requestArray.length !== 0 && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                {props.tableType === 'open-admin' && <th>מגיש הבקשה</th>}
                <th>סוג בקשה</th>
                <th> תיאור הבקשה</th>
                <th>תאריך הגשה</th>
                {props.tableType !== 'open-admin' && <th>סטטוס</th>}
                {props.tableType === 'close-client' && <th>פירוט</th>}
                {props.tableType === 'open-admin' && <th>קבלה</th>}
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
                  tableType={props.tableType}
                  reasonIfNeeded={request.reasonIfNeeded}
                  email={request.owner.email}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default RequestsList;
