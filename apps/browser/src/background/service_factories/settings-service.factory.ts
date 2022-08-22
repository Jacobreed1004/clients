import { SettingsService as AbstractSettingsService } from "@bitwarden/common/abstractions/settings.service";
import { SettingsService } from "@bitwarden/common/services/settings.service";

import { FactoryOptions, CachedServices, factory } from "./factory-options";
import { stateServiceFactory, StateServiceInitOptions } from "./state-service.factory";

type SettingsServiceFactoryOptions = FactoryOptions;

export type SettingsServiceInitOptions = SettingsServiceFactoryOptions & StateServiceInitOptions;

export function settingsServiceFactory(
  cache: { settingsService?: AbstractSettingsService } & CachedServices,
  opts: SettingsServiceInitOptions
): AbstractSettingsService {
  return factory(
    cache,
    "settingsService",
    opts,
    () => new SettingsService(stateServiceFactory(cache, opts))
  );
}
