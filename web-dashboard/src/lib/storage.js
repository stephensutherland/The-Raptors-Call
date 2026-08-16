// Minimal storage adapter for the standalone app build.
//
// The admin/onboarding screens were originally written against
// `window.storage` — the key/value API available inside Claude's
// Artifact sandbox. That global does not exist once this code runs
// as a normal deployed website (this Vite app, GitHub Pages, etc.),
// so every window.storage.get/set call would throw.
//
// This adapter keeps the same call shape (`get`/`set` returning
// `{ key, value }` or `null`) but backs it with localStorage, so it
// works in a normal browser tab. It's still per-device, per-browser
// storage, NOT shared across users or devices — see the note below.
//
// This is a stand-in, not a real backend. Vetting records, incident
// logs, etc. still need a real server + auth before this ships to
// actual members — localStorage is single-browser and clears if the
// user clears site data.

const PREFIX = 'raptor:';

export const storage = {
  async get(key) {
    try {
      const raw = window.localStorage.getItem(PREFIX + key);
      if (raw === null) return null;
      return { key, value: raw };
    } catch (e) {
      throw new Error('Storage unavailable: ' + e.message);
    }
  },

  async set(key, value) {
    try {
      window.localStorage.setItem(PREFIX + key, value);
      return { key, value };
    } catch (e) {
      // Most commonly a locked-down/private browser context, or quota
      // exceeded — surface it, never fail silently.
      throw new Error('Storage unavailable: ' + e.message);
    }
  },

  async delete(key) {
    try {
      window.localStorage.removeItem(PREFIX + key);
      return { key, deleted: true };
    } catch (e) {
      throw new Error('Storage unavailable: ' + e.message);
    }
  },
};
