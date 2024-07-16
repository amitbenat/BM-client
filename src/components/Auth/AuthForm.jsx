import { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';
import AuthContext from '../../store/auth-context';
import axios from 'axios';
import PORT from '../../EnviromentVars';

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const newPasswordInputRef = useRef();
  const authPasswordInputRef = useRef();
  const forgotPasswordEmailRef = useRef();
  const nameInputRef = useRef();
  const [hasError, setHasError] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotPassword, setIsForgetPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const forgotPasswordSubmitHandler = (event) => {
    event.preventDefault();
    const email = forgotPasswordEmailRef.current.value;
    const newPassword = newPasswordInputRef.current.value;
    const authPassword = authPasswordInputRef.current.value;
    setIsLoading(true);
    let url = `${PORT}/users/forgot-password`;
    axios
      .patch(url, { email, newPassword, authPassword })
      .then((res) => {
        setIsLoading(false);
        authCtx.login(res.data.token, res.data.user.isAdmin);
        navigate('/requests/my-requests');
        return res.data;
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    let currentUserDetails = {
      email: enteredEmail,
      password: enteredPassword,
    };
    if (!isLogin) {
      const enteredName = nameInputRef.current.value;
      currentUserDetails = {
        name: enteredName,
        email: enteredEmail,
        password: enteredPassword,
      };
    }

    setIsLoading(true);
    let url = `${PORT}/users${isLogin ? `/login` : ''}`;
    axios
      .post(url, currentUserDetails)
      .then((res) => {
        setIsLoading(false);
        authCtx.login(res.data.token, res.data.user.isAdmin);
        navigate('/requests/my-requests');
        return res.data;
      })
      .catch((err) => {
        console.log(err.response.data);
        setErrorMessage(err.response.data);
        setIsLoading(false);
        setHasError(true);
      });
  };

  const className = hasError
    ? 'auth-form-control invalid'
    : 'auth-form-control';
  return (
    <section className="auth-form">
      {!isForgotPassword && (
        <>
          <h1>{isLogin ? 'התחברות' : 'הרשמות'}</h1>
          <form onSubmit={submitHandler}>
            {!isLogin && (
              <div className={className}>
                <label htmlFor="name">שם פרטי</label>
                <input
                  type="text"
                  id="name"
                  required
                  ref={nameInputRef}
                  onChange={() => setHasError(false)}
                />
              </div>
            )}
            <div className={className}>
              <label htmlFor="email">כתובת אימייל</label>
              <input
                type="email"
                id="email"
                required
                ref={emailInputRef}
                onChange={() => setHasError(false)}
              />
            </div>
            <div className={className}>
              <label htmlFor="password">סיסמה</label>
              <input
                type="password"
                id="password"
                required
                ref={passwordInputRef}
                onChange={() => setHasError(false)}
              />
            </div>
            {!isLogin && <p>הקפד על סיסמה מעל 7 תווים</p>}
            <div className="auth-form-actions">
              {hasError && <p>{errorMessage}</p>}
              {!isLoading && <button>{isLogin ? 'התחבר' : 'צור חשבון'}</button>}
              <button
                type="button"
                className="toggle-auth"
                onClick={() => setIsForgetPassword(true)}
              >
                שכחת סיסמה?
              </button>
              {isLoading && <p>Loading...</p>}
              <button
                type="button"
                className="toggle-auth"
                onClick={switchAuthModeHandler}
              >
                {isLogin ? 'צור משתמש חדש' : 'התחבר עם משתמש קיים'}
              </button>
            </div>
          </form>
        </>
      )}
      {isForgotPassword && (
        <>
          <h1>שכחת סיסמה?</h1>
          <form onSubmit={forgotPasswordSubmitHandler}>
            <div className="auth-form-control">
              <label htmlFor="email">כתובת אימייל</label>
              <input
                type="email"
                id="email"
                required
                ref={forgotPasswordEmailRef}
              />
              <label htmlFor="newpassword">סיסמה חדשה</label>
              <input
                type="password"
                id="newpassword"
                required
                ref={newPasswordInputRef}
              />
              <label htmlFor="authpassword">אימות סיסמה</label>
              <input
                type="password"
                id="authpassword"
                required
                ref={authPasswordInputRef}
              />
            </div>
            <div className="auth-form-actions">
              <button>עדכן סיסמה</button>
              <div className="auth-form-actions">
                <button
                  type="button"
                  className="toggle-auth"
                  onClick={() => {
                    setIsForgetPassword(false);
                  }}
                >
                  התחברות/הרשמות
                </button>
              </div>
              {isLoading && <p>Loading...</p>}
            </div>
          </form>
        </>
      )}
    </section>
  );
};

export default AuthForm;
