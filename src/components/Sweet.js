import React from "react";
import { dbService, storageService } from "fbase";
import { useState } from "react";

const Sweet = ({ sweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newSweet, setNewSweet] = useState(sweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this sweet?"); // ok를 클릭하면 true 가 되고
    if (ok) {
      await dbService.doc(`sweets/${sweetObj.id}`).delete(); // ok 가 true 면 dbService doc 실행
      await storageService.refFromURL(sweetObj.attachmentUrl).delete();
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`sweets/${sweetObj.id}`).update({
      text: newSweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewSweet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your sweet"
              value={newSweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update Sweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{sweetObj.text}</h4>
          {sweetObj.attachmentUrl && (
            <img src={sweetObj.attachmentUrl} width="50px" height="50px" />
          )}
          {isOwner && ( // 작성자만 버튼을 볼 수 있음
            <>
              <button onClick={onDeleteClick}>Delete Sweet</button>
              <button onClick={toggleEditing}>Edit Sweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Sweet;
