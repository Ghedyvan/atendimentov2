"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import toast from "react-hot-toast";

export default function Page() {
  const [data, setData] = useState([]); // Definindo o estado para armazenar os dados
  const [pacientesAtendidos, setPacientesAtendidos] = useState([]); // Definindo o estado para armazenar os dados

  const nextPatient = async () => {
    try {
      setPacientesAtendidos([...pacientesAtendidos, data[0]]);
      console.log("Chamando proximo paciente");
      const response = await fetch(
        "https://flask-production-75af.up.railway.app/chamar",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Paciente chamado:", response);

      const jsonData = await response.json();
      toast.success(jsonData.message, { duration: 3000 });
      setData(jsonData.patients);
      localStorage.setItem(
        "pacientesAtendidos",
        JSON.stringify(pacientesAtendidos)
      );
    } catch (error) {
      toast.error("Erro ao chamar próximo paciente");
    }
  };

  const mount = async () => {
    try {
      const pacientes = await fetch(
        "https://flask-production-75af.up.railway.app/paci",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const jsonData = await pacientes.json();
      setData(jsonData.patients);
    } catch (error) {
      toast.error("Erro ao buscar pacientes");
    }
  };

  useEffect(() => {
    mount();
  }, []); // Chamada do método mount quando o componente é montado

  const [crm, setCrm] = useState("");
  const [nome, setNome] = useState("");
  const [especialidade, setEspecialidade] = useState("");

  useEffect(() => {
    const medico = JSON.parse(sessionStorage.getItem("medico"));
    if (medico) {
      setCrm(medico.crm);
      setNome(medico.nome);
      setEspecialidade(medico.especialidade);
    }
  }, []);

  useEffect(() => {}, [data]); // Efeito acionado quando o estado data muda

  useEffect(() => {}, [pacientesAtendidos]); // Efeito acionado quando o estado pacientesAtendidos muda

  return (
    <div className="mx-20 grid grid-cols-12 gap-10">
      <h1 className="text-2xl font-semibold col-span-12">Bem vindo {nome}!</h1>
      <div className=" flex-row flex mt-2 space-x-4 col-span-12">
        <div>
          <h2>CRM: {crm}</h2>
        </div>
        <div className="">
          <h2>Especialidade: {especialidade}</h2>
        </div>
      </div>
      <div className="mt-8 col-span-6 col-start-4 rounded-md p-4 bg-gray-100">
        <div className="flex flex-row justify-between border-b items-center  border-gray-200">
          <div className=" text-xl font-semibold">Paciente em Atendimento</div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={nextPatient}
          >
            Próximo
          </button>
        </div>
        <div className="mt-4">
          {Object.entries(data[0] || {}).map(([key, value]) => (
            <h2 key={key}>
              {key}: {value}
            </h2>
          ))}
        </div>
      </div>
      <div className="mt-8 rounded-md shadow-md bg-gray-100 col-span-6">
        <Table aria-label="Lista de Pacientes">
          <TableHeader>
            <TableColumn>CPF</TableColumn>
            <TableColumn>POSIÇÃO</TableColumn>
          </TableHeader>
          <TableBody>
            {data.slice(1).map((paciente, index) => (
              <TableRow key={index}>
                <TableCell>{paciente.cpf}</TableCell>
                <TableCell>{index + 1}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-8 rounded-md shadow-md bg-gray-100 col-span-6">
        <Table aria-label="Lista de Pacientes">
          <TableHeader>
            <TableColumn>CPF</TableColumn>
            <TableColumn>POSIÇÃO</TableColumn>
          </TableHeader>
          <TableBody>
            {pacientesAtendidos.map((paciente, index) => (
              <TableRow key={index}>
                <TableCell>{paciente.cpf}</TableCell>
                <TableCell>{index + 1}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
