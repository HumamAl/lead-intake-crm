Hi Adam,

I built a working demo of your lead intake and automation system to show you exactly how I'd approach this:

**Live Demo: https://lead-intake-crm.vercel.app

The demo includes a public-facing lead intake form (/intake) that captures submissions and feeds them into a full CRM dashboard with real-time stats, lead scoring, and conversion funnel tracking. Your team can view and manage incoming leads in a sortable/filterable table, update statuses through a pipeline (New → Contacted → Qualified → Proposal → Won), and add internal notes on each lead. I've also built out the automation rules engine where you can configure triggers like auto-qualifying high-budget leads, sending welcome emails on submission, round-robin assignment, and follow-up reminders — all with enable/disable toggles.

My approach focuses on building clean, maintainable systems where the business logic layer is clearly separated from the UI, making it straightforward to wire in real email services (SendGrid, Resend), Slack webhooks, and a production database when we move to the full build.

Happy to jump on a quick call to walk through the architecture and discuss your specific workflow requirements.

Best,
Humam
