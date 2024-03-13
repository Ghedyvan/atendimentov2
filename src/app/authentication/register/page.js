import React from "react";
import {Card, CardBody} from "@nextui-org/react";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <div>
       <Card>
      <CardBody>
        <Image src="/logo.png" alt="Logo" width={200} height={200} />
        <p>Sua saúde é nossa prioridade</p>
      </CardBody>
    </Card>
    </div>
  );
}