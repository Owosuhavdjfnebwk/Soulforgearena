# Soulforge Arena — Architecture

## Repository responsibilities

GitHub stores the application source, versioned code, static resources, and stable snapshots.

Player/account data should not be treated as GitHub repository data. Future online player data belongs in a backend service/database.

Device-local preferences (for example graphics quality, FPS limit, safe-area preference, and UI trigger layout) remain local to the device unless a future sync system explicitly adds them to the account model.

## Planned layers

```text
ARENA
  ├─ MAPA
  │   ├─ Visual
  │   ├─ Collision
  │   ├─ SpawnPoints
  │   └─ Metadata
  ├─ GAME MODE
  │   ├─ Rules
  │   ├─ Timer
  │   └─ Score
  └─ CHARACTERS
      ├─ Statistics
      ├─ Appearance
      └─ Abilities
        ↓
GAME ENGINE
  ├─ INPUT
  ├─ AI
  └─ COLLISION
        ↓
GAME STATE
        ↓
CAMERA
        ↓
RENDER
        ↓
CANVAS
```

## Mod policy

Mods are extensions of the base application. They must be independently enableable/disableable and removable without requiring edits to the base source. Experimental radical mod builds are not part of the stable application.

## Stable lineage

V14.5 is the current approved stable local milestone. Future changes should preserve it as a recoverable baseline and be committed as subsequent versions rather than replacing history.
