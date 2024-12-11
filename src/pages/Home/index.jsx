import { useEffect, useState, useRef } from "react";
import './style.css'
import api from "../../services/api"
import Trash from "../../assets/trash.svg"

function Home() {
  const [users, setUsers] = useState([]);

  // useRef é comumente usado para capturar valores, nesse caso, dos inputs que adicionamos no menu de cadastro
  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  const getUsers = async () => {
    const usersFromApi = await api.get("/usuarios");

    // .data pois só quero os dados que foram retornados da requisição
    setUsers(usersFromApi.data);
  }

  const createUsers = async () => {
    await api.post("/usuarios", {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    });

    // Chamando o getUsers para já trazer os dados atualizados
    getUsers();
  }

  const deleteUsers = async (id) => {
    await api.delete(`/usuarios/${id}`);

    // Chamando o getUsers para já trazer os dados atualizados
    getUsers();
  }

  // useEffect sempre vai ser executado assim que a página abrir
  // Nesse caso, funcionaria como o window.onload
  useEffect(() => {
    getUsers();
  }, [])


  return (
    <div className="container">
      <form>
        <h1>Cadastro de Usuários</h1>
        {/* Definindo os refs que irão ser capturados pelas variáveis lá em cima através do useRef */}
        <input id="name" type="text" placeholder="Nome" ref={inputName} />
        <input id="age" type="number" placeholder="Idade" ref={inputAge} />
        <input id="email" type="email" placeholder="E-mail" ref={inputEmail} />
        <button onClick={createUsers}>Cadastrar</button>
      </form>

      {/* Mapeando o array e criando uma div para cada objeto */}
      {users.map(user => (
        <div key={user.id} className="card">
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button>
            {/* Chamando a função e já entregando qual é o id do usuário que deve ser deletado */}
            {/* Já que será preciso entregar um parâmetro para a função, é preciso fazer em um formato de função anônima para não quebrar as regras do React */}
            <img onClick={() => deleteUsers(user.id)} src={Trash} alt="Excluir" />
          </button>
        </div>
      ))}
    </div>
  )
}

export default Home
