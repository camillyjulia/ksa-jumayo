// Mesmo formato das tabelas do Supabase (rooms, items, item_links).
// Depois é só trocar por supabase.from('rooms').select(...)

export const rooms = [
  { id: 'cozinha', name: 'Cozinha', icon: 'CookingPot' },
  { id: 'sala', name: 'Sala', icon: 'Sofa' },
  { id: 'quarto', name: 'Quarto', icon: 'BedDouble' },
  { id: 'banheiro', name: 'Banheiro', icon: 'ShowerHead' },
  { id: 'lavanderia', name: 'Lavanderia', icon: 'WashingMachine' },
]

export const items = [
  {
    id: 1, room_id: 'cozinha', name: 'Chaleira elétrica', priority: 'essencial',
    description: 'Inox, 1,7L, desligamento automático.',
    colors: ['preto', 'cinza'],
    links: [
      { store: 'Amazon', url: 'https://amazon.com.br', price: 129.9 },
      { store: 'Magalu', url: 'https://magazineluiza.com.br', price: 149.9 },
    ],
  },
  {
    id: 2, room_id: 'cozinha', name: 'Jogo de panelas', priority: 'essencial',
    description: 'Antiaderente, 5 peças.',
    colors: ['preto', 'vermelho'],
    links: [
      { store: 'Shopee', url: 'https://shopee.com.br', price: 219 },
      { store: 'Amazon', url: 'https://amazon.com.br', price: 289 },
    ],
  },
  {
    id: 3, room_id: 'cozinha', name: 'Jogo de facas', priority: 'legal',
    description: 'Com cepo de madeira.',
    colors: ['madeira'],
    links: [{ store: 'Tramontina', url: 'https://tramontina.com.br', price: 89.9 }],
  },
  {
    id: 4, room_id: 'sala', name: 'Manta de sofá', priority: 'legal',
    description: 'Tricô, 1,5m x 1,2m.',
    colors: ['bege', 'cinza'],
    links: [{ store: 'Shopee', url: 'https://shopee.com.br', price: 59.9 }],
  },
  {
    id: 5, room_id: 'sala', name: 'Luminária de chão', priority: 'legal',
    description: 'Estilo minimalista com cúpula de tecido.',
    colors: ['branco', 'madeira'],
    links: [
      { store: 'Leroy Merlin', url: 'https://leroymerlin.com.br', price: 189 },
      { store: 'Amazon', url: 'https://amazon.com.br', price: 229 },
    ],
  },
  {
    id: 6, room_id: 'quarto', name: 'Jogo de cama queen', priority: 'essencial',
    description: 'Algodão 200 fios, 4 peças.',
    colors: ['branco', 'azul'],
    links: [{ store: 'Camicado', url: 'https://camicado.com.br', price: 249.9 }],
  },
  {
    id: 7, room_id: 'banheiro', name: 'Jogo de toalhas', priority: 'essencial',
    description: '5 peças, 100% algodão.',
    colors: ['branco', 'cinza', 'azul'],
    links: [
      { store: 'Amazon', url: 'https://amazon.com.br', price: 119.9 },
      { store: 'Magalu', url: 'https://magazineluiza.com.br', price: 139 },
    ],
  },
  {
    id: 8, room_id: 'lavanderia', name: 'Cesto de roupa', priority: 'legal',
    description: 'Dobrável, 60L.',
    colors: ['bege', 'cinza'],
    links: [{ store: 'Shopee', url: 'https://shopee.com.br', price: 44.9 }],
  },
]