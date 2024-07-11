import { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';
import AuthContext from '../../store/auth-context';
import axios from 'axios';

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const nameInputRef = useRef();
  const [hasError, setHasError] = useState(false)
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const changeHandler = () => {
    setHasError(false)
  }
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
        setHasError(true)
      });
  };

  const className = !hasError? "authformcontrol" : "authformcontrol invalid"
  return (
    <section className="authform">
      <h1>{isLogin ? 'התחברות' : 'הרשמות'}</h1>
      <form onSubmit={submitHandler}>
        {!isLogin && (
          <div className={className}>
            <label htmlFor="name">שם פרטי</label>
            <input type="text" id="name" required ref={nameInputRef} onChange={changeHandler}/>
          </div>
        )}
        <div className={className}>
          <label htmlFor="email">אימייל</label>
          <input type="email" id="email" required ref={emailInputRef} onChange={changeHandler}/>
        </div>
        <div className={className}>
          <label htmlFor="password">סיסמה</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
            onChange={changeHandler}
          />
        </div>
        {hasError&&<label>.נראה שמשהו השתבש. בדוק את תקינות הערכים שהזנת</label>}
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
