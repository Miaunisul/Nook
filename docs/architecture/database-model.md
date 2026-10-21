# Nook — Database Model

**Document:** Database Modeling  
**Version:** 1.0  
**Status:** Initial design  
**Database:** PostgreSQL  
**ORM:** Prisma

## 1. Purpose

This document defines the initial logical data model for Nook, including its main entities, relationships, constraints, indexes, and data protection rules.

The model supports personal workspaces, productivity widgets, temporary sharing, private rooms, public communities, user presence, GitHub integration, and account lifecycle management.

The schema is a starting point for implementation. It must be validated against the application requirements and updated through version-controlled database migrations.

## 2. Design Principles

The database model follows these principles:

- Use PostgreSQL as the primary relational database.
- Use Prisma as the ORM and schema management tool.
- Use UUIDs as primary identifiers by default.
- Store timestamps in UTC.
- Enforce data integrity through foreign keys, unique constraints, and database constraints where appropriate.
- Keep personal workspaces private by default.
- Separate personal workspace permissions from community and room membership.
- Store only the data required for product functionality.
- Avoid storing passwords, access tokens, invitation secrets, or other sensitive credentials in plain text.
- Treat real-time presence as transient state unless a documented feature requires persistence.
- Use database migrations to manage schema changes.

## 3. Main Domains

The database is organized into the following logical domains:

| Domain | Purpose |
|---|---|
| Identity and authentication | Users, authentication providers, sessions, and account preferences |
| Personal workspaces | Workspaces, widget instances, layouts, and widget data |
| Sharing and invitations | Temporary access grants, permissions, and invitation tokens |
| Private rooms | Room metadata and membership |
| Public communities | Communities, roles, join requests, and moderation |
| Communication | Persistent call metadata when needed; real-time media is handled separately |
| Integrations | External account connections, including GitHub |
| Security and auditing | Security events and administrative audit records |

## 4. Entity Overview

### 4.1. Users

Stores the main account record for each Nook user.

**Suggested fields:**

- `id`: UUID, primary key.
- `email`: unique normalized email address.
- `displayName`: public display name.
- `avatarUrl`: optional avatar URL.
- `status`: account status, such as active, suspended, or pending verification.
- `createdAt`: creation timestamp.
- `updatedAt`: last update timestamp.
- `deletedAt`: optional deletion marker when a soft-deletion process is appropriate.

Email verification and account activation state must be represented explicitly if required by the authentication implementation.

### 4.2. Authentication Accounts

Stores external authentication identities and provider associations.

**Suggested fields:**

- `id`: UUID, primary key.
- `userId`: foreign key to `User`.
- `provider`: authentication provider, such as email or GitHub.
- `providerAccountId`: provider-specific account identifier.
- `createdAt`: creation timestamp.
- `updatedAt`: last update timestamp.

The combination of `provider` and `providerAccountId` must be unique.

Passwords, when applicable, should be stored separately as securely hashed credentials. OAuth secrets and access tokens must not be exposed to clients.

### 4.3. Sessions

Represents authenticated sessions when server-managed session persistence is used.

**Suggested fields:**

- `id`: UUID, primary key.
- `userId`: foreign key to `User`.
- `tokenHash`: hash of the session token where applicable.
- `expiresAt`: expiration timestamp.
- `revokedAt`: optional revocation timestamp.
- `createdAt`: creation timestamp.
- `lastUsedAt`: optional last-use timestamp.

Expired or revoked sessions must not authorize protected operations.

### 4.4. User Preferences

Stores user-level configuration.

**Suggested fields:**

- `id`: UUID, primary key.
- `userId`: unique foreign key to `User`.
- `theme`: selected interface theme.
- `timezone`: preferred timezone.
- `locale`: preferred language.
- `createdAt`: creation timestamp.
- `updatedAt`: last update timestamp.

Only preferences that are actually supported by the application should be implemented.

## 5. Personal Workspaces

### 5.1. Workspaces

Represents a personal workspace owned by a user.

**Suggested fields:**

- `id`: UUID, primary key.
- `ownerId`: foreign key to `User`.
- `name`: workspace name.
- `description`: optional description.
- `isDefault`: indicates whether this is the user's default workspace.
- `createdAt`: creation timestamp.
- `updatedAt`: last update timestamp.
- `deletedAt`: optional deletion marker if soft deletion is used.

A user may own multiple workspaces. Workspace ownership does not grant other users access.

The application must enforce that only the owner or explicitly authorized users can access protected workspace data.

### 5.2. Widget Instances

Represents widgets placed in a workspace.

**Suggested fields:**

- `id`: UUID, primary key.
- `workspaceId`: foreign key to `Workspace`.
- `type`: widget type, such as Pomodoro, notes, tasks, shortcuts, or clock/calendar.
- `title`: optional custom title.
- `positionX`: horizontal layout position.
- `positionY`: vertical layout position.
- `configuration`: JSONB configuration for supported widget-specific settings.
- `createdAt`: creation timestamp.
- `updatedAt`: last update timestamp.

Widget instances should be separate from the data displayed by the widgets when that separation improves data integrity or access control.

The MVP supports rearranging widgets but does not require unrestricted widget resizing.

### 5.3. Notes

Stores notes associated with a workspace or widget.

**Suggested fields:**

- `id`: UUID, primary key.
- `workspaceId`: foreign key to `Workspace`.
- `widgetId`: optional foreign key to `WidgetInstance`.
- `title`: optional note title.
- `content`: note content.
- `createdAt`: creation timestamp.
- `updatedAt`: last update timestamp.

The data model must clearly define whether notes belong directly to a workspace, a widget, or both through a single canonical ownership relationship. Avoid duplicating the same note in multiple ownership locations.

### 5.4. Tasks

Stores productivity tasks.

**Suggested fields:**

- `id`: UUID, primary key.
- `workspaceId`: foreign key to `Workspace`.
- `widgetId`: optional foreign key to `WidgetInstance`.
- `title`: task title.
- `description`: optional task description.
- `isCompleted`: completion state.
- `dueAt`: optional due date.
- `createdAt`: creation timestamp.
- `updatedAt`: last update timestamp.

Tasks must be isolated by workspace and accessible only to authorized users.

### 5.5. Shortcuts

Stores external links and shortcuts.

**Suggested fields:**

- `id`: UUID, primary key.
- `workspaceId`: foreign key to `Workspace`.
- `widgetId`: optional foreign key to `WidgetInstance`.
- `title`: shortcut label.
- `url`: destination URL.
- `createdAt`: creation timestamp.
- `updatedAt`: last update timestamp.

The application should validate URL schemes and reject unsafe destinations where appropriate.

## 6. Sharing and Invitations

### 6.1. Workspace Shares

Represents a temporary grant of access to a personal workspace.

**Suggested fields:**

- `id`: UUID, primary key.
- `workspaceId`: foreign key to `Workspace`.
- `ownerId`: foreign key to `User`.
- `recipientUserId`: optional foreign key to `User`.
- `expiresAt`: expiration timestamp.
- `revokedAt`: optional revocation timestamp.
- `createdAt`: creation timestamp.

The maximum duration of a temporary workspace share is eight hours.

A share must be invalid when expired or revoked. Revocation must take effect for new protected operations, including operations initiated through active connections.

### 6.2. Share Permissions

Represents the actions allowed by a workspace share.

**Suggested fields:**

- `id`: UUID, primary key.
- `shareId`: foreign key to `WorkspaceShare`.
- `permission`: permission identifier.
- `createdAt`: creation timestamp.

Permissions must be explicit and limited to the actions granted by the owner. Guests must not edit the owner's notes, tasks, widgets, or settings unless the relevant permission has been granted.

The backend must validate permissions on every protected operation.

### 6.3. Invitations

Stores invitations to private rooms or communities.

**Suggested fields:**

- `id`: UUID, primary key.
- `resourceType`: type of resource being invited to.
- `resourceId`: identifier of the target resource.
- `createdById`: foreign key to `User`.
- `tokenHash`: hash of the invitation token.
- `expiresAt`: expiration timestamp.
- `maxUses`: maximum number of uses.
- `useCount`: number of successful uses.
- `revokedAt`: optional revocation timestamp.
- `createdAt`: creation timestamp.

Default invitation rules:

- Expiration after seven days.
- Maximum of ten successful uses.
- Sensitive invitations may be single-use and have shorter expiration periods.

The application must validate expiration, revocation, usage limits, and the invitee's eligibility before granting access.

## 7. Private Rooms

### 7.1. Rooms

Represents a private group room.

**Suggested fields:**

- `id`: UUID, primary key.
- `ownerId`: foreign key to `User`.
- `name`: room name.
- `createdAt`: creation timestamp.
- `updatedAt`: last update timestamp.

A room persists when its owner is offline. The owner's absence must not automatically transfer ownership.

### 7.2. Room Members

Represents membership and room-level roles.

**Suggested fields:**

- `id`: UUID, primary key.
- `roomId`: foreign key to `Room`.
- `userId`: foreign key to `User`.
- `role`: room-level role.
- `joinedAt`: membership timestamp.
- `removedAt`: optional removal timestamp.

The combination of `roomId` and `userId` should be unique for active membership, according to the chosen membership history strategy.

Room membership must not grant access to unrelated personal workspaces.

## 8. Public Communities

### 8.1. Communities

Represents a discoverable community.

**Suggested fields:**

- `id`: UUID, primary key.
- `ownerId`: foreign key to `User`.
- `name`: community name.
- `description`: optional description.
- `visibility`: visibility setting.
- `joinPolicy`: open entry or approval required.
- `createdAt`: creation timestamp.
- `updatedAt`: last update timestamp.

Public discoverability must not expose private member data or personal workspace content.

### 8.2. Community Members

Represents a user's membership and role in a community.

**Suggested fields:**

- `id`: UUID, primary key.
- `communityId`: foreign key to `Community`.
- `userId`: foreign key to `User`.
- `role`: owner, administrator, moderator, or member.
- `joinedAt`: membership timestamp.
- `removedAt`: optional removal timestamp.

Community roles must be validated against the actions each role is allowed to perform.

Administrative access to a community must not provide unrestricted access to members' personal data.

### 8.3. Community Join Requests

Represents requests to join communities that require approval.

**Suggested fields:**

- `id`: UUID, primary key.
- `communityId`: foreign key to `Community`.
- `userId`: foreign key to `User`.
- `status`: pending, approved, or rejected.
- `createdAt`: request timestamp.
- `reviewedAt`: optional review timestamp.
- `reviewedById`: optional foreign key to `User`.

Only authorized community roles may approve or reject requests.

### 8.4. Reports

Stores user reports for moderation.

**Suggested fields:**

- `id`: UUID, primary key.
- `reporterId`: foreign key to `User`.
- `reportedUserId`: optional foreign key to `User`.
- `communityId`: optional foreign key to `Community`.
- `targetType`: type of reported content or behavior.
- `targetId`: identifier of the reported target when applicable.
- `reason`: report category.
- `details`: optional explanation.
- `status`: report workflow status.
- `createdAt`: creation timestamp.
- `resolvedAt`: optional resolution timestamp.

Reports must be accessible only to authorized moderation personnel and other roles explicitly permitted by policy.

### 8.5. User Blocks

Represents a user's block of another user.

**Suggested fields:**

- `id`: UUID, primary key.
- `blockerId`: foreign key to `User`.
- `blockedUserId`: foreign key to `User`.
- `createdAt`: creation timestamp.

The pair `blockerId` and `blockedUserId` must be unique. A user must not block themselves.

## 9. Presence and Communication

### 9.1. Presence State

Presence is primarily transient state and should not automatically be persisted as permanent user history.

The system may maintain active presence in memory or a dedicated real-time infrastructure. If persistence is later required, only the minimum necessary data should be stored.

Supported states:

- Available
- Focus
- Away
- Busy
- Invisible

Invisible presence must not be exposed through public lists, search results, or unauthorized last-seen indicators.

### 9.2. Voice Calls and Screen Sharing

Real-time media is not modeled as ordinary workspace content.

If persistent call metadata is required, it should be limited to information needed for operational purposes, such as:

- `id`: UUID, primary key.
- `roomId`: optional room reference.
- `initiatedById`: foreign key to `User`.
- `startedAt`: timestamp.
- `endedAt`: optional timestamp.

The MVP does not provide call recording. Screen sharing requires explicit user action, a visible active-sharing indicator, and immediate termination controls.

Signaling, voice transport, and screen-sharing media require a separate technical design and security review.

## 10. GitHub Integrations

### 10.1. External Integrations

Represents a connected external account.

**Suggested fields:**

- `id`: UUID, primary key.
- `userId`: foreign key to `User`.
- `provider`: integration provider.
- `externalAccountId`: external account identifier.
- `createdAt`: creation timestamp.
- `updatedAt`: last update timestamp.
- `disconnectedAt`: optional disconnection timestamp.

The combination of `userId` and `provider` should be unique when only one active connection per provider is supported.

Access tokens must not be stored in plain text. If tokens must be retained, use a secure secret-management or encrypted-storage strategy with restricted access.

GitHub authorization should request only the minimum scopes required by implemented features.

## 11. Audit Logs

Represents security-relevant and administrative events.

**Suggested fields:**

- `id`: UUID, primary key.
- `actorUserId`: optional foreign key to `User`.
- `action`: event type.
- `resourceType`: affected resource type.
- `resourceId`: affected resource identifier.
- `createdAt`: event timestamp.
- `metadata`: optional, minimized structured metadata.

Audit records must not contain passwords, raw tokens, private note content, or unnecessary personal information.

Access to audit records must be restricted. Retention periods must be defined according to operational needs and applicable legal requirements.

## 12. Relationships Summary

The primary relationships are:

- A user can own multiple workspaces.
- A workspace can contain multiple widget instances.
- A workspace can contain multiple notes, tasks, and shortcuts.
- A workspace can have multiple temporary shares.
- A share can grant multiple explicit permissions.
- A user can create and join multiple private rooms.
- A user can create and join multiple communities.
- Communities can have multiple members and join requests.
- Users can submit reports and block other users.
- Users can connect external integrations.
- Security events can reference an actor and an affected resource.

## 13. Indexing and Constraints

The implementation should consider indexes for:

- Unique normalized user email.
- Authentication provider and provider account ID.
- Session token hash and expiration.
- Workspace owner ID.
- Widget workspace ID.
- Notes, tasks, and shortcuts by workspace ID.
- Shares by workspace ID, recipient ID, expiration, and revocation state.
- Invitation token hash and expiration.
- Room membership by room ID and user ID.
- Community membership by community ID and user ID.
- Join requests by community ID and status.
- Reports by status and creation timestamp.
- User blocks by blocker ID and blocked user ID.
- Audit events by actor ID and creation timestamp.

Use foreign keys and unique constraints to prevent invalid relationships and duplicate records. Use additional check constraints where they improve data integrity, such as preventing a user from blocking themselves or preventing negative invitation usage counts.

Indexes should be validated against actual query patterns to avoid unnecessary write overhead.

## 14. Data Integrity and Deletion

Deletion behavior must be explicitly defined for every relationship.

- Workspace deletion must not remove another user's unrelated data.
- Share deletion or revocation must invalidate associated permissions.
- Removing a room member must not delete the room or other members' data.
- Community ownership changes must follow explicit authorization and business rules.
- Account deletion must consider personal data, collective resources, legal retention, and ownership transfer where appropriate.
- Soft deletion should be used only where it serves a documented recovery, audit, or legal purpose.

The application must not rely on cascading deletion without reviewing its impact on related records.

## 15. Migration Strategy

All database schema changes must be managed through version-controlled Prisma migrations.

The migration process should include:

1. Update the Prisma schema.
2. Generate a migration in the development environment.
3. Review the migration for data loss, locking, and compatibility risks.
4. Run automated tests against the updated schema.
5. Apply migrations through the deployment process.
6. Document breaking changes and required data transformations.

Production migrations must not be applied manually without a documented and reviewed procedure.

## 16. Security Requirements

The database and data access layer must enforce these rules:

- Validate ownership and permissions on the backend.
- Never rely exclusively on frontend restrictions.
- Keep authentication secrets out of source control.
- Restrict database credentials by environment and role.
- Use secure connections for remote database access.
- Validate external input before processing it.
- Avoid returning private records to unauthorized users.
- Apply rate limits and abuse controls to sensitive operations.
- Protect backup access and define a recovery process.
- Keep dependencies and database tooling maintained.

## 17. Initial Implementation Scope

The first implementation should prioritize:

1. Users and authentication accounts.
2. Sessions and user preferences.
3. Workspaces and widget instances.
4. Notes, tasks, and shortcuts.
5. Workspace shares and permissions.
6. Private rooms and memberships.
7. Communities and memberships.
8. Join requests, reports, and user blocks.
9. GitHub integrations.
10. Audit events required for security.

Presence and real-time communication may require additional infrastructure beyond PostgreSQL and Prisma.

## 18. Status and Future Validation

This document defines the initial logical model, not a final production schema.

Before implementation, the model must be translated into a concrete Prisma schema and validated against:

- Functional and security requirements.
- Business rules and access-control policies.
- Account deletion and ownership-transfer workflows.
- Expected query patterns and indexing needs.
- Real-time infrastructure requirements.
- Data retention and applicable privacy obligations.

Schema changes must be version-controlled and kept consistent with the architecture and requirements documentation.
