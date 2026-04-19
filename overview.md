# Hardwood — Project Overview

Hardwood is a Next.js (App Router) application that combines:

- An **admin CMS** used to manage site content and configuration.
- A **public website/landing pages** layer that renders dynamically from CMS data (so admins can update the landing page without code changes).

The backend uses **PostgreSQL** with **Prisma** as the ORM.

## Key Features

- **Admin authentication** with a cookie-based session.
- **Landing page editing** via CMS-managed content (e.g., home blocks, page structure/content, SEO fields, default settings); updates in the CMS are reflected on the public site immediately.
- **Generic admin CRUD framework** driven by a resource configuration (menu, fields, labels, ordering) and reusable admin UI components.
- **Media uploads** from the CMS via an admin API endpoint (images are stored in Supabase Storage and saved as public URLs).

## High-Level Architecture

- **Public site**
  - Home page renders from CMS data (e.g., `HomeBlock` and default settings).
  - Dynamic routes render landing pages by slug (page tree / CMS-driven pages).
- **Admin CMS (`/admin`)**
  - Resource pages (products, categories, pages, templates, literature, settings, task manager, administrators).
  - Each admin page typically binds to a `resourceKey` and uses shared list/form rendering.
- **API layer (`/api`)**
  - Auth endpoints (`/api/auth/*`) and admin endpoints (`/api/admin/*`) protected by the admin session.

## Admin CMS — Full Feature List

### Access & Security

- **Admin login** at `/admin/login` (email + password).
- **Cookie-based session** (`hl_admin_session`), with server-side validation against the `Administrator` table (must be active).
- **Logout** endpoint clears the session.

### Dashboard

- **Dashboard overview** at `/admin` showing record counts for Projects, Tasks, Pages, Categories, and Products.

### Content Management (Landing Pages)

- **Home Blocks** (`/admin/pages-templates/home-blocks`)
  - Edit predefined homepage blocks (header, subheader, content, image URL, CTA label/link).
  - Blocks are **fixed** (cannot create or delete); some fields are **locked** (e.g., callback key, ordering/visibility).
- **Pages & Structure** (`/admin/pages-templates/pages-structure`)
  - Manage a **hierarchical page tree** using `parentId` (nested pages).
  - Edit **slug**, **template**, **SEO** (meta title/description), and **page content** (rich text / HTML).
  - **Visibility toggle** to publish/unpublish pages on the public site.
  - **Ordering controls** (move pages up/down within siblings) and expand/collapse for large trees.
  - Protected page slugs (e.g., `store`) cannot be deleted.
- **Rich text editor**
  - All `textarea` fields are edited with a rich text editor and stored as HTML (used for landing page rendering).
  - Supports **in-editor image uploads** via the admin upload API.

### Templates

- **Email Templates** (`/admin/pages-templates/email-templates`)
  - Create/edit template name, key (slug), subject, body, and active state.

### Product Catalog

- **Categories** (`/admin/product-catalog/categories`)
  - Tree-based category management (parent/child categories).
  - Edit slug, SEO fields, description/content, image URL, ordering, and visibility.
  - Ordering controls (move up/down within siblings) and expand/collapse tree UI.
- **Products** (`/admin/product-catalog/products`)
  - Full product CRUD including catalog identity (category, name, slug, vendor/SKU), pricing, specs, long-form description, and technical data.
  - **Gallery management** (add via URL, upload multiple images, reorder, remove).
  - Product form is grouped into sections (core details, pricing/visibility, specs, accessories, references, content).

### Literature Library

- **Folders** (`/admin/literature/folders`) with ordering and visibility.
- **Items** (`/admin/literature/item`) with folder assignment, summary/content, file URL, image URL, ordering, and visibility.

### Task Manager

- **Projects** (`/admin/task-manager/projects`) with slug, status/priority, due date, description, ordering, and visibility.
- **Tasks** (`/admin/task-manager/tasks`) with optional project relation, status/priority, assignee, due date, description, ordering, and visibility.

### Settings

- **Testimonials** (`/admin/settings/testimonial`) with author/role/quote/rating, ordering, and visibility.
- **Phrases** (`/admin/settings/phrase`) for key/value text with locale and visibility.
- **Defaults** (`/admin/settings/defaults`) for global key/value settings, grouped and described.

### Admin Users

- **Administrators** (`/admin/settings/administrators`)
  - Create/edit admin accounts (email, username, role, description).
  - Set/reset passwords (stored as salted hashes).
  - Enable/disable accounts via the active flag.

### Common Admin Capabilities (Across Modules)

- **List + create/edit/delete** for most resources (exceptions: fixed home blocks; protected pages).
- **Relation dropdowns** for linked models (e.g., parent page, parent category, product category, project, literature folder).
- **Quick visible/hidden toggles** from list views for boolean fields.
- **Generic admin API**
  - `GET /api/admin/[resource]` list
  - `POST /api/admin/[resource]` create (or update when `id` is provided)
  - `GET/PATCH/DELETE /api/admin/[resource]/[id]` item operations
  - `GET /api/admin/[resource]/options` relation option data
  - `POST /api/admin/upload-image` image upload (validated type/size), returns a public URL

## Repository Structure (Main)

- `app/` — Next.js routes (public + admin + API)
- `components/` — shared UI and admin building blocks (including a rich text editor)
- `lib/` — server utilities (database, auth, admin services)
- `prisma/` — Prisma schema and seed scripts
- `docs/` — additional internal documentation

## Core Data Models (Prisma)

- `Administrator` — admin accounts
- `HomeBlock` — configurable homepage blocks
- `PageStructure` — page tree, slugs, templates, SEO metadata, and content
- `Category`, `Product` — product catalog
- `LiteratureFolder`, `LiteratureItem` — documents / literature library
- `EmailTemplate` — email templates
- `Project`, `Task` — task manager
- `Testimonial` — testimonials
- `Phrase` — key/value phrases (localizable)
- `DefaultSetting` — global/default settings used by the public site

## Local Development

See `README.md` for setup. The seed data includes a default admin account (`admin@hardwoodliving.com`).
