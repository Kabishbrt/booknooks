import React from 'react';
import styled from 'styled-components';
import {FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';




export const Footer = () => {
  return (
    <Wrapper>
      <footer>
        <div className = "container grid grid-four-column">
          <div className = "footer-About">
            <h3>About Us</h3>
            <p>Welcome to Booknooks, your premier destination for a captivating online bookstore experience.
               Our e-commerce platform is meticulously curated to offer an extensive collection of books that
               spans genres, authors, and cultures.
            </p>
          </div>

          
          <div className = "footer-PaymentMethods">
            <h3>Payment Methods</h3>
            <img src="/payment.png" alt="payment" />
          </div>

          
          <div className = "footer-socialmedia">
            <h3>Follow Us</h3>
            <div class = "footer-social--icons">
              <div>
                <FaFacebook className = "icons"/>
              </div>
              <div>
                <FaInstagram className = "icons"/>
              </div>
              <div>
                <FaTwitter className = "icons"/>
              </div>
            </div>
          </div>

          
          <div className = "footer-contact">
            <h3>Contact Us</h3>
            <h3>Biratnagar, Morang</h3>
            <h3>9819012345</h3>
            <h3>info@booknooks.com.np</h3>
          </div>
        </div>

        <div className = "footer-bottom--section">
          <hr/>
          <div className= "container grid grid-two-column">
            <p>
              @{new Date().getFullYear()} BookNooks. All Rights Reserved
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

footer{
  padding: 14rem  9rem;
  background-color: ${({ theme }) => theme.colors.footer_bg};

  h3{
    color: ${({ theme }) => theme.colors.hr};
    margin-bottom: 2.4rem;
    
   }
  p{
    color: ${({ theme }) => theme.colors.white};
    margin-left: -60px;
    
  }


  .footer-social--icons{
    display: flex;
    gap: 2rem;

    div{
      padding: 1rem;
      border-radius: 50%;
      border: 2px solid ${({ theme }) => theme.colors.white};

      .icons{
        color: ${({ theme }) => theme.colors.white};
        font-size: 2.4rem;
        position: relative;
        cursor: pointer;
      }
    }
  }

  

  .footer-bottom--section{
    padding-top: 9rem;

    hr{
      margin-bottom: 2rem;
      color: ${({ theme }) => theme.colors.hr};
      height: 0.1px;
    }
  }
 
}
`;






