# n8n import for workflow Vi8LELQs076uE7jD

`Vi8LELQs076uE7jD-import.json` is the Supabase-driven Finisher (dispatcher + worker in one workflow) with YOUR keys already filled in.

Import it INTO the existing workflow so the ID stays the same:
1. Open https://n8n.srv1202488.hstgr.cloud/workflow/Vi8LELQs076uE7jD
2. Top-right menu (…) → Import from File → pick this JSON → Save.
3. Unpublish the temporary workflow "DM Finisher (Supabase ⇄ n8n)" (qQF8ZwNPGXNAgbku) — two active workflows cannot share the same webhook paths.
4. Publish Vi8LELQs076uE7jD.

Nothing else changes: same Supabase project, same secret, same webhook paths.
