# Conversion event schema

Circle Wave exposes a small, provider-neutral event API in `lib/analytics.ts`.
No analytics provider is installed, configured, or contacted by default.

## Privacy rules

- Never include names, email addresses, phone numbers, free-form form values,
  résumé details, URLs containing user data, or persistent user identifiers.
- Event properties must come from the fixed values in the TypeScript event
  union.
- Browser `Do Not Track` is respected. Events are suppressed when it is set.
- Provider failures cannot interrupt navigation or form submission.
- Provider selection must include a separate review of consent, retention,
  access, data residency, and deletion requirements.

## Events

| Event | Properties | Trigger |
| --- | --- | --- |
| `cta_clicked` | `audience`, `placement`, `action` | Employer or candidate conversion CTA |
| `consultation_cta_clicked` | `placement`, `destination` | Booking CTA or its contact fallback |
| `employer_brief_started` | `placement` | First focus within the hiring brief |
| `employer_brief_submitted` | `placement` | Confirmed successful server response |
| `form_error` | `form`, `stage` | Employer brief submission error |

## Future provider integration

After a provider and privacy requirements are approved, create a client adapter
whose `track` method accepts the typed event object, then call
`configureAnalytics(adapter)` once in an appropriate client-side integration
boundary. Keep provider-specific identifiers and enrichment outside the form
payloads and this event schema.
