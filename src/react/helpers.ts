import { useCallback, useEffect, useState } from "react";
import { APICallType, RefreshCondition } from '../definitions';
import { serverEvents } from '../events';


export function useApiCall<TRet, TParams = void, TSocketMessage = any>(
    query: APICallType< TRet, TParams , TSocketMessage >
) : [
    (param:TParams) => void, 
    TRet|undefined, 
    boolean, 
    boolean, 
    Error | undefined
] {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error|undefined>(undefined);
    const [success, setSuccess] = useState<boolean>(false);
    const [data, setData] = useState<TRet|undefined>(undefined);

    const load = useCallback((param: TParams) => {
        (async () => {
            setLoading(true);
            try{
                setLoading(true);
                const data = await query.call(param);
                setError(undefined);
                setSuccess(true);
                setData(data);
            }catch(e){
                setSuccess(false);
                setError(error);
            }finally{
                setLoading(false);
            }
        })();
    }, [query, query?.call]);

    return [load, data, loading, success, error];
}


function useRefreshServerNotif<TParams, TSocketMessage = any>(
    load: (param:TParams) => void, 
    refresh: RefreshCondition<TSocketMessage> | undefined, 
    params: TParams 
){
    useEffect( ( ) => {
        if( !refresh ){ return; }

        const action = ( message: TSocketMessage ) => {
            if ( refresh( message ) ) {
                load( params );
            }
        };

        serverEvents.on("event", action);

        return () => { serverEvents.off("event", action); };
    },[load, refresh, params]);
}

function useExpiresServer<TParams>(
    load: (param:TParams) => void, 
    expires: number | undefined, 
    params: TParams
){
    useEffect( ( ) => {
        if( expires !== undefined ){
            const tout = setTimeout(() => {
                load( params );
            }, expires);
            return () => {
                clearTimeout(tout);
            }
        }
        return () => {};
    },[load, expires, params]);
}


export function useApiCallAndImmediatelyDispatch<TRet, TParams = undefined>(
    call: APICallType< TRet, TParams >, 
    params: TParams
) : [
    TRet | undefined, 
    boolean, 
    boolean, 
    Error | undefined
] {
    const [load, data, loading, success, error] = useApiCall<TRet, TParams>(call);

    useEffect(() => {
        load(params);
    },[JSON.stringify(params)]);

    useRefreshServerNotif( load, call.refresh, params );
    useExpiresServer(load, call.expires, params );

    return [data, loading, success, error]
}

export function suspenseApiCall<TRet, TParams = undefined>(
    call: APICallType< TRet, TParams >, 
    params: TParams
)
{
    let status: "pending"|"error"|"success" = "pending";

    let result: TRet;
    let error: any;

    const suspender = call.call(params).then(
        data=>{
            status="success";
            result = data;
        }, 
        err=>{
            status="error";
            error = err;
        }
    );

    const read = () => {
        switch (status) {
            case 'pending':
                throw suspender;
            case 'error':
                throw error;
            default:
                return result;
        }
    }

    return {
        read
    }
}

export function mkSuspense<TRet, TParams = void>(
    call: APICallType< TRet, TParams >, 
    params: TParams
){
    let status: "pending"|"error"|"success" = "pending";
    let result: TRet;
    let error: any;
    let suspender = call.call(params).then(
      (r) => {
        status = "success";
        result = r;
      },
      (e) => {
        status = "error";
        error = e;
      }
    );
    return {
      read: () => {
        switch(status)
        {
            case "pending":
                throw suspender;
            case "error":
                throw error;
            case "success":
                return result;
            default:
                throw new Error("UNREACHABLE");
        }
      },
    };
}