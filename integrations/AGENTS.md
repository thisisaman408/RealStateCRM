# AGENTS.md — integrations/

---

## Tech

TypeScript · Self-contained workspace packages (`@resyl/int-*`) · ESM (`"type": "module"`) · Provider SDKs / REST APIs · Cryptographic utilities (HMAC webhook verification, AES-GCM token encryption).

---

## Purpose & Scope

`integrations/` contains all third-party external service adapters for Resyl. These packages isolate external API protocols, transport logic, error normalization, and payload formatting from the rest of the monorepo.

`apps/api` and `apps/workers` MUST always consume external services via these packages — never by making direct HTTP requests or inlining 3rd-party SDKs inside controllers or services.

---

## Package & Channel Inventory

```
integrations/
├── voice/              @resyl/int-voice
│   ├── agents/         8 AI voice agent adapters (vapi, retell, sarvam, bolna, elevenlabs, livekit, openai-realtime, pipecat)
│   ├── bridge/         carrier-bridge-dispatcher.ts (central PSTN carrier router)
│   └── telephony/      4 PSTN carrier adapters (vobiz, exotel, twilio, telnyx)
│
├── mail/               Email provider adapters (8 providers)
│   ├── aws-ses/        @resyl/int-mail-ses
│   ├── sendgrid/       @resyl/int-mail-sendgrid
│   ├── brevo/          @resyl/int-mail-brevo
│   ├── mailchimp/      @resyl/int-mail-mailchimp
│   ├── mailgun/        @resyl/int-mail-mailgun
│   ├── gmail/          @resyl/int-mail-gmail
│   ├── outlook/        @resyl/int-mail-outlook
│   └── constant-contact/ @resyl/int-mail-constant-contact
│
├── sms/                SMS gateway adapters (9 providers)
│   ├── twilio/         @resyl/int-sms-twilio
│   ├── gupshup/        @resyl/int-sms-gupshup
│   ├── sinch/          @resyl/int-sms-sinch
│   ├── aws-sns/        @resyl/int-sms-aws-sns
│   ├── bird/           @resyl/int-sms-bird
│   ├── infobip/        @resyl/int-sms-infobip
│   ├── plivo/          @resyl/int-sms-plivo
│   ├── telnyx/         @resyl/int-sms-telnyx
│   └── vonage/         @resyl/int-sms-vonage
│
├── whatsapp/           @resyl/int-whatsapp
│   └── src/
│       ├── meta-api.ts         Core Meta Cloud API client
│       ├── interactive.ts      Interactive message builders (buttons, lists, quick replies)
│       ├── webhook-sign.ts     X-Hub-Signature-256 HMAC verification
│       ├── ssrf-guard.ts       SSRF protection for media URLs
│       ├── encryption.ts       AES-GCM WABA credential encryption
│       ├── phone-utils.ts      E.164 normalization + retry phone variants
│       └── index.ts            Barrel export
│
└── ads/                Ad platform lead ingestion adapters
    ├── google/         @resyl/int-ads-google (Google Ads lead form webhook parser & auth)
    └── meta/           @resyl/int-ads-meta (Meta / Facebook / Instagram Lead Ads webhook parser)
```

---

## Integration Laws

1. **Zero Credential Hardcoding**:
   - Never embed tokens, API keys, client secrets, or webhook signing keys inside adapter code.
   - Adapters must receive credentials dynamically via configuration objects passed from the caller (`apps/api` or `apps/workers`) or read from root `/.env`.
2. **Adapter Purity (No Business Logic)**:
   - Adapters must only handle request preparation, HTTP transport, retries/timeouts, error normalization, and response parsing.
   - Never import database models or `@resyl/prisma` inside `integrations/`. Business logic belongs strictly in `apps/api` or `apps/workers`.
3. **No Direct External Calls from Apps**:
   - `apps/api` and `apps/workers` must NEVER make raw `fetch()` or `axios` calls to external providers. Always call typed functions exported from `@resyl/int-*`.
4. **Standard Adapter API Pattern**:
   - Delivery adapters must implement a consistent interface:
     - `send(payload, credentials)`: Transmit message/call and return normalized result.
     - `validateConfig(credentials)`: Check credentials validity.
     - `verifyWebhookSignature(headers, body, secret)`: Verify incoming authenticity.
5. **Carrier Bridge Contract (`@resyl/int-voice`)**:
   - Outbound voice calling is decoupled into Agent (AI brain) and Telephony (PSTN voice carrier).
   - Use `tryCarrierBridgeDispatch(phone, config)` to route phone calls to the appropriate carrier (Vobiz, Exotel, Twilio, Telnyx).
6. **Adding a New Provider**:
   - Create a sub-folder under the relevant channel (e.g. `integrations/mail/new-provider/`).
   - Add `package.json` with appropriate `@resyl/int-*` name.
   - Export standard functions and build cleanly with `pnpm --filter "@resyl/int-*" run build`.
7. **Testing Integrations**:
   - Run all integration unit tests via: `pnpm test:packages` (or `vitest run integrations`).
   - Integration tests live in `__tests__/` subdirectories within each adapter.
