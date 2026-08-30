# ds

Monorepo for the Vue 3 design system [`@netragate/design-system`](https://www.npmjs.com/package/@netragate/design-system).

- **Repository:** [github.com/netragate/ds](https://github.com/netragate/ds)
- **Playground (GitHub Pages):** [netragate.github.io/ds](https://netragate.github.io/ds/)
- **npm package:** [`@netragate/design-system`](https://www.npmjs.com/package/@netragate/design-system)

## What's in this repo

- **63 exported Vue 3 components** (forms, feedback, layout, overlay, data display, etc.)
- **Playground** with interactive demos, **Library** catalog, installation docs, live **Usage** snippets, and **EN / pt-BR** i18n
- **38 drawer playgrounds** plus a **Showcase** section (e.g. AI Chat — composed use case, not part of the library catalog)
- Design tokens, Tailwind CSS 4, light/dark mode, Vitest

Usage, API, and examples: [`packages/design-system/README.md`](./packages/design-system/README.md).

## Using the package

Peer dependencies (install with the library):

- `vue` ^3.5.0
- `lucide-vue-next` ^1.0.0
- `tailwind-merge` ^3.2.0
- `clsx` ^2.1.1

```bash
npm install @netragate/design-system vue lucide-vue-next tailwind-merge clsx
```

Import styles in your app: `@netragate/design-system/styles.css`. See the [package README](./packages/design-system/README.md) for setup, icons (`resolveIcon`), and API.

## Structure

```
packages/design-system/   Library + playground + tests
```

## Scripts (root)

```bash
npm install
npm run dev      # local playground → http://localhost:5173
npm run build    # lib + playground
npm run test     # Vitest
```

## Development

```bash
cd packages/design-system
npm run dev              # playground
npm run build:lib        # modular library (dist/)
npm run build:playground # playground only (GitHub Pages)
npm run analyze          # bundle stats → dist/bundle-stats.json
npm run generate:icons   # regenerate icon loaders from iconography.meta.ts
```

## License

MIT
