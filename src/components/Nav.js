import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import styled from "styled-components";
import { CgMenu, CgClose } from "react-icons/cg";
import { MdPlaylistAddCheckCircle } from "react-icons/md";
import { MdNotificationsNone } from "react-icons/md";

// import {Button} from '../styles/Button'

const Nav = () => {
  const [menuIcon, setMenuIcon] = useState();
  const Nav = styled.nav`
    padding: 5px;
    ul {
      list-style: none;
    }
    .navbar-lists {
      padding-top: 7px;
      display: flex;
      gap: 2.5rem;
      align-items: center;

      .navbar-link {
        font-size: 1.8rem;
        &:link,
        &:visited {
          display: inline-block;
          text-decoration: none;
          font-weight: 500;
          color: ${({ theme }) => theme.colors.black};
          transition: color 0.1s linear;
        }
        &:hover {
          color: ${({ theme }) => theme.colors.cart};
        }
      }
    }

    .mobile-navbar-btn {
      display: none;
      background-color: transparent;
      cursor: pointer;
      border: none;
    }
    .mobile-nav-icon[name="close-outline"] {
      display: none;
    }
    .close-outline {
      display: none;
    }
    .cart-trolley--link {
      position: relative;
      .cart-trolley {
        position: relative;
        font-size: 3.2rem;

        &:hover {
          color: red; /* Change to red on hover */
        }
      }
      .cart-total--item {
        width: 2.4rem;
        height: 2.4rem;
        position: absolute;
        background-color: #000;
        color: #fff;
        border-radius: 50%;
        display: grid;
        place-items: center;
        top: -20%;
        left: 70%;
        background-color: ${({ theme }) => theme.colors.helper};
      }
    }

    .user-login--name {
      text-transform: capitalize;
    }
    .user-logout,
    .user-login {
      font-size: 1.4rem;
      padding: 0.8rem 1.4rem;
    }
    @media (max-width: ${({ theme }) => theme.media.mobile}) {
      .mobile-navbar-btn {
        display: inline-block;
        z-index: 9999;
        border: ${({ theme }) => theme.colors.black};
        .mobile-nav-icon {
          font-size: 4.2rem;
          color: ${({ theme }) => theme.colors.black};
        }
      }
      .active .mobile-nav-icon {
        display: none;
        font-size: 3rem;
        position: absolute;
        top: 30%;
        right: 10%;
        color: ${({ theme }) => theme.colors.black};
        z-index: 9999;
      }
      .active .close-outline {
        display: inline-block;
      }
      .navbar-lists {
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        visibility: hidden;
        opacity: 0;
      }
      .active .navbar-lists {
        visibility: visible;
        opacity: 1;
        transform: translateX(0);
        z-index: 999;
        transform-origin: right;
        transition: all 0.1s linear;
        .navbar-link {
          font-size: 4.2rem;
        }
      }
      .cart-trolley--link {
        position: relative;
        .cart-trolley {
          position: relative;
          font-size: 5.2rem;
        }
        .cart-total--item {
          width: 4rem;
          height: 4rem;
          font-size: 2rem;
          color: #fff;
        }
      }
      .user-logout,
      .user-login {
        font-size: 2.2rem;
        padding: 0.8rem 1.4rem;
      }
    }
    .logbtn {
      display: inline-block;
      padding: 7px 14px;
      background-color: ${({ theme }) =>
        theme.colors.helper}; /* Change to your desired background color */
      color: #fff; /* Change to your desired text color */
      font-size: 14px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }

    .logbtn:hover {
      background-color: red; /* Change to your desired hover background color */
    }
    @media screen and (max-width: 1130px) {
      .logbtn {
        padding: 1px 1px;
        font-size: 16px;
        width: 4.3em;
      }
      .cart-trolley--link .cart-trolley {
        position: relative;
        font-size: 2.2rem;
        margin-left: -6px;
      }
    }

    @media screen and (max-width: 480px) {
      .logbtn {
        padding: 6px 12px;
        font-size: 16px;
      }
    }
  `;

  return (
    <Nav>
      <div className={menuIcon ? "navbar active" : "navbar"}>
        <ul className="navbar-lists">
          <li>
            <NavLink
              to="/cart"
              className="navbar-link cart-trolley--link"
              onClick={() => setMenuIcon(false)}
            >
              <MdNotificationsNone className="cart-trolley" />
              <span className="cart-total--item">2</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className="navbar-link"
              onClick={() => setMenuIcon(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/explore" className= "navbar-link" onClick={() => setMenuIcon(false)}>
              Explore
            </NavLink>
          </li>
            <li>
            <NavLink to="/contact" className= "navbar-link" onClick={() => setMenuIcon(false)}>
                Contact
            </NavLink>
          </li>
          <NavLink to="/login">
           <li>
              <button className="logbtn">Log In</button>
            </li>
            </NavLink>
            <NavLink to="/signup">
           <li>

              <button className="logbtn">Sign Up</button>
            </li>
          </NavLink>

          <li>
            <NavLink
              to="/cart"
              className="navbar-link cart-trolley--link"
              onClick={() => setMenuIcon(false)}
            >
              <FiShoppingCart className="cart-trolley" />
              <span className="cart-total--item">2</span>
            </NavLink>
          </li>

           <li>
          <NavLink to="/orders" className="navbar-link cart-trolley--link" onClick={() => setMenuIcon(false)}>
                <MdPlaylistAddCheckCircle className="cart-trolley"/>
                <span className="cart-total--item">2</span>

            </NavLink>
          </li>
        </ul>

        {/* two button for open and close of menu */}
        <div className="mobile-navbar-btn">
          <CgMenu
            name="menu-outline"
            className="mobile-nav-icon"
            onClick={() => setMenuIcon(true)}
          />
          <CgClose
            name="close-outline"
            className="mobile-nav-icon close-outline"
            onClick={() => setMenuIcon(false)}
          />
        </div>
      </div>
    </Nav>
  );
};
export default Nav;
