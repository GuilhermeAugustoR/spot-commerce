import type { Product } from "@/types";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Camiseta Algodão Pima",
    price: 89.9,
    category: "masculino",
    imageUrl:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop&crop=center",
    description:
      "Camiseta básica 100% algodão pima, confortável e elegante. Perfeita para o dia a dia com toque macio e durabilidade excepcional.",
    colors: ["Branco", "Preto", "Cinza Mescla", "Verde Musgo"],
    sizes: ["P", "M", "G", "GG"],
    rating: 4.7,
    reviews: 120,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1583743814966-8936f37f4678?w=500&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=500&h=600&fit=crop&crop=center",
    ],
    features: [
      "100% Algodão Pima",
      "Corte regular",
      "Gola redonda",
      "Costura reforçada",
    ],
    materials: ["Algodão Pima Premium"],
    careInstructions: [
      "Lavar em água fria",
      "Não usar alvejante",
      "Secar à sombra",
    ],
  },
  {
    id: "2",
    name: "Calça Jeans Slim Black",
    price: 199.9,
    category: "masculino",
    imageUrl:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop&crop=center",
    description:
      "Calça jeans preta com modelagem slim, moderna e versátil. Tecido de alta qualidade com elastano para maior conforto.",
    colors: ["Preto"],
    sizes: ["38", "40", "42", "44"],
    rating: 4.5,
    reviews: 85,
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1506629905607-d405872a4d86?w=500&h=600&fit=crop&crop=center",
    ],
    features: [
      "Modelagem slim",
      "Tecido com elastano",
      "5 bolsos",
      "Lavagem especial",
    ],
    materials: ["98% Algodão", "2% Elastano"],
    careInstructions: ["Lavar do avesso", "Água fria", "Não centrifugar"],
  },
  {
    id: "3",
    name: "Vestido Midi Floral Leve",
    price: 249.9,
    category: "feminino",
    imageUrl:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop&crop=center",
    description:
      "Vestido midi com estampa floral delicada, perfeito para o dia a dia. Tecido leve e fluido com caimento elegante.",
    colors: ["Floral Azul", "Floral Rosa"],
    sizes: ["P", "M", "G"],
    rating: 4.8,
    reviews: 95,
    promotionPrice: 219.9,
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1566479179817-c0b5b4b4b1e8?w=500&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&h=600&fit=crop&crop=center",
    ],
    features: [
      "Tecido fluido",
      "Estampa exclusiva",
      "Manga curta",
      "Comprimento midi",
    ],
    materials: ["100% Viscose"],
    careInstructions: ["Lavar à mão", "Não torcer", "Secar na sombra"],
  },
  {
    id: "4",
    name: "Bolsa Tote de Couro Essencial",
    price: 399.9,
    category: "acessorios",
    imageUrl:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop&crop=center",
    description:
      "Bolsa tote espaçosa em couro legítimo, design minimalista e funcional. Perfeita para o dia a dia profissional.",
    colors: ["Caramelo", "Preto", "Off-white"],
    rating: 4.9,
    reviews: 150,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&h=600&fit=crop&crop=center",
    ],
    features: [
      "Couro legítimo",
      "Design minimalista",
      "Compartimentos internos",
      "Alças reforçadas",
    ],
    materials: ["100% Couro Bovino"],
    careInstructions: [
      "Limpar com pano seco",
      "Usar produtos específicos para couro",
      "Evitar umidade",
    ],
  },
  {
    id: "5",
    name: "Tênis Performance Runner",
    price: 349.9,
    category: "masculino",
    imageUrl:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop&crop=center",
    description:
      "Tênis esportivo com alta performance e conforto para suas atividades físicas. Tecnologia de amortecimento avançada.",
    sizes: ["39", "40", "41", "42", "43"],
    colors: ["Preto/Branco", "Azul Marinho", "Cinza Chumbo"],
    rating: 4.6,
    reviews: 210,
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500&h=600&fit=crop&crop=center",
    ],
    features: [
      "Amortecimento avançado",
      "Respirabilidade",
      "Solado antiderrapante",
      "Design ergonômico",
    ],
    materials: ["Mesh respirável", "EVA", "Borracha"],
    careInstructions: [
      "Lavar com água e sabão neutro",
      "Secar à sombra",
      "Não usar máquina",
    ],
  },
  {
    id: "6",
    name: "Jaqueta Corta-Vento Minimal",
    price: 179.9,
    category: "feminino",
    imageUrl:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop&crop=center",
    description:
      "Jaqueta corta-vento leve e compacta, design minimalista e elegante. Proteção contra vento e chuva leve.",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Preto", "Branco Gelo", "Verde Oliva"],
    rating: 4.3,
    reviews: 70,
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=600&fit=crop&crop=center",
    ],
    features: [
      "Tecido impermeável",
      "Capuz removível",
      "Bolsos com zíper",
      "Ajuste na cintura",
    ],
    materials: ["Poliéster", "Revestimento PU"],
    careInstructions: [
      "Lavar em água fria",
      "Não usar amaciante",
      "Secar pendurado",
    ],
  },
  {
    id: "7",
    name: "Relógio Clássico Couro",
    price: 320.0,
    category: "acessorios",
    imageUrl:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=500&fit=crop&crop=center",
    description:
      "Relógio com design clássico, pulseira de couro legítimo e mostrador minimalista. Movimento de quartzo preciso.",
    colors: [
      "Pulseira Marrom/Mostrador Branco",
      "Pulseira Preta/Mostrador Preto",
    ],
    rating: 4.7,
    reviews: 65,
    images: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=500&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=500&h=600&fit=crop&crop=center",
    ],
    features: [
      "Movimento quartzo",
      "Pulseira de couro",
      "Resistente à água",
      "Design atemporal",
    ],
    materials: ["Aço inoxidável", "Couro legítimo", "Cristal mineral"],
    careInstructions: [
      "Evitar contato com água",
      "Limpar com pano seco",
      "Guardar em local seco",
    ],
  },
  {
    id: "8",
    name: "Saia Midi Plissada",
    price: 159.9,
    category: "feminino",
    imageUrl:
      "https://images.unsplash.com/photo-1583496661160-fb5886a13d27?w=400&h=500&fit=crop&crop=center",
    description:
      "Saia midi plissada com tecido leve e caimento fluido, super versátil. Perfeita para looks elegantes e casuais.",
    sizes: ["PP", "P", "M", "G"],
    colors: ["Preto", "Rosa Chá", "Azul Serenity"],
    rating: 4.4,
    reviews: 55,
    promotionPrice: 139.9,
    images: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a13d27?w=500&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1560243563-062bfc001d68?w=500&h=600&fit=crop&crop=center",
    ],
    features: [
      "Plissado permanente",
      "Cintura alta",
      "Forro interno",
      "Caimento fluido",
    ],
    materials: ["100% Poliéster"],
    careInstructions: [
      "Lavar a seco",
      "Não passar ferro",
      "Pendurar para secar",
    ],
  },
];
