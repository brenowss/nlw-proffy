import React, { useState, FormEvent } from "react";
import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Textarea from "../../components/Textarea";

import { useHistory } from "react-router-dom";

import warningIcon from "../../assets/images/icons/warning.svg";

import "./styles.css";
import api from "../../services/api";

const TeacherForm: React.FC = () => {
  const history = useHistory();

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: "", from: "", to: "" },
  ]);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [bio, setBio] = useState("");

  const [subject, setSubject] = useState("");
  const [cost, setCost] = useState("");

  function handleNewScheduleItem() {
    setScheduleItems([...scheduleItems, { week_day: "", from: "", to: "" }]);
  }

  function setScheduleItemValue(
    position: number,
    field: string,
    value: string
  ) {
    const newArray = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    });

    setScheduleItems(newArray);
  }

  function handleClassRegister(e: FormEvent) {
    e.preventDefault();

    api
      .post("/classes", {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItems,
      })
      .then(({ status }) => status === 201 && history.push("/"))
      .catch((err) => console.log(err));
  }

  return (
    <div className="container" id="page-teacher-form">
      <PageHeader
        description="O primeiro passo é preencher essa formulário de inscrição"
        title="Que incrível que você quer dar aulas!"
      />

      <main>
        <form onSubmit={handleClassRegister}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input
              name="name"
              label="Nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />

            <Input
              name="whatsapp"
              label="Whatsapp"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />

            <Textarea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <Select
              name="subject"
              label="Matéria"
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
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />

            <Input
              name="cost"
              label="Custo da sua hora por aula"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={handleNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map((item, index) => (
              <div className="schedule-item" key={item.week_day}>
                <Select
                  name="week_day"
                  label="Dia da semana"
                  value={item.week_day}
                  onChange={(e) =>
                    setScheduleItemValue(index, "week_day", e.target.value)
                  }
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
                  name="from"
                  label="De"
                  type="time"
                  value={item.from}
                  onChange={(e) =>
                    setScheduleItemValue(index, "from", e.target.value)
                  }
                />
                <Input
                  name="to"
                  label="Até"
                  type="time"
                  value={item.to}
                  onChange={(e) =>
                    setScheduleItemValue(index, "to", e.target.value)
                  }
                />
              </div>
            ))}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Warning" />
              Importante! <br />
              Preencha todos os campos.
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
};

export default TeacherForm;
