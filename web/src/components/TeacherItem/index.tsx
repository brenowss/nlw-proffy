import React from "react";

import whatsappIcon from "../../assets/images/icons/whatsapp.svg";

import "./styles.css";

const TeacherItem: React.FC = () => {
  return (
    <article className="teacher-item">
      <header>
        <img
          src="https://avatars1.githubusercontent.com/u/50749825?s=460&u=f32240f4a6b5ff12a55df30b26c99375bbe408a2&v=4"
          alt="Breno"
        />

        <div>
          <strong>Breno Fiorese</strong>
          <span>Física</span>
        </div>
      </header>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus quam at
        ex totam. Perferendis dignissimos.
        <br />
        Sit maxime blanditiis voluptas ut possimus at dolorum recusandae
        distinctio, minima consequatur, ipsa earum modi.
      </p>
      <footer>
        <p>
          Preço/hora
          <strong>R$80,00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="whatsapp" />
          Entrar em contato
        </button>
      </footer>
    </article>
  );
};

export default TeacherItem;
