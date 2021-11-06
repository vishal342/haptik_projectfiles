import Fav from "./assets/favorite.png";
import FavFill from "./assets/favorite-fill.png";
import DeleteBtn from "./assets/delete.png";
import React, { useState } from "react";

const FriendList = (props) => {
  const [count, setCount] = useState(false);
  const todolist = props.friendlist.length ? (
    props.friendlist.map((item) => {
      return (
        <div className="collection-item" key={item.id}>
          <div className="friendName">
            <h6>{item.content}</h6>
            <p>{props.relation}</p>
          </div>
          <div className="actionBtn">
            <span id="fav" onClick={() => setCount((item.favorite = !count))}>
              <img key={item.id} src={!item.favorite ? Fav : FavFill} />
            </span>
            <span id="del" onClick={() => props.deleteItem(item.id)}>
              <img src={DeleteBtn} />
            </span>
          </div>
        </div>
      );
    })
  ) : (
    <p className="emptyList">Friends list is empty</p>
  );

  return <div className="listItems">{todolist}</div>;
};

export default FriendList;
