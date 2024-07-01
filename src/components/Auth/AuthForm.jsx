import { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';
import AuthContext from '../../store/auth-context';
import axios from 'axios';

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const nameInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
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

    //validation
    setIsLoading(true);
    let url = `http://localhost:8080/users${isLogin ? `/login` : ''}`;
    axios
      .post(url, currentUserDetails)
      .then((res) => {
        setIsLoading(false);
        authCtx.login(res.data.token, res.data.user.isAdmin);
        navigate('/');
        return res.data;
      })
      .catch((err) => {
        setIsLoading(false);
        alert(err.response.data);
      });
  };

  return (
    <section className="authform">
      <h1>{isLogin ? 'התחברות' : 'הרשמות'}</h1>
      <form onSubmit={submitHandler}>
        {!isLogin && (
          <div className="authformcontrol">
            <label htmlFor="name">שם פרטי</label>
            <input type="text" id="name" required ref={nameInputRef} />
          </div>
        )}
        <div className="authformcontrol">
          <label htmlFor="email">אימייל</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className="authformcontrol">
          <label htmlFor="password">סיסמה</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className="authformactions">
          {!isLoading && <button>{isLogin ? 'התחבר' : 'צור חשבון'}</button>}
          {isLoading && <p>Loading...</p>}
          <button
            type="button"
            className="toggleauth"
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'צור משתמש חדש' : 'התחבר עם משתמש קיים'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
