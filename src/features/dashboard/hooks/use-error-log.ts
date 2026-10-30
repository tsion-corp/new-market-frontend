import { useEffect } from "react";

export function useErrorLog(context: string, error: unknown): void {
  useEffect(() => {
    console.error(context, error);
  }, [context, error]);
}
