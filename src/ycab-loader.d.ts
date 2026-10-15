export type YCABLoaderVariant = "iserve" | "values" | "logo";
export type YCABLoaderTheme = "light" | "dark" | "auto";

export interface YCABLoaderOptions {
  variant?: YCABLoaderVariant;
  theme?: YCABLoaderTheme;
  stepMs?: number;
  hideLabel?: boolean;
  plain?: boolean;
  label?: string;
}

export declare function show(options?: YCABLoaderOptions): HTMLElement | null;
export declare function hide(options?: { force?: boolean }): void;
export declare function wrap<T>(task: Promise<T> | (() => Promise<T> | T), options?: YCABLoaderOptions): Promise<T>;

declare const YCABLoader: {
  show: typeof show;
  hide: typeof hide;
  wrap: typeof wrap;
  variants: YCABLoaderVariant[];
};
export default YCABLoader;

interface YCABLoaderAttributes {
  variant?: YCABLoaderVariant;
  theme?: YCABLoaderTheme;
  "step-ms"?: number | string;
  fullscreen?: boolean | "";
  plain?: boolean | "";
  "hide-label"?: boolean | "";
  label?: string;
  start?: number | string;
  class?: string;
  className?: string;
  id?: string;
  style?: any;
  hidden?: boolean;
}

declare global {
  interface Window {
    YCABLoader: typeof YCABLoader;
    YCAB_LOADER_NO_FONT?: boolean;
  }
  interface HTMLElementTagNameMap {
    "ycab-loader": HTMLElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "ycab-loader": YCABLoaderAttributes;
    }
  }
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ycab-loader": YCABLoaderAttributes;
    }
  }
}
