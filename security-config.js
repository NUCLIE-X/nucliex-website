// ============================================================
//  NUCLIEX INFOSYS — Security Configuration
//  File: security-config.js
// ============================================================
//  HOW TO EDIT:
//  ─────────────────────────────────────────────────────────
//  Edit ONLY the values inside this object.
//  After editing, push to GitHub. Cloudflare will redeploy
//  automatically. No other files need to be touched.
//
//  PATTERN GRID REFERENCE:
//    1  2  3
//    4  5  6
//    7  8  9
//
//  To change the unlock pattern, list the node numbers
//  in the order they must be drawn.
// ============================================================

const SECURITY_CONFIG = {

  // ----------------------------------------------------------
  // PATTERN_PASSWORD
  // The sequence of grid nodes (1–9) the user must draw to
  // unlock the website. Order matters.
  //
  // Grid:
  //   1  2  3
  //   4  5  6
  //   7  8  9
  //
  // Default: 7 → 4 → 1 → 2 → 3 → 6 → 5 → 9
  //          (traces an L-shape across the grid)
  //
  // To change: replace the numbers inside the array, e.g.
  //   PATTERN_PASSWORD: [5, 1, 2, 3, 6, 9]
  // ----------------------------------------------------------
  PATTERN_PASSWORD: [7, 4, 1, 2, 3, 6, 5, 9],

  // ----------------------------------------------------------
  // REDIRECT_URL
  // The URL the visitor is sent to after entering the wrong
  // pattern and waiting through the countdown timer.
  //
  // Change this to any valid URL, e.g.:
  //   REDIRECT_URL: "https://google.com"
  // ----------------------------------------------------------
  REDIRECT_URL: "https://www.google.com/search?q=nucliex+infosys&rlz=1C1RXQR_enIN1193IN1193&oq=nucliex+infosys&gs_lcrp=EgZjaHJvbWUqBggAEEUYOzIGCAAQRRg7MgYIARBFGDsyBggCEEUYPDIGCAMQRRg80gEIODgxNWowajeoAgCwAgA&sourceid=chrome&ie=UTF-8",

  // ----------------------------------------------------------
  // PAGE_LOCK_TIME_SECONDS
  // How many seconds after the page loads before the lock
  // screen appears. Locks only ONCE per browser session
  // (state is saved in sessionStorage — clears when tab closes).
  //
  // Set to 0 to disable the auto-lock completely.
  //
  // Examples:
  //   1    = lock after 1 second (current default)
  //   30   = lock after 30 seconds of browsing
  //   0    = never lock automatically
  // ----------------------------------------------------------
  PAGE_LOCK_TIME_SECONDS: 15,

  // ----------------------------------------------------------
  // WARNING_SCREEN_DURATION
  // How many seconds the opening security overlay (the amber
  // "WARNING — Unauthorized access…" screen) is shown when
  // the website first loads, before it fades out automatically.
  // ----------------------------------------------------------
  WARNING_SCREEN_DURATION: 4,

  // ----------------------------------------------------------
  // REDIRECT_COUNTDOWN_SECONDS
  // After a wrong pattern is entered, this is how many seconds
  // the countdown timer runs before the visitor is redirected
  // to REDIRECT_URL. The timer displays with millisecond
  // precision (e.g. "REDIRECTING IN 14.928").
  // ----------------------------------------------------------
  REDIRECT_COUNTDOWN_SECONDS: 15,

};

// ============================================================
//  DO NOT EDIT BELOW THIS LINE
//  Makes the config available to the React app at runtime.
// ============================================================
window.SECURITY_CONFIG = SECURITY_CONFIG;
