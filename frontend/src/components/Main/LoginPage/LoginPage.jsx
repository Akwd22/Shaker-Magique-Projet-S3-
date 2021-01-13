import React, { useState } from "react";
import "./LoginPage.css";
import "../../variables.css";
import axiosInstance from "../../Axios/Axios";
import { useHistory } from "react-router-dom";

export default function SignIn() {
  const history = useHistory();
  const initialFormData = Object.freeze({
    username: "",
    password: "",
  });

  const [formData, updateFormData] = useState(initialFormData);
  const [lastError, setLastError] = useState();

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`token/`, {
        user_name: formData.username,
        password: formData.password,
      })
      .then((res) => {
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");
        history.push("/");
        //console.log(res);
        //console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="page login-page">
      <div className="lp-left-side">
        <form onSubmit={handleSubmit}>
          <div className="lp-left-side-component">
            <div className="lp-left-side-title">
              <h1>Connexion</h1>
            </div>
            <div className="lp-left-side-form">
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Nom d'utilisateur"
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Mot de passe"
                onChange={handleChange}
              />
              {lastError && <p className="error-msg">{lastError}</p>}
            </div>
            <div className="lp-left-side-remember">
              <input type="checkbox" id="checkBoxRemember" />
              <label htmlFor="checkBoxRemember">Se souvenir de moi</label>
            </div>
            <div className="lp-left-side-button">
              <button type="submit">Se connecter</button>
            </div>
          </div>
        </form>
        <div className="lp-left-side-noaccount">
          <span>Vous n'avez pas de compte ?</span>
          <a href="/inscription">Inscription</a>
        </div>
      </div>
      <div className="lp-right-side"></div>
    </div>
  );
}
