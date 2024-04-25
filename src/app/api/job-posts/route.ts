import { supabase } from "@/utils/supabase";

export async function GET() {
  const { error } = await supabase.auth.getUser();

  if (error) {
    return Response.json({ message: error.message }, { status: error.status });
  }

  return Response.json({
    data: [],
  });
}
