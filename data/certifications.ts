export type CertificationItem = {
  name: string;
  issuer?: string;
  date?: string;
  status?: "Earned" | "Planned";
  credentialUrl?: string;
};

export const newCertifications: CertificationItem[] = [
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
];

function credentialName(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/^(?:ai-900|ai-901|pl-400):\s*/, "")
    .replace(/^microsoft(?: certified)?:\s*/, "")
    .replace(/^microsoft\s+/, "");
}

// Keep the newly earned credentials current even when stored resume content
// still contains their old learning-plan entries.
export function mergeCertifications(items: CertificationItem[]) {
  const updatedNames = new Set(
    newCertifications.map((cert) => credentialName(cert.name))
  );
  return [
    ...newCertifications,
    ...items.filter((cert) => !updatedNames.has(credentialName(cert.name))),
  ];
}
