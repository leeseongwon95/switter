import { authService } from "fbase";
import React from "react";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
    // react hooks 로 profile.js 에서 직접 할수도있다.
  };
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
