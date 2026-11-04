import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_SLUGS = [
  'web-mobile-application-slot',
  'applied-ai-workflow-slot',
  'backend-api-integration-slot',
];

interface InquiryPayload {
  name?: string;
  email?: string;
  company?: string;
  projectType?: string;
  platform?: string;
  description?: string;
  budget?: string;
  timeline?: string;
  consent?: boolean;
}

export interface StoredInquiry {
  id: string;
  name: string;
  email: string;
  company: string;
  projectType: string;
  platform: string;
  description: string;
  budget: string;
  timeline: string;
  provider: string;
  submittedAt: string;
}

const INQUIRIES_FILE = path.join(__dirname, 'inquiries.json');

function loadInquiries(): StoredInquiry[] {
  try {
    if (fs.existsSync(INQUIRIES_FILE)) {
      const data = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.error('Failed to load inquiries from disk:', err);
  }
  return [];
}

let inquiriesStore: StoredInquiry[] = loadInquiries();

function saveInquiry(inquiry: StoredInquiry) {
  inquiriesStore.unshift(inquiry);
  if (inquiriesStore.length > 100) {
    inquiriesStore = inquiriesStore.slice(0, 100);
  }
  try {
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiriesStore, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to persist inquiry to disk:', err);
  }
}

function validateInquiryPayload(body: InquiryPayload) {
  const fieldErrors: Record<string, string> = {};

  if (!body.name || typeof body.name !== 'string' || body.name.trim().length < 2) {
    fieldErrors.name = 'Name or preferred contact name is required (minimum 2 characters).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!body.email || typeof body.email !== 'string' || !emailRegex.test(body.email.trim())) {
    fieldErrors.email = 'A valid email address is required.';
  }

  if (!body.projectType || typeof body.projectType !== 'string' || !body.projectType.trim()) {
    fieldErrors.projectType = 'Project type is required.';
  }

  if (!body.platform || typeof body.platform !== 'string' || !body.platform.trim()) {
    fieldErrors.platform = 'Target platform is required.';
  }

  if (
    !body.description ||
    typeof body.description !== 'string' ||
    body.description.trim().length < 10
  ) {
    fieldErrors.description = 'Project description must be at least 10 characters.';
  }

  if (!body.budget || typeof body.budget !== 'string' || !body.budget.trim()) {
    fieldErrors.budget = 'Estimated budget is required.';
  }

  if (!body.timeline || typeof body.timeline !== 'string' || !body.timeline.trim()) {
    fieldErrors.timeline = 'Desired timeline is required.';
  }

  if (body.consent !== true) {
    fieldErrors.consent = 'Consent to the privacy notice is required.';
  }

  return fieldErrors;
}

function cleanSender(val?: string | null): string {
  if (!val || typeof val !== 'string') return 'Nubix Inquiries <onboarding@resend.dev>';
  let s = val.replace(/^CONTACT_FROM_EMAIL\s*=\s*/i, '').trim();
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    s = s.slice(1, -1).trim();
  }
  return s || 'Nubix Inquiries <onboarding@resend.dev>';
}

function isValidHttpUrl(val?: string | null): boolean {
  if (!val || typeof val !== 'string') return false;
  const trimmed = val.trim();
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) return false;
  try {
    const url = new URL(trimmed);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '100kb' }));

  // Check delivery integration status
  app.get('/api/contact/status', (_req, res) => {
    const hasResend = Boolean(
      process.env.RESEND_API_KEY &&
        process.env.RESEND_API_KEY !== '' &&
        process.env.CONTACT_RECIPIENT_EMAIL &&
        process.env.CONTACT_RECIPIENT_EMAIL !== ''
    );
    const hasWebhook = isValidHttpUrl(process.env.CONTACT_WEBHOOK_URL);

    const provider = hasResend ? 'resend' : hasWebhook ? 'webhook' : 'studio-inbox';

    return res.json({
      configured: true,
      provider,
      totalInquiries: inquiriesStore.length,
    });
  });

  // Read received inquiries
  app.get('/api/contact/inquiries', (_req, res) => {
    return res.json({
      success: true,
      total: inquiriesStore.length,
      inquiries: inquiriesStore,
    });
  });

  // Project Inquiry Endpoint
  app.post('/api/contact', async (req, res) => {
    const payload: InquiryPayload = req.body || {};
    const fieldErrors = validateInquiryPayload(payload);

    if (Object.keys(fieldErrors).length > 0) {
      return res.status(400).json({
        confirmed: false,
        message: 'Please correct the highlighted fields and try again.',
        fieldErrors,
      });
    }

    const deliveryId = `NBX-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const sanitized: StoredInquiry = {
      id: deliveryId,
      name: payload.name!.trim(),
      email: payload.email!.trim(),
      company: payload.company ? String(payload.company).trim() : 'Not specified',
      projectType: payload.projectType!.trim(),
      platform: payload.platform!.trim(),
      description: payload.description!.trim(),
      budget: payload.budget!.trim(),
      timeline: payload.timeline!.trim(),
      provider: 'studio-inbox',
      submittedAt: new Date().toISOString(),
    };

    const resendKey = process.env.RESEND_API_KEY?.trim();
    const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL?.trim();
    const rawFromEmail = process.env.CONTACT_FROM_EMAIL?.trim();
    const fromEmail = cleanSender(rawFromEmail);
    const rawWebhookUrl = process.env.CONTACT_WEBHOOK_URL?.trim();
    const webhookUrl = isValidHttpUrl(rawWebhookUrl) ? rawWebhookUrl : undefined;

    let provider = 'studio-inbox';
    let externalSuccess = false;

    // 1. Dispatch via Resend if credentials are provided
    if (resendKey && recipientEmail) {
      try {
        const emailBody = [
          `New Project Inquiry submitted via Nubix Studio:`,
          ``,
          `Reference ID: ${deliveryId}`,
          `Name: ${sanitized.name}`,
          `Email: ${sanitized.email}`,
          `Company: ${sanitized.company}`,
          `Project Type: ${sanitized.projectType}`,
          `Platform: ${sanitized.platform}`,
          `Estimated Budget: ${sanitized.budget}`,
          `Desired Timeline: ${sanitized.timeline}`,
          `Submitted At: ${sanitized.submittedAt}`,
          ``,
          `Project Description:`,
          sanitized.description,
        ].join('\n');

        const sendViaResend = async (from: string, to: string) => {
          const resp = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${resendKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from,
              to: [to],
              reply_to: sanitized.email,
              subject: `[Nubix Inquiry] ${sanitized.projectType} — ${sanitized.name}`,
              text: emailBody,
            }),
          });
          const data = (await resp.json().catch(() => ({}))) as {
            id?: string;
            message?: string;
            name?: string;
            statusCode?: number;
          };
          return { ok: resp.ok, id: data.id, message: data.message, data };
        };

        // Attempt 1: with cleaned fromEmail and target recipient
        let resendResult = await sendViaResend(fromEmail, recipientEmail);

        // Fallback 1: If custom domain failed (e.g. unverified domain), retry with onboarding@resend.dev
        if (!resendResult.ok && fromEmail !== 'Nubix Inquiries <onboarding@resend.dev>') {
          resendResult = await sendViaResend('Nubix Inquiries <onboarding@resend.dev>', recipientEmail);
        }

        // Fallback 2: If Resend testing restriction enforces sending to the account owner email, extract and deliver
        if (
          !resendResult.ok &&
          resendResult.message &&
          resendResult.message.includes('only send testing emails to your own email address')
        ) {
          const ownerMatch = resendResult.message.match(
            /\(([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})\)/
          );
          if (ownerMatch && ownerMatch[1]) {
            resendResult = await sendViaResend('Nubix Inquiries <onboarding@resend.dev>', ownerMatch[1]);
          }
        }

        if (resendResult.ok && resendResult.id) {
          provider = 'resend';
          externalSuccess = true;
          console.log(`[Nubix] Inquiry ${deliveryId} delivered via Resend (${resendResult.id})`);
        } else {
          console.log(`[Nubix] Resend delivery notice: ${resendResult.message || 'Saved to studio inbox'}`);
        }
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        console.log(`[Nubix] Resend delivery notice: ${errorMsg}`);
      }
    }

    // 2. Dispatch via Webhook if valid URL is provided and not already delivered via email
    if (!externalSuccess && webhookUrl) {
      try {
        const webhookResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            source: 'Nubix Studio Inquiry Form',
            deliveryId,
            inquiry: sanitized,
          }),
        });

        if (webhookResponse.ok) {
          provider = 'webhook';
          externalSuccess = true;
          console.log(`[Nubix] Inquiry ${deliveryId} forwarded via Webhook`);
        } else {
          console.log(`[Nubix] Webhook returned status ${webhookResponse.status}`);
        }
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        console.log(`[Nubix] Webhook forwarding notice: ${errorMsg}`);
      }
    }

    sanitized.provider = provider;

    // 3. Always persist to studio storage so inquiries are reliably preserved
    saveInquiry(sanitized);

    console.log(
      `[Nubix Studio] New inquiry registered: ${deliveryId} from ${sanitized.name} (${sanitized.email})`
    );

    return res.status(200).json({
      confirmed: true,
      provider,
      deliveryId,
      inquiry: sanitized,
      message:
        provider === 'resend'
          ? 'Your inquiry has been confirmed and delivered to the Nubix studio inbox.'
          : provider === 'webhook'
          ? 'Your inquiry was confirmed by the configured webhook service.'
          : 'Your project inquiry was successfully received and logged into the Nubix Studio inbox. Our engineering team will review it within 24 hours.',
    });
  });

  // Cookieless pageview analytics
  app.post('/api/analytics/pageview', (_req, res) => {
    res.status(204).end();
  });

  // Dynamic robots.txt
  app.get('/robots.txt', (req, res) => {
    const configuredBaseUrl =
      process.env.APP_URL && process.env.APP_URL !== 'MY_APP_URL'
        ? process.env.APP_URL.replace(/\/$/, '')
        : `${req.protocol}://${req.get('host')}`;

    const lines = [
      'User-agent: *',
      'Allow: /',
      'Disallow: /api/',
      `Sitemap: ${configuredBaseUrl}/sitemap.xml`,
    ];
    res.type('text/plain').send(lines.join('\n'));
  });

  // Dynamic sitemap.xml
  app.get('/sitemap.xml', (req, res) => {
    const baseUrl =
      process.env.APP_URL && process.env.APP_URL !== 'MY_APP_URL'
        ? process.env.APP_URL.replace(/\/$/, '')
        : `${req.protocol}://${req.get('host')}`;

    const routes = [
      { path: '/', priority: '1.0' },
      { path: '/projects', priority: '0.9' },
      ...PROJECT_SLUGS.map((slug) => ({
        path: `/projects/${slug}`,
        priority: '0.8',
      })),
      { path: '/contact', priority: '0.9' },
    ];

    const xml = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...routes.map(
        (r) =>
          `  <url><loc>${baseUrl}${r.path}</loc><changefreq>weekly</changefreq><priority>${r.priority}</priority></url>`
      ),
      '</urlset>',
    ].join('\n');

    res.type('application/xml').send(xml);
  });

  // Vite middleware in dev or static serving in prod
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Nubix server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
