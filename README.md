# Blog Website (Frontend)

## Project Overview

- Utilized : TypeScript, Next.js, React, Supabase, tailwindCSS, Storybook,

---

## Reference Site

- [Design System](https://primer.style/components)
- [tailwindcss](https://tailwindcss.com/docs)
- [storybook](https://storybook.js.org/)
- [Google material Symbol](https://fonts.google.com/iconss)
- [Day.js](https://day.js.org/docs/en/installation/installation)
- [Scroll-lock](https://www.npmjs.com/package/scroll-lock)
- [Faker.js](https://fakerjs.dev/guide/)
- [Intersection Observer Docs](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [React Intersection Observer](https://www.npmjs.com/package/react-intersection-observer)
- [React Responsive Carousel](https://react-responsive-carousel.js.org/)
- [Lodash](https://lodash.com/docs/#throttle)
- [Toast UI](https://nhn.github.io/tui.editor/latest/)
- [React Virtuoso](https://virtuoso.dev/)
- [Supabase Auth](https://supabase.com/docs/guides/auth/managing-user-data)

---

## Start

```
yarn install
```

```
yarn dev
```

- **storybook start**:

```
yarn storybook
```

---

## Milestones

- M1 : App Basic Functionality Development
- M2 : Bug Fixes and Updates

---

## Task List

### Milestone 1 : App Basic Functionality Development

**Task 1. Common Layout**

- **Issues** : [task-1-layout](https://github.com/ld5ehom/blog-web/tree/task-1-layout)
- **Details** :
    - **Built the blog page layout by implementing Header and Footer and applying Sidebar and Dynamic Routes with the React Icons library.** [55ce929](https://github.com/ld5ehom/blog-web/commit/55ce929d0476717797d3be0f08b09cd257589d89)

**Task 2. Post Writing and Detail Pages**

- **Issues** : [task-2-detail](https://github.com/ld5ehom/blog-web/tree/task-2-detail)
- **Details** :
    - **Post Creation & Detail Page with Tagging and Markdown Rendering** [5e9553b](https://github.com/ld5ehom/blog-web/commit/5e9553bc53460793012ca0d30614b0a7f9ad1e72)
        - Implemented the UI for both the post creation and detailed post pages.
        - Integrated React Select for the multi-select tag functionality, enabling users to select tags for their posts.
        - Implemented a Markdown editor and rendered the content using Markdown syntax for a rich text experience.

**Task 3. Post List Page**

- **Issues** : [task-3-list](https://github.com/ld5ehom/blog-web/tree/task-3-list)
- **Details** :
    - **Implemented post list and PostCard using React Query and added infinite scroll functionality with react-intersection-observer.** [605e1db](https://github.com/ld5ehom/blog-web/commit/605e1db3e6b6c0f97e8b219b77f54bea7eaf0f34)
        ```
        yarn add @tanstack/react-query
        ```
        ```
        yarn add react-intersection-observer
        ```

**Task 4. Blog Features**

- **Issues** : [task-4-features](https://github.com/ld5ehom/blog-web/tree/task-4-features)
- **Details** :
    - **Implemented Blog Functionality with Authentication and Sidebar Features** [a9bd129](https://github.com/ld5ehom/blog-web/commit/a9bd129cc40d2304d76bc8ee4f91682cc14ea04d)
    - **Implemented Button Component and utils/hooks**

---

### Milestone 2: Bug Fixes and Updates
