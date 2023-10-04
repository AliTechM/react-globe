import React, { useEffect, useState } from "react";
import infos from './earth/infos.json'
import { Outlet, Link, NavLink, useNavigate } from "react-router-dom";
import { useIdContext } from './IdContext';

export default function MainNav() {

 const { targetName } = useIdContext();
  const navgate = useNavigate();
 
  const [allNavLinks, setAllNavLinks] = useState([]);
  const [filteredNavLinks, setFilteredNavLinks] = useState(allNavLinks);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    navgate(`details/${targetName}`);
    setIsOpen(true);
    fillAllNav(); // Populate allNavLinks when the component mounts
  },[]); 

  const handleSearching = (e) => {
    const inputText = e.target.value;
      const filtered = allNavLinks.filter((navLink) =>
      navLink.toLowerCase().includes(inputText.toLowerCase())
    );
    // Update the filteredNavLinks state
    setFilteredNavLinks(filtered);
  };

  const fillAllNav = () => {
    let continentNames = Object.keys(infos);
    let navLinks = [];
    continentNames.forEach((continentName) => {
      navLinks.push(infos[continentName].text);
      // Update the allNavLinks state
    setAllNavLinks(navLinks);
    setFilteredNavLinks(navLinks);
    });
    
  };
  const handleSubmit = event => {
    event.preventDefault();
    };
  return (
    <>
    <div className={isOpen ? 'popup-page' : "popup-page close-popup"}>
      <div id="sidebar" className="page">
       <div className="sideTop">
        <Link  to="/">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#2a68f5" width="18px"><path d="M11.62 3.81 7.43 8l4.19 4.19-1.53 1.52L4.38 8l5.71-5.71 1.53 1.52z"/></svg>

        </Link>
        <div>
          <form id="search-form" role="search" onSubmit={ handleSubmit }>
          
            <input
              id="q"
              placeholder="Search"
              type="search"
              onChange={(e) => handleSearching(e)}
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={true}
            />
          </form>
          </div>
        </div>

        <nav>
         
          {filteredNavLinks.map((item, index) => (
            <NavLink
              key={index}
              to={`details/${item}`}
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }>
              {item}
            </NavLink>
          ))}
        </nav>
      </div>
      </div>
      <div id="detail" className={isOpen ? 'popup-page' : "popup-page close-popup"}>
        <Outlet />
      </div>
      
    </>
  );
}
