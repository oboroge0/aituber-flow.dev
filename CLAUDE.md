# aituber-flow.dev Development Guide

## Project Overview

Official website for AITuberFlow - a visual workflow editor for AI VTuber streaming.

**Domain**: aituber-flow.dev (Cloudflare)
**Related Project**: [AITuberFlow](https://github.com/AITuberFlow/AITuberFlow)

## Architecture

```
aituber-flow.dev          → 公式サイト・コミュニティ（このリポ）
app.aituber-flow.dev      → エディタ本体（AITuberFlow リポをデプロイ）
```

## Tech Stack

| 項目 | 選択 | 理由 |
|------|------|------|
| **Framework** | Astro | 静的ページ高速、必要な所だけReact使える |
| **Styling** | Tailwind CSS | AITuberFlow本体と統一 |
| **Auth** | Supabase Auth | GitHub/Discord OAuth 対応 |
| **Database** | Supabase | PostgreSQL + Storage + Auth 全部入り |
| **Hosting** | Cloudflare Pages | ドメイン管理と統一 |

## Development Phases

### Phase 1: Landing Page (Current)
- [ ] ランディングページ（製品紹介、特徴、スクショ）
- [ ] 「Try Demo」ボタン → `app.aituber-flow.dev` へ
- [ ] GitHub / Discord リンク
- [ ] ドキュメントへの導線

### Phase 2: Community & Auth
- [ ] GitHub/Discord OAuth
- [ ] ユーザープロフィール
- [ ] ワークフロー共有（JSON保存・公開）

### Phase 3: Marketplace
- [ ] プラグインレジストリ
- [ ] いいね・ダウンロード数
- [ ] レビューシステム

## Project Structure (Planned)

```
aituber-flow.dev/
├── src/
│   ├── pages/          # Astro pages
│   ├── components/     # UI components (Astro + React)
│   ├── layouts/        # Page layouts
│   └── lib/            # Utilities, API clients
├── public/             # Static assets
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## Commands

```bash
# Development
bun dev

# Build
bun run build

# Preview production build
bun run preview
```

## Design Direction

- ダークテーマベース（VTuber/ストリーミング界隈向け）
- ネオンやグラデーションのアクセント
- モダンでクリーンなデザイン
- インタラクティブな要素

## Related Links

- Main App: https://github.com/and-and-and/AITuberFlow
- Domain: aituber-flow.dev (Cloudflare)
