import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "fbase";
import Sweet from "components/Sweet";

const Home = ({ userObj }) => {
  // Home 의 props 는 router에 의해서 받음
  const [sweet, setSweet] = useState("");
  const [sweets, setSweets] = useState([]);
  const [attachment, setAttachment] = useState("");
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
  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const sweetObj = {
      text: sweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("sweets").add(sweetObj);
    setSweet("");
    setAttachment("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setSweet(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0]; // input 하나의 파일만 받기 때문에 모든 파일 중에 첫번째 파일만 받게 함
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      // 파일 읽는 것이 끝나면 이벤트를 갖게 됨
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => setAttachment(null);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={sweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Sweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>Cancel upload</button>
          </div>
        )}
      </form>
      <div>
        {sweets.map((
          sweet // map 을 만들고 Sweet component를 만든다
        ) => (
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
