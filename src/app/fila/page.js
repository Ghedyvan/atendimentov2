"use client";
import React from "react";
import { Card, CardBody, Input, Button } from "@nextui-org/react";
import Image from "next/image";

export default function LoginPage() {
  const [cpf, setCpf] = React.useState("");
  const [cpfEnvio, setCpfEnvio] = React.useState("");

  const formatarCPF = (valor) => {
    // Remove qualquer caracter que não seja dígito
    const cpfApenasDigitos = valor.replace(/\D/g, "");

    // Aplica a máscara de CPF
    return cpfApenasDigitos.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      "$1.$2.$3-$4"
    );
  };

  const handleChange = (event) => {
    const novoCPF = event.target.value;
    setCpfEnvio(novoCPF);
    const cpfFormatado = formatarCPF(novoCPF);
    setCpf(cpfFormatado);
  };

  const handleSubmit = async (event) => {
    if (!cpf) {
      alert("Preencha seu CPF");
      return;
    }

    try {
      const response = await fetch(
        "https://flask-production-75af.up.railway.app/filas",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cpf: cpfEnvio,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      console.log("O usuário entrou na fila!");
      window.location.href = "/fila/final";
      setCpf("");
    } catch (error) {
      alert(error.message);
    }
  };

  const toggleForm = async (event) => {
    var form = document.querySelector("form");
    var btn = document.querySelector(".btn-iniciar");
    form.classList.toggle("!hidden");
    btn.classList.toggle("!hidden");
  };

  return (
    <div className="w-screen bg-gradient-to-r from-[#006FEE] to-blue-900 h-screen flex items-center justify-center">
      <Card className="max-w-[480px] w-full">
        <CardBody className="flex my-12 flex-col items-center justify-center">
          <Image src="/oxemed.png" alt="Logo" width={300} height={200} />
          <form
            action="submit"
            onSubmit={handleSubmit}
            className="flex flex-col w-full max-w-[80%] items-center justify-center !hidden"
          >
            <h1 className="mt-8 font-bold  text-[#006FEE]">
              INSIRA SEU CPF PARA INGRESSAR NA FILA
            </h1>
            <Input
              value={cpf}
              onChange={handleChange}
              className="mt-8 mb-4"
              type="text"
              label="CPF"
              isRequired
              maxLength={11}
            />
            <Button onClick={() => handleSubmit()} size="lg" color="primary">
              Entrar
            </Button>
          </form>
          <div>
            <Button
              onClick={() => toggleForm()}
              size="lg"
              color="primary"
              className="btn-iniciar mt-12"
            >
              Iniciar autoatendimento
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
