import React, { useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import { useEffect } from "react";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      // onAuthStateChanged state 변화를 다루고 있음
      if (user) {
        // 로그인 로그아웃 할 때 일어나고 어플리케이션이 초기화 될 때 일어남
        setUserObj(user);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        "Initializing..."
      )}
      <footer>&copy; {new Date().getFullYear()} Switter </footer>
    </>
  );
}

export default App;
