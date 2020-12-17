import React from "react";
import "./JoinHostPage.css";
import "../../variables.css";
import axiosInstance, { getUser } from "../../Axios/Axios";

class JoinHostPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      host_login: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    axiosInstance
      .patch("joindre_hote/", {
        hote_login: this.state.host_login,
      })
      .then((response) => {
        if (response.status == 200) {
          if (this.state.host_login != "") {
            localStorage.setItem("hote_rejoint_id", response.data["id_hote"]);
            alert("hôte rejoint")
          } else {
            localStorage.removeItem("hote_rejoint_id")
            alert("hôte quitté")
          }
        }

        console.dir(response);
      })
      .catch((error) => {
        if (error.response.status == 404) {
          alert("hôte pas trouvé");
        } else {
          alert("erreur inconnue" + error.response.status);
        }
      });
  }

  handleChange(e) {
    this.setState({
      host_login: e.target.value,
    });
  }

  render() {
    return (
      <div className="joinhostpage page">
        <h1 className="joinhostpage-title">Joindre un hôte</h1>
        <input
          className="joinhostpage-input"
          type="text"
          placeholder="Nom d'utilisateur de l'hôte"
          value={this.state.host_login}
          onChange={this.handleChange}
        ></input>
        <button className="joinhostpage-btn" onClick={this.handleClick}>
          Rejoindre
        </button>
      </div>
    );
  }
}

export default JoinHostPage;
