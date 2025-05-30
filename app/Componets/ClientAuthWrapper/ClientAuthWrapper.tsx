'use client'; // Asigură-te că acest fișier este folosit doar pe client

import { useUser, RedirectToSignIn } from '@clerk/nextjs';
import Sidebar from "@/app/Componets/Sidebar/Sidebar";

const ClientAuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <RedirectToSignIn />; // Redirecționează utilizatorul către pagina de login dacă nu este autentificat
  }

  return (
    <>
      
      <div className="w-full">{children}</div>
    </>
  );
};

export default ClientAuthWrapper;
