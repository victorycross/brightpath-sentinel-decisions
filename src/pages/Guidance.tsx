import { GuidanceCard } from "@/components/GuidanceCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Guidance = () => {
  const approversByType = {
    cyber: {
      type: "Cyber or Technology Issues",
      disciplineApprovers: [
        { title: "Chief Information Security Officer (CISO)" },
        { title: "Chief Information Officer (CIO)" },
      ],
    },
    legal: {
      type: "Legal/Privacy Issues",
      disciplineApprovers: [{ title: "Chief Privacy Officer (CPO)" }],
    },
    independence: {
      type: "Independence Issues",
      disciplineApprovers: [{ title: "Partner Responsible for Independence" }],
    },
    qmr: {
      type: "Quality Management Review (QMR)",
      disciplineApprovers: [{ title: "Assurance Partner" }],
    },
    clientAcceptance: {
      type: "Client Acceptance and Continuance",
      disciplineApprovers: [{ title: "Client Acceptance Risk Partner" }],
    },
    engagementRisk: {
      type: "Engagement Risk",
      disciplineApprovers: [{ title: "Engagement Risk Partner" }],
    },
    auditFinding: {
      type: "Audit Finding Exception",
      disciplineApprovers: [{ title: "Internal Audit Leader" }],
    },
    data: {
      type: "Data-Related Issues",
      disciplineApprovers: [
        { title: "Chief Privacy Officer (CPO)" },
        { title: "Chief Data and Analytics Officer (CDAO)" },
      ],
    },
    ai: {
      type: "AI and Emerging Technology Issues",
      disciplineApprovers: [
        { title: "Partner Innovation" },
        { title: "Chief Information Officer (CIO)" },
      ],
    },
  };

  const finalApprover = {
    title: "Chief Risk and Resilience Officer (CRRO)",
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Requests
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Exception Request Guidance
          </h1>
          <p className="text-gray-600">
            Review the required approvers for different types of exception requests
          </p>
        </div>

        <div className="space-y-6">
          {Object.values(approversByType).map((type, index) => (
            <GuidanceCard
              key={index}
              type={type.type}
              disciplineApprovers={type.disciplineApprovers}
              finalApprover={finalApprover}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Guidance;