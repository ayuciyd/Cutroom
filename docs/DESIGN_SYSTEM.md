# Cutroom — Design System

Source of truth is the Figma file "Film Collaboration". Name: **Cutroom**. Light, clean, professional with dark ink sections.

## Colour tokens
| Token | Hex | Use |
|---|---|---|
| ink | #0B0F14 | Text, dark hero/footer/banner |
| primary (cinema teal) | #0F766E | Primary buttons, links, active nav, focus ring |
| primary-hover | #0B5F58 | Hover state |
| accent (brass) | #D9A441 | Secondary CTA, badges, highlights |
| paper | #F7F4EE | Page background |
| surface | #FFFFFF | Cards, modals, inputs |
| mist | #D8D4CA | Borders, dividers, muted text |
| danger (ember) | #E4572E | Errors, destructive |
| success | #2E7D5B | Accepted, done |

Define as CSS variables in `src/index.css` and map in `tailwind.config.js` (`colors.ink`, `colors.primary`, etc.). Never hardcode hex in components.

## Typography
- Headings: Space Grotesk (600/700). Body: Inter (400/500/600).
- Scale: H1 44/52, H2 32/40, H3 24/32, Body 16/24, Small 14/20, Caption 12/16.

## Spacing and shape
8px grid. Radius: 8 (inputs, buttons), 12 (cards), 999 (pills). Shadow: soft, `0 1px 3px rgba(11,15,20,.08)`.

## Components (build with shadcn/ui, restyled with tokens)
Button (primary, secondary brass, outline, ghost, destructive), Input, Textarea, Select, Tag/Badge, Card (project, talent, stat), Avatar, Tabs, Dialog, Sheet (mobile bottom sheet), Toast, Skeleton, Empty state, Kanban column, Sidebar, Topbar, Bottom tab bar.

## Layout rules
- Desktop: left sidebar (240px) + content max-width 1200px. Mobile (<768px): top app bar + bottom tab bar (Home, Browse, Create, Projects, Profile), no sidebar.
- Touch targets at least 44px on mobile. Single column on mobile, tables become stacked cards.
- Every list has loading (skeleton), empty and error states.
