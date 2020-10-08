import React from "react";

const Sweet = ({ sweetObj, isOwner }) => (
  <div>
    <h4>{sweetObj.text}</h4>
    {isOwner && (
      <>
        <button>Delete Sweet</button>
        <button>Edit Sweet</button>
      </>
    )}
  </div>
);

export default Sweet;
