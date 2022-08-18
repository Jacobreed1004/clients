import { ApiService as AbstractApiService } from "@bitwarden/common/abstractions/api.service";
import { ApiService } from "@bitwarden/common/services/api.service";

import { AppIdServiceInitOptions, appIdServiceFactory } from "./app-id-service.factory";
import {
  environmentServiceFactory,
  EnvironmentServiceInitOptions,
} from "./environment-service.factory";
import { CachedServices, factory, FactoryOptions } from "./factory-options";
import {
  PlatformUtilsServiceInitOptions,
  platformUtilsServiceFactory,
} from "./platform-utils-service.factory";
import { TokenServiceInitOptions, tokenServiceFactory } from "./token-service.factory";

type ApiServiceFactoryOptions = FactoryOptions & {
  apiServiceOptions: {
    logoutCallback: (expired: boolean) => Promise<void>;
    customUserAgent?: string;
  };
};

export type ApiServiceInitOptions = ApiServiceFactoryOptions &
  TokenServiceInitOptions &
  PlatformUtilsServiceInitOptions &
  EnvironmentServiceInitOptions &
  AppIdServiceInitOptions;

export function apiServiceFactory(
  cache: { apiService?: AbstractApiService } & CachedServices,
  opts: ApiServiceInitOptions
): AbstractApiService {
  return factory(
    cache,
    "apiService",
    opts,
    () =>
      new ApiService(
        tokenServiceFactory(cache, opts),
        platformUtilsServiceFactory(cache, opts),
        environmentServiceFactory(cache, opts),
        appIdServiceFactory(cache, opts),
        opts.apiServiceOptions.logoutCallback,
        opts.apiServiceOptions.customUserAgent
      )
  );
}
