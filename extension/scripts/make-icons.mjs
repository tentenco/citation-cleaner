// Generates the extension's PNG icons with no image dependencies.
// Brand-blue rounded tile with a white "broom sweep" diagonal mark.
import { deflateSync } from "node:zlib";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const BLUE = [2, 74, 216];
const WHITE = [255, 255, 255];

const crcTable = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i += 1) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type, "ascii");
  const body = Buffer.concat([typeBuf, data]);
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([length, body, crc]);
}

function encodePng(size, pixelAt) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA

  const raw = Buffer.alloc(size * (size * 4 + 1));
  let offset = 0;
  for (let y = 0; y < size; y += 1) {
    raw[offset] = 0; // no filter
    offset += 1;
    for (let x = 0; x < size; x += 1) {
      const [r, g, b, a] = pixelAt(x, y, size);
      raw[offset] = r;
      raw[offset + 1] = g;
      raw[offset + 2] = b;
      raw[offset + 3] = a;
      offset += 4;
    }
  }

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw)),
    chunk("IEND", Buffer.alloc(0))
  ]);
}

function pixelAt(x, y, size) {
  const r = size * 0.18; // corner radius
  // Rounded-corner mask.
  const inCorner = (cx, cy) => Math.hypot(x - cx, y - cy) > r;
  if (
    (x < r && y < r && inCorner(r, r)) ||
    (x > size - r && y < r && inCorner(size - r, r)) ||
    (x < r && y > size - r && inCorner(r, size - r)) ||
    (x > size - r && y > size - r && inCorner(size - r, size - r))
  ) {
    return [0, 0, 0, 0];
  }

  // White broom sweep: a thick diagonal band across the tile.
  const t = (x + (size - y)) / (size * 2); // 0..1 along the anti-diagonal
  if (t > 0.4 && t < 0.6) {
    return [...WHITE, 255];
  }
  return [...BLUE, 255];
}

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, "..", "icons");
mkdirSync(outDir, { recursive: true });

for (const size of [16, 32, 48, 128]) {
  const png = encodePng(size, pixelAt);
  writeFileSync(join(outDir, `icon${size}.png`), png);
  console.log(`wrote icons/icon${size}.png (${png.length} bytes)`);
}
