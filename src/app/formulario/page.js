"use client";
import React, { useState } from "react";
import { Card, CardBody, Input, Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function FormReceituario() {
  const [remedios, setRemedios] = React.useState([]);

  const handleAddRemedio = () => {
    setRemedios([...remedios, ""]);
  };
  const handleRemoveRemedio = (index) => {
    const updatedRemedios = [...remedios];
    updatedRemedios.splice(index, 1);
    setRemedios(updatedRemedios);
  };

  const handleRemedioChange = (index, value) => {
    const updatedRemedios = [...remedios];
    updatedRemedios[index] = value;
    setRemedios(updatedRemedios);
  };

  const router = useRouter();
  const [crm, setCrm] = React.useState("");
  const [nomeMedico, setNomeMedico] = React.useState("");
  const [nomePaciente, setNomePaciente] = React.useState("");

  const handleSubmit = async (event) => {
    if (!crm || !nomeMedico || !nomePaciente || !remedios.length) {
      toast.error("Preencha todos os campos");
      return;
    }
    try {
      const response = await fetch(
        "https://flask-production-99fc.up.railway.app/receituario",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            medico: {
              crm: crm,
              nome: nomeMedico,
            },
            paciente: nomePaciente,
            receituario: remedios,
          }),
        }
      );
      console.log("Receituario cadastrado com sucesso! 2");
      const data = await response.text();
      toast.success("Receituario enviado com sucesso!");
    } catch (error) {
      toast.error("Erro ao cadastrar médico");
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Card className="w-4/12">
        <CardBody>
          <div className="flex items-center justify-center">
            <Image
              src="/oxemed.png"
              alt="Logo"
              width={150}
              height={150}
              priority
            />
          </div>
          <h1 className="text-2xl text-center font-semibold mt-4">
            Cadastro de Receituário
          </h1>
          <Input
            width="100%"
            placeholder="CRM"
            value={crm}
            onChange={(e) => setCrm(e.target.value)}
            className="mt-4"
          />
          <Input
            width="100%"
            placeholder="Nome Médico"
            value={nomeMedico}
            onChange={(e) => setNomeMedico(e.target.value)}
            className="mt-4"
          />
          <Input
            width="100%"
            placeholder="Nome paciente"
            value={nomePaciente}
            onChange={(e) => setNomePaciente(e.target.value)}
            className="mt-4"
          />

          {remedios.map((remedio, index) => (
            <div
              key={index}
              className="flex flex-row items-center justify-between"
            >
              <Input
                key={index}
                width="100%"
                placeholder={`Remédio ${index + 1}`}
                value={remedio}
                onChange={(e) => handleRemedioChange(index, e.target.value)}
                className="mt-4"
              />

              <Button
                onClick={() => handleRemoveRemedio(index)}
                className="mt-4 ml-4"
                block
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="currentColor"
                    d="M20 10.5v.5h8v-.5a4 4 0 0 0-8 0Zm-2.5.5v-.5a6.5 6.5 0 1 1 13 0v.5h11.25a1.25 1.25 0 1 1 0 2.5h-2.917l-2 23.856A7.25 7.25 0 0 1 29.608 44H18.392a7.25 7.25 0 0 1-7.224-6.644l-2-23.856H6.25a1.25 1.25 0 1 1 0-2.5H17.5Zm-3.841 26.147a4.75 4.75 0 0 0 4.733 4.353h11.216a4.75 4.75 0 0 0 4.734-4.353L36.324 13.5H11.676l1.983 23.647ZM21.5 20.25a1.25 1.25 0 1 0-2.5 0v14.5a1.25 1.25 0 1 0 2.5 0v-14.5ZM27.75 19c.69 0 1.25.56 1.25 1.25v14.5a1.25 1.25 0 1 1-2.5 0v-14.5c0-.69.56-1.25 1.25-1.25Z"
                  />
                </svg>
              </Button>
            </div>
          ))}

          <Button
            onClick={handleAddRemedio}
            color="secondary"
            className="mt-4"
            block
          >
            Adicionar Remédio
          </Button>
          <Button
            onClick={() => handleSubmit()}
            color="primary"
            className="mt-4"
            block
          >
            Cadastrar
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
