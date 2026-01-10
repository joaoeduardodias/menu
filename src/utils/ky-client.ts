import type { CookiesFn } from "cookies-next";
import { getCookie } from "cookies-next";
import ky, { Options } from "ky";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";

export const kyInstance = ky.create({
  prefixUrl: API_URL,
});

export const kyFetch = async <T = any>(
  input: RequestInfo,
  init?: Options,
  cookieStore?: CookiesFn
): Promise<T> => {
  return await kyInstance
    .extend({
      hooks: {
        beforeRequest: [
          async (request) => {
            if (request.headers.get("X-Skip-Auth") === "true") {
              request.headers.delete("X-Skip-Auth");
              return;
            }

            let cs = cookieStore;

            if (typeof window === "undefined" && !cs) {
              const { cookies: serverCookies } = require("next/headers");
              cs = serverCookies;
            }

            const token = await getCookie("token", { cookies: cs });

            if (token) {
              request.headers.set("Authorization", `Bearer ${token}`);
            }
          },
        ],
      },
    })
    .get(input, init)
    .then(async (r) => {
      const text = await r.text();
      try {
        return JSON.parse(text) as T;
      } catch {
        return text as unknown as T;
      }
    });
};
