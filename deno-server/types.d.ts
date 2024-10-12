// deno-lint-ignore-file no-explicit-any
export interface Env {
  MONGODB_URI: string;
}

export interface AppContext {
  Bindings: Env;
  Variables: { db: any };
}
