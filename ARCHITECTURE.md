# Architecture

This is a standalone Vue 3 + Vite application, extracted from the portfolio workspace after its business domain was separated from layout and mock data. It can be installed, tested and built on its own.

## Source structure

- `src/main.js`: creates the Vue application and registers Pinia and Vue Router.
- `src/App.vue`: the application layout and shared dialogs.
- `src/router/index.js`: lazy-loaded route components and URL structure.
- `src/views/`: page-level composition.
- `src/components/`: reusable domain UI.
- `src/stores/`: session state, derived selectors, domain actions and tests.
- `src/data/`: fictional fixture factories, separate from presentation.
- `src/composables/`: view adapters, navigation and component lifecycle.
- `src/assets/`: readable application CSS and any original artwork.
- `src/utils/`: pure helpers where the domain needs them.

## State and effects

The URL owns navigation. Pinia owns shared domain/session state. Route components consume refs and invoke domain actions. Dialog focus and notification timers are handled by lifecycle helpers rather than fixtures. Fixtures are ordinary local data; no fabricated production endpoint or real business service is involved.

Hash routing makes direct links and reloads work on simple static hosts. Build-time Vue SFC compilation avoids a browser template compiler. Vite resolves imported resources, including original SVG artwork. Production CSP blocks outgoing connections; development permits Vite's local hot-update connection.

## Engineering focus

Vue 3 product catalogue and review workflow with validated forms, revision feedback and activity history.

Domain tests cover state changes and boundary conditions. Where the application includes forms or checkout navigation, component integration tests also exercise the rendered Vue interface and router. The project uses JavaScript SFCs and is not presented as a TypeScript project.

## Verification

```sh
npm ci --ignore-scripts
npm run format:check
npm test
npm run build
```

The GitHub workflow runs the same checks on pull requests or manual dispatch. It uses pinned official action revisions, read-only repository permissions and no deployment credentials. Local checks do not imply a cloud CI run has already happened.

## Deliberate limits

All state is in memory and resets on reload. Authentication, persistent storage, production authorization and real business integrations are outside this demo. The README documents domain-specific simplifications. The code demonstrates maintainable frontend workflows with fictional data; it does not reproduce an original enterprise repository's complete logic or claim measured client outcomes.
