"use client";
import React from "react";
import { Card, CardBody, Input, Button } from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";

export default function LoginPage() {
    const [cpf, setCpf] = React.useState("");
    const handleSubmit = async (event) => {
        if (!cpf) {
            alert("Preencha seu CPF");
            return;
        }
        console.log("CPF:", cpf);
        try {
            const response = await fetch("https://flask-production-75af.up.railway.app/filas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    cpf,
                }),
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const data = await response.json();
            console.log("Médico logado com sucesso!");
            setCpf("");
        } catch (error) {
            console.error("Erro ao logar médico:", error);
        }
    }
    
  return (
    <div className="w-screen bg-gradient-to-r from-[#006FEE] to-blue-900 h-screen flex items-center justify-center">
      <Card className="max-w-[480px] w-full">
        <CardBody className="flex my-12 flex-col items-center justify-center">
          <Image src="/oxemed.png" alt="Logo" width={300} height={200} />
          <form action="submit" onSubmit={handleSubmit} className="flex flex-col w-full max-w-[80%] items-center justify-center">
            <h1 className="mt-8 font-bold  text-[#006FEE]">INSIRA SEU CPF PARA INGRESSAR NA FILA</h1>
            <Input value={cpf} onChange={(event) => setCpf(event.target.value)} className="mt-8 mb-4" type="number" label="CPF" isRequired/>
            <Button
              onClick={() => handleSubmit()}
              size="lg"
              color="primary"
            >
              Entrar
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
