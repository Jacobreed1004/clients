import { AuthService as AbstractAuthService } from "@bitwarden/common/abstractions/auth.service";
import { AuthService } from "@bitwarden/common/services/auth.service";

import { apiServiceFactory, ApiServiceInitOptions } from "./api-service.factory";
import { appIdServiceFactory } from "./app-id-service.factory";
import { cryptoServiceFactory, CryptoServiceInitOptions } from "./crypto-service.factory";
import {
  environmentServiceFactory,
  EnvironmentServiceInitOptions,
} from "./environment-service.factory";
import { CachedServices, factory, FactoryOptions } from "./factory-options";
import { I18nServiceInitOptions, i18nServiceFactory } from "./i18n-service.factory";
import {
  KeyConnectorServiceInitOptions,
  keyConnectorServiceFactory,
} from "./key-connector-service.factory";
import { logServiceFactory, LogServiceInitOptions } from "./log-service.factory";
import { MessagingServiceInitOptions, messagingServiceFactory } from "./messaging-service.factory";
import {
  PlatformUtilsServiceInitOptions,
  platformUtilsServiceFactory,
} from "./platform-utils-service.factory";
import { stateServiceFactory, StateServiceInitOptions } from "./state-service.factory";
import { TokenServiceInitOptions, tokenServiceFactory } from "./token-service.factory";
import { TwoFactorServiceInitOptions, twoFactorServiceFactory } from "./two-factor-service.factory";

type AuthServiceFactoyOptions = FactoryOptions;

export type AuthServiceInitOptions = AuthServiceFactoyOptions &
  CryptoServiceInitOptions &
  ApiServiceInitOptions &
  TokenServiceInitOptions &
  PlatformUtilsServiceInitOptions &
  MessagingServiceInitOptions &
  LogServiceInitOptions &
  KeyConnectorServiceInitOptions &
  EnvironmentServiceInitOptions &
  StateServiceInitOptions &
  TwoFactorServiceInitOptions &
  I18nServiceInitOptions;

export function authServiceFactory(
  cache: { authService?: AbstractAuthService } & CachedServices,
  opts: AuthServiceInitOptions
): AbstractAuthService {
  return factory(
    cache,
    "authService",
    opts,
    () =>
      new AuthService(
        cryptoServiceFactory(cache, opts),
        apiServiceFactory(cache, opts),
        tokenServiceFactory(cache, opts),
        appIdServiceFactory(cache, opts),
        platformUtilsServiceFactory(cache, opts),
        messagingServiceFactory(cache, opts),
        logServiceFactory(cache, opts),
        keyConnectorServiceFactory(cache, opts),
        environmentServiceFactory(cache, opts),
        stateServiceFactory(cache, opts),
        twoFactorServiceFactory(cache, opts),
        i18nServiceFactory(cache, opts)
      )
  );
}
