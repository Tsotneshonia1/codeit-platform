import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// ვქმნით წესს: ყველა გვერდი, რომელიც იწყება /admin-ით, არის დაცული
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) {
    await auth.protect(); // ეს ხაზი აგდებს ლოგინის ფანჯარას, თუ მომხმარებელი დალოგინებული არაა
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};