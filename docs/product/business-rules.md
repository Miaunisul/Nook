# Nook — Business Rules

**Version:** 1.0  
**Status:** Approved product baseline  
**Last updated:** October 2026

## 1. Purpose

This document defines the core business rules governing Nook. These rules guide implementation, authorization, data management, and acceptance testing.

## 2. User Accounts and Sessions

- Users must authenticate before accessing protected features.
- The MVP supports email-based authentication and GitHub authentication.
- Each user has an independent account and identity.
- Sessions must support expiration and revocation.
- Signing out must invalidate the applicable session.
- Account deletion must follow a controlled process that considers personal data, collective resources, and legally required retention.
- Authentication secrets and tokens must never be committed to the repository or exposed in logs.

## 3. Personal Workspaces

- A user may create and manage multiple personal workspaces.
- Personal workspaces are private by default.
- Workspace owners control their own workspace settings and content.
- Workspace layouts, widgets, tasks, notes, shortcuts, and preferences must persist through the backend.
- Users must not access another user's private workspace without explicit authorization.
- Reordering widgets is included in the MVP; free resizing is deferred.
- Sharing a workspace must not automatically grant unrestricted access to all its content or settings.

## 4. Widgets and Personal Data

- Widgets belong to a workspace and must be associated with the correct owner and context.
- Notes, tasks, shortcuts, and widget settings must remain isolated from unauthorized users.
- Guests cannot modify an owner's notes, tasks, widgets, or workspace settings by default.
- Shared access must follow the permissions explicitly granted by the owner.
- Data changes must be validated by the backend.
- Deleting a workspace or account must follow defined deletion and retention procedures.

## 5. Temporary Workspace Sharing

- Workspace sharing must be explicitly initiated by the owner.
- Sharing permissions must define which actions are authorized.
- Temporary sharing must have a defined expiration.
- The proposed maximum lifetime for a temporary share is eight hours per sharing session.
- The owner may revoke access before expiration.
- Revoked or expired permissions must not automatically become valid again.
- Revocation must apply to relevant active sessions and connections.
- Guests must not gain access to unrelated workspaces or private account data.
- Every protected operation must be authorized by the backend, not only by the user interface.

## 6. Invitations

- Invitations must have a defined expiration and usage limit.
- The default invitation policy is seven days and a maximum of ten uses.
- Sensitive invitations may use shorter expiration periods and a single-use limit.
- Invitation tokens must be generated securely and stored as hashes.
- Expired, revoked, or exhausted invitations must be rejected.
- An invitation grants only the access associated with its intended purpose.
- Invitation acceptance must not bypass membership or authorization rules.

## 7. Private Rooms

- Private rooms are separate from personal workspaces and public communities.
- Rooms may persist when their owner is offline.
- The owner's absence does not automatically transfer ownership.
- Membership and room actions must follow explicit access rules.
- Room membership must not grant access to a member's personal workspace.
- Changes to membership must be enforced by the backend.

## 8. Public Communities

- Public communities may be discoverable within Nook.
- Community entry may be open or require approval.
- Community roles are owner, administrator, moderator, and member.
- Each role must have explicitly defined permissions.
- Administrative privileges apply only within their authorized community scope.
- Community roles must not grant access to private personal workspaces or unrelated private rooms.
- Membership changes must be validated by the backend.
- Communities must support basic moderation, reporting, and user blocking.
- Moderation actions should be recorded when appropriate for accountability and abuse prevention.

## 9. Presence and Availability

- The MVP supports Available, Focus, Away, Busy, and Invisible states.
- Presence is primarily transient real-time state and should not be treated as permanent user activity history.
- Invisible users must not be exposed as online through public listings, search, or last-seen information.
- Users may continue using Nook while Invisible.
- Presence must not disclose private workspace contents.
- Connection loss and reconnection must be handled without incorrectly granting access.

## 10. Voice Calls and Screen Sharing

- Voice calls and screen sharing are included in the MVP.
- Video calls and call recording are excluded.
- Participation requires appropriate authorization.
- Screen sharing must be initiated through an explicit user action.
- A visible indicator must remain active while screen sharing is in progress.
- Users must be able to stop screen sharing immediately.
- Permission revocation must terminate or restrict relevant active access.
- Real-time media infrastructure must be validated before launch.
- Nook must not claim end-to-end encryption unless the implementation has been technically validated to support that claim.

## 11. GitHub Integration

- GitHub integration must use only the permissions required for approved functionality.
- External access must be limited to the explicitly authorized scope.
- Access tokens and secrets must be protected.
- Users must be able to disconnect the integration.
- Disconnecting an integration must prevent further use of its credentials by Nook.
- GitHub integration must not imply unrestricted access to a user's repositories.

## 12. Security and Authorization

- All protected actions must be authorized on the backend.
- Client-side restrictions alone are insufficient.
- The system must enforce resource ownership and role-based permissions.
- Input must be validated before processing.
- Sensitive information must not be unnecessarily stored or logged.
- Database relationships and constraints must preserve data integrity.
- Revoked sessions, expired invitations, and revoked permissions must be rejected.
- Security-sensitive operations should be covered by automated tests.
- Public repository contents must not include real credentials, private keys, production data, or personal information.

## 13. Account Deletion and Collective Resources

- Account deletion must follow an explicit and controlled flow.
- Personal data must be deleted or anonymized where appropriate.
- Resources owned by the deleting account must be reviewed before deletion.
- Where applicable, collective resources may be transferred through an explicit and authorized process.
- Ownership must not transfer automatically without a defined rule.
- Records required for legal or security purposes may be retained only as justified by applicable requirements.
- The deletion process must invalidate applicable sessions and credentials.
- The user must receive clear information about the consequences of deletion.

## 14. Age, Privacy, and Legal Review

- The minimum age and requirements for parental consent or other safeguards must be reviewed before public launch.
- A proposed minimum age of 13 is provisional and is not a determination of legal compliance.
- The product must undergo a review of applicable Brazilian data protection requirements, including the LGPD.
- Privacy notices, terms of use, and community rules must be prepared before public launch.
- Requirements concerning minors, consent, data retention, and user rights must be evaluated for the intended markets.

## 15. Technical Defaults

- PostgreSQL is the primary relational database.
- Prisma manages the data model and versioned migrations.
- UUIDs are the default identifier format for application entities unless a documented technical reason requires otherwise.
- Timestamps are stored consistently in UTC.
- Database relationships must use appropriate foreign keys and integrity constraints.
- JSONB is reserved for structured fields that benefit from flexible storage; it must not replace relational modeling where relationships are required.
- Presence is treated as transient state unless a specific, documented requirement calls for persistence.
- Indexes must support common queries and authorization checks, and should be reviewed as usage patterns become clear.

## 16. Enforcement

These rules must be reflected in implementation, tests, and relevant technical documentation.

When a feature conflicts with a security or privacy rule, the secure behavior takes precedence until the conflict is explicitly reviewed and resolved.

Changes to these rules must be documented and checked against the system requirements, database model, architecture, and acceptance criteria.

## 17. Related Documents

- `README.md` — project overview.
- `docs/product/implementation-plan.md` — implementation phases and completion criteria.
- `docs/requirements/` — system requirements and acceptance criteria.
- `docs/architecture/` — technical architecture and database model.
- `docs/diagrams/` — system and workflow diagrams.
