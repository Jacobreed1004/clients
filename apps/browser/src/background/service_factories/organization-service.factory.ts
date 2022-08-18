import { OrganizationService as AbstractOrganizationService } from "@bitwarden/common/abstractions/organization.service";
import { OrganizationService } from "@bitwarden/common/services/organization.service";

import { FactoryOptions, CachedServices, factory } from "./factory-options";
import { stateServiceFactory, StateServiceInitOptions } from "./state-service.factory";

type OrganizationServiceFactoryOptions = FactoryOptions;

export type OrganizationServiceInitOptions = OrganizationServiceFactoryOptions &
  StateServiceInitOptions;

export function organizationServiceFactory(
  cache: { organizationService?: AbstractOrganizationService } & CachedServices,
  opts: OrganizationServiceInitOptions
): AbstractOrganizationService {
  return factory(
    cache,
    "organizationService",
    opts,
    () => new OrganizationService(stateServiceFactory(cache, opts))
  );
}
