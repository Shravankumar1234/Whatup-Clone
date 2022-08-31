import React from "react";
import "./Sidebar.css";
import profile from "../images/profile.png"
import { SidebarContactList } from "./SidebarContactList";
import { collection, getDocs, onSnapshot } from "firebase/firestore"; 
import { db } from "../firebase";
import { useEffect } from "react";
import { useState } from "react";

export const Siderbar = () => {
    const [Groups,SetGroups]=useState([])
    const getnewchat=async()=>{
        const getData= onSnapshot(collection(db,"Masai-Group"),(el)=>{
          let List=[];
          el.forEach((item)=>{
             List.push({
              id:item.id,
              ...item.data()
             })
          });
          SetGroups(List)
        });
        
    }
    useEffect(()=>{
        getnewchat();
    },[])

  return (
    <div className="sidebar_main">
      <div className="sider_second_div">
        <div className="sider_Left_div">
          <img src={profile} alt="" />
        </div>
        <div className="sider_Right_div">
          <button style={{ border: "none" }}>
            <span className="material-symbols-outlined">cycle</span>
          </button>
          <button style={{ border: "none" }}>
            <span className="material-symbols-outlined">chat</span>
          </button>
          <button style={{ border: "none" }}>
            <span className="material-symbols-outlined">more_vert</span>
          </button>
        </div>
      </div>
      {/* Search Bar........... */}
      <div className="Searchsidebar">
        <div className="Searchcontent">
          <span className="material-symbols-outlined">search</span>
          <input type="text" placeholder="Search Contacts" />
        </div>
      </div>
      {/* SiderbarContactList........... */}
      <div className="siderbarcontactlist">
        <SidebarContactList addNewChat/>
        {
            Groups.map((el)=>(
                <SidebarContactList key={el.id} name={el.name} Id={el.id}/>
            ))
        }
      </div>
    </div>
  );
};
