import type { PluginRenderResult, PluginRenderContext } from "./interfaces.ts";

/**
 * Plugin instance that traverses variables to the front-end
 *
 * @example
 * ```ts
 * {
 *    ...
 *    plugins: [
 *      ...
 *      crossEnvPlugin([
 *        'ENV_VAR_1'
 *        'ENV_VAR_2'
 *        'ENV_VAR_3'
 *      ])
 *      ...
 *    ]
 *    ...
 * }
 * ```
 * @param whitelist A list of variables allowed to be sent to the front-end
 * @returns The plugin instance
 */
export const crossEnvPlugin = (whitelist: string[]) => ({
  name: "fresh-cross-env",
  entrypoints: {
    main:
      "data:application/javascript,export default (state) => {  window.crossEnv = { ...window.crossEnv, ...state.crossEnv}; }",
  },
  render: (ctx: PluginRenderContext): PluginRenderResult => {
    ctx.render();

    const crossEnv: Record<string, unknown> = {};

    if (whitelist) {
      whitelist.forEach((key) => {
        const env = Deno.env.get(key);

        if (env) {
          crossEnv[key] = env;
        }
      });
    }

    return {
      scripts: [
        {
          entrypoint: "main",
          state: {
            crossEnv: JSON.parse(JSON.stringify(crossEnv)),
          },
        },
      ],
    };
  },
});
