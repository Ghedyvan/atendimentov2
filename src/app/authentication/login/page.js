"use client";
import React from "react";
import { Card, CardBody, Input, Button } from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";

export default function LoginPage() {
    const [matricula, setMatricula] = React.useState("");
    const [senha, setSenha] = React.useState("");

    const handleSubmit = (e) => {
        console.log(senha, matricula);
    }
    
  return (
    <div className="w-screen bg-gradient-to-r from-[#006FEE] to-blue-900 h-screen flex items-center justify-center">
      <Card className="max-w-[480px] w-full">
        <CardBody className="flex my-12 flex-col items-center justify-center">
          <Image src="/oxemed.png" alt="Logo" width={300} height={200} />
          <form action="submit" onSubmit={handleSubmit} className="flex flex-col w-full max-w-[80%] items-center justify-center">
            <Input value={matricula} onChange={(event) => setMatricula(event.target.value)} className="mt-8 mb-4" type="number" label="Matrícula" />
            <Input value={senha} onChange={(event) => setSenha(event.target.value)} className="mb-4" type="password" label="Senha" />
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
