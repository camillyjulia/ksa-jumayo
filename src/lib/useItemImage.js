import { useEffect, useState } from 'react'

const cache = new Map() // link -> url da imagem (ou null)

async function fetchImage(link) {
  if (cache.has(link)) return cache.get(link)
  let image = null
  try {
    const r = await fetch(`/api/og-image?url=${encodeURIComponent(link)}`)
    image = (await r.json()).image || null
  } catch {
    /* sem /api (ex: npm run dev) ou erro: cai no ícone */
  }
  cache.set(link, image)
  return image
}

// Usa image_url do item se existir; senão tenta a foto de cada link, em ordem.
export default function useItemImage(item) {
  const [src, setSrc] = useState(item.image_url || null)

  useEffect(() => {
    if (item.image_url) return setSrc(item.image_url)
    let alive = true
    ;(async () => {
      for (const l of item.links) {
        const img = await fetchImage(l.url)
        if (img) return alive && setSrc(img)
      }
    })()
    return () => { alive = false }
  }, [item.image_url, item.links])

  return src
}