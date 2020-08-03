import React from "react";
import { Link } from "react-router-dom";

import PageHeader from "../../components/PageHeader";
import TeacherItem from "../../components/TeacherItem";

import "./styles.css";

const TeacherList: React.FC = () => {
  return (
    <div id="page-teacher-list">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers">
          <div className="form-group">
            <label htmlFor="subject">Matéria</label>
            <input type="text" id="subject" />
          </div>

          <div className="form-group">
            <label htmlFor="week_day">Dia da semana</label>
            <input type="text" id="week_day" />
          </div>

          <div className="form-group">
            <label htmlFor="time">Hora</label>
            <input type="text" id="time" />
          </div>
        </form>
      </PageHeader>

      <main>
        <TeacherItem />
      </main>
    </div>
  );
};

export default TeacherList;
