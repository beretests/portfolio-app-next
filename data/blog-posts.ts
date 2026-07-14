import type { BlogPost } from "@/lib/blog";

export const curatedBlogPosts: BlogPost[] = [
  {
    slug: "resilient-event-driven-key-vault-credential-rotation",
    title: "Designing resilient event-driven credential rotation with Azure Key Vault",
    description:
      "A practical architecture for rotating Entra application secrets and certificates with Event Grid, Azure Functions, managed identity and a reconciliation safety net.",
    tag: "Azure Architecture",
    date: "2026-07-14",
    body: `Credential rotation looks straightforward until it has to run unattended. A reliable design must handle duplicate events, partial failures, delayed cleanup, missed deliveries and the operational question that always follows automation: **how will we know when it fails?**

This case study describes the architecture I used for an event-driven Azure Functions solution that rotates Microsoft Entra application secrets and synchronizes new Key Vault certificate versions to application registrations. Organization-specific identifiers, configuration and source code are intentionally omitted.

## The problem to solve

Application credentials eventually expire. Manual rotation creates recurring operational work and a real risk of outages when ownership is unclear or a handoff is missed.

The solution needed to:

- react to Key Vault lifecycle events quickly;
- update the matching Entra application through Microsoft Graph;
- preserve a configurable overlap window before removing the old credential;
- process retries and duplicate events safely;
- recover if Event Grid delivery is missed; and
- leave a useful audit trail for operators.

The certificate path has an important boundary: Key Vault or its certificate issuer creates the new certificate version. The function then publishes that new public certificate to the Entra application registration. It does not act as the certificate authority.

## Architecture at a glance

The primary path is event driven:

1. **Azure Key Vault** emits a near-expiry secret event or a new certificate-version event.
2. **Azure Event Grid** filters and delivers the event to an HTTP-triggered PowerShell Azure Function.
3. **The rotation function** acquires a short-lived lock in Table Storage, validates the event and reads the current state.
4. **Microsoft Graph** receives the new password credential or public certificate.
5. **Key Vault** stores the new secret value when the secret path is used.
6. **Table Storage** records the run, idempotency state and delayed-removal work.
7. **A timer-triggered reconciliation function** periodically scans for work that the event-driven path may have missed.

Managed identity is the trust boundary between the function and Azure services. No deployment-time secret is needed for the function to call Key Vault, Microsoft Graph or Table Storage.

## Design for duplicate delivery, not perfect delivery

Event Grid uses at-least-once delivery, so the same event can arrive more than once. Treating every delivery as new work could create multiple credentials and make cleanup unsafe.

I used two complementary controls:

- an **idempotency window** that recognizes recently processed events; and
- a **per-application, per-credential-kind lock** stored in Table Storage.

The idempotency record answers “did this work already complete?” while the lock answers “is another worker doing it now?” Both are required because concurrent duplicates can arrive before the first run has written its final state.

The lock has an expiry so an interrupted run cannot block rotation forever. Run records use explicit states—such as pending removal, skipped as duplicate, locked, failed and old credential removed—so operators can understand what happened without reconstructing it from raw logs.

## Make secret rotation compensating

The secret path spans two systems. Microsoft Graph creates a new application password and returns the secret text once; Key Vault then stores that value as a new secret version.

That creates a dangerous partial-failure case:

1. Graph successfully creates the password.
2. The Key Vault write fails.
3. The application now has a credential that no workload can retrieve.

The function handles this with a compensating action: if the Key Vault write fails after Graph succeeds, it attempts to remove the newly created password credential and records the failure. Compensation cannot make distributed work truly atomic, but it prevents the most common orphaned-credential outcome and makes any remaining inconsistency visible.

## Use overlap instead of immediate replacement

Immediately deleting the previous credential assumes every consumer reloads configuration at the exact moment rotation completes. That is rarely a safe assumption.

The design keeps the previous credential for a configurable grace period. A later cleanup pass removes it only when the replacement is active and the overlap window has elapsed. This separates **rotation** from **retirement** and gives dependent workloads time to pick up the new value.

The same principle applies to certificates. The new public certificate is added to the application registration first; the old key credential remains during the overlap period and is removed later.

## Reconciliation is part of the architecture

Retries and dead-lettering improve delivery, but they do not prove that every required rotation occurred. A timer-triggered function runs every six hours as a repair path.

It scans the configured vaults and looks for conditions such as:

- a secret approaching expiry;
- a current Key Vault certificate that is missing from the Entra application;
- an expired application credential that has an active replacement; or
- delayed-removal work whose grace period has completed.

Instead of building a second rotation engine, reconciliation creates an event-shaped work item and sends it through the same handler. Reusing the primary workflow keeps locking, validation, audit and failure behaviour consistent.

The scan is capped per run. That protects Microsoft Graph and the Function App from an unexpected burst while allowing remaining work to continue during the next schedule.

## Operability is a feature

Automation without diagnostics simply moves manual work into a harder-to-see place. The solution therefore includes:

- structured run and audit records in Table Storage;
- Event Grid retries and a dead-letter Blob Storage destination;
- alerts for delivery failure, dropped events and dead-letter activity;
- best-effort Teams Workflow notifications using Adaptive Cards;
- retention cleanup for old operational records; and
- bounded exponential retry for transient Microsoft Graph responses.

Notifications are deliberately best effort. A Teams outage should not turn a successful credential rotation into a failed rotation, so notification results are recorded separately from the core outcome.

## Deployment and least privilege

An Azure Pipelines workflow validates PowerShell, performs deployment preflight checks, packages required modules and deploys the Function App. Pull requests run validation without deploying.

The Function App uses a managed identity with only the required Key Vault, storage and Microsoft Graph permissions. For the Graph operations in this design, the managed identity is also assigned as an owner of the target application registrations. That narrows the set of applications the automation can change.

## What I would carry into the next design

Three principles matter beyond credential rotation:

1. **Assume events are duplicated and occasionally missed.** Build idempotency, locking and reconciliation from the start.
2. **Model partial failure explicitly.** When one system succeeds and the next fails, define the compensating action and the audit state.
3. **Separate activation from retirement.** A controlled overlap window is safer than pretending every dependent service changes instantly.

The full anonymized implementation is also represented in my [Event-Driven Azure Key Vault Credential Rotation case study](/projects/event-driven-key-vault-credential-rotation).`,
  },
];

export const getCuratedPostBySlug = (slug: string) =>
  curatedBlogPosts.find((post) => post.slug === slug);
