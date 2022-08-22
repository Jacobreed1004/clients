import { I18nService as AbstractI18nService } from "@bitwarden/common/abstractions/i18n.service";

import I18nService from "../../services/i18n.service";

import { FactoryOptions, CachedServices, factory } from "./factory-options";

type I18nServiceFactoryOptions = FactoryOptions & {
  i18nServiceOptions: {
    systemLanguage: string;
  };
};

export type I18nServiceInitOptions = I18nServiceFactoryOptions;

export function i18nServiceFactory(
  cache: { i18nService?: AbstractI18nService } & CachedServices,
  opts: I18nServiceInitOptions
): AbstractI18nService {
  return factory(
    cache,
    "i18nService",
    opts,
    () => new I18nService(opts.i18nServiceOptions.systemLanguage)
  );
}
