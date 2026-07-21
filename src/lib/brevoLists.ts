export interface BrevoList {
  id: number;
  name: string;
}

/** Brevo contact lists used across the app, keyed by their purpose. */
export const BREVO_LISTS = {
  leadMagnetBonus: { id: 3, name: "bonus 1- mini astuces" },
} as const satisfies Record<string, BrevoList>;
