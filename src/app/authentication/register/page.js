'use client'

import React, { useState } from "react";
import { Card, CardBody, Input, Button, Modal, ModalContent, ModalHeader, ModalFooter } from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/react";
import Image from "next/image";

export default function LoginPage() {
  const [crm, setCrm] = useState("");
  const [senha, setSenha] = useState("");
  const [isOpenError, setOpenError] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = async (event) => {
    if (!crm || !senha) {
      setOpenError(true);
      return;
    }
    try {
      const response = await fetch("https://flask-production-75af.up.railway.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          crm,
          senha,
        }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      console.log("Login successful!", data);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <div className="w-screen bg-gradient-to-r from-[#006FEE] to-blue-900 h-screen flex items-center justify-center">
      <Card className="max-w-[480px] w-full">
        <CardBody className="flex my-12 flex-col items-center justify-center">
          <Image src="/oxemed.png" alt="Logo" width={300} height={200} />
          <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-[80%] items-center justify-center">
            <Input
              value={crm}
              onChange={(event) => setCrm(event.target.value)}
              className="mt-8 mb-4"
              type="number"
              label="Crm"
              isRequired
            />
            <Input
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              className="mb-4"
              type="password"
              label="Senha"
              isRequired
            />
            <Button type="submit" size="lg" color="primary">
              Login
            </Button>
          </form>
        </CardBody>
      </Card>

      <Modal isOpen={isOpenError}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-black">
                Preencha todos os campos!
              </ModalHeader>
              <ModalFooter>
                <Button onClick={onClose} color="primary">
                  Fechar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
