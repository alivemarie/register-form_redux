import './App.css';
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {signUp} from "./features/userSlice";

function App() {

  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const [fullnameTouched, setFullnameTouched] = useState(false);
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPassTouched, setConfirmPassTouched] = useState(false);

  const [fullnameError, setFullnameError] = useState('Поле не может быть пустым');
  const [usernameError, setUsernameError] = useState('Поле не может быть пустым');
  const [emailError, setEmailError] = useState('Поле не может быть пустым');
  const [passwordError, setPasswordError] = useState('Поле не может быть пустым');
  const [confirmPassError, setConfirmPassError] = useState('Пароли должны совпадать');

  const [formValid, setFormValid] = useState(false);

  useEffect(() => {

    if (fullnameError || usernameError || emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }

  }, [fullnameError, usernameError, emailError, passwordError])

  function fullnameHandler (e) {
    setFullname(e.target.value);
    e.target.value ? setFullnameError('') : setFullnameError('Поле не может быть пустым')
  }

  function usernameHandler (e) {
    setUsername(e.target.value);
    e.target.value ? setUsernameError('') : setUsernameError('Поле не может быть пустым')
  }

  function emailHandler (e) {
    setEmail(e.target.value);
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    re.test(String(email).toLowerCase()) ? setEmailError('') : setEmailError('Некорректный адрес почты');
  }

  function passwordHandler (e) {
    setPassword(e.target.value);
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    if (!re.test(String(e.target.value))) {
      setPasswordError('Минимум 8 знаков, 1 заглавная буква, 1 строчная буква и 1 цифра');
      if (!e.target.value) {
        setPasswordError('Поле не может быть пустым');
      }
    } else {
      if (e.target.value === confirmPass) {
        setPasswordError('');
        setConfirmPassError('');
      } else {
        setPasswordError('Пароли должны совпадать');
        setConfirmPassError('Пароли должны совпадать');
      }
      }
  }

  function confirmPassHandler (e) {
    setConfirmPass(e.target.value);
    e.target.value ? setConfirmPassError('') : setConfirmPassError('Поле не может быть пустым');
    if (e.target.value === password) {
      setPasswordError('');
      setConfirmPassError('');
    } else {
      setPasswordError('Пароли должны совпадать');
      setConfirmPassError('Пароли должны совпадать');
    }

  }

  function blurHandler(e) {
    switch (e.target.name) {
      case 'fullname' :
        setFullnameTouched(true);
        break
      case 'username' :
        setUsernameTouched(true);
        break
      case 'email' :
        setEmailTouched(true);
        break
      case 'password' :
        setPasswordTouched(true);
        break
      case 'confirm-password' :
        setConfirmPassTouched(true);
        break
    }
  }

  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(signUp({
      fullname: fullname,
      username: username,
      email: email,
      password: password,
      signUpSuccess: true,
    }))
  }

  return (
    <div className='App'>
      <form className='form' action="" onSubmit={e => handleSubmit(e)}>
        <h1>Регистрация</h1>

        {(fullnameTouched && fullnameError) && <div style={{color:'red'}}>{fullnameError}</div>}
        <div className="row">
          <label htmlFor="fullname">Полное имя</label>
          <input onChange={e => fullnameHandler(e)} onBlur={e => blurHandler(e)} name="fullname" id='fullname'
                 type="text" placeholder='Enter your real name' value={fullname} required/>
        </div>

        {(usernameTouched && usernameError) && <div style={{color:'red'}}>{usernameError}</div>}
        <div className="row">
          <label htmlFor="username">Имя пользователя</label>
          <input onChange={e => usernameHandler(e)} onBlur={e => blurHandler(e)} name="username" id='username'
                 type="text" placeholder='Enter your real name' value={username} required/>
        </div>

        {(emailTouched && emailError) && <div style={{color:'red'}}>{emailError}</div>}
        <div className="row">
          <label htmlFor="email">Почта</label>
          <input onChange={e => emailHandler(e)} onBlur={e => blurHandler(e)} name='email' id='email' type="email"
                 placeholder='Enter your email' value={email} required/>
        </div>

        {(passwordTouched && passwordError) && <div style={{color:'red'}}>{passwordError}</div>}
        <div className="row">
          <label htmlFor="">Пароль</label>
          <input onChange={e => passwordHandler(e)} onBlur={e => blurHandler(e)} name='password' id='password'
                 type="password" placeholder='Enter your password' value={password} required/>
        </div>

        {(confirmPassTouched && confirmPassError) && <div style={{color:'red'}}>{confirmPassError}</div>}
        <div className="row">
          <label htmlFor="confirm-password">Пароль ещё раз</label>
          <input onChange={e => confirmPassHandler(e)} onBlur={e => blurHandler(e)} name='confirm-password'
                 id='confirm-password' type="password" placeholder='Confirm your password' value={confirmPass} required/>
        </div>

        <button disabled={!formValid} type='submit'>Зарегистрироваться</button>

      </form>
    </div>
  );
}

export default App;
