# Forma — Product Catalogue & Approval Workflow

A complete Vue 3 + Vite application with Vue Router, Pinia, Vue SFCs and fictional fixtures. ProductFormDialog.vue owns modal focus; validateProduct.js validates the domain inputs; the workflow store controls state transitions.

## Run

Use Node.js 24 and npm. This repository is self-contained; no sibling project or workspace root is required.

```sh
git clone https://github.com/DiqinYang/forma-product-workflow.git
cd forma-product-workflow
npm ci --ignore-scripts
npm run dev
```

```sh
npm test
npm run format:check
npm run build
npm run preview
```

Vite prints the localhost URL. Production output is generated into the ignored dist/ directory. Dependencies are pinned by this repository's own package-lock.json.

## Routes and features

- `/`: catalogue filters, status counts, sorting and paginated records.
- `/review`: review queue, required change feedback and decisions.
- `/activity`: illustrative starting history and changes made this session.

## Try the workflow

1. Create a product with a unique fictional SKU, department, compatible category and positive price.
2. Save a draft or submit to the review queue.
3. Request changes with feedback, edit the returned product and resubmit.
4. Approve it; approved and in-review records are read-only.
5. Check the Activity log. Reset demo restores the fictional seed records.

## Source map

- `src/router/`: route definitions and lazy-loaded pages.
- `src/views/`: page components.
- `src/components/`: reusable domain UI.
- `src/composables/`: view adapters, navigation and lifecycle effects.
- `src/stores/`: shared state, derived values, actions and business tests.
- `src/data/`: fictional starting records.
- `src/assets/`: CSS and any original illustrations.

Run `npm test` from this repository root for business tests. See [architecture](ARCHITECTURE.md) for design decisions and [screenshots](screenshots/) for visual examples.

## Scope and privacy

All data is synthetic and stays in memory. Reloading restores the starting data. No client API, authentication, real publication, payment or customer data is included. This is an independent reconstruction of interface patterns, not the original production repository or complete original business logic. The production HTML CSP blocks outgoing connections; Vite development uses its local hot-update connection.

## Review and licenses

Read [architecture](ARCHITECTURE.md) for state ownership and component boundaries, and [privacy review](PRIVACY.md) for the publication boundary. Third-party licenses are in licenses/. No blanket open-source license is granted to the original demo application code.
