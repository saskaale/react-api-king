// export type SocketMessage<T = any> = {
//     key:    "order"|"profile"|"message",
//     id:     string
// };

export type RefreshCondition<TSocketMessage> = (message: TSocketMessage) => boolean;

export type APICallType<TRet, TParams = void, TSocketMessage = any> = { 
    call: (params: TParams) => Promise<TRet>;
    refresh?: RefreshCondition<TSocketMessage>;
    expires?: number;
};
