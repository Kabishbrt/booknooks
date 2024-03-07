import React from 'react';
import styled from 'styled-components';
import {FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';


export const Footer = () => {
  return (
    <Wrapper>
      <footer>
        <div className = "container grid grid-four-column">
          <div className = "footer-About">
            <h3>About Us</h3>
            <p>Welcome to Booknooks, your premier destination for a captivating online bookstore experience.Our e-commerce platform is meticulously curated to offer an extensive collection of books thatspans genres, authors, and cultures.
            </p>
          </div>

          
          <div className = "footer-PaymentMethods">
            <h3>Payment Methods</h3>
            <img src="/payment.png" alt="payment" height={120} width={200}/>
          </div>

          
          <div className = "footer-socialmedia">
            <h3>Follow Us</h3>
            <div className = "footer-social--icons">
              <div>
                <a href='https://github.com/Kabishbrt'>

                <FaGithub className = "icons" size={30}/>
                </a>
              </div>
              <div>
                <a href='https://www.instagram.com/iamkabishb/'>

                <FaInstagram className = "icons" size={30}/>
                </a>
              </div>
              <div>
                <a href='https://www.linkedin.com/in/kabish-bhattarai-9ab669190/'>
                <FaLinkedin className = "icons" size={30}/>
                </a>
              </div>
            </div>
          </div>

          
          <div className = "footer-contact">
            <h3>Contact Us</h3>
            <h3>Biratnagar, Morang</h3>
            <h3>kabishbrt@gmail.com</h3>
          </div>
        </div>

        <div className = "footer-bottom--section">
          <hr/>
          <div className= "container grid grid-two-column">
            <p>
              @{new Date().getFullYear()} KABISH. All Rights Reserved
            </p>
            <div>
              <p>PRIVACY POLICY</p>
              <p>TERMS & CONDITIONS</p>
            </div>
          </div>
        </div>
      </footer>

    </Wrapper>
   
  );
};

const Wrapper = styled.section`
* {
  box-sizing: border-box;
}

 footer {
    width: 100%;
    padding: 4rem 2rem; 
    background-color: ${({ theme }) => theme.colors.footer_bg};
    

    h3 {
      color: ${({ theme }) => theme.colors.hr};
      margin-bottom: 1.2rem;
       
    }

    p {
      color: ${({ theme }) => theme.colors.white};
      font-size: 1.4em;
    }

    .footer-social--icons {
      display: flex;
      gap: 1rem;  

      div {
        padding: 0.8rem;
        border-radius: 50%;
        border: 1px solid ${({ theme }) => theme.colors.white};

        .icons {
          color: ${({ theme }) => theme.colors.white};
          font-size: 1.6rem; 
          position: relative;
          cursor: pointer;
        }
      }
    }

    .footer-bottom--section {
      width: 100%;
      padding-top: 4rem; 

      hr {
        margin-bottom: 1rem;
        color: ${({ theme }) => theme.colors.hr};
        height: 0.1px;
      }
    }
  }

  @media screen and (min-width: 768px) {
    footer {
      padding: 14rem 9rem;
    }
  }
  @media screen and (min-width: 1024px) {
    .grid-four-column {
      grid-template-columns: repeat(4, 1fr);
    }
  }

`;







