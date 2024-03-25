"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody, Input, Button } from "@nextui-org/react";
import Image from "next/image";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [cpf, setCpf] = useState("");

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
    const cpfFormatado = formatarCPF(novoCPF);
    setCpf(cpfFormatado);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!cpf) {
      toast.error("Preencha seu CPF");
      return;
    }

    try {
      const cpfApenasDigitos = cpf.replace(/\D/g, "");
      console.log(cpfApenasDigitos);
      const response = await fetch(
        "https://flask-production-75af.up.railway.app/filas",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cpf: cpfApenasDigitos,
          }),
        }
      );
      if (response.status === 401) {
        toast.error("CPF já cadastrado");
        return;
      }
      if (response.status === 402) {
        toast.error("CPF inválido");
        return;
      }
      router.push("/fila/final");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const toggleForm = () => {
    const form = document.querySelector("form");
    const btn = document.querySelector(".btn-iniciar");
    form.classList.toggle("!hidden");
    btn.classList.toggle("!hidden");
  };

  return (
    <div className="w-screen bg-gradient-to-r from-[#006FEE] to-blue-900 h-screen flex items-center justify-center">
      <Card className="max-w-[480px] w-full">
        <CardBody className="flex my-12 flex-col items-center justify-center">
          <Image src="/oxemed.png" alt="Logo" width={300} height={200} />
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full max-w-[80%] items-center justify-center !hidden"
          >
            <h1 className="mt-8 font-bold text-[#006FEE]">
              INSIRA SEU CPF PARA INGRESSAR NA FILA
            </h1>
            <Input
              value={cpf}
              onChange={handleChange}
              className="mt-8 mb-4"
              type="text"
              label="CPF"
              isRequired
              maxLength={14} // Alterado para 14 para acomodar a máscara de CPF
            />
            <Button size="lg" color="primary" onClick={handleSubmit}>
              Entrar
            </Button>
          </form>
          <div>
            <Button
              onClick={toggleForm}
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
