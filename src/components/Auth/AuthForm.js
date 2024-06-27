import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./AuthForm.module.css";
import AuthContext from "../../store/auth-context";
import axios from "axios";

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
    let reqObject = {
      email: enteredEmail,
      password: enteredPassword,
    }
    if(!isLogin){
      const enteredName = nameInputRef.current.value;
       reqObject = {
        name: enteredName,
        email: enteredEmail,
        password: enteredPassword,
      }
    }



    //validation
    setIsLoading(true);
    let url;
    if (isLogin) {
      url = "http://localhost:8080/users/login";
    } else {
      url = "http://localhost:8080/users";
    }
    axios.post(url, reqObject)
      .then((res) => {
        setIsLoading(false)
        if (res.status === 200 || res.status === 201) {
          authCtx.login(res.data.token);
          navigate("/");
          return res.data;
        } else {
          let errorMessage = "Authentication failed!";
          throw new Error(errorMessage);
        }
      }).catch((err) => {
        setIsLoading(false)
        alert(err.response.data);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "התחברות" : "הרשמות"}</h1>
      <form onSubmit={submitHandler}>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="name">שם פרטי</label>
            <input type="text" id="name" required ref={nameInputRef} />
          </div>
        )}
        <div className={classes.control}>
          <label htmlFor="email">אימייל</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">סיסמה</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? "התחבר" : "צור חשבון"}</button>}
          {isLoading && <p>Loading...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "צור משתמש חדש" : "התחבר עם משתמש קיים"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
