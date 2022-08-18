import { DiskStorageOptions } from "@koa/multer";

import { AppIdService as AbstractAppIdService } from "@bitwarden/common/abstractions/appId.service";
import { AppIdService } from "@bitwarden/common/services/appId.service";

import { FactoryOptions, CachedServices, factory } from "./factory-options";
import { diskStorageServiceFactory } from "./storage-service.factory";

type AppIdServiceFactoryOptions = FactoryOptions;

export type AppIdServiceInitOptions = AppIdServiceFactoryOptions & DiskStorageOptions;

export function appIdServiceFactory(
  cache: { appIdService?: AbstractAppIdService } & CachedServices,
  opts: AppIdServiceInitOptions
): AbstractAppIdService {
  return factory(
    cache,
    "appIdService",
    opts,
    () => new AppIdService(diskStorageServiceFactory(cache, opts))
  );
}
