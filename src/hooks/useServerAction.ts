import { useState } from 'react';

export type ServerActionResult<TData> = {
  data: TData | null;
  error?: string;
};

/**
 * A React hook for handling server actions with type safety
 * @template TData The expected return data type
 * @template TInput The type of the input parameters for the mutation
 */
export function useServerAction<TData, TInput>(
  serverAction: (input: TInput) => Promise<ServerActionResult<TData>>,
) {
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState<TData | null>(null);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    setData(null);
    setIsError(false);
    setError(null);
  };

  const mutateAsync = async (input: TInput): Promise<ServerActionResult<TData>> => {
    try {
      setIsPending(true);
      setIsError(false);
      setError(null);

      // Directly call the serverAction with input
      const result = await serverAction(input);

      if (result.error) {
        setIsError(true);
        setError(result.error);
      } else {
        setData(result.data);
      }

      return result;
    } catch (err) {
      setIsError(true);
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);

      return {
        data: null,
        error: errorMessage,
      };
    } finally {
      setIsPending(false);
    }
  };

  return {
    mutateAsync,
    isPending,
    isError,
    error,
    data,
    reset,
  };
}
