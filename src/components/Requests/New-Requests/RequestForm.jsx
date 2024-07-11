import { useContext, useRef, useState } from 'react';
import Card from '../../UI/Card';
import LoadingSpinner from '../../UI/LoadingSpinner';
import './RequestForm.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../store/auth-context';

const RequestForm = (props) => {
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const descriptionInputRef = useRef();
  const navigate = useNavigate();

  const changeHandler = (event) => {
    setSelectedOption(event.target.value);
  };
  function submitFormHandler(event) {
    event.preventDefault();
    let type = props.requestType;
    if (selectedOption) {
      if (selectedOption === 'drive') {
        type = 'בקשת אישור כניסה רכוב';
      } else {
        type = 'בקשת אישור כניסה רגלי';
      }
    }
    const enteredDescription = descriptionInputRef.current.value;
    const requestDetails = {
      description: enteredDescription,
      status: 'pending',
      isValid: null,
      type,
      reasonIfNeeded: null,
    };

    setIsLoading(true);
    let url = `http://localhost:8080/requests`;
    axios
      .post(url, requestDetails, {
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        navigate('/requests/my-requests');
        return res.data;
      })
      .catch((err) => {
        setIsLoading(false);
        alert(err.response.data);
      });
  }

  return (
    <div className="requestformcard">
      <Card>
        <form className="requestformform" onSubmit={submitFormHandler}>
          {isLoading && (
            <div className="requestformloading">
              <LoadingSpinner />
            </div>
          )}
          {props.requestType && (
            <>
              <h3 className="requestformform">{props.requestType}</h3>
              <div className="requestformcontrol">
                {props.requestType === 'בקשת אישור כניסה רגלי/רכוב לבה"ד' && (
                  <>
                    <label htmlFor="type">סוג אישור כניסה:</label>
                    <div className="requestformentertype">
                      <input
                        type="radio"
                        id="walk"
                        name="transportation"
                        value="walk"
                        checked={selectedOption === 'walk'}
                        onChange={changeHandler}
                      />
                      <label htmlFor="walk">רגלי</label>
                      <input
                        type="radio"
                        id="drive"
                        name="transportation"
                        value="drive"
                        checked={selectedOption === 'drive'}
                        onChange={changeHandler}
                      />
                      <label htmlFor="drive">רכוב</label>
                    </div>
                  </>
                )}

                <label htmlFor="description">תיאור סיבת הבקשה:</label>
                <textarea
                  type="text"
                  id="description"
                  ref={descriptionInputRef}
                />
              </div>
              <div className="requestformactions">
                <button className="btn">שלח בקשה</button>
              </div>
            </>
          )}
          {!props.requestType && <p>בחר בקשה</p>}
        </form>
      </Card>
    </div>
  );
};

export default RequestForm;
