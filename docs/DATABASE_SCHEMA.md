# Cutroom — MongoDB Schema (Mongoose)

All collections have `createdAt`, `updatedAt` (timestamps: true).

## users
```
firebaseUid   String, unique, required
email         String, unique, required
name          String, required
role          String enum [creator, actor, crew, writer, investor, equipment_provider, distributor, admin]
headline      String
bio           String
location      String
avatarUrl     String
skills        [String]
experience    [{ title, company, year, description }]
portfolio     [{ title, type (image|video|link), url, thumbnailUrl }]
available     Boolean default true
```

## projects
```
owner         ObjectId -> users, required
title         String, required
logline       String
description   String
genre         String (drama, thriller, comedy, documentary, ...)
stage         String enum [development, pre-production, production, post-production]
budgetRange   String
location      String
coverUrl      String
status        String enum [draft, published, completed] default draft
roles         [{ _id, title, type (actor|crew), count, description, filled }]
members       [{ user: ObjectId -> users, roleTitle }]
```
Indexes: `{ status: 1, genre: 1 }`, text index on `title, logline`.

## applications
```
project       ObjectId -> projects
roleId        ObjectId (the embedded role)
applicant     ObjectId -> users
type          String enum [application, invitation] default application
message       String
status        String enum [pending, accepted, rejected, withdrawn] default pending
```
Unique index `{ project, roleId, applicant }`. On accept: push to `projects.members`, increment `roles.filled`.

## tasks
```
project       ObjectId -> projects
title         String, required
description   String
status        String enum [todo, in_progress, done] default todo
assignee      ObjectId -> users
dueDate       Date
createdBy     ObjectId -> users
```

## Seed data
`server/src/seed/seed.js` creates: 1 creator, 4 actors/crew with portfolios, 5 published projects with roles, 3 applications, 6 tasks. Used for the demo.
