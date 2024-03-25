"use client";
import React, { useEffect } from "react";
import { Card, CardBody, Input, Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserPage() {
  const [paciente, setPaciente] = useState([]); // Definindo o estado para armazenar os dados

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
      const cpf = localStorage.getItem("cpf");
      jsonData.patients.map((paciente) => {
        if (paciente.cpf === cpf) {
          setPaciente(paciente);
        }
      });
    } catch (error) {
      toast.error("Erro ao buscar pacientes");
    }
  };

  useEffect(() => {
    mount();
  }, []); // Chamada do método mount quando o componente é montado

  const router = useRouter();
  return (
    <div className="w-screen bg-gradient-to-r from-[#006FEE] to-blue-900 h-screen flex items-center justify-center">
      <Card className="max-w-[480px] w-full">
        <CardBody className="flex my-12 flex-col items-center justify-center">
          <Image src="/oxemed.png" alt="Logo" width={300} height={200} />
          <h1 className="mt-8 text-[26px] ">Você ingressou na fila!</h1>
          <h2 className="mt-4 text-[22px]">Sua posição:</h2>
          <p className="text-[82px] text-bold">{paciente.position}</p>
          <Button
            onClick={() => router.push("/fila")}
            size="lg"
            color="primary"
          >
            Entendi
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
