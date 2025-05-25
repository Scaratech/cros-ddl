import { readFileSync } from 'fs';
import { resolve } from 'path';

const config = JSON.parse(readFileSync(resolve(process.cwd(), 'test/config.json'), 'utf-8'));
const base = 'http://localhost:3000';

async function test(path, query) {
    const url = `${base}${path}?${new URLSearchParams(query).toString()}`;

    const res = await fetch(url);
    const text = await res.text();

    console.log(`[${res.status}] ${url} → ${text.length} bytes`);
}

console.log('Testing /shim');
for (const q of config.shim) {
    await test('/shim', q);
}

console.log('Testing /reco');
for (const q of config.reco) {
    await test('/reco', q);
}