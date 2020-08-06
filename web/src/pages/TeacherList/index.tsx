import React, { useState, FormEvent } from "react";

import PageHeader from "../../components/PageHeader";
import TeacherItem, { Teacher } from "../../components/TeacherItem";

import "./styles.css";
import Input from "../../components/Input";
import Select from "../../components/Select";
import api from "../../services/api";

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState([]);

  const [subject, setSubject] = useState("");
  const [week_day, setWeek_day] = useState("");
  const [time, setTime] = useState("");

  function handleSearch(e: FormEvent) {
    e.preventDefault();

    api
      .get("/classes", {
        params: {
          subject,
          week_day,
          time,
        },
      })
      .then(({ data }) => setTeachers(data));
  }

  return (
    <div id="page-teacher-list">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={handleSearch}>
          <Select
            name="subject"
            label="Matéria"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            options={[
              { value: "Artes", label: "Artes" },
              { value: "Biologia", label: "Biologia" },
              { value: "Ciências", label: "Ciências" },
              { value: "Português", label: "Português" },
              { value: "Física", label: "Física" },
              { value: "Inglês", label: "Inglês" },
              { value: "Química", label: "Química" },
              { value: "História", label: "História" },
              { value: "Geografia", label: "Geografia" },
              { value: "Matemática", label: "Matemática" },
            ]}
          />

          <Select
            name="week_day"
            label="Dia da semana"
            value={week_day}
            onChange={(e) => setWeek_day(e.target.value)}
            options={[
              { value: "0", label: "Domingo" },
              { value: "1", label: "Segunda-feira" },
              { value: "2", label: "Terça-feira" },
              { value: "3", label: "Quarta-feira" },
              { value: "4", label: "Quinta-feira" },
              { value: "5", label: "Sexta-feira" },
              { value: "6", label: "Sábado" },
            ]}
          />

          <Input
            type="time"
            name="time"
            value={time}
            label="Hora"
            onChange={(e) => setTime(e.target.value)}
          />

          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => (
          <TeacherItem key={teacher.id} teacher={teacher} />
        ))}
      </main>
    </div>
  );
};

export default TeacherList;
