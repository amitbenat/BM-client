import { useContext, useRef, useState } from 'react';
import Card from '../../generic/Card';
import LoadingSpinner from '../../generic/LoadingSpinner';
import './RequestForm.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../store/auth-context';
import PORT from '../../../EnviromentVars';

const RequestForm = (props) => {
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const descriptionInputRef = useRef();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('')
  const [hasError, setHasError] = useState(false)


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
    let url = `${PORT}/requests`;
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
        console.log(err.response.data);
        setIsLoading(false);
        setHasError(true)
        setErrorMessage(err.response.data)
      });
  }

  return (
    <div className="request-form-card">
      <Card>
        <form className="request-form-form" onSubmit={submitFormHandler}>
          {isLoading && (
            <div className="request-form-loading">
              <LoadingSpinner />
            </div>
          )}
          {props.requestType && (
            <>
              <h3 className="request-form-form">{props.requestType}</h3>
              <div className="request-formc-ontrol">
                {props.requestType === 'בקשת אישור כניסה רגלי/רכוב לבה"ד' && (
                  <>
                    <label htmlFor="type">סוג אישור כניסה:</label>
                    <div className="request-form-enter-type">
                      <input
                        type="radio"
                        id="walk"
                        name="transportation"
                        value="walk"
                        checked={selectedOption === 'walk'}
                        onChange={(event) =>
                          setSelectedOption(event.target.value)
                        }
                      />
                      <label htmlFor="walk">רגלי</label>
                      <input
                        type="radio"
                        id="drive"
                        name="transportation"
                        value="drive"
                        checked={selectedOption === 'drive'}
                        onChange={(event) =>
                          setSelectedOption(event.target.value)}
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
              {hasError && <p>{errorMessage}</p>}
              <div className="request-form-actions">
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
