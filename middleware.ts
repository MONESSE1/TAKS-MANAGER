import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    // Protejează toate rutele, cu excepția celor pentru fișiere interne sau statice
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    
    // Întotdeauna să ruleze pentru rutele API
    '/(api|trpc)(.*)',

    // Permite accesul la rutele de autentificare
    '/signin',
    '/signup',
  ],
};
