import { StatusCodeMappingToString } from '~/services/constants/StringMappingToStatusCode';
import { SimpleActionResponse as BaseSimpleResponse } from '~/shared/RemixJS/types';
import { AnyRecord } from '~/shared/TypescriptUtilities';

export type SimpleActionResponse<Model, FieldsError extends AnyRecord | undefined> = BaseSimpleResponse<
  Model,
  FieldsError,
  { errorCode?: keyof typeof StatusCodeMappingToString }
>;
