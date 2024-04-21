import { Card } from "@/components/ui/card";
import { PageProps } from "@/utils/types";
import Link from "next/link";

export default function Page(props: PageProps) {
  return (
    <>
      <div className="max-w-5xl p-10 mx-auto space-y-10">
        <h1 className="text-3xl font-bold">Open roles at Acme Corporations</h1>
        <ul className="grid grid-cols-2 gap-5">
          {Array.from({ length: 4 }).map((_, index) => (
            <li key={index} className="relative">
              <Link href={props.params.id + "/job-description/" + index}>
                <Card className="p-5 space-y-10">
                  <h3 className="font-semibold">Senior software engineer</h3>
                  <div className="flex items-center justify-between">
                    <p>13 Aug, 2024</p>
                  </div>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
