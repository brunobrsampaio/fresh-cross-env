/** Global interface for values */
export interface ICrossEnv {
  /** Object that will contain all shared variables */
  crossEnv?: Record<string, string>;
}

interface PluginRenderStyleTag {
  cssText: string;
  media?: string;
  id?: string;
}

type PluginRenderLink = {
  crossOrigin?: string;
  href?: string;
  hreflang?: string;
  media?: string;
  referrerPolicy?: string;
  rel?: string;
  title?: string;
  type?: string;
};

interface PluginRenderScripts {
  /** The "key" of the entrypoint (as specified in `Plugin.entrypoints`) for the
   * script that should be loaded. The script must be an ES module that exports
   * a default function.
   *
   * The default function is invoked with the `state` argument specified below.
   */
  entrypoint: string;
  /** The state argument that is passed to the default export invocation of the
   * entrypoint's default export. The state must be JSON-serializable.
   */
  state: unknown;
}

export interface PluginRenderResult {
  /** CSS styles to be injected into the page. */
  styles?: PluginRenderStyleTag[];
  /** JS scripts to ship to the client. */
  scripts?: PluginRenderScripts[];
  /** Link tags for the page */
  links?: PluginRenderLink[];
  /** Body HTML transformed by the plugin */
  htmlText?: string;
}

interface PluginRenderFunctionResult {
  /** The HTML text that was rendered. */
  htmlText: string;
  /** If the renderer encountered any islands that require hydration on the
   * client. */
  requiresHydration: boolean;
}

type PluginRenderFunction = () => PluginRenderFunctionResult;

export interface PluginRenderContext {
  render: PluginRenderFunction;
}