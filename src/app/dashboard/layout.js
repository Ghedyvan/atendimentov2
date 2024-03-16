"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Dashboard({ children }) {
  const [isActive, setIsActive] = useState(false);
  const toggleIsActive = () => setIsActive(!isActive);
  const [crm, setCrm] = React.useState("");
  const [nome, setNome] = React.useState("");
  const [especialidade, setEspecialidade] = React.useState("");

  // if(sessionStorage.getItem("medico") === null){
  //   return(
  //     window.location.href = "authentication/login"
  //   )
  // }

  if(typeof window !== "undefined"){
    const medico = JSON.parse(sessionStorage.getItem("medico"));
    if(medico === null){
      return(
        window.location.href = "authentication/login"
      )
    }
  
  }

  useEffect(() => {
    const medico = JSON.parse(sessionStorage.getItem("medico"));
    if (medico) {
      setCrm(medico.crm);
      setNome(medico.nome);
      setEspecialidade(medico.especialidade);
    }
  }, []);

  const encerrarSessao = () => {
    sessionStorage.removeItem("medico");
    window.location.href = "authentication/login";
  }
  
  return (
    <>
      <Navbar>
        <NavbarBrand>
          <Image src="/oxemed.png" alt="Logo" width={150} height={150} priority />
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="/dashboard">
              Início
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              href="/dashboard/pacientes"
              aria-current="page"
              color="foreground"
            >
              Pacientes
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Fila de Espera
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Olá</p>
                <p className="font-semibold">{nome}</p>
              </DropdownItem>
              <DropdownItem key="settings">Meu perfil</DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={() => encerrarSessao()}>
                Sair
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
      <main className="w-full max-w-[1024px] mx-auto my-0 mt-16 px-[1.5rem]">
        {children}
      </main>
      
    </>
  );
}
