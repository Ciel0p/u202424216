# BrewDog Dispatch Logistics Platform (ea7742u202424216)

## Description
Web application for **BrewDog** to manage freight dispatch logistics. It lets logistics teams monitor their dispatch hubs, the dispatch orders assigned to each hub and the tonnage capacity still available, and register new dispatch orders to destination breweries obtained from the Open Brewery DB public API.

## Features
- **Toolbar** with the BrewDog logo (Logo.dev API) and the platform title.
- **Sidenav** with the navigation options *Home* and *New Dispatch Order*, and EN / ES language buttons at the bottom.
- **Home** (`/home`): *My Dispatch Hubs* section with a two-column grid of `DispatchHubSummary` cards.
  - Header: dispatch hub name.
  - Content: brewery name and assigned tonnage of every dispatch order, or *Empty* when the hub has no orders.
  - Footer: *Total Dispatched Tonnage* and *Available Tonnage Capacity* indicators.
- **New Dispatch Order** (`/dispatch/orders/new`): reactive form to select the brewery type, the destination brewery (Open Brewery DB, filtered by type) and the assigned tonnage.
  - The dispatch hub is resolved automatically from the selected brewery type.
  - An order is registered only when the assigned tonnage is less than or equal to the available tonnage capacity of the hub.
  - `dispatchedAt` and `id` are assigned automatically.
  - *Create* and *Cancel* return to `/home`.
- **Page not found** view for unsupported routes, showing the requested path and a button to return Home.
- **Footer** with BrewDog institutional information, copyright notice and distribution network status.
- **Internationalization** in English (default) and Spanish.
- **Accessibility** with ARIA attributes and a responsive layout.

## Stack
- Angular 22 (standalone components, signals) and TypeScript
- Angular Material
- Angular Router and HttpClient
- @ngx-translate/core and @ngx-translate/http-loader
- json-server 0.17.4 (fake API)
- Open Brewery DB API (breweries)
- Logo.dev API (logo)

## Architecture
Domain-driven, layered and component-based architecture. Each bounded context has `domain`, `application`, `infrastructure` and `presentation` layers; `presentation` separates `views` (routed) from `components` (not routed).

| Bounded context | Responsibility |
|---|---|
| `shared` | Base entity, resource, response, assembler, API endpoint and API classes, layout, language switcher, footer, home and page-not-found |
| `dispatches` | Dispatch hubs and dispatch orders: entities, assemblers, endpoints, API, store, summary card and new order view |
| `breweries` | Integration with the Open Brewery DB API |

Design patterns: Request/Response, Resource, Assembler, Api, Endpoint and Store.

## Configuration
Install the dependencies:
```bash
npm install
```

Start the fake API (port 3000):
```bash
cd server
json-server --watch db.json --routes routes.json
```

Start the application in another terminal:
```bash
ng serve
```

Open `http://localhost:4200`.

Base URLs, endpoint paths and the Logo.dev key are configured in `src/environments`.

## Authorship
- **Author:** Ciel0p (u202424216)
- **Course:** 1ASI0729 Desarrollo de Aplicaciones Open Source - NRC 7742
- **Repository:** https://github.com/Ciel0p/u202424216
