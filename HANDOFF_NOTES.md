# Handoff Notes: Arizona Copper Corridor Business Directory

**Project Goal:** Enhance the static HTML directory site (`freeport-az-directory-site`) by converting research markdown files into an interactive, SEO-optimized website monetized with ads. The site has been rebranded to "Arizona Copper Corridor Business Directory".

**Current Status:**

*   **Directory:** `c:/Users/mnehm/Desktop/cline-workspace/freeport-az-directory-site/`
*   **Core Files:**
    *   HTML pages created: `index.html`, `safford.html`, `morenci.html`, `globe.html`, `wilcox.html`.
    *   Styling: `style.css` (includes basic layout and styles for interactive controls).
    *   Interactivity Script: `interactive.js` (handles search, category filtering, name/category sorting, and dynamic ad placeholder insertion).
    *   SEO Files: `robots.txt`, `sitemap.xml` (with placeholder URLs).
*   **Branding:** Updated titles, descriptions, headers, and footers across all HTML files to "Arizona Copper Corridor Business Directory".
*   **Data Cleaning:** Duplicate business listings (based on `<h3>` tags) were identified and removed from `safford.html` and `morenci.html`. `globe.html` and `wilcox.html` appeared clean.
*   **SEO:**
    *   Basic meta descriptions added to all HTML pages.
    *   `Organization` schema added to `index.html`.
    *   **Partially completed:** `LocalBusiness` schema markup added to listings in `safford.html` up to and including the "Civil & Environmental Consultants, Inc. (CEC)" listing.
*   **Monetization:** Dynamic ad placeholders are inserted by `interactive.js` after every 5 listings on area pages. Actual AdSense code is not yet integrated.
*   **Tooling Note:** The `computer-control` MCP server's `edit-file` tool requires absolute paths to function correctly from this workspace. Cline's built-in `replace_in_file` works with relative paths.

**Immediate Next Step:**

*   Continue **Phase 1: Data Quality & Core SEO**.
*   **Action:** Add `LocalBusiness` schema markup (JSON-LD script blocks) to the remaining listings in `safford.html`, starting with the "Crane Certification Arizona" listing.
*   **Tool Recommendation:** Use the `computer-control` `edit-file` tool with the absolute path (`c:/Users/mnehm/Desktop/cline-workspace/freeport-az-directory-site/safford.html`) or Cline's `replace_in_file` tool. Break into smaller batches if needed.

**Remaining Plan (Overview):**

1.  **Complete Schema:** Add `LocalBusiness` schema to all remaining listings on `safford.html`, and then repeat for `morenci.html`, `globe.html`, and `wilcox.html`.
2.  **Data Verification/Enrichment:** Systematically search for and fill in missing data points (phone, website, address) using web search tools (e.g., `brave_web_search`). Update placeholders for unfindable info.
3.  **AdSense Integration:** Replace placeholders in `interactive.js` with actual AdSense code (requires user-provided details).
4.  **Deployment Prep:** Minify CSS/JS (optional), update URLs in `sitemap.xml` and schema, final review.
5.  **Deployment:** Deploy static files to a hosting provider.
