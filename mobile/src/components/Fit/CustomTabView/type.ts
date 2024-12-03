export type CustomTabViewProps = {
  tabs: Array<{key: string; title: string}>;
  content: {[key: string]: JSX.Element};
};
