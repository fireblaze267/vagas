import { useState } from "react";
import { XCircle } from "react-bootstrap-icons";
import api from "../../api/api";
import "./stlyes.css";

interface newUserProps {
  setView: Function;
  getUsers: Function;
}

interface newUserData {
  name: string;
  job: string;
}

function NewUserModal(props: newUserProps) {
  const [data, setData] = useState<newUserData>({
    name: "",
    job: "",
  });

  const handleInput = (value: string, name: string) => {
    setData({ ...data, [name]: value });
  };

  const verifyButton = () => {
    if (data.name.trim().length > 0 && data.job.trim().length > 0) {
      return false;
    } else return true;
  };

  function postNewUser() {
    api.post("/users", data).then((result) => {
      if (result.status === 200) {
        window.alert(result.data.message);
        props.setView();
        props.getUsers();
      } else {
        window.alert(result.data.message);
      }
    });
  }

  return (
    <div className="newUser-main">
      <div className="newUser-content">
        <div className="newUser-header">
          <h2>Criar novo usuário</h2>

          <button onClick={() => props.setView()}>
            <XCircle />
          </button>
        </div>
        <div className="newUser-form">
          <div className="newUser-input">
            <label>Nome</label>
            <input onChange={(x) => handleInput(x.target.value, "name")} />
          </div>
          <div className="newUser-input">
            <label>Job</label>
            <input onChange={(x) => handleInput(x.target.value, "job")} />
          </div>

          <button disabled={verifyButton()} onClick={() => postNewUser()}>
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewUserModal;
