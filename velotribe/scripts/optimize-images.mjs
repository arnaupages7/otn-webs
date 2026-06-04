// optimize-images.mjs
// Redimensiona i comprimeix totes les fotos de /public/hosts/
// Ús: node scripts/optimize-images.mjs
// Ús per a un host concret: node scripts/optimize-images.mjs casa-gessami

import sharp from 'sharp'
import { readdir, stat, rename, writeFile, unlink } from 'fs/promises'
import { join, extname } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC_DIR = join(__dirname, '..', 'public')
const HOSTS_DIR = join(PUBLIC_DIR, 'hosts')
const PROVIDERS_DIR = join(PUBLIC_DIR, 'providers')

const MAX_WIDTH = 1920
const MAX_HEIGHT = 1920
const QUALITY = 82        // JPEG quality (80-85 és el sweet spot web)
const EXTS = new Set(['.jpg', '.jpeg', '.png'])

async function getFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...await getFiles(full))
    } else if (EXTS.has(extname(entry.name).toLowerCase())) {
      files.push(full)
    }
  }
  return files
}

async function optimizeFile(filePath) {
  const before = (await stat(filePath)).size
  const img = sharp(filePath)
  const meta = await img.metadata()

  // Saltar si les dimensions ja són correctes i el pes és raonable per web (< 700KB)
  if (meta.width <= MAX_WIDTH && meta.height <= MAX_HEIGHT && before < 700_000) {
    return { path: filePath, skipped: true, before }
  }

  const ext = extname(filePath).toLowerCase()
  let pipeline = img
    .rotate() // auto-rotate based on EXIF
    .resize(MAX_WIDTH, MAX_HEIGHT, { fit: 'inside', withoutEnlargement: true })

  if (ext === '.png') {
    pipeline = pipeline.png({ quality: QUALITY, compressionLevel: 9 })
  } else {
    pipeline = pipeline.jpeg({ quality: QUALITY, mozjpeg: true })
  }

  const buffer = await pipeline.toBuffer()

  // Escriure a fitxer temporal i fer rename (evita conflictes OneDrive/Windows)
  const tmpPath = filePath + '.tmp'
  await writeFile(tmpPath, buffer)
  try {
    await unlink(filePath)
  } catch { /* ignore */ }
  await rename(tmpPath, filePath)

  const after = buffer.length
  return { path: filePath, skipped: false, before, after }
}

async function main() {
  const filterHost = process.argv[2] // optional: only process one host

  // Recollir fitxers de /hosts/ i /providers/
  const hostsFiles = await getFiles(HOSTS_DIR).catch(() => [])
  const providersFiles = await getFiles(PROVIDERS_DIR).catch(() => [])
  let files = [...hostsFiles, ...providersFiles]

  if (filterHost) {
    files = files.filter(f => f.includes(filterHost))
    if (files.length === 0) {
      console.error(`No s'han trobat fotos per a: ${filterHost}`)
      process.exit(1)
    }
    console.log(`Optimitzant ${files.length} fotos de "${filterHost}"...`)
  } else {
    console.log(`Optimitzant ${files.length} fotos de tots els hosts...`)
  }

  let totalBefore = 0, totalAfter = 0, skipped = 0

  for (const file of files) {
    const result = await optimizeFile(file)
    const rel = file.replace(HOSTS_DIR, '')
    if (result.skipped) {
      skipped++
      console.log(`  ⏭  ${rel}  (ja optimitzada, ${(result.before / 1024).toFixed(0)}KB)`)
    } else {
      const pct = Math.round((1 - result.after / result.before) * 100)
      totalBefore += result.before
      totalAfter += result.after
      console.log(`  ✓  ${rel}  ${(result.before/1024/1024).toFixed(1)}MB → ${(result.after/1024).toFixed(0)}KB  (-${pct}%)`)
    }
  }

  if (totalBefore > 0) {
    const saved = totalBefore - totalAfter
    console.log(`\n✅ Estalvi total: ${(totalBefore/1024/1024).toFixed(1)}MB → ${(totalAfter/1024/1024).toFixed(1)}MB  (-${(saved/1024/1024).toFixed(1)}MB, -${Math.round(saved/totalBefore*100)}%)`)
  }
  if (skipped > 0) console.log(`   ${skipped} fotos ja eren prou petites, saltades.`)
}

main().catch(err => { console.error(err); process.exit(1) })
