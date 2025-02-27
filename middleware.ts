
import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes
} from "@/routes"

const { auth } = NextAuth(authConfig);
 
//req is the token 
export default auth((req)=>{ 
    const {nextUrl} = req;
    const isLoggedIn = !!req.auth;//to convert to boolean
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = () => {  
        return publicRoutes.some(publicRoute => nextUrl.pathname.startsWith(publicRoute));
    };
    
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if(isAuthRoute){
        if(isLoggedIn){
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT,nextUrl))
        }
        return ;
    }
    if(!isLoggedIn && !isPublicRoute()){        
        return Response.redirect(process.env.NEXT_PUBLIC_URL+"/auth/login");
    }
    
    if(isApiAuthRoute){
        return ;
    }

    return;

})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
