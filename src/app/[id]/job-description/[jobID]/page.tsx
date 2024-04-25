import PageInfo from "@/dashboard/dashboard/components/page-info";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function Page() {
  return (
    <>
      <div className="max-w-4xl p-10 mx-auto space-y-10" id="public-job-desc">
        <PageInfo
          title="Senior software Engineer"
          actionButtons={<Button>Apply for this job</Button>}
        />
        <p>
          We are looking for a Full Stack Developer to produce scalable software
          solutions. Youll be part of a cross-functional team that’s responsible for the
          full software development life cycle, from conception to deployment. As a Full
          Stack Developer, you should be comfortable around both front-end and back-end
          coding languages, development frameworks and third-party libraries. You should
          also be a team player with a knack for visual design and utility.
        </p>
        <div className="space-y-4">
          <h2 className="text-xl">Requirements</h2>
          <ul className="space-y-2">
            {[
              "Degree in Computer Science,IT, Engineering,Statistics or a relevant field",
              "Min of 5+ years experience",
              "Containerization (Docker and Kubernetes)",
              "Infrastructure as code (Terraform preferably) CI/CD (Git Actions etc)",
              "Familiarity with WhatsApp Business API is a plus",
              "Experience in cloud technologies eg. Heroku, Digital Ocean, GCP etc",
            ].map((requirement, index) => (
              <li key={index} className="flex items-center gap-2">
                <Check size={15} />
                <p>{requirement}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl">Responsibilities</h2>
          <ul className="space-y-2">
            {[
              "Write technical documentation",
              "Work with development teams and product managers to ideate software solutions",
              "Containerization (Docker and Kubernetes)",
              "Design client-side and server-side architecture",
              "Build features and applications with a mobile responsive design",
              "Develop and manage well-functioning databases and applications",
              "Create security and data protection settingsc",
            ].map((requirement, index) => (
              <li key={index} className="flex items-center gap-2">
                <Check size={15} />
                <p>{requirement}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
