# India Eats Project — Agent & Team Configuration

## Enabled
- ✅ All agent types (general-purpose, explorer, planner, researcher, architect)
- ✅ Multiagent (5 concurrent, parallel coordination, full communication)
- ✅ Teams agent (collaborative workflows)

## What You Have

**`superpowers/` contains:**
- `skills/` — 14 reusable skills (planning, debugging, code review, git, etc.)
- `agents/` — Agent definitions
- `commands/` — Slash command definitions
- `hooks/` — Automation hooks for custom workflows

## Available Skills

- `brainstorming` — Idea generation
- `systematic-debugging` — Root cause analysis
- `dispatching-parallel-agents` — Multiagent coordination
- `requesting-code-review` — PR preparation
- `receiving-code-review` — Review response
- `subagent-driven-development` — Delegating to specialized agents
- `test-driven-development` — TDD workflow
- `writing-plans` — Architecture & implementation planning
- `writing-skills` — Creating custom skills
- `executing-plans` — Following implementation plans
- `finishing-a-development-branch` — PR/merge workflow
- `using-git-worktrees` — Git worktree patterns
- `verification-before-completion` — QA before shipping
- `using-superpowers` — How to use superpowers itself

## Use & Customize

1. **Use skills as-is** — They're ready to go
2. **Create custom agents** in `agents/` for your domain
3. **Add hooks** in `settings.json` for automation
4. **Extend commands** in `commands/` as needed

---

No bloat, just skills, agents, and commands. 🚀
