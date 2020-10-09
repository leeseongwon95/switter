import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import Sweet from "components/Sweet";
import SweetFactory from "components/SweetFactory";

const Home = ({ userObj }) => {
  // Home 의 props 는 router에 의해서 받음
  const [sweets, setSweets] = useState([]);
  useEffect(() => {
    dbService.collection("sweets").onSnapshot((snapshot) => {
      // onSnapshot 데이터베이스에 무슨 일이 있으면 알림을 받음
      const sweetArray = snapshot.docs.map((doc) => ({
        // 새로운 스냅샷을 만들 때 배열을 만들고
        id: doc.id,
        ...doc.data(),
      }));
      setSweets(sweetArray); // 그런다음 state에 배열을 집어넣는다
    });
  }, []);

  return (
    <div>
      <SweetFactory userObj={userObj} />
      <div>
        {sweets.map((sweet) => (
          // map 을 만들고 Sweet component를 만든다
          <Sweet // sweet component는 두 개의 prop sweetObj, isOwner 를 가진다
            key={sweet.id}
            sweetObj={sweet} // sweet의 모든 데이터 autor , text , createdAt
            isOwner={sweet.creatorId === userObj.uid} // isOwner 는 다이나믹한 prop 임 때때로 true, false
          /> // sweet를 작성한 사람과 userObj.uid 가 같으면 true userObj는 Home의 props 에서 옴 (7번줄)
        ))}
      </div>
    </div>
  );
};

export default Home;
