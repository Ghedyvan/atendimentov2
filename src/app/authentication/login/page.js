"use client";
import React from "react";
import { Card, CardBody, Input, Button } from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

export default function LoginPage() {
  const router = useRouter();
  const [crm, setCrm] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [isFound, setIsFound] = useState(false);
  const [error, setError] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleSubmit = async (event) => {
    try {
      const response = await fetch(
        "https://flask-production-75af.up.railway.app/medicos"
      ); // Replace with verification endpoint if available

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const medicos = await response.json();

      const medicoEncontrado = medicos.find(
        (medico) => medico.crm === crm && medico.senha === senha
      );

      setIsFound(medicoEncontrado !== undefined);
      setError(null);

      if (medicoEncontrado) {
        console.log("Médico encontrado!");
        sessionStorage.setItem("medico", JSON.stringify(medicoEncontrado));
        console.log("Médico encontrado!", medicoEncontrado);
        window.location.href = "/dashboard";
      } else {
        onOpen();
        setSenha("");
        console.log("Médico não encontrado!");
        setError("Médico não encontrado!");
      }
    } catch (error) {
      console.error("Error fetching medicos:", error);
      setError(error.message);
    }
  };

  return (
    <div className="w-screen bg-gradient-to-r from-[#006FEE] to-blue-900 h-screen flex items-center justify-center">
      <Card className="max-w-[480px] w-full">
        <CardBody className="flex my-12 flex-col items-center justify-center">
          <Image src="/oxemed.png" alt="Logo" width={300} height={200} />
          <form
            action="submit"
            className="flex flex-col w-full max-w-[80%] items-center justify-center"
          >
            <Input
              value={crm}
              onChange={(event) => setCrm(event.target.value)}
              className="mt-8 mb-4"
              type="text"
              label="CRM"
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
            <Button onClick={() => handleSubmit()} size="lg" color="primary">
              Entrar
            </Button>
          </form>
          <div className="flex flex-col items-center justify-center pt-5">
            <button
              onClick={() => router.push("/authentication/register")}
              className="text-blue-500"
            >
              Não possui cadastro? Clique aqui
            </button>
          </div>
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Oops, tivemos um problema
              </ModalHeader>
              <ModalBody>
                <p>
                  O médico não foi encontrado no sistema, ou a senha está
                  incorreta. Tente novamente.
                </p>
              </ModalBody>
              <ModalFooter>
                {/* <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button> */}
                <Button color="primary" onPress={onClose}>
                  Confirmar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
