import { rmSync } from 'node:fs';
// Clean generated output so removed pages and newly-drafted stories cannot linger.
rmSync(new URL('../_site/', import.meta.url), { recursive: true, force: true });
