# Nook

**Your space. Your people. Your flow.**

Nook is a collaborative digital workspace designed for developers, combining personal productivity tools, real-time communication, private group spaces, and public communities in one environment.

## Overview

Nook aims to provide developers with a unified space to organize their workflow, manage everyday tasks, collaborate with other people, and discover communities.

The project prioritizes privacy, clear permission boundaries, and a modular architecture that can evolve over time.

## Core Features

- **Personal Workspaces:** customizable spaces for organizing productivity tools.
- **Productivity Widgets:** Pomodoro timer, quick notes, tasks, shortcuts, and clock/calendar.
- **Private Rooms:** dedicated spaces for group interaction.
- **Public Communities:** discoverable communities with membership and moderation controls.
- **Real-Time Presence:** availability states for connected users.
- **Voice and Screen Sharing:** communication tools for authorized participants.
- **GitHub Integration:** limited integration with GitHub.
- **Cloud Persistence:** synchronization and storage of user workspaces and preferences.

> Nook is under development. Features listed here describe the intended MVP and may not yet be implemented.

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React + TypeScript |
| Backend | Node.js + NestJS |
| Database | PostgreSQL |
| ORM | Prisma |
| Real-Time Events | Socket.IO |
| Voice and Screen Sharing | WebRTC |
| Version Control | Git + GitHub |

## Architecture

The MVP is planned as a modular monolith, with a separate frontend and backend within a single repository.

The architecture is designed to keep business rules, data access, and authorization organized into clear modules.

## Documentation

Project documentation will be maintained in the [`docs/`](docs/) directory, including:

- Product scope and business rules.
- System requirements.
- Architecture decisions.
- Database modeling.
- User flows and diagrams.
- MVP implementation plan.

## Development Status

**Status:** Planning and initial repository setup.

The project is currently progressing from product documentation toward the initial development environment.

## Security and Privacy

Security and privacy are core design considerations. Protected operations must be authorized by the backend, personal workspaces must remain private by default, and sensitive credentials must never be committed to the repository.

## Contributing

Contribution guidelines and development conventions will be documented as the repository structure is established.

## License

No open-source license has been selected yet. Until a license is added, the repository should not be treated as granting general permission to reuse or redistribute its contents.
