import { useEffect, useState } from "react";
import Routers from "./Routers";
import { authService } from "../fbase";

function App() {
  const [init, setInit] = useState(false); //로딩화면용도
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      console.log("onAuthStateChanged", user);
      //사용자 상태를 보고있는 함수
      if (user) {
        //user가 참이면 (로그인 했다면)
        setIsLoggedIn(true); //isLoggedIn을 true로
        setUserObj(user);
      } else {
        //로그인 안된상태라면
        setIsLoggedIn(false); //isLoggedIn을 false로
      }
      setInit(true); //로딩화면 끝내기
    });
  }, []);
  return (
    <>
      {init ? (
        <Routers isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        "시작중..."
      )}
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
