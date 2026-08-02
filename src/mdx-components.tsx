import type { MDXComponents } from "mdx/types";

/**
 * Required by @next/mdx with the App Router — its presence keeps MDX
 * rendering as Server Components. Element styling comes from <Prose>,
 * so no overrides are needed here.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components };
}
