import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useState } from "react";


export const Signup = () => {

  //form validation
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState();
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [age, setAge] = useState(null
    );
  const [errors, setErrors] = useState({});


  const validateForm = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = "Invalid phone number";
    }

    if (!country.trim()) {
      newErrors.country = "Country is required";
    }

    if (!state.trim()) {
      newErrors.state = "State is required";
    }

    if (!city.trim()) {
      newErrors.city = "City is required";
    }
    if (!street.trim()) {
      newErrors.street = "Street is required";
    }

    if (!age.trim()) {
      newErrors.age = "Age is required";
    } else if (isNaN(age) || +age <= 0) {
      newErrors.age = "Invalid age";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let Phone = Number(phone);
    let AGE  = Number(age);
  
    if (validateForm()) {
      const formData = {
        username,
        password,
        email,
        phone:Phone,
        country,
        state,
        city,
        street,
        Age:AGE,
      };
  
      try {
        console.log(formData);
        const response = await fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        console.log(response)
        if (response.ok) {
          const data = await response.json();
          console.log("Data successfully submitted:", data);
          // Handle success, e.g., redirect to the login page
        } else {
          console.error("Error submitting data:", response.statusText);
          // Handle error, e.g., display error message to the user
        }
      } catch (error) {
        console.error("Error submitting data:", error.message);
        // Handle error, e.g., display error message to the user
      }
    }
  };





  return (

    <SignupForm>
      <div className="signup-container">
        <div className="signup-box">
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <InputLabel>
              Username:
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && <ErrorText>{errors.username}</ErrorText>}
            </InputLabel>
            <InputLabel>
              Password:
              <input
                type="password"
                placeholder="Create Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <ErrorText>{errors.password}</ErrorText>}
            </InputLabel>
            <InputLabel>
              Email:
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <ErrorText>{errors.email}</ErrorText>}
            </InputLabel>
            <InputLabel>
              Phone:
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
            </InputLabel>
            <InputLabel>
              Country:
              <input
                type="text"
                placeholder="Enter your country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              {errors.country && <ErrorText>{errors.country}</ErrorText>}
            </InputLabel>

            <InputLabel>
              State:
              <input
                type="text"
                placeholder="Enter your state"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
              {errors.state && <ErrorText>{errors.state}</ErrorText>}
            </InputLabel>
            
            <InputLabel>
              City:
              <input
                type="text"
                placeholder="Enter your city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              {errors.city && <ErrorText>{errors.city}</ErrorText>}
            </InputLabel>
            <InputLabel>
              Street:
              <input
                type="text"
                placeholder="Enter your Street Name"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
              {errors.street && <ErrorText>{errors.street}</ErrorText>}
            </InputLabel>
            <InputLabel>
              Age:
              <input
                type="number"
                placeholder="Enter your age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              {errors.age && <ErrorText>{errors.age}</ErrorText>}
            </InputLabel>
            <NavLinkStyled to="/login">
              Already have an account? Login here
            </NavLinkStyled>
            <SignupButton type="button" onClick={handleSubmit} >
              Sign Up
            </SignupButton>
          </form>
        </div>
      </div>
    </SignupForm>

   
  );
};

const SignupForm = styled.form`
  .signup-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url("bookstore.jpg");
    background-size: cover;
    background-position: center;
  }

  .signup-box {
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid #ccc;
    padding: 20px;
    width: 300px;
    text-align: center;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  }

  h1 {
    font-size: 24px;
    color: #333;
  }
`;

const InputLabel = styled.label`
  display: flex;
  flex-direction: column;
  text-align: left;
  font-size: 14px;
  margin-bottom: 10px;

  input {
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
`;

const SignupButton = styled.button`
  padding: 10px;
  cursor: pointer;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  width: 50%;
  margin: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: red;
  }
`;

const NavLinkStyled = styled(NavLink)`
  font-size: 14px;
  text-decoration: none;
  color: #3498db;
  cursor: pointer;
  margin-top: 10px;
  display: block;

  &:hover {
    text-decoration: underline;
  }
`;
const ErrorText = styled.span`
  color: red;
  font-size: 12px;
`;
