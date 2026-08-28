declare module "next" {
  export type Metadata = Record<string, unknown>;
  export type NextConfig = Record<string, unknown>;
}

declare module "next/link" {
  const Link: any;
  export default Link;
}

declare module "next/navigation" {
  export function redirect(destination: string): never;
  export function notFound(): never;
  export function usePathname(): string;
  export function useSearchParams(): URLSearchParams;
  export function useParams<T extends Record<string, string | string[]>>(): T;
  export function useRouter(): {
    push(url: string): void;
    replace(url: string): void;
    back(): void;
    forward(): void;
    refresh(): void;
    prefetch(url: string): Promise<void>;
  };
}

declare module "next/headers" {
  export function headers(): Promise<Headers>;
  export function cookies(): Promise<unknown>;
}

declare module "next/server" {
  export class NextRequest extends Request {
    nextUrl: URL;
  }
  export class NextResponse extends Response {
    static json(data: unknown, init?: ResponseInit): NextResponse;
    static redirect(url: string | URL, init?: number | ResponseInit): NextResponse;
    static next(init?: ResponseInit): NextResponse;
  }
}
