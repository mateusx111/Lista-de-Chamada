import React, { useEffect, useState } from "react";
import { Card } from "../../components/Card";
import "./styles.css";

const initialState = {
  name: ''
}

export function Home() {
  //1ª: conteudo/valor armazenado. 2ª Function() que atualiza o estado
  const [studentName, setStudentName] = useState(initialState);

  //armazenando o nome do estudande em um array
  const [students, setStudents] = useState([]);

  const [user, setUser] = useState({ name: "", avatar: "" });

  //function que cria um objeto(novo estudante) que contem o nome e o tempo de entrada do estudante
  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleString("pt-br", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),

    };

    //chamar função que atualiza o estado
    //prevState é todo o conteúdo do estado anterior
    setStudents((prevState) => [...prevState, newStudent]);
    //vai refletirm em tempo real na inteface
    setStudentName(initialState) // limpando o campo do input
  }

  //Buscando API
  //Tudo que tiver aqui dedntro será ações que seram executadas automaticamente, ASSIM que a interface for renderizada
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://api.github.com/users/mateusx111");
      const data = await response.json();

      setUser({
        name: data.name,
        avatar: data.avatar_url,
      });
    }

    fetchData();
  }, []); // inserir quais estados o useEfect depende

  return (
    <div className="container">
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto Perfil" />
        </div>
      </header>
      <input
        type="text"
        placeholder="Digite o nome..."
        //o Evento vai chamar a função handleNameChange que tem como parametro o calor digitado no input
        onChange={(e) => setStudentName(e.target.value)}
        value={studentName.name}
      />
      <button type="button" onClick={handleAddStudent}>
        Adicionar
      </button>

      {/* chaves dentro do return para usar o conteúdo de uma variável*/}
      {
        //percorrendo o a lista de studantes e criando um card parqa caum deles
        students.map((student) => (
          <Card key={student.time} name={student.name} time={student.time} />
        ))
      }
    </div>
  );
}
