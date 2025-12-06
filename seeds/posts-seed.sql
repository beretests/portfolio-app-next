-- Seed the public.posts table with markdown-friendly blog content.
-- Run this in Supabase SQL editor or psql.

create table if not exists public.posts (
  slug text primary key,
  title text not null,
  description text not null,
  tag text not null,
  image text not null,
  date date not null,
  body text not null
);

insert into public.posts (slug, title, description, tag, image, date, body)
values
('cutting-edge-tools',
 'Revolutionizing software development with cutting-edge tools',
 'Workflow automation, dependable testing, and observability are converging.',
 'Engineering',
 'https://picsum.photos/800/450?random=11',
 '2024-07-14',
 $$Shipping fast and safely is about pipelines, not single tools.

### What I include
- **Contract tests** at service boundaries
- **Feature flags** for controlled rollouts
- **Tracing** to validate prod behavior

```ts
// example contract test shape
type Widget = { id: string; name: string };
expect(fetchWidget("123")).toMatchObject<Widget>({ id: "123" });
```

![Observability](https://picsum.photos/1200/400?random=201)

Read more on [Honeycomb](https://www.honeycomb.io/blog/) and [OpenTelemetry](https://opentelemetry.io/).$$
),
('shipping-lean',
 'Shipping lean: feature flags, feedback loops, and fast rollbacks',
 'Lessons learned from iterative delivery and de-risking bold changes.',
 'Product',
 'https://picsum.photos/800/450?random=12',
 '2024-06-02',
 $$Lean shipping hinges on feedback loops.

1. Ship behind flags.
2. Watch key metrics.
3. Keep rollback trivial.

```bash
# sample rollout guard
if [ "$ERROR_RATE" -gt 1 ]; then
  echo "Rolling back..."
  ./rollback.sh
fi
```

Helpful links: [GrowthBook](https://www.growthbook.io/), [LaunchDarkly](https://launchdarkly.com/).$$
),
('resilient-accessible-design',
 'Designing for resilience and accessibility',
 'High contrast, calm animation, and predictable states make interfaces usable.',
 'Design',
 'https://picsum.photos/800/450?random=13',
 '2024-05-18',
 $$Accessibility and resilience are linked—predictable states reduce cognitive load.

- Prefer **high contrast** and visible focus.
- Keep animations subtle and reduce on `prefers-reduced-motion`.

```css
:focus-visible { outline: 2px solid var(--primary); }
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms; transition-duration: 0.01ms; }
}
```

![Focus styles](https://picsum.photos/800/320?random=202)

More: [WAI tutorials](https://www.w3.org/WAI/tutorials/).$$
),
('performance-testing-in-ci',
 'Performance testing in CI without slowing teams down',
 'Using k6 and budgets to catch regressions early.',
 'Engineering',
 'https://picsum.photos/800/450?random=14',
 '2024-04-30',
 $$Start light: budget checks on core flows in CI; heavier suites nightly.

```js
import http from 'k6/http';
import { sleep } from 'k6';

export let options = { thresholds: { http_req_duration: ['p(95)<500'] } };

export default function () {
  http.get('https://example.com/');
  sleep(1);
}
```

Dashboards: [Grafana](https://grafana.com/), [k6 Cloud](https://k6.io/cloud/).$$
)
on conflict (slug) do update
set title = excluded.title,
    description = excluded.description,
    tag = excluded.tag,
    image = excluded.image,
    date = excluded.date,
    body = excluded.body;
