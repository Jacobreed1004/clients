import { TokenService as AbstractTokenService } from "@bitwarden/common/abstractions/token.service";
import { TokenService } from "@bitwarden/common/services/token.service";

import { CachedServices, factory, FactoryOptions } from "./factory-options";
import { stateServiceFactory, StateServiceInitOptions } from "./state-service.factory";

type TokenServiceFactoryOptions = FactoryOptions;

export type TokenServiceInitOptions = TokenServiceFactoryOptions & StateServiceInitOptions;

export function tokenServiceFactory(
  cache: { tokenService?: AbstractTokenService } & CachedServices,
  opts: TokenServiceInitOptions
): AbstractTokenService {
  return factory(
    cache,
    "tokenService",
    opts,
    () => new TokenService(stateServiceFactory(cache, opts))
  );
}
