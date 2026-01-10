import { kyFetch } from "@/utils/ky-client";
import type { CookiesFn } from "cookies-next";

export const orvalMutator = async <T = any>(
  {
    url,
    method,
    headers,
    body,
  }: {
    url: string;
    method: string;
    headers?: Record<string, string>;
    body?: any;
  },
  options?: {
    cookieStore?: CookiesFn;
  }
): Promise<T> => {
  return await kyFetch(
    url,
    {
      method,
      headers,
      json: body,
    },
    options?.cookieStore,
  );
};
