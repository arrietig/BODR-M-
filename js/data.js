/* ============================================
   BODRÜM · Datos (placeholders)
   Reemplazar con la información real más adelante
   Moneda: Guaraníes (Gs.) — Paraguay
   ============================================ */

const BODRUM_SERVICES = [
  { id: 'n1', cat: 'nails',  name: 'Manicure clásica',        desc: 'Cuidado integral de uñas con esmaltado tradicional.', price: 60000,  img: 'assets/img/s-nails-1.jpg' },
  { id: 'n2', cat: 'nails',  name: 'Manicure semipermanente', desc: 'Acabado brillante y duradero por semanas.',           price: 90000,  img: 'assets/img/s-nails-2.jpg' },
  { id: 'n3', cat: 'nails',  name: 'Uñas acrílicas',          desc: 'Extensión con diseño y durabilidad premium.',         price: 150000, img: 'assets/img/s-nails-3.jpg' },
  { id: 'n4', cat: 'nails',  name: 'Pedicure spa',            desc: 'Exfoliación, hidratación y esmaltado.',               price: 80000,  img: 'assets/img/s-nails-4.jpg' },
  { id: 'l1', cat: 'lashes', name: 'Lifting de pestañas',     desc: 'Curvatura natural y duradera sin extensiones.',       price: 130000, img: 'assets/img/s-lashes-1.jpg' },
  { id: 'l2', cat: 'lashes', name: 'Extensiones pelo a pelo', desc: 'Mirada natural, ligera y definida.',                  price: 220000, img: 'assets/img/s-lashes-2.jpg' },
  { id: 'l3', cat: 'lashes', name: 'Volumen ruso',            desc: 'Mirada densa y dramática con abanicos finos.',        price: 280000, img: 'assets/img/s-lashes-3.jpg' },
  { id: 'b1', cat: 'brows',  name: 'Diseño de cejas',         desc: 'Depilación y diseño personalizado.',                  price: 50000,  img: 'assets/img/s-brows-1.jpg' },
  { id: 'b2', cat: 'brows',  name: 'Laminado de cejas',       desc: 'Cejas pobladas, peinadas y fijadas.',                 price: 120000, img: 'assets/img/s-brows-2.jpg' },
  { id: 'f1', cat: 'facial', name: 'Limpieza facial profunda',desc: 'Piel renovada, luminosa y descongestionada.',         price: 200000, img: 'assets/img/s-facial-1.jpg' },
  { id: 'f2', cat: 'facial', name: 'Hidrafacial',             desc: 'Hidratación intensa con tecnología avanzada.',        price: 300000, img: 'assets/img/s-facial-2.jpg' },
];

const BODRUM_SPECIALISTS = [
  { id: 'any', name: 'Sin preferencia', role: 'La primera disponible', avatar: '' },
  { id: 's1',  name: 'Camila',          role: 'Nail artist',           avatar: 'assets/img/team-1.jpg' },
  { id: 's2',  name: 'Valentina',       role: 'Lash expert',           avatar: 'assets/img/team-2.jpg' },
  { id: 's3',  name: 'Andrea',          role: 'Brow & facial',         avatar: 'assets/img/team-3.jpg' },
  { id: 's4',  name: 'Luciana',         role: 'Nail artist',           avatar: 'assets/img/team-4.jpg' },
];

const BODRUM_PRODUCTS = [
  {
    id: 'p1',
    name: "L'Oréal Professionnel Vitamino Color",
    brand: "Serie Expert",
    img: 'assets/img/hero-6.jpg',
    desc: "Línea diseñada profesionalmente para proteger, nutrir y dar brillo al cabello teñido o con mechas. Su fórmula con Resveratrol (o ácido ferúlico/cítrico en versiones Spectrum) previene la decoloración hasta por 100 días, manteniendo el color vibrante, suave y fuerte desde la raíz a las puntas."
  },
  {
    id: 'p2',
    name: "O · P · I  Pro Spa",
    brand: "OPI Professional",
    img: 'assets/img/products.jpg',
    desc: "Línea profesional de cuidado especializado para manos, pies y uñas. Formulada con aceite de cáñamo y aceite de almendra dulce, nutre profundamente las cutículas, suaviza la piel y fortalece las uñas desde adentro. Sus tratamientos — cremas hidratantes, aceites de cutículas y exfoliantes — restauran la suavidad y el brillo natural, siendo el estándar de oro en manicuras y pedicuras de salón a nivel mundial."
  },
  {
    id: 'p3',
    name: "Dior Esmaltes",
    brand: "Dior Beauty",
    img: 'assets/img/products-2.jpg',
    desc: "Los esmaltes Dior Vernis son la expresión más refinada del lujo en el cuidado de uñas. Con una fórmula de larga duración, cada tono ofrece una cobertura uniforme, acabado impecable y un brillo digno de alta costura. Inspirados en las colecciones de moda de la Maison Dior, sus colores — desde los clásicos nude y rojo hasta las propuestas más atrevidas — transforman cada manicura en una obra de arte sofisticada."
  },
];

const BODRUM_CURRENCY = 'Gs.';
// Formato miles con punto (estilo Paraguay: 150.000)
const BODRUM_FMT = (n) => BODRUM_CURRENCY + ' ' + Number(n).toLocaleString('es-PY');
