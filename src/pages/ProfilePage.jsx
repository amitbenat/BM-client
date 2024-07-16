import { useContext, useEffect, useState } from 'react';
import AuthContext from '../store/auth-context';
import Card from '../components/generic/Card';
import LoadingSpinner from '../components/generic/LoadingSpinner';
import axios from 'axios';
import PORT from '../EnviromentVars';
import './ProfilePage.css'

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const authCtx = useContext(AuthContext);
  const submitHandler = () => {
    setIsLoading(true);
    let url = `${PORT}/users/me`;
    axios
      .patch(
        url,
        { email },
        {
          headers: {
            Authorization: `Bearer ${authCtx.token}`,
          },
        }
      )
      .then((res) => {
        setIsLoading(false);
        setErrorMessage('אימייל שונה בהצלחה!');
        return res.data;
      })
      .catch((err) => {
        setIsLoading(false);
        setErrorMessage(err.response.data);
      });
  };
  useEffect(() => {
    setIsLoading(true);
    let url = `${PORT}/users/me`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setEmail(res.data.email);
        return res.data;
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, [authCtx.token]);

  const classes = errorMessage === 'אימייל שונה בהצלחה!'? 'valid': 'invalid'

  return (
    <>
      {isLoading && (
        <div className="request-form-loading">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && (
        <>
          <br />
          <Card>
            <h3>עדכון כתובת אימייל</h3>
            <form className="auth-form-control" onSubmit={submitHandler}>
              <label htmlFor="new-email">כתובת אימייל</label>
              <input
                type="email"
                id="new-email"
                defaultValue={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                required
              />
              {errorMessage && <p className={classes}>{errorMessage}</p>}
              <button>עדכון</button>
            </form>
          </Card>
        </>
      )}
    </>
  );
};

export default ProfilePage;
