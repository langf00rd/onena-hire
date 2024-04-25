import { supabase } from "@/utils/supabase";

export async function POST(request: Request) {
  const body = await request.json();

  const { data, error } = await supabase
    .from("job_posts")
    .insert([body])
    .select();

  if (error) return Response.json({ message: error.message }, { status: 500 });

  return Response.json({ data });
}
