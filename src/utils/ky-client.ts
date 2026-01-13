import { getCookie } from "cookies-next";
import ky from "ky";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";

const kyInstance = ky.create({
  prefixUrl: API_URL,
});

export const customInstance = kyInstance.extend({
  hooks: {
    beforeRequest: [
      async (request) => {
        if (request.headers.get("X-Skip-Auth") === "true") {
          request.headers.delete("X-Skip-Auth");
          return;
        }

        let token: string | undefined;

        if (typeof window === "undefined") {
          try {
            const cookieStore = await cookies();
            token = cookieStore.get("token")?.value;
          } catch (err) {
            console.error("Erro ao pegar cookies server-side:", err);
          }
        } else {
          const raw = await getCookie("token");
          token = raw ? raw.toString() : undefined;
        }

        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      }
    ]
  }
});

export const customInstanceMutator = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {

  const method = options.method?.toLowerCase();
  const cleanUrl = url.startsWith('/')
    ? url.slice(1)
    : url;

  if (options.body) {
    try {
      const parsed = JSON.parse(options.body as string);
      (options as any).json = parsed;
    } catch {
      (options as any).json = options.body;
    }
    delete (options as any).body;
  }

  switch (method) {
    case 'get': {
      const res = await customInstance.get(cleanUrl, options as any);
      const body = await res.json();
      return {
        status: res.status,
        data: body,
        headers: res.headers,
      } as any;
    }

    case 'post': {
      const response = await customInstance.post(cleanUrl, options as any);
      const data = await response.json();
      return { data, response } as any;
    }

    case 'put': {
      const response = await customInstance.put(cleanUrl, options as any);
      const data = await response.json();
      return { data, response } as any;
    }

    case 'delete': {
      const response = await customInstance.delete(cleanUrl, options as any);
      const data = await response.json();
      return { data, response } as any;
    }

    case 'patch': {
      const response = await customInstance.patch(cleanUrl, options as any);
      const data = await response.json();
      return { data, response } as any;
    }

    default:
      throw new Error(`Unsupported method: ${method}`);
  }
};

