# System Architecture

This directory contains the technical architecture and data modeling documentation for Nook.

## Documents

- [`database-model.md`](database-model.md) — database entities, relationships, constraints, indexes, and data protection rules.
- `system-architecture.md` — application architecture, components, technology stack, and communication patterns.

## Architecture Overview

Nook follows a modular monolith approach for the initial MVP, with clearly separated application domains.

The planned stack includes:

- **Frontend:** React and TypeScript.
- **Backend:** Node.js and NestJS.
- **Database:** PostgreSQL.
- **ORM:** Prisma.
- **Real-time communication:** Socket.IO.
- **Voice and screen sharing:** WebRTC, subject to infrastructure validation.

## Maintenance

Architecture decisions must remain consistent with the system requirements, business rules, database model, and MVP implementation plan.

Changes to the architecture should be documented when they affect security, data integrity, system boundaries, or implementation strategy.
