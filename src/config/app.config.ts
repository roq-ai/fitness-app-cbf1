interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Owner'],
  customerRoles: [],
  tenantRoles: ['Owner', 'Trainer', 'Member'],
  tenantName: 'Team',
  applicationName: 'Fitness app',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [],
  ownerAbilities: ['Manage users', 'Manage teams', 'Manage exercises', 'Manage workouts'],
  getQuoteUrl: 'https://app.roq.ai/proposal/5ed542e9-6adf-4527-911e-fc866f732177',
};
