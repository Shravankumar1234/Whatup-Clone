import React from "react";
import "./SiderbarContactList.css";
import images from "../images/images.jpg";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

export const SidebarContactList = ({ addNewChat, name, Id }) => {
  const [chat, SetChat] = useState("");
  useEffect(() => {
    if (Id) {
      const q = query(
        collection(db, "Masai-Group", Id, "messages"),
        orderBy("timeStamp", "asc")
      );
      const getmessage=onSnapshot(q,(el)=>{
        el.docs.forEach((item)=>{
            SetChat(item.data())
        })
      })
    }
  },[Id]);
console.log(chat.message)
  const createNewchat = async () => {
    const groups = prompt("Please Enter Group Name or Name");
    if (groups) {
      try {
        const docRef = await addDoc(collection(db, "Masai-Group"), {
          name: groups,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  return !addNewChat ? (
    <Link to={`Groups/${Id}`}>
      <div className="sidebarcontactchat" key={Id}>
        <img src={images} alt="" />
        <div className="siderbarinfo">
          <h2>{name}</h2>
          <p>{chat.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div className="chatnewitem">
      <h2 onClick={createNewchat}>Add New Item</h2>
    </div>
  );
};
