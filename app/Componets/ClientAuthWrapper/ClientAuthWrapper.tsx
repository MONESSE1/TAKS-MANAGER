'use client'; 

import { useUser, RedirectToSignIn } from '@clerk/nextjs';
import Sidebar from "@/app/Componets/Sidebar/Sidebar";

const ClientAuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <RedirectToSignIn />; // Redirectionează utilizatorul catre pagina de login 
  }

  return (
    <>
      
      <div className="w-full">{children}</div>
    </>
  );
};

export default ClientAuthWrapper;
