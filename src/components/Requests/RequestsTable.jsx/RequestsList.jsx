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
              {props.requestArray.map((request) => {
                return (
                  <RequestItem
                    key={request._id}
                    id={request._id}
                    type={request.type}
                    description={request.description}
                    date={request.createdAt}
                    isValid={request.isValid}
                    tableType={props.tableType}
                    reasonIfNeeded={request.reasonIfNeeded}
                    email={request.owner.email}
                    setRequestsArray={props.setRequestsArray}
                    requestArray={props.requestArray}
                    openRejectHandler={props.openRejectHandler}
                    setChosenRequestId={props.setChosenRequestId}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default RequestsList;
