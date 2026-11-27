export type CertificationItem = {
  name: string;
  issuer?: string;
  date?: string;
  status?: "Earned" | "Planned";
  credentialUrl?: string;
};

export const newCertifications: CertificationItem[] = [
  {
    name: "Microsoft Certified: Agentic AI Business Solutions Architect Expert",
    issuer: "Microsoft",
    date: "November 20, 2026",
    status: "Earned",
    credentialUrl:
      "https://learn.microsoft.com/api/credentials/share/en-us/EbyO-6154/3EBCF30A1020DAB7?sharingId=2F77B610DFCB0724",
  },
  {
    name: "Microsoft Certified: Azure AI Fundamentals",
    issuer: "Microsoft",
    date: "September 11, 2026",
    status: "Earned",
    credentialUrl:
      "https://learn.microsoft.com/api/credentials/share/en-us/beretesting-8692/A92840C731171C3F?sharingId=9E28D5F86EA8A8D5",
  },
  {
    name: "Microsoft Certified: Power Platform Developer Associate",
    issuer: "Microsoft",
    date: "October 9, 2026",
    status: "Earned",
    credentialUrl:
      "https://learn.microsoft.com/api/credentials/share/en-us/EbyO-6154/76301B18684FA681?sharingId=2F77B610DFCB0724",
  },
  {
    "name": "Microsoft 365 Certified: Administrator Expert",
    "issuer": "Microsoft",
    "date": "July 17, 2025",
    "status": "Earned",
    "credentialUrl": "https://learn.microsoft.com/api/credentials/share/en-us/beretesting-8692/6D0E05A6521706A1?sharingId=9E28D5F86EA8A8D5"
  },
  {
    "name": "Microsoft Certified: Identity and Access Administrator Associate",
    "issuer": "Microsoft",
    "date": "July 17, 2025",
    "status": "Earned",
    "credentialUrl": "https://learn.microsoft.com/api/credentials/share/en-us/beretesting-8692/FD1330ED75E8AEF6?sharingId=9E28D5F86EA8A8D5"
  },
  {
    "name": "Microsoft Certified: Azure Solutions Architect Expert",
    "issuer": "Microsoft",
    "date": "July 14, 2025",
    "status": "Earned",
    "credentialUrl": "https://learn.microsoft.com/api/credentials/share/en-us/beretesting-8692/3FB45352AC46F5AF?sharingId=9E28D5F86EA8A8D5"
  },
  {
    "name": "Microsoft Certified: Azure Administrator Associate",
    "issuer": "Microsoft",
    "date": "July 12, 2025",
    "status": "Earned",
    "credentialUrl": "https://learn.microsoft.com/api/credentials/share/en-us/beretesting-8692/B57AFC5B77540F8F?sharingId=9E28D5F86EA8A8D5"
  },
];

const verifiedCredentialLinks: Record<string, string> = {
  "az-300 microsoft azure architect technologies":
    "https://www.credly.com/badges/b1ef9b4c-e9b5-4986-9b4a-ec7bcb4041b4/linked_in_profile",
};

function credentialName(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/^az-300:\s*/, "az-300 ")
    .replace(/^(?:ai-900|ai-901|pl-400|ab-100):\s*/, "")
    .replace(/^microsoft(?: certified)?:\s*/, "")
    .replace(/^microsoft\s+/, "")
    .replace(/^agentic ai business solutions architect$/, "agentic ai business solutions architect expert");
}

// Keep verified credentials current even when stored resume content has
// missing links, omitted certifications, or old learning-plan entries.
export function mergeCertifications(items: CertificationItem[]) {
  const updatedNames = new Set(
    newCertifications.map((cert) => credentialName(cert.name))
  );
  return [
    ...newCertifications,
    ...items.filter((cert) => !updatedNames.has(credentialName(cert.name))),
  ].map((cert) => {
    const credentialUrl = verifiedCredentialLinks[credentialName(cert.name)];
    return credentialUrl && cert.status !== "Planned"
      ? { ...cert, credentialUrl }
      : cert;
  });
}
