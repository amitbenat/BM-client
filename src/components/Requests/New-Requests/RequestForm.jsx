import { useRef } from 'react';
import Card from '../../UI/Card';
import LoadingSpinner from '../../UI/LoadingSpinner';
import './RequestForm.css';

const RequestForm = (props) => {
  const descriptionInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredDescription = descriptionInputRef.current.value;

    //add
  }

  return (
    <div className="requestformcard">
      <Card>
        <form className="requestformform" onSubmit={submitFormHandler}>
          {/* {(
          <div className={classes.loading}>
            <LoadingSpinner />
          </div>
        )} */}

          <div className="requestformcontrol">
            <label htmlFor="description">:תיאור סיבת הבקשה</label>
            <textarea type="text" id="description" ref={descriptionInputRef} />
          </div>
          <div className="requestformactions">
            <button className="btn">שלח בקשה</button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default RequestForm;
