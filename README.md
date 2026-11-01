# Tarotmancer

Tarot readings with three-card, Celtic Cross, and Horseshoe spreads, streamed AI interpretations, and locally saved draw statistics.

All card artwork, dealing/flipping, landing cards, starfields, and the enlarged card viewer are rendered with **Phoria 2 (phoria2 1.2.0)**. HTML provides accessible controls, reading text, and a keyboard-accessible card list. There is no CSS card renderer or Anime.js dependency. The interface keeps the black-and-green retro terminal theme.

Cards have rounded geometry, textured fronts and backs, and solid edges. Each deal splits and riffles a 16-card visual stack, then flies the selected cards along staggered 3D arcs before revealing them. Controls wait for the animation to finish. The showcase keeps its WebGL view alive between openings (disposing it only on page teardown), avoiding context-restoration races. Move the pointer over a showcased card to gently tilt it.

## Run locally

Serve the project root over HTTP; ES modules do not work from a `file:` URL:

```sh
python -m http.server 8766 --bind 127.0.0.1
```

Open `http://127.0.0.1:8766/`. No frontend build or npm installation is needed. The static server supports the visual experience; AI readings require the existing Vercel `/api/interpret` function and its configured `ANTHROPIC_API_KEY`. Deploy the root to Vercel as before.

```sh
node --test tests/*.test.mjs
```

The tests cover layout bounds, staggered reveals, reversal transforms, reduced motion, Phoria ray picking for the overlapping Celtic Cross cards, rounded geometry, shuffle/deal trajectories, and repeated showcase openings with a single view.

## Controls and compatibility

- **D** deals, **I** requests an interpretation, **R** regenerates the stars, **Escape** closes the card viewer.
- Focus the spread canvas and use arrow keys to select a card, then Enter to inspect it. The expandable card list provides ordinary HTML buttons for the same action.
- Reduced-motion preferences skip shuffling/dealing/flipping and stop background and showcase motion.
- Narrow screens use position numbers for the larger spreads; opening a card or expanding the card list shows the full position name.
- The graphics require WebGL 2. If unavailable, the card list, statistics, and interpretation remain usable. Image-load failures retain named placeholders. Artwork is fetched from the existing ImageKit account, which must allow cross-origin texture loading.

## Rendering files

- `phoria-scene.mjs`: shared Phoria views, textures, picking, resizing, animation, and cleanup.
- `scene-layouts.mjs`: world-space spread layouts and reveal poses.
- `card-geometry.mjs`: rounded textured faces and solid card edges.
- `showcase.mjs`: persistent showcase view lifecycle.
- `landing.mjs`: landing scene and entry navigation.
- `tarot.js`: deck, reading state, statistics, API streaming, and accessible controls.
- `vendor/phoria2/`: pinned upstream ES modules and MIT license; see its README for provenance.
