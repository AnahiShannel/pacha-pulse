export const pageHead = (title: string, description: string) => () => ({
  meta: [
    { title: `${title} · PACHA PULSE` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} · PACHA PULSE` },
    { property: "og:description", content: description },
  ],
});
