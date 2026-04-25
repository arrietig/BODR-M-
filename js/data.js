/* ============================================
   BODRÜM · Datos reales
   Moneda: Guaraníes (Gs.) — Paraguay
   ============================================ */

/* ---------- MENÚ DE SERVICIOS (acordeón) ---------- */
const BODRUM_MENU = [
  {
    id: 'manicura',
    title: 'Manicura',
    icon: '💅',
    img: 'assets/img/cat-manicura.jpg',
    groups: [
      {
        label: null,
        items: [
          { name: 'Spa de Manos', desc: 'Exfoliación, hidratación, sales marinas y bombas efervescentes', price: 100000 },
          { name: 'Spa de Parafina', desc: null, price: 70000 },
          { name: 'Manicura con Esmaltado Tradicional', desc: null, price: 75000 },
          { name: 'Manicura con Esmaltado Semi (un solo tono)', desc: null, price: 110000 },
          { name: 'Manicura con Esmaltado Semi', desc: null, price: 120000 },
          { name: 'Manicura con Esmaltado Semi + Francesita', desc: null, price: 130000 },
        ]
      },
      {
        label: 'Capping',
        items: [
          { name: 'Manicura + Capping en Polygel Nude', desc: null, price: 180000 },
          { name: 'Manicura + Capping en Polygel + Esmaltado', desc: null, price: 240000 },
          { name: 'Manicura + Capping en Gel + Esmaltado un solo tono', desc: null, price: 170000 },
          { name: 'Capping de Acrílico Nude o Vía Láctea', desc: null, price: 200000 },
          { name: 'Capping de Acrílico + Esmaltado un solo tono / Francesita', desc: null, price: 260000 },
          { name: 'Reconstrucción por uña', desc: null, price: 25000 },
        ]
      },
      {
        label: 'Extensiones de Uñas',
        items: [
          { name: 'Extensiones Soft Gel un solo tono', desc: null, price: 170000 },
          { name: 'Soft Gel + Francesita', desc: null, price: 190000 },
          { name: 'Esculpidas en Polygel Nude o Vía Láctea', desc: null, price: 200000 },
          { name: 'Esculpidas en Polygel + Esmaltado', desc: null, price: 260000 },
          { name: 'Esculpidas en Acrílico Nude', desc: null, price: 230000 },
          { name: 'Esculpidas en Acrílico + Vía Láctea', desc: null, price: 230000 },
          { name: 'Esculpidas en Acrílico + Esmaltado un sólo tono', desc: null, price: 290000 },
          { name: 'Esculpidas en Acrílico + Francesita', desc: null, price: 290000 },
          { name: 'Esculpidas en Babyboomer', desc: null, price: 300000 },
        ]
      },
      {
        label: 'Apliques y Efectos',
        note: 'El costo de apliques, diseños y efectos tienen costo adicional.',
        items: [
          { name: 'Piedritas / Flores / Caviar (apliques)', desc: null, price: 15000 },
          { name: 'Flores 3D / Relieves (por uña)', desc: null, price: 30000 },
          { name: 'Efecto Aurora / Perla / Cromado / Espejo / Ojo de gato', desc: null, price: 30000 },
        ]
      },
      {
        label: 'Extracciones',
        items: [
          { name: 'Extracción de Esculpidas de Nuestro Salón', desc: null, price: 50000 },
          { name: 'Extracción de Esculpidas de Otro Salón', desc: null, price: 70000 },
          { name: 'Extracción de Semi de Nuestro Salón', desc: null, price: 20000 },
          { name: 'Extracción de Semi de Otro Salón', desc: null, price: 30000 },
          { name: 'Extracción de Semi en Pies de Otro Salón', desc: null, price: 25000 },
          { name: 'Extracción de Reconstrucciones', desc: null, price: 25000 },
        ]
      }
    ]
  },
  {
    id: 'pedicura',
    title: 'Pedicura',
    icon: '🦶',
    img: 'assets/img/cat-pedicura.jpg',
    groups: [
      {
        label: null,
        items: [
          { name: 'Pedicura Básica', desc: 'Raspado de talón e hidratación + esmaltado tradicional', price: 95000 },
          { name: 'Pedicura Básica + Semi', desc: 'Raspado de talón e hidratación + esmaltado semi', price: 120000 },
        ]
      },
      {
        label: 'Spa de Pies',
        items: [
          { name: 'Spa de Pies', desc: 'Limpieza, raspado de talón, exfoliación e hidratación + esmaltado semi', price: 170000 },
          { name: 'Spa de Pies Premium', desc: 'Limpieza profunda, remoción de callosidades, raspado de talón, exfoliación, hidratación, esmaltado semi', price: 220000 },
          { name: 'Jelly Spa', desc: null, price: 50000 },
          { name: 'Parafina', desc: null, price: 80000 },
        ]
      },
      {
        label: 'Adicionales',
        items: [
          { name: 'Extracción de Uñas Encarnadas', desc: null, price: 50000 },
          { name: 'Acripies', desc: null, price: 220000 },
          { name: 'Reconstrucción por uña', desc: null, price: 25000 },
        ]
      }
    ]
  },
  {
    id: 'pestanas',
    title: 'Extensiones de Pestañas',
    icon: '👁',
    img: 'assets/img/cat-pestanas.jpg',
    groups: [
      {
        label: 'Set completo',
        note: 'Los service se realizan a los 20 días máximo, de lo contrario se realiza un nuevo set.',
        items: [
          { name: 'Semi Tupidas', desc: null, price: 250000 },
          { name: 'Volumen Brasilero', desc: null, price: 250000 },
          { name: 'Efecto Aura', desc: null, price: 280000 },
          { name: 'Mega Volumen Brasilero', desc: null, price: 280000 },
          { name: 'Efecto Foxy', desc: null, price: 300000 },
          { name: 'Pestañas por Punto (3 tipos)', desc: null, price: 60000 },
        ]
      },
      {
        label: 'Service (Relleno)',
        items: [
          { name: 'Semi Tupidas', desc: null, price: 200000 },
          { name: 'Volumen Brasilero', desc: null, price: 200000 },
          { name: 'Efecto Aura', desc: null, price: 240000 },
          { name: 'Mega Volumen Brasilero', desc: null, price: 240000 },
          { name: 'Efecto Foxy', desc: null, price: 250000 },
        ]
      }
    ]
  },
  {
    id: 'maquillaje',
    title: 'Make Up Artist',
    icon: '✨',
    img: 'assets/img/cat-maquillaje.jpg',
    groups: [
      {
        label: null,
        note: 'Todos los servicios de maquillaje ya incluyen pestañas 3D.',
        items: [
          { name: 'Maquillaje Express', desc: null, price: 180000 },
          { name: 'Maquillaje Social', desc: null, price: 250000 },
          { name: 'Maquillaje Glam', desc: null, price: 280000 },
          { name: 'Maquillaje Blindado', desc: null, price: 380000 },
        ]
      }
    ]
  },
  {
    id: 'cejas',
    title: 'Cejas & Henna',
    icon: '🤎',
    img: 'assets/img/cat-cejas.jpg',
    groups: [
      {
        label: 'Servicios de Cejas',
        items: [
          { name: 'Epilación por zonas del rostro', desc: null, price: 25000 },
          { name: 'Perfilado de cejas', desc: null, price: 30000 },
          { name: 'Epilación con hilo', desc: null, price: 50000 },
          { name: 'Henna', desc: null, price: 50000 },
          { name: 'Diseño + Epilación', desc: null, price: 110000 },
          { name: 'Diseño + Epilación + Henna', desc: null, price: 155000 },
          { name: 'Laminado de Cejas', desc: null, price: 150000 },
          { name: 'Diseño + Epilación + Henna + Laminado', desc: null, price: 270000 },
        ]
      }
    ]
  },
  {
    id: 'micropig',
    title: 'Micropigmentación',
    icon: '🖊',
    img: 'assets/img/cat-micropig.jpg',
    groups: [
      {
        label: 'Micropigmentación de Cejas (Microshadow)',
        items: [
          { name: 'Primera sesión', desc: null, price: 800000 },
          { name: 'Retoque a los 40 días', desc: null, price: 300000 },
        ]
      },
      {
        label: 'Microlips',
        items: [
          { name: 'Consultar precio', desc: 'Comunícate con nosotras para más info', price: null },
        ]
      }
    ]
  }
];

/* ---------- SERVICIOS para el formulario de reserva ---------- */
const BODRUM_SERVICES = [
  { id: 'n1', cat: 'nails',   name: 'Manicura con Esmaltado Tradicional', price: 75000 },
  { id: 'n2', cat: 'nails',   name: 'Manicura con Esmaltado Semi',        price: 120000 },
  { id: 'n3', cat: 'nails',   name: 'Manicura + Capping Polygel',         price: 180000 },
  { id: 'n4', cat: 'nails',   name: 'Esculpidas en Acrílico',             price: 230000 },
  { id: 'n5', cat: 'nails',   name: 'Esculpidas en Babyboomer',           price: 300000 },
  { id: 'p1', cat: 'nails',   name: 'Pedicura Básica',                    price: 95000 },
  { id: 'p2', cat: 'nails',   name: 'Spa de Pies',                        price: 170000 },
  { id: 'p3', cat: 'nails',   name: 'Spa de Pies Premium',                price: 220000 },
  { id: 'l1', cat: 'lashes',  name: 'Extensiones Semi Tupidas',           price: 250000 },
  { id: 'l2', cat: 'lashes',  name: 'Volumen Brasilero',                  price: 250000 },
  { id: 'l3', cat: 'lashes',  name: 'Efecto Foxy',                        price: 300000 },
  { id: 'b1', cat: 'brows',   name: 'Diseño + Epilación de Cejas',        price: 110000 },
  { id: 'b2', cat: 'brows',   name: 'Laminado de Cejas',                  price: 150000 },
  { id: 'b3', cat: 'brows',   name: 'Diseño + Epilación + Henna',         price: 155000 },
  { id: 'm1', cat: 'makeup',  name: 'Maquillaje Express',                 price: 180000 },
  { id: 'm2', cat: 'makeup',  name: 'Maquillaje Social',                  price: 250000 },
  { id: 'm3', cat: 'makeup',  name: 'Maquillaje Glam',                    price: 280000 },
  { id: 'mp1', cat: 'micropig', name: 'Microshadow (primera sesión)',      price: 800000 },
];

/* ---------- ESPECIALISTAS ---------- */
const BODRUM_SPECIALISTS = [
  { id: 'any', name: 'Sin preferencia', role: 'La primera disponible', avatar: '' },
  { id: 's1',  name: 'Camila',          role: 'Nail artist',           avatar: 'assets/img/team-1.jpg' },
  { id: 's2',  name: 'Valentina',       role: 'Lash expert',           avatar: 'assets/img/team-2.jpg' },
  { id: 's3',  name: 'Andrea',          role: 'Brow & facial',         avatar: 'assets/img/team-3.jpg' },
  { id: 's4',  name: 'Luciana',         role: 'Nail artist',           avatar: 'assets/img/team-4.jpg' },
];

/* ---------- PRODUCTOS ---------- */
const BODRUM_PRODUCTS = [
  {
    id: 'p1',
    name: "L'Oréal Professionnel Vitamino Color",
    brand: "Serie Expert",
    img: 'assets/img/hero-6.jpg',
    desc: "Línea diseñada profesionalmente para proteger, nutrir y dar brillo al cabello teñido o con mechas. Su fórmula con Resveratrol previene la decoloración hasta por 100 días, manteniendo el color vibrante, suave y fuerte desde la raíz a las puntas."
  },
  {
    id: 'p2',
    name: "O · P · I  Pro Spa",
    brand: "OPI Professional",
    img: 'assets/img/products.jpg',
    desc: "Línea profesional de cuidado especializado para manos, pies y uñas. Formulada con aceite de cáñamo y aceite de almendra dulce, nutre profundamente las cutículas, suaviza la piel y fortalece las uñas desde adentro."
  },
  {
    id: 'p3',
    name: "Dior Esmaltes",
    brand: "Dior Beauty",
    img: 'assets/img/products-2.jpg',
    desc: "Los esmaltes Dior Vernis son la expresión más refinada del lujo en el cuidado de uñas. Con fórmula de larga duración, cada tono ofrece cobertura uniforme, acabado impecable y brillo digno de alta costura."
  },
];

/* ---------- FORMATO ---------- */
const BODRUM_CURRENCY = 'Gs.';
const BODRUM_FMT = (n) => n ? BODRUM_CURRENCY + ' ' + Number(n).toLocaleString('es-PY') : 'Consultar';
