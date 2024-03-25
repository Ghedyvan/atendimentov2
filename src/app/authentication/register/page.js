"use client";

import React, { useState } from "react";
import {
  Card,
  CardBody,
  Input,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [crm, setCrm] = React.useState("");
  const [nome, setNome] = React.useState("");
  const [especialidade, setEspecialidade] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [isOpen, setOpen] = React.useState(false);
  const [isOpenError, setOpenError] = React.useState(false);

  const onOpen = () => setOpen(true);
  const onOpenError = () => setOpenError(true);

  const handleSubmit = async (event) => {
    if (!crm || !nome || !especialidade || !senha) {
      onOpenError();
      return;
    }
    try {
      const response = await fetch(
        "https://flask-production-75af.up.railway.app/add_medico",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            crm: crm,
            nome: nome,
            especialidade: especialidade,
            senha: senha,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      console.log("Médico cadastrado com sucesso!");
      onOpen();
      setCrm("");
      setEspecialidade("");
      setNome("");
      setSenha("");
    } catch (error) {
      console.error("Erro ao cadastrar médico:", error);
    }
  };

  return (
    <div className="w-screen bg-gradient-to-r from-[#006FEE] to-blue-900 h-screen flex items-center justify-center">
      <Card className="max-w-[480px] w-full">
        <CardBody className="flex my-12 flex-col items-center justify-center">
          <Image src="/oxemed.png" alt="Logo" width={300} height={200} />
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full max-w-[80%] items-center justify-center"
          >
            <Input
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              className="mt-8 mb-4"
              type="text"
              label="Nome"
              isRequired
            />
            <Input
              value={crm}
              onChange={(event) => setCrm(event.target.value)}
              className="mb-4"
              type="text"
              label="CRM"
              isRequired
            />
            <Input
              value={especialidade}
              onChange={(event) => setEspecialidade(event.target.value)}
              className="mb-4"
              type="text"
              label="Especialidade"
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
            <div className=" flex space-x-5">
              <Button onClick={() => handleSubmit()} size="lg" color="primary">
                Cadastrar
              </Button>
            </div>
          </form>
          <div className="flex justify-center pt-3">
            <button
              onClick={() => router.push("/authentication/login")}
              className="text-blue-500"
            >
              Já possui uma conta? Faça login
            </button>
          </div>
        </CardBody>
      </Card>

      <Modal isOpen={isOpen}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-black">
                Médico cadastrado com sucesso!
              </ModalHeader>
              <ModalBody>
                <p className="text-black">
                  Agora ele pode acessar o sistema com as credenciais.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={() => setOpen(false)}
                  color="danger"
                  variant="light"
                >
                  Fechar
                </Button>
                <Button
                  onClick={() =>
                    (window.location.href = "/authentication/login")
                  }
                  color="primary"
                >
                  Entrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenError}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-black"></ModalHeader>
              <ModalBody className="flex flex-col gap-1 text-black">
                Preencha todos os campos!
              </ModalBody>
              <ModalFooter>
                <Button onClick={() => setOpenError(false)} color="primary">
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
