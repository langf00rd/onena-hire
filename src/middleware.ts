import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { getUserSession } from "../actions";
import { createClient } from "./utils/supabase/server";

export async function middleware(request: NextRequest) {
  // const { data } = await getUserSession();
  // const userSession = data.session;
  //
  //

  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    if (request.url.charAt(request.url.length - 1) === "/") {
      return NextResponse.next();
    } // remove session checks when user requests for the `/` route

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
    "/((?!api|_next/static|_next/image|assets|auth/*|organization/*|favicon.ico).*)",
  ],
};
