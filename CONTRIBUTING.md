# Development workflow

Never push directly to main for large changes.

For any new feature or significant update:

1. git checkout -b feature/your-feature-name
2. Make changes and commit
3. git push origin feature/your-feature-name
4. Vercel will auto-create a preview URL — test there first
5. Only merge to main once the preview is confirmed working

For small fixes (typos, copy, colors): push directly to main is fine.
For anything touching Supabase queries, new pages, or new dependencies: always use a branch.
