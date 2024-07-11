import { useContext, useEffect, useState } from 'react';
import AuthContext from '../store/auth-context';
import Card from '../components/UI/Card';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import axios from 'axios';

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  const authCtx = useContext(AuthContext);
  const submitHandler = () => {
    setIsLoading(true);
    let url = `http://localhost:8080/users/me`;
    axios
      .patch(url, { email },{
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        console.log(res);
        return res.data;
      })
      .catch((err) => {
        setIsLoading(false);
        alert(err.response.data);
      });
  };
  useEffect(() => {
    setIsLoading(true);
    let url = `http://localhost:8080/users/me`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        console.log(res);
        setEmail(res.data.email);
        return res.data;
      })
      .catch((err) => {
        setIsLoading(false);
        alert(err.response.data);
      });
  }, [authCtx.token]);

  return (
    <>
      {isLoading && (
        <div className="requestformloading">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && (
        <>
          <br />
          <Card>
            <h3>עדכון כתובת אימייל</h3>
            <form className="authformcontrol" onSubmit={submitHandler}>
              <label htmlFor="newemail">כתובת אימייל</label>
              <input
                type="email"
                id="newemail"
                defaultValue={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                required
              />
              <button>עדכון</button>
            </form>
          </Card>
        </>
      )}
    </>
  );
};

export default ProfilePage;
