

import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ThemeProvider } from '@nextui-org/react';
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Atendimento OXEMED",
  description: "Projeto disciplina de Gestão de Projetos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" className='light'>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
