# Nook — MVP Scope

This document defines the scope of the initial Minimum Viable Product (MVP) of Nook.

It identifies the features included in the first release, the features excluded from the initial release, and the principles used to control scope during development.

## 1. MVP Objective

The goal of the Nook MVP is to deliver a functional, desktop-first collaborative workspace where users can organize their work, communicate with others, and discover communities in a single platform.

The MVP should validate the core product experience before investing in advanced features and large-scale infrastructure.

## 2. Target Users

The initial target users are:

- Developers who want a customizable productivity workspace.
- Small teams that need a shared digital environment.
- Users who want lightweight collaboration and communication tools.
- People interested in discovering and participating in communities.

## 3. Features Included in the MVP

### 3.1 Authentication and Accounts

- Email-based authentication.
- GitHub OAuth authentication.
- User profile and basic preferences.
- Account deletion flow.
- Secure session management.

### 3.2 Personal Workspaces

- Multiple personal workspaces per user.
- Cloud persistence of workspace configuration.
- Widget organization and reordering.
- Private workspaces by default.
- Explicit, temporary sharing with configurable permissions.

### 3.3 Productivity Widgets

- Pomodoro timer.
- Quick notes.
- Task lists.
- Shortcuts.
- Simple clock and calendar.

Widgets will support reordering, but free resizing is outside the initial scope.

### 3.4 Collaboration

- Private group rooms.
- Room membership and invitations.
- Voice calls.
- Screen sharing with explicit user action and visible sharing status.
- Real-time presence states: Available, Focus, Away, Busy, and Invisible.

### 3.5 Public Communities

- Community discovery.
- Community creation.
- Open or approval-based membership.
- Owner, administrator, moderator, and member roles.
- Join requests where applicable.
- Reporting, blocking, and moderation capabilities.

### 3.6 GitHub Integration

- Sign-in through GitHub OAuth.
- Limited GitHub integration for the initial release.

Any additional GitHub capabilities must be evaluated separately before implementation.

## 4. Features Excluded from the Initial MVP

The following features are not part of the initial MVP unless explicitly approved through a scope revision:

- Video calls.
- Call recording.
- Free widget resizing.
- Advanced project management tools.
- Full GitHub repository management.
- Complex workflow automation.
- Native mobile applications.
- Enterprise administration and billing systems.
- Advanced analytics and recommendation systems.
- Unvalidated claims of end-to-end encryption.

These exclusions may be reconsidered after the initial release.

## 5. Security and Privacy Requirements

Security and privacy are part of the MVP, not optional future enhancements.

The initial release must include:

- Backend authorization for every protected operation.
- Private personal workspaces by default.
- Explicit and revocable sharing permissions.
- Expiration and revocation of temporary access.
- Secure authentication and session handling.
- Community role-based permissions.
- Protection against unauthorized access to personal data.
- Invisible presence that does not expose the user's status through public discovery.
- Explicit screen-sharing consent and immediate stopping controls.
- A documented account deletion process.

## 6. Platform and Technical Direction

The planned architecture is a modular monolith.

The initial technology direction is:

- Frontend: React and TypeScript.
- Backend: Node.js and NestJS.
- Database: PostgreSQL.
- ORM: Prisma.
- Real-time communication: Socket.IO.
- Voice and screen sharing: WebRTC, subject to technical validation.

These choices are documented in the system architecture and may be revised if technical validation reveals significant limitations.

## 7. MVP Completion Criteria

The MVP can be considered ready for release when:

- Users can register, authenticate, and manage their accounts.
- Users can create and manage personal workspaces.
- Productivity widgets work and persist their data.
- Workspace sharing respects permissions, expiration, and revocation.
- Private rooms and community membership work according to their access rules.
- Community moderation and reporting workflows are functional.
- Real-time presence works without exposing invisible users.
- Voice calls and screen sharing pass the required technical and security tests.
- Account deletion follows the documented data-handling rules.
- Critical security, functional, and acceptance tests pass.
- Deployment, environment configuration, and recovery procedures are documented.

## 8. Scope Management

Any proposed feature must be evaluated against:

1. Its contribution to the core Nook experience.
2. Its implementation and maintenance complexity.
3. Its security and privacy implications.
4. Its impact on the initial release.
5. Its consistency with the system requirements and architecture.

Features that are not essential to the initial product should be deferred rather than expanding the MVP without justification.

## 9. Related Documents

- [Business Rules](business-rules.md)
- [Implementation Plan](implementation-plan.md)
- [System Requirements](../requirements/system-requirements.md)
- [System Architecture](../architecture/system-architecture.md)
- [Database Model](../architecture/database-model.md)
- [System Diagrams](../architecture/system-diagrams.md)

## 10. Document Status

This document defines the planned MVP scope. It does not indicate that the listed features have already been implemented or validated.

The scope should be reviewed whenever a significant product, security, or architecture decision changes.
