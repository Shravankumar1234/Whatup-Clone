import React from "react";
import "./Chat.css";
import images from "../images/images.jpg";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";

export const Chat = () => {
  const Id = useParams();
  const [GroupName, SetGroup] = useState();
  const [Input, setInput] = useState("");
  const [message, SetMessage] = useState([]);
  useEffect(() => {
    if (Id.id) {
      const getGroup = onSnapshot(doc(db, "Masai-Group", Id.id), (el) => {
        SetGroup(el.data().name);
      });
      const q = query(
        collection(db, "Masai-Group", Id.id, "messages"),
        orderBy("timeStamp", "asc")
      );
      const getMessage = onSnapshot(q, (el) => {
        let ListMessage = [];
        el.docs.forEach((item) => {
          ListMessage.push({ ...item.data() });
        });
        SetMessage(ListMessage);
      });
    }
  }, [Id.id]);

  const Sendmessage = async (e) => {
    e.preventDefault();
    if (Input === "") {
      return alert("Please Enter Message");
    }

    try {
      const SendData = await addDoc(
        collection(db, "Masai-Group", Id.id, "messages"),
        {
          message: Input,
          name: "Shravan",
          timeStamp: serverTimestamp(),
        }
      );
    } catch (e) {
      console.log(e);
    }

    setInput("");
  };
  console.log(message);
  return (
    <div className="chat_main">
      <div className="chatheader">
        <img src={images} alt="" />
        <div className="chatleftinfo">
          <h2>{GroupName}</h2>
          <p>Last seen at </p>
        </div>
        <div className="chatright">
          <button style={{ border: "none" }}>
            <span className="material-symbols-outlined">search</span>
          </button>
          <button style={{ border: "none" }}>
            <span className="material-symbols-outlined">attach_file</span>
          </button>
          <button style={{ border: "none" }}>
            <span className="material-symbols-outlined">more_vert</span>
          </button>
        </div>
      </div>
      {/* messagebody............ */}
      <div className="messagebody">
        {message.map((el) => (
          <p className={`textmessage ${el.name == "Kiran" && "ChatReceive"}`}>
            <span className="chatName">{el.name}</span>
            {el.message}
            <span className="chatTime">
              {el.timeStamp?.toDate().toUTCString()}
            </span>
          </p>
        ))}
      </div>
      {/* chatFooter................ */}
      <div className="chatfooter">
        <span>
          <span className="material-symbols-outlined">mood</span>
        </span>
        <form
          onSubmit={(e) => {
            Sendmessage(e);
          }}
        >
          <input
            value={Input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            type="text"
            placeholder="Type Message"
          />
          <button type="submit" style={{ border: "none" }}>
            <span className="material-symbols-outlined">send</span>
          </button>
          <button style={{ border: "none" }}>
            <span className="material-symbols-outlined">mic</span>
          </button>
        </form>
      </div>
    </div>
  );
};
