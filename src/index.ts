import { APICallType as ApiCallTypeInternal } from './definitions';
import { 
  useApiCall,
  useApiCallAndImmediatelyDispatch,
  suspenseApiCall
 } from './react/helpers';


export type APICallType<TRet, TParams = void, TSocketMessage = any> = ApiCallTypeInternal<TRet, TParams, TSocketMessage>;

export { 
  suspenseApiCall,
  useApiCall,
  useApiCallAndImmediatelyDispatch
}