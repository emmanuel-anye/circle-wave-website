export type TrustProofItem =
  | {
      kind: "testimonial";
      id: string;
      quote: string;
      attribution: string;
      role?: string;
      organization?: string;
    }
  | {
      kind: "client";
      id: string;
      name: string;
      logoPath: string;
      logoAlt: string;
    }
  | {
      kind: "outcome";
      id: string;
      title: string;
      description: string;
      sourceNote: string;
    };

// Intentionally empty until Circle Wave supplies approved, verifiable material.
export const approvedTrustProof: TrustProofItem[] = [];
