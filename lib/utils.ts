import type { ICrossEnv } from "./interfaces.ts";

/**
 * Function to handle the values that need to be handled
 *
 * @param value Value to be treated
 * @returns
 */
const parseJson = (value: string | undefined): unknown => {
  try {
    return JSON.parse(value || "");
  } catch (_e) {
    return value;
  }
};

/**
 * Function that retrieves the value of the variable
 *
 * All values are treated based on how they were written in the environment variable,
 * always respecting their primitive types. Ex: string, number, boolean and etc...
 *
 * @example
 * ```ts
 * getEnv('ENV_VAR_1') // string
 * getEnv('ENV_VAR_2') // boolean
 * getEnv('ENV_VAR_3') // number
 * getEnv('ENV_VAR_4') // object | array
 *
 * // This function accepts generic types
 *
 * interface CustomType { name: string; age: number; is_active: boolean; }
 *
 * getEnv<CustomType>('ENV_VAR_5')
 * ```
 *
 * @param name Variable name
 * @returns Treated value
 */
export const getEnv = <T extends unknown>(name: string): T => {
  const global: typeof globalThis & ICrossEnv = globalThis;

  if (!name) {
    return undefined as T;
  }

  try {
    return parseJson(Deno.env.get(name)) as T;
  } catch (_e) {
    return parseJson(global.crossEnv ? global.crossEnv[name] : undefined) as T;
  }
};
