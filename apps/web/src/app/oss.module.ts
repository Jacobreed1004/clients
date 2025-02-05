import { NgModule } from "@angular/core";

import { TrialInitiationModule } from "./accounts/trial-initiation/trial-initiation.module";
import { OrganizationCreateModule } from "./organizations/create/organization-create.module";
import { OrganizationManageModule } from "./organizations/manage/organization-manage.module";
import { OrganizationUserModule } from "./organizations/users/organization-user.module";
import { LooseComponentsModule, SharedModule } from "./shared";
import { OrganizationBadgeModule } from "./vault/organization-badge/organization-badge.module";
import { VaultFilterModule } from "./vault/vault-filter/vault-filter.module";

@NgModule({
  imports: [
    SharedModule,
    LooseComponentsModule,
    TrialInitiationModule,
    VaultFilterModule,
    OrganizationBadgeModule,
    OrganizationManageModule,
    OrganizationUserModule,
    OrganizationCreateModule,
  ],
  exports: [
    SharedModule,
    LooseComponentsModule,
    TrialInitiationModule,
    VaultFilterModule,
    OrganizationBadgeModule,
  ],
  bootstrap: [],
})
export class OssModule {}
