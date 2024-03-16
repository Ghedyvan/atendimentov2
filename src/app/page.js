import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center w-screen h-screen flex-col gap-8">
      <Link href="/authentication/login">Ir para tela de login</Link>
      <Link href="/authentication/register">Ir para tela de cadastro</Link>
      <Link href="/fila">Ir para tela de fila</Link>
    </div>
  );
}
