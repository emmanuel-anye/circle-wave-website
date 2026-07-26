export type ApplicationConfirmationMessage = {
  email: string;
  name: string;
  jobTitle: string;
  applicationReference: string;
};

export type JobAlertSubscription = {
  email: string;
  targetRoles: string;
  location: string;
};

export type CandidateDeliveryAdapter = {
  sendApplicationConfirmation?: (
    message: ApplicationConfirmationMessage
  ) => Promise<void>;
  subscribeToJobAlerts?: (
    subscription: JobAlertSubscription
  ) => Promise<void>;
};

export async function deliverApplicationConfirmation(
  message: ApplicationConfirmationMessage,
  adapter?: CandidateDeliveryAdapter | null
) {
  if (!adapter?.sendApplicationConfirmation) return "not_configured" as const;
  await adapter.sendApplicationConfirmation(message);
  return "delivered" as const;
}

export async function registerJobAlertSubscription(
  subscription: JobAlertSubscription,
  adapter?: CandidateDeliveryAdapter | null
) {
  if (!adapter?.subscribeToJobAlerts) return "not_configured" as const;
  await adapter.subscribeToJobAlerts(subscription);
  return "registered" as const;
}
