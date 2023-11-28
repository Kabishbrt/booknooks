import React from "react";
import styled from "styled-components";

export const Contact = () => {
  return (
    <ContactWrapper>
      <Topsection>>
        <h1>How Can we Help?</h1>
        <h2>Send us a message!!</h2>
      </Topsection>
      <main>
        <ContactSection>
          <ContactForm>
            <h2>Get in Touch with Us</h2>
            <form>
              <FormControl>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" required />
              </FormControl>
              <FormControl>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
              </FormControl>
              <FormControl>
                <label htmlFor="subject">Subject:</label>
                <input type="text" id="subject" name="subject" required />
              </FormControl>
              <FormControl>
                <label htmlFor="message">Message:</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                ></textarea>
              </FormControl>
              <Button type="submit">Submit</Button>
            </form>
          </ContactForm>
          <MapSection>
            <h2>Our Location</h2>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3572.1175744884245!2d87.27551787490557!3d26.451938779741237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef7446212f2021%3A0x7f6e455ad959c6d5!2sAIMS%20College!5e0!3m2!1sen!2snp!4v1701011655129!5m2!1sen!2snp"
              width="100%"
              title="map"
              height="300"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </MapSection>
        </ContactSection>
      </main>
    </ContactWrapper>
  );
};

const ContactWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;

  h1 {
    margin-top: 10px;
    font-size: 2.5em;
    color: #333;
  }
`;

const Topsection = styled.header`
  background-image: url("bookstore.jpg");
  background-size: cover;
  width: 100%;
  height: 35vh;
  display: grid;
  justify-content: center;
  align-items: center;

  h1 , h2 {
    font-size: 6em;
    color: white;
    font-family: Sans-serif;
    text-shadow: 10px 2px 4px rgba(0, 0, 0, 1);
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }

  h1 , h2 {
    font-size: 4em;
    color: white;
    font-family: Sans-serif;
    text-shadow: 10px 2px 4px rgba(0, 0, 0, 1);
  }

  
`;

const ContactSection = styled.section`
  display: flex;
  justify-content: space-around;
  margin: 40px 0; 

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const ContactForm = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  h2 {
    margin-bottom: 20px;
    font-size: 2em; 
    color: #333;
  }

  form {
    display: grid;
    grid-gap: 16px;
  }
`;

const FormControl = styled.div`
  label {
    display: block;
    margin-bottom: 8px;
    color: #333;
    font-size: 2em; /* Increased font size */
  }

  input,
  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1em; /* Adjusted font size */
  }

  textarea {
    resize: vertical;
  }
`;

const Button = styled.button`
  background-color: #267bb8;
  color: #fff;
  padding: 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: red;
  }
`;

const MapSection = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px; 
  margin-left: 100px;

  @media screen and (max-width: 768px) {
    margin-left: auto;
  }

  h2 {
    margin-bottom: 20px;
    font-size: 2em; 
    color: #333;
  }

  iframe {
    width: 100%;
    height: 300px;
    border: none;
    border-radius: 8px;
  }
`;
