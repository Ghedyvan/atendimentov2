'use client'

import React from "react";
import { useEffect } from "react";

export default function Page() {

  const [crm, setCrm] = React.useState("");
  const [nome, setNome] = React.useState("");
  const [especialidade, setEspecialidade] = React.useState("");

  useEffect(() => {
    const medico = JSON.parse(sessionStorage.getItem("medico"));
    if (medico) {
      setCrm(medico.crm);
      setNome(medico.nome);
      setEspecialidade(medico.especialidade);
    }
  }, []);

  return (
    <div>
      <h1>{nome}</h1>
    </div>
  );
}
