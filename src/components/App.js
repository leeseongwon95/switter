import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      // onAuthStateChanged state 변화를 다루고 있음
      if (user) {
        // 로그인 로그아웃 할 때 일어나고 어플리케이션이 초기화 될 때 일어남
        setUserObj({
          // 왜 setUserObj(user) 가 아닌가? 오브젝트의 크기가 너무 커져서 리액트가 어떤 걸 랜더링 할 지 모른다
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args), // 이 function은 원하는 function 을 얻기 위한 중간 function이다
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args), // 이 function은 원하는 function 을 얻기 위한 중간 function이다
    });
  };
  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        "Initializing..."
      )}
    </>
  );
}

export default App;
