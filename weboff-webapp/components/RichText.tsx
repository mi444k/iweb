import { ElementType, Fragment, ReactNode } from "react";

interface TextNode {
  type: "text";
  value: string;
}

interface ElementNode {
  type: "element";
  name: string;
  children: ParsedNode[];
  selfClosing: boolean;
}

type ParsedNode = TextNode | ElementNode;

type TagRendererMeta = { key: string; node: ElementNode };
export type RichTextTagRenderer = (
  children: ReactNode[],
  meta: TagRendererMeta
) => ReactNode;
type RendererDictionary = Record<string, RichTextTagRenderer>;

type WrapperComponent = ElementType<{
  className?: string;
  children: ReactNode;
}>;

const SELF_CLOSING_TAGS = new Set(["br"]);
const TAG_REGEX = /<\s*(\/)?\s*([a-zA-Z][\w-]*)\s*(\/)?>/g;

const fallbackRenderer: RichTextTagRenderer = (children, { key }) => (
  <Fragment key={key}>{children}</Fragment>
);

const baseRenderers: RendererDictionary = {
  bold: (children, { key }) => (
    <strong key={key} className="font-semibold text-inherit">
      {children}
    </strong>
  ),
  red: (children, { key }) => (
    <span key={key} className="text-red-600">
      {children}
    </span>
  ),
  accent: (children, { key }) => (
    <span key={key} className="text-(--accent)">
      {children}
    </span>
  ),
  br: (_, { key }) => <br key={key} />,
};

interface RichTextProps {
  text?: string | null;
  components?: Partial<Record<string, RichTextTagRenderer>>;
  as?: WrapperComponent;
  className?: string;
}

export function RichText({ text, components, as, className }: RichTextProps) {
  const resolvedText = text ?? "";
  const tree = parseRichText(resolvedText);
  const renderers = components ? mergeRenderers(components) : baseRenderers;
  const content = renderNodes(tree, renderers);

  if (as) {
    const WrapperComponent = as as ElementType<{
      className?: string;
      children: ReactNode;
    }>;
    return <WrapperComponent className={className}>{content}</WrapperComponent>;
  }

  if (className) {
    return <span className={className}>{content}</span>;
  }

  return <Fragment>{content}</Fragment>;
}

function mergeRenderers(
  overrides: Partial<Record<string, RichTextTagRenderer>>
) {
  const normalized = Object.entries(overrides).reduce<RendererDictionary>(
    (acc, [name, renderer]) => {
      if (renderer) {
        acc[name.toLowerCase()] = renderer;
      }
      return acc;
    },
    {} as RendererDictionary
  );

  return { ...baseRenderers, ...normalized };
}

function parseRichText(input: string): ParsedNode[] {
  const root: ElementNode = {
    type: "element",
    name: "__root",
    children: [],
    selfClosing: false,
  };
  const stack: ElementNode[] = [root];
  let lastIndex = 0;
  TAG_REGEX.lastIndex = 0;

  for (const match of input.matchAll(TAG_REGEX)) {
    const [fullMatch, closingSlash, rawName, selfClosingSlash] = match;
    const matchIndex = match.index ?? 0;

    if (matchIndex > lastIndex) {
      appendText(input.slice(lastIndex, matchIndex), stack);
    }

    const name = (rawName ?? "").toLowerCase();
    if (!name) {
      lastIndex = matchIndex + fullMatch.length;
      continue;
    }

    const isClosing = Boolean(closingSlash);
    const isSelfClosing =
      Boolean(selfClosingSlash) || SELF_CLOSING_TAGS.has(name);

    if (isClosing) {
      closeTag(name, stack);
    } else {
      const node: ElementNode = {
        type: "element",
        name,
        children: [],
        selfClosing: isSelfClosing,
      };
      stack[stack.length - 1].children.push(node);
      if (!isSelfClosing) {
        stack.push(node);
      }
    }

    lastIndex = matchIndex + fullMatch.length;
  }

  if (lastIndex < input.length) {
    appendText(input.slice(lastIndex), stack);
  }

  return root.children;
}

function appendText(value: string, stack: ElementNode[]) {
  if (!value.length) {
    return;
  }
  const parent = stack[stack.length - 1];
  parent.children.push({ type: "text", value });
}

function closeTag(name: string, stack: ElementNode[]) {
  for (let i = stack.length - 1; i >= 1; i--) {
    const node = stack.pop();
    if (node?.name === name) {
      break;
    }
  }
}

function renderNodes(
  nodes: ParsedNode[],
  renderers: RendererDictionary,
  keyPrefix = "rt"
): ReactNode[] {
  const acc: ReactNode[] = [];

  nodes.forEach((node, index) => {
    const key = `${keyPrefix}-${index}`;

    if (node.type === "text") {
      acc.push(...renderText(node.value, key, renderers));
      return;
    }

    const children = renderNodes(node.children, renderers, key);
    const renderer = renderers[node.name] ?? fallbackRenderer;
    acc.push(renderer(children, { key, node }));
  });

  return acc;
}

function renderText(
  value: string,
  keyPrefix: string,
  renderers: RendererDictionary
): ReactNode[] {
  if (!value.includes("\n")) {
    return value.length
      ? [<Fragment key={`${keyPrefix}-text`}>{value}</Fragment>]
      : [];
  }

  const newlineRenderer = renderers.br ?? baseRenderers.br;
  const parts = value.split(/\r?\n/);
  const nodes: ReactNode[] = [];

  parts.forEach((part, index) => {
    if (part.length) {
      nodes.push(
        <Fragment key={`${keyPrefix}-text-${index}`}>{part}</Fragment>
      );
    }

    if (index < parts.length - 1) {
      nodes.push(
        newlineRenderer([], {
          key: `${keyPrefix}-br-${index}`,
          node: {
            type: "element",
            name: "br",
            children: [],
            selfClosing: true,
          },
        })
      );
    }
  });

  return nodes;
}
