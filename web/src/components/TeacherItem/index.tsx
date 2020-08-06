import React from "react";

import whatsappIcon from "../../assets/images/icons/whatsapp.svg";

import "./styles.css";
import api from "../../services/api";

export interface Teacher {
  id: number;
  avatar: string;
  bio: string;
  name: string;
  cost: number;
  subject: string;
  whatsapp: string;
}

interface ClassItemProps {
  teacher: Teacher;
}

const TeacherItem: React.FC<ClassItemProps> = ({ teacher }) => {

  function handleNewConnection() {
    api.post('/connections', {
      user_id: teacher.id
    })
  }
  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar} alt={teacher.name} />

        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p>{teacher.bio}</p>
      <footer>
        <p>
          Preço/hora
          <strong>R${teacher.cost}</strong>
        </p>
        <a onClick={handleNewConnection} target="_blank" href={`https://wa.me/${teacher.whatsapp}`} type="button">
          <img src={whatsappIcon} alt="whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;
