/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

export type AsyncFnType = (options?: any) => Promise<any>;

interface AsyncStateReturn {
  call: (options?: any) => void;
  callWithReturn: (options?: any) => Promise<any>;
  data: any;
  error: Error | null;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  reset: () => void;
}
enum AsyncStateStatusType {
  ERROR = "ERROR",
  INITIAL = "INITIAL",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
}

const asyncHandler = async (promise: Promise<any>): Promise<any> =>
  await promise.then((data: any) => [null, data]).catch((err: any) => [err]);

export const useAsyncCall = (
  asyncFunction: AsyncFnType,
  onSuccess?: (data: any) => void,
  onError?: (err: any) => void
): AsyncStateReturn => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState<AsyncStateStatusType>(
    AsyncStateStatusType.INITIAL
  );
  const [error, setError] = useState<any>(null);

  const reset = () => {
    setStatus(AsyncStateStatusType.INITIAL);
    setData(null);
    setError(null);
  };

  const call = async (options?: any) => {
    setStatus(AsyncStateStatusType.LOADING);
    setData(null);
    setError(null);

    const [err, response] = await asyncHandler(asyncFunction(options));

    if (err) {
      setError(err);
      setStatus(AsyncStateStatusType.ERROR);
      onError?.(err);
    }

    if (response) {
      setData(response);
      setStatus(AsyncStateStatusType.SUCCESS);
      onSuccess?.(response);
    }
  };

  const callWithReturn = async (options?: any) => {
    setStatus(AsyncStateStatusType.LOADING);
    setData(null);
    setError(null);

    const [err, response] = await asyncHandler(asyncFunction(options));

    if (err) {
      setError(err);
      setStatus(AsyncStateStatusType.ERROR);
      onError?.(err);
      return error;
    }

    if (response) {
      setStatus(AsyncStateStatusType.SUCCESS);
      onSuccess?.(response);
      return response;
    }
  };

  return {
    call,
    callWithReturn,
    data,
    reset,
    error,
    isError: status === AsyncStateStatusType.ERROR,
    isLoading: status === AsyncStateStatusType.LOADING,
    isSuccess: status === AsyncStateStatusType.SUCCESS,
  };
};
