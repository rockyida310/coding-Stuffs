import React, { useEffect, useState } from "react";
import "./sidebar.css";
import axios from 'axios';
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [categories,setCategories] = useState([]);

  useEffect(()=>{
    const getCategories = async () =>{
      const res = await axios.get('/categories');
      // console.log(res.data);
      setCategories(res.data);
    };
    getCategories();
  },[]);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {categories.map((category,index)=>(
            <Link key={index} to={`/?category=${category.name}`} className="link">
              <li className="sidebarListItem">{category.name}</li>
            </Link>
          ))}
          
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
          alt=""
        />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, cum
          molestiae! Libero quam iusto neque et, ipsum quasi modi quidem quod
          suscipit officiis? Placeat, maxime dolorem eos quam esse ea.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
