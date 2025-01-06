import { RequestType, Approver } from "@/types/exceptionForm";

export const getApproversByType = (type: RequestType): Approver[] => {
  const approversByType: Record<RequestType, Approver[]> = {
    cyber: [
      { title: "Chief Information Security Officer", name: "CISO Name" },
      { title: "Chief Information Officer", name: "CIO Name" },
      { title: "Chief Risk & Resilience Officer", name: "CRRO Name" },
    ],
    legal: [
      { title: "Chief Privacy Officer", name: "CPO Name" },
      { title: "Chief Risk & Resilience Officer", name: "CRRO Name" },
    ],
    independence: [
      { title: "Partner Responsible for Independence", name: "Independence Partner Name" },
      { title: "Chief Risk & Resilience Officer", name: "CRRO Name" },
    ],
    qmr: [
      { title: "Assurance Partner", name: "Assurance Partner Name" },
      { title: "Chief Risk & Resilience Officer", name: "CRRO Name" },
    ],
    clientAcceptance: [
      { title: "Client Acceptance Risk Partner", name: "Risk Partner Name" },
      { title: "Chief Risk & Resilience Officer", name: "CRRO Name" },
    ],
    engagementRisk: [
      { title: "Engagement Risk Partner", name: "Risk Partner Name" },
      { title: "Chief Risk & Resilience Officer", name: "CRRO Name" },
    ],
    auditFinding: [
      { title: "Internal Audit Leader", name: "Audit Leader Name" },
      { title: "Chief Risk & Resilience Officer", name: "CRRO Name" },
    ],
    data: [
      { title: "Chief Privacy Officer", name: "CPO Name" },
      { title: "Chief Data and Analytics Officer", name: "CDAO Name" },
      { title: "Chief Risk & Resilience Officer", name: "CRRO Name" },
    ],
    ai: [
      { title: "Partner Innovation", name: "Innovation Partner Name" },
      { title: "Chief Information Officer", name: "CIO Name" },
      { title: "Chief Risk & Resilience Officer", name: "CRRO Name" },
    ],
  };

  return approversByType[type] || [];
};