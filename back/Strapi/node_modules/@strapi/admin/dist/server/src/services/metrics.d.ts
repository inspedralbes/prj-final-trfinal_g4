import type { Strapi } from '@strapi/types';
declare const sendDidInviteUser: () => Promise<void>;
declare const sendDidUpdateRolePermissions: () => Promise<void>;
declare const sendDidChangeInterfaceLanguage: () => Promise<void>;
declare const sendUpdateProjectInformation: () => Promise<void>;
declare const startCron: (strapi: Strapi) => void;
export { sendDidInviteUser, sendDidUpdateRolePermissions, sendDidChangeInterfaceLanguage, sendUpdateProjectInformation, startCron, };
//# sourceMappingURL=metrics.d.ts.map