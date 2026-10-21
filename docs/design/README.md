
# Nook — Design References

This directory contains the visual references used to guide the design and implementation of Nook.

These references communicate the intended user experience and visual direction. They are not strict specifications, and implementation decisions must remain consistent with the documented MVP scope, product requirements, and security rules.

## Screens

- `personal-workspace.png` — Reference for the personal workspace, including productivity widgets and workspace organization.
- `home.png` — Reference for the home screen and private collaboration experience.
- `community.png` — Reference for the community experience, including discussions and member interactions.

## Visual Identity

Nook uses a warm, dark interface designed to feel focused, welcoming, and comfortable for extended use.

### Brand Colors

| Color | Hex | Purpose |
| --- | --- | --- |
| Warm charcoal | `#201F1C` | Main background |
| Brownish graphite | `#302D28` | Panels, widgets, and surfaces |
| Amber orange | `#F2A65A` | Primary actions and selected states |
| Soft yellow | `#F5D78E` | Highlights and secondary accents |
| Warm white | `#F3EFE7` | Main text and readable content |

## Design Principles

- **Clarity first:** prioritize readable content and understandable navigation.
- **Consistency:** use shared colors, spacing, typography, and interaction patterns.
- **Purposeful simplicity:** avoid unnecessary visual elements and excessive decoration.
- **Responsive layouts:** prioritize desktop while supporting smaller screens.
- **Accessibility:** maintain sufficient contrast, visible focus states, and clear interaction feedback.
- **Functional feedback:** communicate loading, success, empty, and error states where appropriate.

## Implementation Guidelines

- Use these images as visual references, not as production assets or exact implementation requirements.
- Keep the implemented interface consistent with the product requirements and MVP scope.
- Prefer reusable components and shared design tokens over duplicated styles.
- Do not implement visual elements that imply features outside the current MVP without reviewing their scope.
- Treat privacy, permissions, and security requirements as mandatory, regardless of how they are represented visually.

## Maintenance

Update these references when the product's visual direction changes significantly. Document important design decisions alongside the relevant implementation or architecture documentation.
