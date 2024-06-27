import { useContext, useRef } from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../../store/auth-context';
import { useNavigate } from 'react-router-dom'
const ProfileForm = () => {
  const newPasswordInputRef = useRef()
  const navigate = useNavigate()
  const authCtx = useContext(AuthContext)

  const submitHandler = event => {
    event.preventDefault()


    const enteredNewPassword = newPasswordInputRef.current.value

    //validation

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDkI8cViqMGamedxglN6sjinkxUz4He1PE',{
      method: 'POST',
      body:JSON.stringify({
        idToken: authCtx.token,
        password: enteredNewPassword,
        returnSecureToken: false
      })
    }).then(res=>{
      //assumption: alwys valid
        navigate('/')
      })
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' minLength='7' id='new-password' ref={newPasswordInputRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
