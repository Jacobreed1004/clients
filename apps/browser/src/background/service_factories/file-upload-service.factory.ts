import { FileUploadService as AbstractFileUploadService } from "@bitwarden/common/abstractions/fileUpload.service";
import { FileUploadService } from "@bitwarden/common/services/fileUpload.service";

import { apiServiceFactory, ApiServiceInitOptions } from "./api-service.factory";
import { FactoryOptions, CachedServices, factory } from "./factory-options";
import { logServiceFactory, LogServiceInitOptions } from "./log-service.factory";

type FileUploadServiceFactoyOptions = FactoryOptions;

export type FileUploadServiceInitOptions = FileUploadServiceFactoyOptions &
  LogServiceInitOptions &
  ApiServiceInitOptions;

export function fileUploadServiceFactory(
  cache: { fileUploadService?: AbstractFileUploadService } & CachedServices,
  opts: FileUploadServiceInitOptions
): AbstractFileUploadService {
  return factory(
    cache,
    "fileUploadService",
    opts,
    () => new FileUploadService(logServiceFactory(cache, opts), apiServiceFactory(cache, opts))
  );
}
