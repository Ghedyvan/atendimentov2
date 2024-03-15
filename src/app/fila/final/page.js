"use client";
import React from "react";
import { Card, CardBody, Input, Button } from "@nextui-org/react";
import Image from "next/image";

const handleSubmit = async (event) => {
  console.log("Usuário entrou na fila");
  window.location.href = "/fila";
};

export default function userPage() {
  return (
    <div className="w-screen bg-gradient-to-r from-[#006FEE] to-blue-900 h-screen flex items-center justify-center">
      <Card className="max-w-[480px] w-full">
        <CardBody className="flex my-12 flex-col items-center justify-center">
          <Image src="/oxemed.png" alt="Logo" width={300} height={200} />
          <h1 className="mt-8 text-[26px] ">Você ingressou na fila!</h1>
          <h2 className="mt-4 text-[22px]">Sua posição:</h2>
          <p className="text-[82px] text-bold">14</p>
          <h2 className="mb-8 text-[26px]">
            Posição atual da fila: <span className="font-bold">6</span>
          </h2>
          <Button onClick={() => handleSubmit()} size="lg" color="primary">
            Entendi
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
