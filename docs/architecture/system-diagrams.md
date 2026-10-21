# Nook — System Diagrams

This document provides visual representations of Nook's architecture, data model, and critical user flows.

The diagrams use Mermaid syntax and are intended to support development, technical reviews, and system documentation.

## 1. System Context

This diagram shows the main actors and external services that interact with Nook.

```mermaid
flowchart TD
    User[User]
    Guest[Invited Guest]
    Admin[Community Administrator]

    Nook[Nook Platform]
    GitHub[GitHub OAuth]
    Database[(PostgreSQL)]
    Realtime[Real-time Gateway]
    WebRTC[WebRTC Communication]

    User --> Nook
    Guest --> Nook
    Admin --> Nook

    Nook --> GitHub
    Nook --> Database
    Nook --> Realtime
    Realtime --> WebRTC
```

## 2. Application Architecture

Nook follows a modular monolith architecture for the initial MVP. Modules share one backend application while maintaining clear domain boundaries.

```mermaid
flowchart TB
    Client[React + TypeScript Frontend]

    subgraph Backend[NestJS Backend — Modular Monolith]
        Auth[Authentication Module]
        Users[Users Module]
        Workspaces[Workspaces Module]
        Widgets[Widgets Module]
        Sharing[Sharing and Permissions Module]
        Rooms[Private Rooms Module]
        Communities[Communities Module]
        Moderation[Moderation Module]
        RealtimeModule[Real-time Module]
    end

    ORM[Prisma ORM]
    DB[(PostgreSQL)]
    GitHub[GitHub OAuth]
    Socket[Socket.IO]
    RTC[WebRTC]

    Client --> Backend
    Backend --> Auth
    Backend --> Users
    Backend --> Workspaces
    Backend --> Widgets
    Backend --> Sharing
    Backend --> Rooms
    Backend --> Communities
    Backend --> Moderation
    Backend --> RealtimeModule

    Backend --> ORM
    ORM --> DB
    Auth --> GitHub
    RealtimeModule --> Socket
    RealtimeModule --> RTC
```

## 3. Database Entity Relationships

This is a high-level view of the main entities. The complete database model defines detailed attributes, constraints, indexes, and access rules.

```mermaid
erDiagram
    USERS ||--o{ AUTH_ACCOUNTS : has
    USERS ||--o{ SESSIONS : owns
    USERS ||--o{ WORKSPACES : creates
    USERS ||--o{ PRIVATE_ROOM_MEMBERS : joins
    USERS ||--o{ COMMUNITY_MEMBERS : joins
    USERS ||--o{ INVITATIONS : creates
    USERS ||--o{ AUDIT_LOGS : generates

    WORKSPACES ||--o{ WIDGETS : contains
    WORKSPACES ||--o{ NOTES : contains
    WORKSPACES ||--o{ TASKS : contains
    WORKSPACES ||--o{ SHORTCUTS : contains
    WORKSPACES ||--o{ WORKSPACE_SHARES : shares

    WORKSPACE_SHARES ||--o{ SHARE_PERMISSIONS : grants
    USERS ||--o{ WORKSPACE_SHARES : receives

    PRIVATE_ROOMS ||--o{ PRIVATE_ROOM_MEMBERS : includes
    USERS ||--o{ PRIVATE_ROOMS : creates

    COMMUNITIES ||--o{ COMMUNITY_MEMBERS : includes
    USERS ||--o{ COMMUNITIES : creates
    COMMUNITIES ||--o{ JOIN_REQUESTS : receives
    COMMUNITIES ||--o{ REPORTS : receives

    USERS ||--o{ BLOCKS : initiates
    USERS ||--o{ BLOCKS : is_blocked
```

## 4. Authentication Flow

Nook supports email-based authentication and GitHub OAuth. Authentication must establish a verified user identity before granting access to protected resources.

```mermaid
sequenceDiagram
    actor User
    participant Frontend
    participant Auth as Auth Module
    participant GitHub
    participant DB as PostgreSQL

    User->>Frontend: Choose login method
    alt Email authentication
        Frontend->>Auth: Submit credentials
        Auth->>DB: Find user and validate credentials
        DB-->>Auth: User record
    else GitHub OAuth
        Frontend->>Auth: Start OAuth flow
        Auth->>GitHub: Redirect for authorization
        GitHub-->>Auth: Return authorization code
        Auth->>GitHub: Exchange code for token
        GitHub-->>Auth: Return authorized identity
        Auth->>DB: Find or create linked account
        DB-->>Auth: User record
    end

    Auth->>Auth: Apply authentication and security checks
    Auth-->>Frontend: Establish authenticated session
    Frontend-->>User: Open workspace
```

## 5. Workspace Sharing and Permission Revocation

Workspace access must follow explicit permissions. Revoked or expired permissions must not become valid again automatically.

```mermaid
sequenceDiagram
    actor Owner
    actor Guest
    participant Frontend
    participant API as Backend API
    participant DB as PostgreSQL
    participant Realtime as Real-time Gateway

    Owner->>Frontend: Select workspace and permissions
    Frontend->>API: Create temporary share
    API->>API: Verify owner authorization
    API->>DB: Store share and permission rules
    DB-->>API: Share created
    API-->>Owner: Return invitation or share link

    Guest->>Frontend: Open shared workspace
    Frontend->>API: Request workspace access
    API->>DB: Validate share, expiration, and permissions
    DB-->>API: Current access rules
    API-->>Frontend: Grant permitted access

    Owner->>API: Revoke share
    API->>DB: Mark share as revoked
    API->>Realtime: Invalidate active access
    Realtime-->>Guest: End access to shared resources
    API-->>Owner: Confirm revocation
```

## 6. Community Entry and Moderation

Communities can allow open entry or require approval. Membership roles determine permitted actions but never grant access to private personal workspaces.

```mermaid
flowchart TD
    Start[User discovers community]
    Details[View community details]
    Mode{Entry policy}

    Open[Request or complete open entry]
    Approval[Submit join request]
    Review[Moderator or admin reviews]
    Decision{Request approved?}

    Member[Become community member]
    Denied[Remain outside community]
    Action[Participate according to role]
    Report[Report content or member]
    Moderation[Authorized moderation review]

    Start --> Details
    Details --> Mode
    Mode -->|Open| Open
    Mode -->|Approval required| Approval
    Approval --> Review
    Review --> Decision
    Decision -->|Yes| Member
    Decision -->|No| Denied
    Open --> Member
    Member --> Action
    Action --> Report
    Report --> Moderation
```

## 7. Voice Calls and Screen Sharing

Voice and screen-sharing features require authorized participation. Screen sharing must be initiated explicitly, visibly indicated, and stoppable immediately by the sharing user.

```mermaid
sequenceDiagram
    actor User
    participant Frontend
    participant API as Backend API
    participant Signal as Signaling Service
    participant Peer as Authorized Participant

    User->>Frontend: Start voice call or screen share
    Frontend->>API: Request action
    API->>API: Verify identity, membership, and permissions
    API-->>Frontend: Authorize or reject

    alt Authorized
        Frontend->>Signal: Exchange connection signaling
        Signal-->>Peer: Deliver signaling data
        Peer-->>Signal: Return connection signaling
        Signal-->>Frontend: Deliver peer signaling
        Frontend->>Peer: Establish WebRTC media connection
        Note over Frontend,Peer: Media transport depends on validated WebRTC infrastructure
        User->>Frontend: Stop sharing or leave call
        Frontend->>Peer: End relevant media tracks
    else Rejected
        API-->>Frontend: Deny action
    end
```

**Implementation note:** WebRTC signaling, STUN/TURN configuration, and any need for an SFU must be validated through a technical proof of concept before production deployment. This diagram does not imply that end-to-end encryption has been independently validated.

## 8. Account Deletion

Account deletion must account for personal data, active sessions, shared resources, and collective resources. Retention obligations must be reviewed before final implementation.

```mermaid
flowchart TD
    Start[User requests account deletion]
    Authenticate[Re-authenticate and confirm request]
    Review[Identify personal and collective resources]
    Sessions[Invalidate active sessions and credentials]
    Shares[Revoke active shares and invitations]
    Personal[Delete or anonymize eligible personal data]
    Collective[Handle community and room ownership]
    Retention[Apply documented legal retention rules]
    Audit[Record necessary deletion audit event]
    Complete[Confirm deletion outcome]

    Start --> Authenticate
    Authenticate --> Review
    Review --> Sessions
    Sessions --> Shares
    Shares --> Personal
    Personal --> Collective
    Collective --> Retention
    Retention --> Audit
    Audit --> Complete
```

## 9. Core Authorization Principle

Every protected operation must be authorized by the backend. Hiding a button in the frontend is not a security control.

```mermaid
flowchart TD
    Request[Incoming request]
    Identity{Authenticated?}
    Resource[Load requested resource]
    Permission{Authorized for this action?}
    Execute[Execute operation]
    Deny[Reject request]
    Audit[Record security-relevant event when required]

    Request --> Identity
    Identity -->|No| Deny
    Identity -->|Yes| Resource
    Resource --> Permission
    Permission -->|Yes| Execute
    Permission -->|No| Deny
    Execute --> Audit
    Deny --> Audit
```

Authorization checks must consider the resource owner, the requesting user's current role, explicit permissions, expiration, revocation, and resource-specific rules.

## 10. Diagram Maintenance

- Keep diagrams consistent with the system requirements, business rules, database model, and architecture specification.
- Update diagrams whenever a change affects module boundaries, entity relationships, authorization, or critical user flows.
- Treat these diagrams as documentation, not as proof that the described features have already been implemented.
- Validate Mermaid syntax and diagram rendering during documentation reviews.
- Document unresolved infrastructure and security decisions before production implementation.
