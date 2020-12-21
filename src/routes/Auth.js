import { authService } from "../fbase";
import { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState(false);

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
      <button>Countinue with Google</button>
      <button>Countinue with Google</button>
    </div>
  );
};

export default Auth;
