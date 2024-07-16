import RequestItem from './RequestItem';
import './RequestsList.css';
const RequestsList = (props) => {
  return (
    <>
      {props.requestsArray.length === 0 &&
        props.tableType !== 'history-admin' && <p>אין בקשות מסוג זה!</p>}
      {props.requestsArray.length === 0 &&
        props.tableType === 'history-admin' && (
          <p>לא נמצאו בקשות בטווח תאריכים זה!</p>
        )}
      {props.requestsArray.length !== 0 && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                {(props.tableType === 'open-admin' ||
                  props.tableType === 'history-admin') && <th>מגיש הבקשה</th>}
                <th>סוג בקשה</th>
                <th> תיאור הבקשה</th>
                <th>תאריך הגשה</th>
                {props.tableType !== 'open-admin' && <th>סטטוס</th>}
                {(props.tableType === 'close-client' ||
                  props.tableType === 'history-admin') && <th>פירוט</th>}
                {props.tableType === 'open-admin' && <th>קבלה</th>}
              </tr>
            </thead>
            <tbody>
              {props.requestsArray.map((request) => {
                return (
                  <RequestItem
                    request={request}
                    key={request._id}
                    tableType={props.tableType}
                    setRequestsArray={props.setRequestsArray}
                    requestsArray={props.requestsArray}
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
