import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { getUserSession } from "../actions";

export async function middleware(request: NextRequest) {
  const {
    data: { session },
  } = await getUserSession();

  if (!session) {
    if (request.url.charAt(request.url.length - 1) === "/") {
      return;
    }
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!api|_next/static|_next/image|assets|auth/*|favicon.ico).*)",
  ],
};
