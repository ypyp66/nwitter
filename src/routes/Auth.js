import { authService, firebaseInstance } from "../fbase";
import { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true); //새로운 계정인지
  const [error, setError] = useState(false); //에러

  const onSubmit = async (e) => {
    e.preventDefault();
    let data;
    try {
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          //createUserWithEmailAndPassword 함수는 promise함수 이므로 비동기 처리를 위해 onSubmit = async를 하고 await을 한다.
          //newAccout가 true이면 (email, password)로 계정 생성 후 로그인한다
          email,
          password
        );
      } else {
        //이미 계정이 있다면
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log("data", data);
    } catch (error) {
      setError(error.message);
    }
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    name === "email" ? setEmail(value) : setPassword(value);
  };

  const toggleAccount = () => {
    setNewAccount((prev) => !prev); //이전 상태를 가져와서 반전시킴
  };

  const onSocialClick = async (e) => {
    const { name } = e.target; //es6문법
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }

    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          value={email}
          placeholder="Email"
          onChange={onChange}
          required
        />
        <input
          name="password"
          type="password"
          value={password}
          placeholder="Password"
          onChange={onChange}
          required
        />
        <input type="submit" value={newAccount ? "Create Account" : "Login"} />
        {error}
        <div onClick={toggleAccount}>
          {newAccount ? "Sign in" : "Create Account"}
        </div>
      </form>
      <button name="google" onClick={onSocialClick}>
        Countinue with Google
      </button>
      <button name="github" onClick={onSocialClick}>
        Countinue with Github
      </button>
    </div>
  );
};

export default Auth;
