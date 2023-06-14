import { useEffect, useRef, useState } from "react";
import { PersonAdd, Search } from "react-bootstrap-icons";
import api from "./api/api";
import NewUserModal from "./components/newUserModal";

interface users {
  id: number;
  job: string;
  name: string;
  perm_delete: boolean;
  perm_update: boolean;
  timesSeen: number;
}

function App() {
  const [input, setInput] = useState<string>("");
  const [users, setUsers] = useState<Array<users>>([]);
  const [modalNew, setModalNew] = useState<boolean>(false);

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    api.get("/users").then((response) => {
      setUsers(response.data);
    });
  }

  const handleDelete = (id: number) => {
    if (id === 2) {
      window.alert("Esse Usuário é utilizado para permissão");
      return;
    }
    let result = window.confirm("Voce deseja mesmo apagar esse usuario");
    if (result) {
      api.delete(`/users?UserId=2&id=${id}`).then(() => getUsers());
    }
  };

  const handleClick = () => {
    ref.current?.focus();
  };

  const handleModaNew = () => {
    setModalNew(false);
  };

  const ref = useRef<HTMLInputElement>(null);

  // Fazendo filtro de usuário pela api
  // const handleInput = () => {
  //   if (input?.length > 0)
  //     api.get(`/user?name=${input}`).then((result) => {
  //       console.log(result.data);
  //     });
  // };

  return (
    <div className="main-app">
      {modalNew && <NewUserModal getUsers={getUsers} setView={handleModaNew} />}
      <nav>
        <div onClick={() => setModalNew(!modalNew)} className="action-button">
          <PersonAdd />
          <label>Adicionar Usuário</label>
        </div>

        <div
          // onKeyDown={(e) => e.key === "Enter" && handleInput()}
          onClick={handleClick}
          className="search-div"
        >
          <Search />
          <input
            value={input}
            onChange={(x) => setInput(x.target.value)}
            ref={ref}
          />
        </div>
      </nav>
      <div className="users-list">
        {input
          ? users
              .filter((x) =>
                x.name
                  .toLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .includes(
                    input
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                      .toLowerCase()
                  )
              )
              .map((x) => {
                return (
                  <div key={x.id} className="user-card">
                    <div className="user-info">
                      <label> {x.name}</label>
                      <label>área: {x.job}</label>
                    </div>
                    <div className="user-func">
                      <button>Alterar</button>
                      <button>Deletar</button>
                    </div>
                  </div>
                );
              })
          : users.length > 0 &&
            users.map((x) => {
              return (
                <div key={x.id} className="user-card">
                  <div className="user-info">
                    <label> {x.name}</label>
                    <label>área: {x.job}</label>
                  </div>
                  <div className="user-func">
                    <button>Alterar</button>
                    <button onClick={() => handleDelete(x.id)}>Deletar</button>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default App;
