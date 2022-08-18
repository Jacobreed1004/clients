import { TwoFactorService as AbstractTwoFactorService } from "@bitwarden/common/abstractions/twoFactor.service";
import { TwoFactorService } from "@bitwarden/common/services/twoFactor.service";

import { FactoryOptions, CachedServices, factory } from "./factory-options";
import { I18nServiceInitOptions, i18nServiceFactory } from "./i18n-service.factory";
import {
  platformUtilsServiceFactory,
  PlatformUtilsServiceInitOptions,
} from "./platform-utils-service.factory";

type TwoFactorServiceFactoryOptions = FactoryOptions;

export type TwoFactorServiceInitOptions = TwoFactorServiceFactoryOptions &
  I18nServiceInitOptions &
  PlatformUtilsServiceInitOptions;

export function twoFactorServiceFactory(
  cache: { twoFactorService?: AbstractTwoFactorService } & CachedServices,
  opts: TwoFactorServiceInitOptions
): AbstractTwoFactorService {
  return factory(
    cache,
    "twoFactorService",
    opts,
    () =>
      new TwoFactorService(
        i18nServiceFactory(cache, opts),
        platformUtilsServiceFactory(cache, opts)
      )
  );
}
