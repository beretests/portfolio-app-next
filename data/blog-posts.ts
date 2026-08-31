import type { BlogPost } from "@/lib/blog";

export const curatedBlogPosts: BlogPost[] = [

  {
    slug: "connecting-existing-accounts-without-exposing-account-state",
    title: "Connecting existing accounts without exposing account state",
    description:
      "How I extended a family invitation workflow to support existing accounts while preserving credentials, preventing account enumeration and enforcing access rules at the database boundary.",
    tag: "Application Security",
    date: "2026-08-31",
    body: `Adding an email invitation sounds like a small product feature. It becomes a security design problem when the same address might belong to a new user, an existing user or someone who already belongs to another family.

I encountered that boundary while extending a family-management application. Parents could already create a child profile and invite a new email address to claim it. The next requirement was to let an existing app account connect to that profile without resetting its password, changing its sign-in methods or creating a duplicate family member.

This field note describes the design decisions behind that workflow. Real email addresses, invitation values, environment details and organization-specific identifiers are intentionally omitted.

## Start with the privacy question

A straightforward implementation could check whether an email exists and tell the parent which path will be used. That would also turn the form into an account-discovery endpoint.

The parent-facing response therefore stays neutral:

\`\`\`ts
const connectionSuccess =
  "If this email can be connected, a secure link has been sent.";
\`\`\`

The browser does not learn whether the address is registered. Exact-email account lookup happens only on the server through an administrative client, and the lookup operation is unavailable to anonymous or ordinary authenticated database roles.

Neutral messaging is only one layer. The authorization rules still have to reject invalid requests, but they do so without exposing unnecessary account state to the person initiating the invitation.

## Separate new-account and existing-account paths

The two account modes need different authentication behaviour:

- A new address receives an invitation and creates credentials during acceptance.
- An existing account receives a passwordless sign-in link and keeps its current credentials.

For the existing-account path, the important option is \`shouldCreateUser: false\`:

\`\`\`ts
await auth.signInWithOtp({
  email,
  options: {
    emailRedirectTo: redirectTo,
    shouldCreateUser: false,
  },
});
\`\`\`

Without that constraint, a fallback intended only for existing users could silently create a new authentication record. The option turns the desired product rule into an explicit technical boundary.

The acceptance screen is mode-aware. Password inputs appear only for new accounts. Existing users see a clear explanation that their password and sign-in methods will not change.

## Put the final rule at the database boundary

Client checks improve the experience, but they cannot be the authority for a relationship-changing operation.

Invitation acceptance is handled atomically on the server. Before attaching the authenticated profile to the child record, the operation verifies that:

- the invitation is still pending and has not expired;
- the signed-in account matches the invited email exactly;
- the target child profile is still eligible to be connected; and
- the account does not already have active family access.

An occupied account is rejected instead of being silently merged across family contexts. That keeps the initial product model understandable: one active family context per authenticated account.

The privileged lookup and acceptance operations are explicitly restricted to the service role. Browser roles cannot call them directly, even if someone discovers their names or signatures.

## Minimize retained invitation data

Once an invitation is accepted, its normalized email is scrubbed from the invitation record. Audit information records the workflow outcome and relevant internal record references, but not raw authentication links or bearer tokens.

This distinction matters. Operational history is useful; retaining reusable authentication material is not.

A related improvement allows an authorized parent to copy a generated invitation link when email delivery is unreliable. The raw URL is returned only in the action response and is never stored in application logs, invitation rows or audit metadata.

## Test the boundaries that matter

The workflow is covered at several levels:

- component tests verify the correct password or passwordless interface;
- browser tests exercise new-account linking, existing-account linking and credential preservation;
- rejection coverage verifies that an account with active family access cannot be attached elsewhere; and
- SQL verification checks role grants, safe defaults, exact-email matching, expiry, revocation and atomic acceptance.

The credential-preservation test signs in again with the account's existing password after the family connection succeeds. That verifies the user-facing promise rather than only checking that a database row changed.

## What I would carry into the next authentication feature

Three principles generalize beyond family invitations:

1. **Do not expose account existence unless the product genuinely requires it.** Neutral responses and server-only lookup reduce enumeration risk.
2. **Encode negative requirements explicitly.** If a flow must never create a user, configure the provider to enforce that rule.
3. **Authorize relationship changes at the database boundary.** UI checks are helpful, but atomic server-side rules decide whether the change is valid.

The result is an invitation flow that supports more real-world account states without weakening privacy or surprising existing users.`,
  },
  {
    slug: "allocating-lump-sum-loan-payments-without-losing-a-cent",
    title: "Splitting a lump-sum loan payment without losing a cent",
    description:
      "Designing a predictable allocation algorithm that distributes one payment across multiple loans, reconciles rounding and directs any surplus toward principal.",
    tag: "Product Engineering",
    date: "2026-08-31",
    body: `A single payment can represent several different financial actions. In a loan-tracking application, one lump sum may need to cover the scheduled amount on multiple loans and then apply the remaining money as an extra principal payment.

The form is the easy part. The harder problem is making the allocation predictable, ensuring the stored rows add back to the original amount and keeping the preview consistent with what is eventually saved.

This field note describes the domain logic behind that feature. It uses generalized examples and contains no real balances, lender information, account details or database identifiers.

## Define the business rule before the algorithm

The allocation follows four rules:

1. The user selects one or more editable loans.
2. The payment first covers each selected loan's scheduled monthly amount.
3. If the payment is smaller than the combined schedule, it is split proportionally.
4. If the payment is larger, the remainder becomes an extra principal payment on a loan chosen by the user.

That definition removes an important ambiguity. A surplus is not distributed accidentally across every loan; it has one explicit principal target.

## Calculate in cents

Currency allocation should not depend on repeated floating-point arithmetic. Inputs and scheduled amounts are converted to integer cents before the split:

\`\`\`js
function toCents(value) {
  const amount = Number(value);
  if (!Number.isFinite(amount)) return NaN;
  return Math.round(amount * 100);
}
\`\`\`

The function rejects non-positive totals and invalid scheduled payments before constructing any database rows. Duplicate loan identifiers are also removed so the same obligation cannot receive two allocations because of repeated input.

The browser restricts input to two decimal places, while the allocation function performs its own validation instead of trusting the form.

## Handle a short payment fairly

Suppose the selected loans have different monthly obligations and the available payment cannot cover all of them. Giving every loan the same amount would ignore those differences.

The algorithm calculates each loan's proportional share of the available regular-payment budget. Each exact share may contain a fraction of a cent, so the initial allocation is rounded down.

Rounding down creates a small remainder. Those cents are distributed in descending order of fractional remainder:

\`\`\`js
let centsLeft =
  regularBudgetCents -
  allocations.reduce(
    (sum, loan) => sum + loan.allocatedCents,
    0,
  );

for (let index = 0; centsLeft > 0; index += 1, centsLeft -= 1) {
  remainderOrder[index % remainderOrder.length].allocatedCents += 1;
}
\`\`\`

This is a largest-remainder allocation. It ensures that the final cent values reconcile exactly to the payment while staying as close as possible to the proportional result.

## Model regular and extra payments separately

When the total exceeds the combined monthly obligations, the regular allocations are created first. The surplus is then represented as a separate extra-payment event for the selected target loan.

That distinction feeds the rest of the application:

- regular payments participate in scheduled-payment status;
- extra payments reduce principal;
- actual history can explain what happened; and
- forecasts can include recorded principal reductions when estimating payoff.

Keeping the event types separate avoids hiding principal-only behaviour inside an ordinary monthly payment.

## Use one function for preview and persistence

The allocation logic is a pure function. The form calls it to produce a live payment preview, and the save handler calls the same function again before inserting the resulting rows.

This prevents a common UI failure: showing one calculation to the user but reproducing the logic differently when saving.

The preview lists every regular allocation, identifies the extra-payment target and confirms the total. If the inputs do not form a valid allocation, no preview is shown and the submission returns a specific validation message.

## Revalidate ownership before writing

A list displayed in the browser is not an authorization boundary. Immediately before saving, the selected identifiers are matched against loans owned by the signed-in user.

If the validated set does not contain every submitted identifier, the operation stops. Database row-level security remains the final protection, while the server-side check provides a clearer application error and prevents invalid rows from being prepared.

The allocations are inserted together so the payment is not intentionally saved as a collection of unrelated form submissions.

## Hardening cases

The most valuable automated tests for this function are table-driven examples covering:

- a payment equal to the scheduled total;
- a payment smaller than the total;
- fractional-cent remainders;
- a payment with an extra-principal remainder;
- duplicate selections;
- zero or invalid scheduled amounts; and
- a submitted loan that the current user cannot edit.

The allocation function was kept independent of React and the database specifically so these cases can be exercised without rendering the application.

## What I would carry into the next financial feature

Three decisions made the feature easier to reason about:

1. **Represent money in the smallest unit during allocation.**
2. **Keep the business rule in one pure function used by both preview and save.**
3. **Represent meaning in the data model.** A regular payment and an extra principal payment may occur together, but they are not the same event.

The broader lesson is that small financial features deserve explicit rules. A few cents of unexplained drift can undermine trust in the entire product.`,
  },
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
