// Usa `npm run generate:blog -- <URL>` para crear nuevos artículos automáticamente.
// Este archivo se genera automáticamente. No editar manualmente.
import { normalizeBlogCountryCode, resolvePostCountryCode } from './countryBlogs';

export type BlogLanguage = 'es' | 'en' | 'fr' | 'de' | 'pt' | 'it' | 'nl' | 'sv';

export type StaticBlogPost = {
  slug: string;
  title: string;
  summary: string;
  content: string;
  language: BlogLanguage;
  publishedAt: string; // ISO date string
  countryCode?: string;
  heroImageUrl?: string;
  readingMinutes?: number;
  seoTitle?: string;
  seoDescription?: string;
  sourceUrl?: string;
};

type StaticBlogPostInput = Omit<StaticBlogPost, 'language'> & {
  language?: string;
};

// Import individual post files (auto-generated)
import post1 from './posts/120-000-viviendas-publicas-que-significa-para-ti-como-inquilino.js';
import post2 from './posts/13-000-pisos-de-la-sareb-en-cataluna-que-significa-para-ti.js';
import post3 from './posts/13-000-pisos-para-inquilinos-una-oportunidad-real-para-protegerte.js';
import post4 from './posts/20-000-viviendas-en-andalucia-que-significa-para-inquilinos-vulnerables.js';
import post5 from './posts/2026-el-ano-decisivo-para-inquilinos-con-contratos-de-alquiler.js';
import post6 from './posts/2026-y-el-alquiler-como-proteger-tus-derechos-y-ahorrar-en-vivienda.js';
import post7 from './posts/2026-y-el-alquiler-como-proteger-tus-derechos-y-ahorrar.js';
import post8 from './posts/21-viviendas-protegidas-en-sevilla-una-esperanza-para-inquilinos-vulnerables.js';
import post9 from './posts/214-000-viviendas-que-significa-para-inquilinos-vulnerables.js';
import post10 from './posts/3-claves-inmobiliarias-para-inquilinos-que-luchan-con-el-alquiler.js';
import post11 from './posts/352-casas-vacias-en-andalucia-que-significa-para-ti-como-inquilino.js';
import post12 from './posts/378-pisos-asequibles-en-madrid-una-oportunidad-para-inquilinos-vulnerables.js';
import post13 from './posts/39-pisos-para-jovenes-en-valencia-una-esperanza-para-inquilinos-vulnerables.js';
import post14 from './posts/4-000-viviendas-publicas-en-2026-una-esperanza-para-inquilinos-vulnerables.js';
import post15 from './posts/6000-para-reformar-tu-hogar-guia-practica-para-inquilinos-vulnerables.js';
import post16 from './posts/75-millones-para-vivienda-que-significa-para-ti-como-inquilino.js';
import post17 from './posts/75-viviendas-asequibles-en-valencia-una-esperanza-para-inquilinos-vulnerables.js';
import post18 from './posts/a-importancia-da-leitura-para-inquilinos-em-portugal.js';
import post19 from './posts/aardbevingsschade-in-drenthe-wat-huurders-moeten-weten.js';
import post20 from './posts/abnahmeklausel-und-baumangel-rechte-fur-wohnungseigentumer.js';
import post21 from './posts/abogado-condenado-por-apropiacion-que-hacer-si-desconfias-de-tu-gestor.js';
import post22 from './posts/abono-unico-de-transporte-ahorro-y-proteccion-para-inquilinos-vulnerables.js';
import post23 from './posts/acciones-legales-para-inquilinos-en-espana-guia-practica.js';
import post24 from './posts/acquisto-auto-usata-cosa-sapere-per-evitare-truffe.js';
import post25 from './posts/addebito-diretto-tasse-cosa-cambia-per-chi-affitta-casa.js';
import post26 from './posts/addressing-housing-challenges-practical-guidance-for-european-renters.js';
import post27 from './posts/adelantar-cribados-de-cancer-de-mama-impacto-para-mujeres-y-sistema.js';
import post28 from './posts/affitti-a-milano-durante-la-design-week-cosa-sapere-e-come-tutelarsi.js';
import post29 from './posts/affitti-e-diritti-degli-inquilini-in-italia-guida-pratica.js';
import post30 from './posts/affitti-e-mercato-immobiliare-in-italia-cosa-devono-sapere-gli-inquilini.js';
import post31 from './posts/affitti-e-mercato-immobiliare-in-italia-sfide-e-soluzioni-per-gli-inquilini.js';
import post32 from './posts/affitti-e-sfratti-in-italia-come-tutelarsi-in-tempi-difficili.js';
import post33 from './posts/affitti-e-sfratti-in-italia-cosa-devono-sapere-gli-inquilini.js';
import post34 from './posts/affitti-e-sfratti-in-italia-cosa-sapere-come-inquilino.js';
import post35 from './posts/affitti-e-sfratti-in-italia-cosa-sapere-e-come-difendersi.js';
import post36 from './posts/affitti-e-sfratti-in-italia-cosa-sapere-e-come-tutelarsi.js';
import post37 from './posts/affitti-in-italia-come-affrontare-il-caro-casa-e-i-diritti-degli-inquilini.js';
import post38 from './posts/affitti-in-italia-come-affrontare-il-caro-casa-e-i-rischi-di-sfratto.js';
import post39 from './posts/affitti-in-italia-come-affrontare-il-caro-casa-e-tutelare-i-tuoi-diritti.js';
import post40 from './posts/affitti-in-italia-come-affrontare-la-pressione-abitativa-oggi.js';
import post41 from './posts/affitti-in-italia-come-difendersi-da-caro-affitti-e-sfratti.js';
import post42 from './posts/affitti-in-italia-come-difendersi-da-sfratti-e-caro-affitti.js';
import post43 from './posts/affitti-in-italia-come-difendersi-dall-aumento-e-dallo-sfratto.js';
import post44 from './posts/affitti-in-italia-come-gestire-il-caro-casa-e-proteggere-il-tuo-budget.js';
import post45 from './posts/affitti-in-italia-come-tutelarsi-contro-il-caro-affitti-e-lo-sfratto.js';
import post46 from './posts/affitti-in-italia-come-tutelarsi-dalle-difficolta-abitative.js';
import post47 from './posts/affitti-in-italia-come-tutelarsi-in-tempi-di-caro-casa.js';
import post48 from './posts/affitti-in-italia-diritti-sfide-e-soluzioni-per-gli-inquilini.js';
import post49 from './posts/affitti-insostenibili-e-condizioni-precarie-la-realta-dei-braccianti-in-italia.js';
import post50 from './posts/affitto-e-diritti-dell-inquilino-come-tutelarsi-nel-mercato-immobiliare-italiano.js';
import post51 from './posts/affitto-e-sfratti-in-italia-cosa-fare-sotto-pressione-abitativa.js';
import post52 from './posts/affordable-housing-in-zurich-what-tenants-should-know.js';
import post53 from './posts/agressie-door-familie-in-verpleeghuizen-wat-huurders-kunnen-leren.js';
import post54 from './posts/ahorra-en-tu-alquiler-y-gastos-nuevas-deducciones-en-andalucia-2026.js';
import post55 from './posts/ahorra-y-protege-tu-alquiler-claves-fiscales-para-inquilinos-en-diciembre.js';
import post56 from './posts/ahorra-y-protege-tu-alquiler-como-comparar-precios-te-beneficia.js';
import post57 from './posts/ahorra-y-protege-tu-alquiler-lo-que-debes-saber-sobre-reformas-y-deducciones.js';
import post58 from './posts/airbnb-multada-claves-para-proteger-tu-alquiler-y-ahorrar.js';
import post59 from './posts/airbnb-multado-que-significa-para-ti-como-inquilino-vulnerable.js';
import post60 from './posts/akteneinsicht-bei-der-lokalbaukommission-in-munchen-was-mieter-wissen-sollten.js';
import post61 from './posts/aktien-im-alter-so-erganzen-dividenden-ihre-rente.js';
import post62 from './posts/aktienrente-per-tarif-was-mieter-innen-wissen-sollten.js';
import post63 from './posts/alerta-inquilinos-como-evitar-subidas-sorpresa-en-tu-alquiler.js';
import post64 from './posts/alicante-limita-viviendas-turisticas-que-significa-para-inquilinos-vulnerables.js';
import post65 from './posts/alicante-y-costa-blanca-oportunidades-y-derechos-para-inquilinos-vulnerables.js';
import post66 from './posts/alloggi-popolari-e-affitti-come-affrontare-la-crisi-abitativa-in-italia.js';
import post67 from './posts/alquilar-con-inteligencia-protege-tus-derechos-y-ahorra-en-vivienda.js';
import post68 from './posts/alquilar-en-espana-por-que-es-tan-dificil-y-como-protegerte.js';
import post69 from './posts/alquilar-o-comprar-guia-para-inquilinos-en-tiempos-dificiles.js';
import post70 from './posts/alquilar-o-comprar-guia-para-inquilinos-vulnerables-en-espana.js';
import post71 from './posts/alquiler-2026-como-proteger-tus-derechos-y-ahorrar-en-la-subida.js';
import post72 from './posts/alquiler-al-limite-como-proteger-tus-derechos-y-ahorrar-hoy.js';
import post73 from './posts/alquiler-alto-y-derechos-guia-para-inquilinos-vulnerables-en-espana.js';
import post74 from './posts/alquiler-asequible-en-asturias-una-esperanza-para-inquilinos-vulnerables.js';
import post75 from './posts/alquiler-asequible-en-madrid-una-luz-para-inquilinos-vulnerables.js';
import post76 from './posts/alquiler-asequible-en-madrid-una-oportunidad-para-inquilinos-vulnerables.js';
import post77 from './posts/alquiler-asequible-en-toledo-una-oportunidad-para-inquilinos-vulnerables.js';
import post78 from './posts/alquiler-con-opcion-a-compra-una-esperanza-para-inquilinos-vulnerables.js';
import post79 from './posts/alquiler-con-opcion-a-compra-una-esperanza-real-para-inquilinos-vulnerables.js';
import post80 from './posts/alquiler-en-2026-como-protegerte-y-ahorrar-en-la-crisis-de-vivienda.js';
import post81 from './posts/alquiler-en-2026-como-protegerte-y-ahorrar-en-plena-emergencia.js';
import post82 from './posts/alquiler-en-andalucia-como-protegerte-ante-la-subida-de-precios.js';
import post83 from './posts/alquiler-en-andalucia-como-protegerte-y-ahorrar-con-la-bajada-de-precios.js';
import post84 from './posts/alquiler-en-andalucia-donde-encontrar-pisos-mas-asequibles-en-2026.js';
import post85 from './posts/alquiler-en-andalucia-nuevas-deducciones-para-proteger-tu-bolsillo.js';
import post86 from './posts/alquiler-en-barcelona-como-proteger-tu-bolsillo-y-tus-derechos.js';
import post87 from './posts/alquiler-en-canarias-sube-21-como-proteger-tus-derechos-y-ahorrar.js';
import post88 from './posts/alquiler-en-canarias-sube-como-proteger-tus-derechos-y-ahorrar.js';
import post89 from './posts/alquiler-en-canarias-sube-un-19-3-claves-para-protegerte.js';
import post90 from './posts/alquiler-en-castilla-la-mancha-como-protegerte-y-ahorrar-hoy.js';
import post91 from './posts/alquiler-en-castilla-la-mancha-protege-tus-derechos-y-ahorra-hoy.js';
import post92 from './posts/alquiler-en-cataluna-como-te-protege-saber-si-tu-casero-es-un-gran-tenedor.js';
import post93 from './posts/alquiler-en-cataluna-sube-pese-a-regulacion-como-protegerte.js';
import post94 from './posts/alquiler-en-cordoba-claves-para-proteger-tus-derechos-y-ahorrar.js';
import post95 from './posts/alquiler-en-cordoba-que-significa-para-ti-como-inquilino.js';
import post96 from './posts/alquiler-en-cordoba-que-significa-para-ti-y-como-protegerte.js';
import post97 from './posts/alquiler-en-crisis-como-proteger-tus-derechos-y-ahorrar-hoy.js';
import post98 from './posts/alquiler-en-entrenucleos-como-proteger-tus-derechos-y-ahorrar.js';
import post99 from './posts/alquiler-en-espana-2026-protege-tus-derechos-y-ahorra-hoy.js';
import post100 from './posts/alquiler-en-espana-como-afrontar-la-subida-record-de-la-vivienda-en-2025.js';
import post101 from './posts/alquiler-en-espana-como-proteger-tu-hogar-y-tu-bolsillo.js';
import post102 from './posts/alquiler-en-espana-como-proteger-tus-derechos-y-ahorrar-ante-subidas.js';
import post103 from './posts/alquiler-en-espana-como-proteger-tus-derechos-y-ahorrar-en-tiempos-dificiles.js';
import post104 from './posts/alquiler-en-espana-como-proteger-tus-derechos-y-ahorrar-en-vivienda.js';
import post105 from './posts/alquiler-en-espana-como-proteger-tus-derechos-y-ahorrar-hoy.js';
import post106 from './posts/alquiler-en-espana-como-protegerte-ante-la-subida-imparable-de-precios.js';
import post107 from './posts/alquiler-en-espana-como-protegerte-ante-precios-desorbitados.js';
import post108 from './posts/alquiler-en-espana-como-protegerte-ante-subidas-y-conservar-tus-derechos.js';
import post109 from './posts/alquiler-en-espana-derechos-desafios-y-soluciones-para-inquilinos.js';
import post110 from './posts/alquiler-en-espana-que-aprender-de-suecia-para-proteger-tu-hogar.js';
import post111 from './posts/alquiler-en-espana-subidas-y-como-protegerte-hoy.js';
import post112 from './posts/alquiler-en-euskadi-protege-tus-derechos-y-ahorra-en-zonas-tensionadas.js';
import post113 from './posts/alquiler-en-la-coruna-que-significa-para-ti-la-nueva-ley-de-vivienda.js';
import post114 from './posts/alquiler-en-madrid-2025-bajan-precios-en-barrios-clave-como-aprovecharlo.js';
import post115 from './posts/alquiler-en-madrid-como-proteger-tus-derechos-y-ahorrar-en-vivienda.js';
import post116 from './posts/alquiler-en-navarra-baja-un-8-6-que-significa-para-ti.js';
import post117 from './posts/alquiler-en-sevilla-como-proteger-tus-derechos-ante-la-subida-de-precios.js';
import post118 from './posts/alquiler-en-sevilla-como-proteger-tus-derechos-y-ahorrar-en-vivienda.js';
import post119 from './posts/alquiler-en-sevilla-como-proteger-tus-derechos-y-ahorrar-hoy.js';
import post120 from './posts/alquiler-en-sevilla-como-protegerte-ante-subidas-y-abusos.js';
import post121 from './posts/alquiler-en-sevilla-como-protegerte-y-ahorrar-ante-precios-abusivos.js';
import post122 from './posts/alquiler-en-sevilla-como-protegerte-y-ahorrar-ante-subidas-en-entrenucleos.js';
import post123 from './posts/alquiler-en-sevilla-como-protegerte-y-ahorrar-ante-subidas-y-escasez.js';
import post124 from './posts/alquiler-en-sevilla-derechos-ahorro-y-proteccion-para-inquilinos.js';
import post125 from './posts/alquiler-en-sevilla-protege-tus-derechos-frente-a-pisos-turisticos-ilegales.js';
import post126 from './posts/alquiler-en-sevilla-sube-12-4-protege-tus-derechos-y-ahorra.js';
import post127 from './posts/alquiler-en-sevilla-sube-25-como-proteger-tus-derechos-y-ahorrar.js';
import post128 from './posts/alquiler-mas-justo-como-proteger-tus-derechos-y-ahorrar-hoy.js';
import post129 from './posts/alquiler-protegido-una-esperanza-para-inquilinos-vulnerables.js';
import post130 from './posts/alquiler-seguro-en-tiempos-dificiles-protege-tu-hogar-y-tu-dinero.js';
import post131 from './posts/alquiler-seguro-multado-claves-para-proteger-tus-derechos-y-ahorrar.js';
import post132 from './posts/alquiler-vs-compra-en-cordoba-como-proteger-tu-bolsillo.js';
import post133 from './posts/alquiler-y-bizum-protege-tus-derechos-y-ahorra-en-2026.js';
import post134 from './posts/alquiler-y-compra-como-protegerte-en-la-crisis-de-la-vivienda-2026.js';
import post135 from './posts/alquiler-y-compraventa-como-proteger-tus-derechos-y-ahorrar-hoy.js';
import post136 from './posts/alquiler-y-cultura-como-proteger-tus-derechos-y-ahorrar-en-tiempos-dificiles.js';
import post137 from './posts/alquiler-y-derechos-como-protegerte-ante-la-subida-y-evitar-abusos.js';
import post138 from './posts/alquiler-y-derechos-como-protegerte-en-tiempos-de-cambios-inmobiliarios.js';
import post139 from './posts/alquiler-y-derechos-como-protegerte-en-tiempos-de-incertidumbre.js';
import post140 from './posts/alquiler-y-derechos-como-protegerte-tras-la-sancion-a-airbnb.js';
import post141 from './posts/alquiler-y-derechos-como-protegerte-y-ahorrar-en-tiempos-dificiles.js';
import post142 from './posts/alquiler-y-derechos-como-protegerte-y-ahorrar-siendo-inquilino-vulnerable.js';
import post143 from './posts/alquiler-y-derechos-lecciones-de-la-historia-para-inquilinos-vulnerables.js';
import post144 from './posts/alquiler-y-lujo-que-aprender-para-proteger-tus-derechos-y-ahorrar.js';
import post145 from './posts/alquiler-y-pobreza-como-proteger-tus-derechos-y-ahorrar-hoy.js';
import post146 from './posts/alquiler-y-politica-como-proteger-tus-derechos-y-ahorrar-en-tiempos-de-cambio.js';
import post147 from './posts/alquiler-y-sueldos-como-proteger-tus-derechos-y-ahorrar-en-espana.js';
import post148 from './posts/alquiler-y-vivienda-como-proteger-tus-derechos-y-ahorrar-hoy.js';
import post149 from './posts/alquiler-y-vivienda-como-protegerte-ante-la-escalada-de-precios.js';
import post150 from './posts/alquiler-y-vivienda-derechos-y-consejos-para-inquilinos-vulnerables.js';
import post151 from './posts/alquiler-y-vivienda-en-2026-como-proteger-tus-derechos-y-ahorrar.js';
import post152 from './posts/alquiler-y-vivienda-en-andalucia-que-deben-saber-los-inquilinos.js';
import post153 from './posts/alquiler-y-vivienda-en-espana-derechos-y-consejos-ante-crisis-habitacional.js';
import post154 from './posts/alquiler-y-vivienda-en-madrid-como-proteger-tus-derechos-y-ahorrar.js';
import post155 from './posts/alquiler-y-vulnerabilidad-como-proteger-tu-intimidad-y-tus-derechos.js';
import post156 from './posts/alquileres-al-alza-como-proteger-tus-derechos-y-ahorrar-en-2026.js';
import post157 from './posts/alquileres-al-alza-como-proteger-tus-derechos-y-ahorrar-hoy.js';
import post158 from './posts/alquileres-al-alza-como-protegerte-y-ahorrar-en-2026.js';
import post159 from './posts/alquileres-al-alza-en-2026-guia-para-inquilinos-vulnerables.js';
import post160 from './posts/alquileres-al-alza-tras-la-dana-como-proteger-tus-derechos-y-ahorrar.js';
import post161 from './posts/alquileres-al-limite-como-proteger-tus-derechos-y-ahorrar-hoy.js';
import post162 from './posts/alquileres-al-limite-protege-tu-hogar-y-tu-bolsillo-hoy.js';
import post163 from './posts/alquileres-al-maximo-como-proteger-tus-derechos-y-ahorrar-hoy.js';
import post164 from './posts/alquileres-cortos-como-proteger-tus-derechos-y-ahorrar-desde-julio.js';
import post165 from './posts/alquileres-de-corta-duracion-protege-tus-derechos-y-ahorra-desde-julio.js';
import post166 from './posts/alquileres-desorbitados-como-proteger-tus-derechos-y-ahorrar-hoy.js';
import post167 from './posts/alquileres-en-2026-como-proteger-tus-derechos-y-ahorrar.js';
import post168 from './posts/alquileres-en-alza-como-proteger-tus-derechos-y-ahorrar-en-2026.js';
import post169 from './posts/alquileres-en-alza-como-proteger-tus-derechos-y-ahorrar-hoy.js';
import post170 from './posts/alquileres-en-alza-como-proteger-tus-derechos-y-ahorrar.js';
import post171 from './posts/alquileres-en-alza-en-2026-protege-tus-derechos-y-ahorra.js';
import post172 from './posts/alquileres-en-alza-en-andalucia-como-proteger-tus-derechos-y-ahorrar.js';
import post173 from './posts/alquileres-en-andalucia-bajan-como-protegerte-y-ahorrar-hoy.js';
import post174 from './posts/alquileres-en-andalucia-como-proteger-tus-derechos-y-ahorrar-hoy.js';
import post175 from './posts/alquileres-en-espana-como-proteger-tus-derechos-y-ahorrar-en-tiempos-dificiles.js';
import post176 from './posts/alquileres-en-espana-derechos-y-consejos-para-inquilinos-bajo-presion.js';
import post177 from './posts/alquileres-en-madrid-suben-como-proteger-tu-bolsillo-y-tus-derechos.js';
import post178 from './posts/alquileres-en-sevilla-como-protegerte-ante-subidas-y-abusos.js';
import post179 from './posts/alquileres-en-sevilla-suben-como-proteger-tus-derechos-y-ahorrar.js';
import post180 from './posts/alquileres-inalcanzables-y-derechos-como-protegerte-hoy.js';
import post181 from './posts/alquileres-justos-y-largos-una-esperanza-para-inquilinos-vulnerables.js';
import post182 from './posts/alquileres-mas-justos-lo-que-debes-saber-para-protegerte-hoy.js';
import post183 from './posts/alquileres-que-agobian-como-proteger-tus-derechos-y-ahorrar.js';
import post184 from './posts/alquileres-se-disparan-en-extrarradio-guia-para-inquilinos-vulnerables.js';
import post185 from './posts/alquileres-suben-como-proteger-tus-derechos-y-ahorrar-hoy.js';
import post186 from './posts/alquileres-suben-mas-que-la-inflacion-como-protegerte-y-ahorrar.js';
import post187 from './posts/alquileres-suben-pese-a-baja-demanda-guia-para-protegerte-y-ahorrar.js';
import post188 from './posts/alquileres-suben-tras-la-pandemia-protege-tu-hogar-y-tu-bolsillo.js';
import post189 from './posts/alquileres-y-derechos-como-proteger-tu-hogar-y-ahorrar-hoy.js';
import post190 from './posts/alquileres-y-subidas-inesperadas-protege-tus-derechos-hoy.js';
import post191 from './posts/altbausanierung-chancen-und-risiken-fur-mieter-in-deutschland.js';
import post192 from './posts/alternatives-to-the-nuclear-family-for-single-parents.js';
import post193 from './posts/altersarmut-in-deutschland-was-mieter-wissen-sollten.js';
import post194 from './posts/altersvorsorge-fur-selbststandige-so-sichern-sie-ihre-rente.js';
import post195 from './posts/altersvorsorge-reform-und-ihre-folgen-fur-mieter-in-deutschland.js';
import post196 from './posts/amancio-ortega-y-su-imperio-inmobiliario-que-significa-para-los-inquilinos.js';
import post197 from './posts/andalucia-aprueba-ley-propia-esperanza-para-inquilinos-vulnerables.js';
import post198 from './posts/andalucia-y-el-alquiler-como-proteger-tus-derechos-en-tiempos-dificiles.js';
import post199 from './posts/andalucia-y-la-vivienda-claves-para-inquilinos-vulnerables.js';
import post200 from './posts/andalucia-y-la-vivienda-como-proteger-tus-derechos-como-inquilino-vulnerable.js';
import post201 from './posts/andalucia-y-la-vivienda-que-significa-para-inquilinos-vulnerables.js';
import post202 from './posts/andar-descalzo-resfria-mitos-que-afectan-tu-salud-y-bolsillo.js';
import post203 from './posts/andrahandsuthyrning-i-bostadsratt-vad-hyresgaster-bor-veta.js';
import post204 from './posts/andrahandsuthyrning-i-sverige-dina-rattigheter-som-hyresgast.js';
import post205 from './posts/ano-nuevo-chino-en-madrid-cultura-y-consejos-para-inquilinos-vulnerables.js';
import post206 from './posts/arbeiten-im-rentenalter-wann-ist-es-zeit-loszulassen.js';
import post207 from './posts/arrendamento-em-portugal-direitos-desafios-e-solucoes-para-inquilinos.js';
import post208 from './posts/arrendamento-em-portugal-direitos-e-desafios-para-os-inquilinos.js';
import post209 from './posts/art-nouveau-en-woninginrichting-inspiratie-voor-huurders.js';
import post210 from './posts/asbest-in-gebauden-was-mieter-bei-sanierungen-wissen-sollten.js';
import post211 from './posts/ascensor-en-tu-edificio-lo-que-debes-saber-para-proteger-tu-hogar.js';
import post212 from './posts/aterbruk-av-byggmaterial-ger-hallbara-bostader-i-sverige.js';
import post213 from './posts/atervinning-vid-bostaden-och-dess-paverkan-pa-boendemiljon.js';
import post214 from './posts/atropellos-y-seguridad-vial-que-derechos-tienen-los-inquilinos-en-zonas-de-riesg.js';
import post215 from './posts/att-kopa-bostad-i-sverige-viktiga-termer-och-praktiska-rad.js';
import post216 from './posts/aufzugsausfall-vermeiden-digitale-wartung-hilft-mietern.js';
import post217 from './posts/aumento-dos-precos-da-habitacao-em-portugal-o-que-os-inquilinos-devem-saber.js';
import post218 from './posts/ausbleibende-mietzahlungen-bei-galeria-was-mieter-wissen-sollten.js';
import post219 from './posts/auszug-aus-der-wg-rechte-und-pflichten-von-mietern.js';
import post220 from './posts/avales-hipotecarios-hasta-2027-que-significa-para-inquilinos-vulnerables.js';
import post221 from './posts/avales-hipotecarios-que-significa-para-los-inquilinos-vulnerables.js';
import post222 from './posts/ayuda-a-la-vivienda-y-el-ingreso-minimo-vital-tu-derecho-a-cobrar-ambos.js';
import post223 from './posts/ayuda-de-3-500-en-andalucia-alivio-para-inquilinos-vulnerables.js';
import post224 from './posts/ayuda-de-480-para-amas-de-casa-clave-para-inquilinos-vulnerables.js';
import post225 from './posts/ayuda-de-6660-para-trabajadoras-y-como-beneficia-a-inquilinos-vulnerables.js';
import post226 from './posts/ayudas-al-alquiler-2026-2030-como-proteger-tus-derechos-y-ahorrar.js';
import post227 from './posts/ayudas-al-alquiler-2026-clave-para-inquilinos-vulnerables-en-castilla-y-leon.js';
import post228 from './posts/ayudas-al-alquiler-en-andalucia-2026-protege-tus-derechos-y-ahorra.js';
import post229 from './posts/ayudas-al-alquiler-en-castilla-y-leon-como-proteger-tu-hogar-y-ahorrar.js';
import post230 from './posts/ayudas-al-alquiler-en-castilla-y-leon-oportunidad-para-inquilinos-vulnerables.js';
import post231 from './posts/ayudas-al-alquiler-en-castilla-y-leon-una-esperanza-para-inquilinos-vulnerables.js';
import post232 from './posts/ayudas-al-alquiler-joven-en-andalucia-que-debes-saber-para-protegerte.js';
import post233 from './posts/ayudas-al-alquiler-retrasadas-que-hacer-si-dependes-de-ellas.js';
import post234 from './posts/ayudas-para-jovenes-una-oportunidad-real-para-inquilinos-vulnerables.js';
import post235 from './posts/ayudas-para-patrimonio-y-su-impacto-en-inquilinos-vulnerables.js';
import post236 from './posts/baixo-alentejo-2026-enoturismo-e-alojamentos-para-conhecer-a-regiao.js';
import post237 from './posts/bajaran-los-alquileres-lo-que-debes-saber-como-inquilino-vulnerable.js';
import post238 from './posts/balancing-housing-costs-amid-rising-social-and-defense-spending.js';
import post239 from './posts/baleares-y-la-compra-extranjera-como-afecta-a-inquilinos-vulnerables.js';
import post240 from './posts/balfron-tower-what-the-failed-sale-means-for-tenants.js';
import post241 from './posts/baliza-v16-como-afecta-a-los-inquilinos-y-su-bolsillo.js';
import post242 from './posts/balizas-v16-en-coches-que-deben-saber-los-inquilinos-en-2026.js';
import post243 from './posts/balkonkraftwerk-strom-sparen-und-nachhaltig-wohnen-in-der-mietwohnung.js';
import post244 from './posts/baratoflacion-y-alquiler-como-proteger-tu-bolsillo-y-tus-derechos.js';
import post245 from './posts/barcelona-amplia-su-parque-publico-de-viviendas-que-significa-para-ti.js';
import post246 from './posts/barcelona-apuesta-por-vivienda-y-seguridad-que-significa-para-ti.js';
import post247 from './posts/barcelona-impulsa-la-arquitectura-y-tu-puedes-proteger-tu-alquiler.js';
import post248 from './posts/barcelona-y-la-vivienda-protegida-claves-para-inquilinos-vulnerables.js';
import post249 from './posts/barcelona-y-la-vivienda-que-significa-para-ti-como-inquilino.js';
import post250 from './posts/barrierefrei-wohnen-im-alter-chancen-und-tipps-fur-mieter.js';
import post251 from './posts/baukredite-steigen-uber-4-auswirkungen-auf-hauskaufer.js';
import post252 from './posts/baukrise-und-fertighauser-was-mieter-jetzt-wissen-sollten.js';
import post253 from './posts/bayern-setzt-auf-mieten-statt-bauen-bei-behordengebauden.js';
import post254 from './posts/beamtenpensionen-und-ihre-auswirkungen-auf-mieter-in-deutschland.js';
import post255 from './posts/beengtes-wohnen-in-deutschland-was-mieter-wissen-sollten.js';
import post256 from './posts/benasque-y-la-vivienda-que-significa-para-ti-como-inquilino-vulnerable.js';
import post257 from './posts/berliner-volksentscheid-chancen-und-risiken-fur-mieter.js';
import post258 from './posts/bestaande-steden-benutten-voor-meer-betaalbare-woningen.js';
import post259 from './posts/betriebliche-altersvorsorge-fur-alle-was-mieter-jetzt-wissen-sollten.js';
import post260 from './posts/betriebsrente-in-deutschland-chancen-und-fallstricke-fur-arbeitnehmer.js';
import post261 from './posts/bezahlbarer-wohnraum-in-deutschland-herausforderungen-und-chancen.js';
import post262 from './posts/bezahlbarer-wohnraum-in-deutschland-rechte-und-chancen-fur-mieter.js';
import post263 from './posts/bezahlbares-wohnen-fur-azubis-chancen-und-herausforderungen.js';
import post264 from './posts/bezoekverbod-in-verpleeghuizen-lessen-voor-huurders-in-drukke-tijden.js';
import post265 from './posts/biedingen-op-woningen-wat-betekent-het-voor-huurders.js';
import post266 from './posts/black-friday-inmobiliario-una-oportunidad-para-inquilinos-vulnerables.js';
import post267 from './posts/blocchi-e-contenziosi-cosa-fare-se-il-tuo-immobile-e-sotto-vincolo.js';
import post268 from './posts/bonificacion-fiscal-a-caseros-como-afecta-a-inquilinos-vulnerables.js';
import post269 from './posts/bono-alquiler-joven-2026-en-andalucia-tu-ayuda-para-aliviar-el-alquiler.js';
import post270 from './posts/bono-alquiler-joven-2026-tu-apoyo-para-aliviar-el-gasto-en-vivienda.js';
import post271 from './posts/bono-alquiler-joven-2026-una-ayuda-real-para-inquilinos-vulnerables.js';
import post272 from './posts/bono-alquiler-joven-andalucia-una-ayuda-real-para-inquilinos-vulnerables.js';
import post273 from './posts/bono-alquiler-joven-como-protegerte-y-mejorar-tu-alquiler-hoy.js';
import post274 from './posts/bono-alquiler-joven-en-andalucia-una-ayuda-real-para-inquilinos-vulnerables.js';
import post275 from './posts/bono-alquiler-joven-en-andalucia-una-oportunidad-para-proteger-tu-bolsillo.js';
import post276 from './posts/bono-alquiler-joven-en-castilla-la-mancha-una-ayuda-real-para-inquilinos.js';
import post277 from './posts/bonus-casa-2026-guida-pratica-per-inquilini-e-affittuari.js';
import post278 from './posts/bonus-casa-e-detrazioni-cosa-cambia-per-gli-inquilini-nel-2026.js';
import post279 from './posts/bonus-casa-e-novita-730-cosa-cambia-per-gli-inquilini-nel-2026.js';
import post280 from './posts/bonus-decoder-tv-e-canone-rai-guida-pratica-per-gli-inquilini.js';
import post281 from './posts/bonus-domotica-2026-guida-pratica-per-inquilini-e-proprietari.js';
import post282 from './posts/boom-del-alquiler-protege-tus-derechos-y-ahorra-en-tiempos-dificiles.js';
import post283 from './posts/borrasca-francis-como-proteger-tu-vivienda-y-ahorrar-siendo-inquilino.js';
import post284 from './posts/bossterfte-door-letterzetter-lessen-voor-huurders-in-nl.js';
import post285 from './posts/bostadspriserna-stiger-vad-betyder-det-for-dig-som-hyresgast.js';
import post286 from './posts/bostadsrattsforeningar-och-boendetrycket-i-sverige.js';
import post287 from './posts/brand-auf-nachbargrundstuck-haftung-und-rechte-der-mieter.js';
import post288 from './posts/brand-en-ontruiming-in-zeist-wat-huurders-moeten-weten.js';
import post289 from './posts/brand-en-onveiligheid-wat-huurders-moeten-weten.js';
import post290 from './posts/brand-in-scheveningse-wijk-wat-huurders-moeten-weten.js';
import post291 from './posts/brand-in-schuur-wat-huurders-moeten-weten-over-risico-en-bescherming.js';
import post292 from './posts/brand-in-woning-amsterdam-wat-huurders-moeten-weten.js';
import post293 from './posts/brand-in-woning-wat-huurders-moeten-weten-en-doen.js';
import post294 from './posts/brandstichting-en-veiligheid-wat-huurders-moeten-weten.js';
import post295 from './posts/brandstichting-en-woningontruiming-wat-huurders-moeten-weten.js';
import post296 from './posts/bridging-social-and-private-housing-in-london.js';
import post297 from './posts/budpremier-och-bostadsbrist-i-stockholms-innerstad-vad-betyder-det-for-dig.js';
import post298 from './posts/build-to-rent-o-futuro-do-arrendamento-em-portugal.js';
import post299 from './posts/build-to-rent-slowdown-what-it-means-for-uk-renters.js';
import post300 from './posts/bundesbaugesellschaft-chancen-fur-bezahlbaren-wohnraum.js';
import post301 from './posts/burgerentscheid-frankenschnellweg-was-mieter-wissen-sollten.js';
import post302 from './posts/burgerentscheid-in-raunheim-was-mieter-jetzt-wissen-sollten.js';
import post303 from './posts/buy-to-let-in-switzerland-what-tenants-should-know.js';
import post304 from './posts/byta-hoppfot-och-bostad-anpassa-dig-i-en-pressad-bostadsmarknad.js';
import post305 from './posts/caen-pisos-turisticos-que-significa-para-tu-alquiler-y-derechos.js';
import post306 from './posts/calefaccion-eficiente-para-inquilinos-ahorra-y-protege-tu-vivienda.js';
import post307 from './posts/calefaccion-y-alquiler-como-ahorrar-y-proteger-tu-bolsillo.js';
import post308 from './posts/calefaccion-y-alquiler-como-ahorrar-y-proteger-tus-derechos.js';
import post309 from './posts/calendario-escolar-2026-27-en-sevilla-dias-festivos-y-puentes-clave.js';
import post310 from './posts/calor-en-casa-sin-gastar-mas-truco-finlandes-para-inquilinos.js';
import post311 from './posts/cambios-en-el-transporte-publico-de-sevilla-que-implica-para-los-inquilinos.js';
import post312 from './posts/cambios-en-el-tranvibus-de-sevilla-impacto-para-inquilinos-y-consejos.js';
import post313 from './posts/camminare-fa-bene-anche-agli-inquilini-sotto-stress-abitativo.js';
import post314 from './posts/campamento-y-tus-derechos-como-protegerte-ante-la-incertidumbre-del-alquiler.js';
import post315 from './posts/can-tech-driven-housing-co-ops-ease-uk-rent-pressures.js';
import post316 from './posts/cancelamento-de-mais-de-10-mil-alojamentos-locais-em-portugal.js';
import post317 from './posts/cansado-de-pagar-mucho-alquiler-casas-prefabricadas-pueden-ser-tu-salida.js';
import post318 from './posts/carabanchel-renace-nuevas-viviendas-y-oportunidades-para-inquilinos.js';
import post319 from './posts/carburanti-in-aumento-come-influisce-sugli-affitti-in-italia.js';
import post320 from './posts/caro-affitti-a-milano-cosa-fare-se-il-canone-cresce.js';
import post321 from './posts/caro-affitti-e-sfratti-come-tutelarsi-in-tempi-di-crisi-abitativa.js';
import post322 from './posts/caro-affitti-e-sfratti-come-tutelarsi-nel-mercato-immobiliare-italiano.js';
import post323 from './posts/caro-affitti-in-italia-come-affrontare-la-pressione-abitativa.js';
import post324 from './posts/caro-affitti-in-italia-come-proteggere-l-inquilino-sotto-pressione.js';
import post325 from './posts/casa-47-alquileres-justos-para-proteger-tu-bolsillo-y-tu-hogar.js';
import post326 from './posts/casa-47-nueva-esperanza-para-inquilinos-vulnerables-en-espana.js';
import post327 from './posts/casa-47-una-esperanza-real-para-inquilinos-en-apuros.js';
import post328 from './posts/casa-47-una-esperanza-real-para-inquilinos-en-espana.js';
import post329 from './posts/casa-47-una-esperanza-real-para-inquilinos-vulnerables-en-2026.js';
import post330 from './posts/casa-47-una-luz-para-inquilinos-que-luchan-con-el-alquiler.js';
import post331 from './posts/casa-47-una-luz-para-inquilinos-que-luchan-por-un-alquiler-justo.js';
import post332 from './posts/casa-47-y-plan-vivienda-esperanza-real-para-inquilinos-vulnerables.js';
import post333 from './posts/casa-a-milano-come-affrontare-il-caro-affitti-e-trovare-soluzioni-abitative.js';
import post334 from './posts/casa-al-lago-di-garda-prezzi-sfide-e-opportunita-per-gli-inquilini.js';
import post335 from './posts/casa-decor-2026-en-madrid-que-significa-para-los-inquilinos-vulnerables.js';
import post336 from './posts/casa-di-comunita-un-modello-per-il-benessere-abitativo-e-sociale.js';
import post337 from './posts/casa-di-giulietta-a-verona-ingresso-a-pagamento-e-gestione-turistica.js';
import post338 from './posts/casa-e-affitti-cosa-cambia-per-gli-inquilini-in-italia.js';
import post339 from './posts/casa-e-affitti-in-italia-come-affrontare-le-pressioni-abitative.js';
import post340 from './posts/casa-in-degrado-diritti-e-tutele-per-gli-inquilini-italiani.js';
import post341 from './posts/casa-in-italia-tra-lusso-per-ricchi-e-sfide-per-gli-inquilini.js';
import post342 from './posts/casa-mariano-y-la-lucha-del-inquilino-vulnerable-en-madrid.js';
import post343 from './posts/casa-o-mercati-finanziari-cosa-significa-per-chi-affitta.js';
import post344 from './posts/casa-orsola-lecciones-para-proteger-tu-alquiler-y-ahorrar.js';
import post345 from './posts/casa-orsola-un-ano-de-lucha-y-esperanza-para-inquilinos-vulnerables.js';
import post346 from './posts/casa-plato-inspiracion-para-proteger-tus-derechos-como-inquilino.js';
import post347 from './posts/casa-prefabricada-una-opcion-real-para-inquilinos-con-pocos-recursos.js';
import post348 from './posts/casa-prefabricada-una-opcion-real-para-inquilinos-que-buscan-ahorro.js';
import post349 from './posts/casa-tasse-e-qualita-della-vita-guida-per-inquilini-in-italia.js';
import post350 from './posts/casa47-una-esperanza-real-para-inquilinos-vulnerables-en-espana.js';
import post351 from './posts/casa47-una-luz-para-inquilinos-que-luchan-con-el-alquiler-alto.js';
import post352 from './posts/casas-container-una-opcion-real-para-inquilinos-con-poco-presupuesto.js';
import post353 from './posts/casas-modulares-por-menos-de-20-000-lo-que-debes-saber-como-inquilino.js';
import post354 from './posts/casas-moviles-ilegales-en-suelo-rustico-que-deben-saber-los-inquilinos.js';
import post355 from './posts/casas-moviles-y-alquiler-protegiendo-tus-derechos-y-ahorrando-en-vivienda.js';
import post356 from './posts/casas-nas-aldeias-historicas-como-os-precos-afetam-os-inquilinos.js';
import post357 from './posts/casas-nas-aldeias-historicas-o-que-rende-para-inquilinos.js';
import post358 from './posts/casas-okupadas-y-alquiler-lo-que-debes-saber-para-protegerte.js';
import post359 from './posts/casas-plegables-una-opcion-accesible-para-inquilinos-vulnerables.js';
import post360 from './posts/casas-prefabricadas-una-alternativa-real-para-inquilinos-vulnerables.js';
import post361 from './posts/casas-prefabricadas-una-esperanza-para-inquilinos-en-crisis.js';
import post362 from './posts/casas-prefabricadas-una-esperanza-real-para-inquilinos-vulnerables.js';
import post363 from './posts/casas-prefabricadas-una-luz-para-inquilinos-con-alquileres-altos.js';
import post364 from './posts/casas-prefabricadas-una-opcion-asequible-para-inquilinos-vulnerables.js';
import post365 from './posts/casas-prefabricadas-una-opcion-para-aliviar-tu-alquiler.js';
import post366 from './posts/casas-prefabricadas-una-opcion-para-aliviar-tu-bolsillo-de-inquilino.js';
import post367 from './posts/casas-prefabricadas-una-opcion-para-inquilinos-que-buscan-ahorrar.js';
import post368 from './posts/casas-prefabricadas-una-opcion-para-inquilinos-que-buscan-alivio.js';
import post369 from './posts/casas-prefabricadas-una-opcion-real-para-aliviar-tu-alquiler.js';
import post370 from './posts/casas-prefabricadas-una-opcion-real-para-inquilinos-con-bajos-ingresos.js';
import post371 from './posts/casas-prefabricadas-una-opcion-real-para-inquilinos-con-poco-margen.js';
import post372 from './posts/casas-prefabricadas-una-opcion-real-para-inquilinos-con-poco-presupuesto.js';
import post373 from './posts/casas-prefabricadas-una-opcion-real-para-inquilinos-con-pocos-recursos.js';
import post374 from './posts/casas-prefabricadas-una-opcion-real-para-inquilinos-con-presupuesto-ajustado.js';
import post375 from './posts/casas-prefabricadas-una-opcion-real-para-inquilinos-en-apuros.js';
import post376 from './posts/casas-prefabricadas-una-opcion-real-para-inquilinos-vulnerables.js';
import post377 from './posts/casas-prefabricadas-una-oportunidad-para-inquilinos-con-presupuesto-ajustado.js';
import post378 from './posts/casas-prefabricadas-una-oportunidad-para-inquilinos-vulnerables.js';
import post379 from './posts/casco-historico-de-toledo-que-significa-para-los-inquilinos-vulnerables.js';
import post380 from './posts/case-in-citta-grandi-mutui-e-affitti-sempre-piu-insostenibili.js';
import post381 from './posts/casino-di-saint-vincent-e-riciclaggio-cosa-significa-per-gli-inquilini.js';
import post382 from './posts/cataluna-busca-frenar-la-especulacion-para-proteger-a-inquilinos.js';
import post383 from './posts/cataluna-estudia-proteger-inquilinos-frente-a-la-compra-especulativa.js';
import post384 from './posts/cataluna-frena-la-especulacion-una-esperanza-para-inquilinos-vulnerables.js';
import post385 from './posts/cataluna-menos-viviendas-nuevas-mas-retos-para-inquilinos-vulnerables.js';
import post386 from './posts/cataluna-y-la-lucha-contra-la-crisis-del-alquiler-que-debes-saber.js';
import post387 from './posts/catasto-e-superbonus-cosa-cambia-per-gli-inquilini-in-italia.js';
import post388 from './posts/centro-accoglienza-in-via-aldini-sostegno-e-autonomia-per-chi-e-senza-casa.js';
import post389 from './posts/centro-de-portugal-lidera-crescimento-imobiliario-o-que-muda-para-inquilinos.js';
import post390 from './posts/certificados-de-aforro-em-alta-o-que-isso-significa-para-inquilinos.js';
import post391 from './posts/chapeus-de-sol-nas-praias-direitos-dos-banhistas-em-areas-concessionadas.js';
import post392 from './posts/choosing-between-pension-capital-or-annuity-what-tenants-should-know.js';
import post393 from './posts/choque-fiscal-na-habitacao-o-que-mudou-para-inquilinos-e-senhorios.js';
import post394 from './posts/choque-fiscal-para-habitacao-o-que-muda-para-inquilinos.js';
import post395 from './posts/church-real-estate-disputes-impact-housing-in-zurich.js';
import post396 from './posts/cierre-de-pisos-turisticos-en-badalona-que-significa-para-ti-como-inquilino.js';
import post397 from './posts/clara-grima-y-la-independencia-economica-lecciones-para-inquilinos.js';
import post398 from './posts/clausulas-abusivas-en-contratos-de-alquiler-como-afectan-tus-derechos-como-inqui.js';
import post399 from './posts/clausulas-ocultas-en-alquileres-protege-tus-derechos-y-ahorra.js';
import post400 from './posts/claves-para-inquilinos-ante-subidas-y-presion-en-el-mercado-de-alquiler-en-espan.js';
import post401 from './posts/claves-para-inquilinos-como-protegerte-y-ahorrar-en-un-mercado-dificil.js';
import post402 from './posts/claves-para-inquilinos-en-espana-ante-la-crisis-de-vivienda.js';
import post403 from './posts/claves-para-protegerte-ante-subidas-y-problemas-en-el-alquiler.js';
import post404 from './posts/claves-para-protegerte-como-inquilino-ante-un-mercado-inmobiliario-complejo.js';
import post405 from './posts/collectief-wonen-sociale-cohesie-als-antwoord-op-wooncrisis.js';
import post406 from './posts/come-adattare-la-casa-ai-cambiamenti-senza-stress.js';
import post407 from './posts/come-affrontare-il-caro-affitti-e-i-problemi-di-casa-in-italia.js';
import post408 from './posts/come-affrontare-il-caro-affitti-e-la-crisi-immobiliare-in-italia.js';
import post409 from './posts/come-affrontare-il-caro-affitti-e-la-pressione-abitativa-in-italia.js';
import post410 from './posts/come-affrontare-il-caro-affitti-e-le-difficolta-abitative-in-italia.js';
import post411 from './posts/come-affrontare-il-caro-affitti-e-proteggere-i-tuoi-diritti-di-inquilino.js';
import post412 from './posts/come-affrontare-il-caro-affitti-e-tutelare-i-tuoi-diritti-di-inquilino.js';
import post413 from './posts/come-affrontare-il-caro-affitti-e-tutelarsi-in-italia.js';
import post414 from './posts/come-affrontare-il-caro-affitti-in-italia-consigli-pratici-per-gli-inquilini.js';
import post415 from './posts/come-affrontare-il-caro-affitti-in-italia-guida-per-inquilini.js';
import post416 from './posts/come-affrontare-il-caro-affitti-in-italia-guida-pratica-per-inquilini.js';
import post417 from './posts/come-affrontare-l-aumento-degli-affitti-e-la-pressione-abitativa-in-italia.js';
import post418 from './posts/come-affrontare-l-aumento-degli-affitti-e-proteggere-i-tuoi-diritti-di-inquilino.js';
import post419 from './posts/come-affrontare-l-aumento-degli-affitti-e-tutelare-i-diritti-degli-inquilini-in-.js';
import post420 from './posts/come-affrontare-l-aumento-degli-affitti-e-tutelare-i-tuoi-diritti-di-inquilino.js';
import post421 from './posts/come-affrontare-l-aumento-degli-affitti-e-tutelarsi-come-inquilini-in-italia.js';
import post422 from './posts/come-affrontare-l-aumento-degli-affitti-in-italia-guida-per-inquilini.js';
import post423 from './posts/come-affrontare-l-emergenza-abitativa-in-italia-diritti-e-soluzioni.js';
import post424 from './posts/come-affrontare-l-emergenza-abitativa-in-italia-guida-per-gli-inquilini.js';
import post425 from './posts/come-affrontare-la-crisi-abitativa-e-tutelare-i-diritti-degli-inquilini-in-itali.js';
import post426 from './posts/come-affrontare-la-crisi-degli-affitti-in-italia-guida-per-gli-inquilini.js';
import post427 from './posts/come-affrontare-la-crisi-immobiliare-e-la-pressione-sugli-affitti-in-italia.js';
import post428 from './posts/come-affrontare-la-pressione-abitativa-e-difendersi-dagli-sfratti-in-italia.js';
import post429 from './posts/come-affrontare-la-pressione-abitativa-e-il-caro-affitti-in-italia.js';
import post430 from './posts/come-affrontare-la-pressione-abitativa-e-tutelarsi-come-inquilini-in-italia.js';
import post431 from './posts/come-affrontare-la-pressione-abitativa-e-tutelarsi-come-inquilini.js';
import post432 from './posts/come-affrontare-la-pressione-abitativa-guida-pratica-per-inquilini-in-italia.js';
import post433 from './posts/come-affrontare-la-pressione-abitativa-in-italia-consigli-per-inquilini.js';
import post434 from './posts/come-affrontare-la-pressione-abitativa-in-italia-consigli-pratici-per-gli-inquil.js';
import post435 from './posts/come-affrontare-la-pressione-abitativa-in-italia-consigli-pratici.js';
import post436 from './posts/come-affrontare-la-pressione-abitativa-in-italia-diritti-e-strategie-per-gli-inq.js';
import post437 from './posts/come-affrontare-la-pressione-abitativa-in-italia-guida-per-gli-inquilini.js';
import post438 from './posts/come-affrontare-la-pressione-abitativa-in-italia-guida-per-inquilini.js';
import post439 from './posts/come-affrontare-la-pressione-abitativa-in-italia-guida-pratica-per-gli-inquilini.js';
import post440 from './posts/come-affrontare-la-pressione-abitativa-in-italia-guida-pratica-per-inquilini.js';
import post441 from './posts/come-affrontare-le-difficolta-abitative-in-italia-guida-per-gli-inquilini.js';
import post442 from './posts/come-affrontare-le-pressioni-abitative-in-italia-guida-per-inquilini.js';
import post443 from './posts/come-affrontare-le-pressioni-abitative-in-italia-guida-pratica-per-gli-inquilini.js';
import post444 from './posts/come-affrontare-le-pressioni-abitative-in-italia-guida-pratica-per-inquilini.js';
import post445 from './posts/come-affrontare-le-tensioni-abitative-e-proteggere-i-tuoi-diritti-di-inquilino.js';
import post446 from './posts/come-affrontare-lo-sfratto-e-il-caro-affitti-in-italia.js';
import post447 from './posts/come-affrontare-lo-sfratto-e-la-crisi-degli-affitti-in-italia.js';
import post448 from './posts/come-affrontare-lo-sfratto-e-la-pressione-abitativa-in-italia.js';
import post449 from './posts/come-difendersi-dagli-sfratti-e-gestire-il-caro-affitti-in-italia.js';
import post450 from './posts/come-difendersi-dallo-sfratto-e-affrontare-il-caro-affitti-in-italia.js';
import post451 from './posts/come-donare-una-somma-per-l-acquisto-casa-guida-pratica.js';
import post452 from './posts/come-gestire-l-affitto-e-i-diritti-dell-inquilino-in-italia.js';
import post453 from './posts/come-gestire-le-preoccupazioni-sanitarie-in-casa-in-tempi-di-emergenze.js';
import post454 from './posts/come-la-ristorazione-influisce-sul-mercato-immobiliare-italiano.js';
import post455 from './posts/come-la-tv-diventa-arredo-impatto-sulla-casa-e-sugli-inquilini.js';
import post456 from './posts/come-proteggere-i-tuoi-diritti-di-inquilino-in-italia-oggi.js';
import post457 from './posts/come-proteggersi-dalle-pressioni-abitative-in-italia.js';
import post458 from './posts/come-rendere-la-casa-piu-accogliente-senza-stravolgere-l-affitto.js';
import post459 from './posts/come-scegliere-e-usare-un-robot-lavapavimenti-a-casa-in-affitto.js';
import post460 from './posts/come-scegliere-il-robot-aspirapolvere-ideale-per-la-tua-casa.js';
import post461 from './posts/come-tutelarsi-da-animali-pericolosi-nell-affitto-in-italia.js';
import post462 from './posts/come-tutelarsi-dai-rincari-e-sfratti-nel-mercato-immobiliare-italiano.js';
import post463 from './posts/come-tutelarsi-dal-caro-affitti-in-italia-consigli-pratici-per-gli-inquilini.js';
import post464 from './posts/come-vivere-bene-in-affitto-a-milano-consigli-pratici-per-inquilini.js';
import post465 from './posts/comment-gerer-les-pressions-du-logement-en-france-aujourd-hui.js';
import post466 from './posts/comment-proteger-ses-droits-de-locataire-face-aux-defis-du-logement-en-france.js';
import post467 from './posts/como-a-alta-dos-precos-afeta-inquilinos-em-portugal.js';
import post468 from './posts/como-a-crise-climatica-afeta-os-inquilinos-em-portugal.js';
import post469 from './posts/como-a-crise-de-emergencia-afeta-inquilinos-em-portugal.js';
import post470 from './posts/como-a-crise-economica-pode-afetar-a-habitacao-em-portugal.js';
import post471 from './posts/como-a-crise-energetica-global-pode-afetar-a-habitacao-em-portugal.js';
import post472 from './posts/como-a-crise-nos-clubes-afeta-o-mercado-de-habitacao-em-portugal.js';
import post473 from './posts/como-a-greve-e-o-caos-no-aeroporto-podem-afetar-quem-aluga-casa.js';
import post474 from './posts/como-a-guerra-na-ucrania-pode-influenciar-o-mercado-de-habitacao-em-portugal.js';
import post475 from './posts/como-a-guerra-no-medio-oriente-afeta-o-preco-da-habitacao-em-portugal.js';
import post476 from './posts/como-a-ia-nas-redes-sociais-pode-afetar-inquilinos-jovens-em-portugal.js';
import post477 from './posts/como-a-instabilidade-politica-pode-afetar-a-habitacao-em-portugal.js';
import post478 from './posts/como-a-instabilidade-politica-pode-afetar-o-mercado-de-arrendamento-em-portugal.js';
import post479 from './posts/como-a-instabilidade-turistica-afeta-o-mercado-de-arrendamento-em-portugal.js';
import post480 from './posts/como-a-nova-regra-do-banco-de-portugal-afeta-quem-procura-casa.js';
import post481 from './posts/como-a-privatizacao-da-tap-pode-impactar-o-mercado-da-habitacao-em-portugal.js';
import post482 from './posts/como-a-reducao-da-taxa-de-esforco-afeta-quem-procura-casa-em-portugal.js';
import post483 from './posts/como-a-rentabilidade-bancaria-afeta-o-mercado-de-habitacao-em-portugal.js';
import post484 from './posts/como-a-restricao-ao-credito-afeta-quem-procura-habitacao-em-portugal.js';
import post485 from './posts/como-a-saude-publica-afeta-o-direito-a-habitacao-em-portugal.js';
import post486 from './posts/como-a-transparencia-nos-investimentos-em-defesa-pode-impactar-a-habitacao.js';
import post487 from './posts/como-a-violencia-e-a-instabilidade-impactam-a-habitacao-em-portugal.js';
import post488 from './posts/como-acceder-a-viviendas-vpo-en-sevilla-y-proteger-tu-derecho-al-hogar.js';
import post489 from './posts/como-afecta-a-los-inquilinos-la-crisis-en-adif-y-el-mercado-del-alquiler.js';
import post490 from './posts/como-afecta-a-los-inquilinos-la-nueva-fiscalidad-sobre-segundas-viviendas.js';
import post491 from './posts/como-afecta-a-los-inquilinos-la-propuesta-de-junts-sobre-vivienda-publica.js';
import post492 from './posts/como-afecta-el-auge-inmobiliario-a-inquilinos-vulnerables.js';
import post493 from './posts/como-afecta-el-buen-tiempo-de-semana-santa-2026-a-los-inquilinos-en-sevilla.js';
import post494 from './posts/como-afecta-el-cambio-climatico-a-los-inquilinos-en-sevilla.js';
import post495 from './posts/como-afecta-el-cierre-de-pisos-turisticos-a-los-inquilinos-vulnerables.js';
import post496 from './posts/como-afecta-el-fallo-del-irph-a-inquilinos-vulnerables.js';
import post497 from './posts/como-afecta-el-gasto-militar-a-tu-alquiler-y-derechos-como-inquilino.js';
import post498 from './posts/como-afecta-el-mercado-inmobiliario-a-inquilinos-vulnerables.js';
import post499 from './posts/como-afecta-la-bonificacion-fiscal-a-inquilinos-con-alquileres-altos.js';
import post500 from './posts/como-afecta-la-caida-de-beneficios-de-fcc-a-tu-alquiler-y-derechos.js';
import post501 from './posts/como-afecta-la-compra-de-groenlandia-a-tu-alquiler-en-espana.js';
import post502 from './posts/como-afecta-la-compra-de-viviendas-nuevas-a-inquilinos-vulnerables.js';
import post503 from './posts/como-afecta-la-compra-de-viviendas-por-extranjeros-a-inquilinos-vulnerables.js';
import post504 from './posts/como-afecta-la-compra-extranjera-a-tu-alquiler-protege-tus-derechos.js';
import post505 from './posts/como-afecta-la-compra-extranjera-a-tu-alquiler-y-como-protegerte.js';
import post506 from './posts/como-afecta-la-crisis-de-la-vivienda-a-los-inquilinos-vulnerables.js';
import post507 from './posts/como-afecta-la-crisis-de-vivienda-a-inquilinos-vulnerables.js';
import post508 from './posts/como-afecta-la-crisis-del-sevilla-fc-a-tu-alquiler-y-vivienda.js';
import post509 from './posts/como-afecta-la-dana-a-los-inquilinos-en-andalucia-este-fin-de-semana.js';
import post510 from './posts/como-afecta-la-especulacion-con-viviendas-okupadas-a-inquilinos-vulnerables.js';
import post511 from './posts/como-afecta-la-gestion-de-residuos-a-los-inquilinos-en-sevilla.js';
import post512 from './posts/como-afecta-la-ley-de-vivienda-a-los-inquilinos-vulnerables.js';
import post513 from './posts/como-afecta-la-limitacion-de-compras-inmobiliarias-a-los-inquilinos-vulnerables.js';
import post514 from './posts/como-afecta-la-nueva-ley-de-vivienda-a-inquilinos-vulnerables.js';
import post515 from './posts/como-afecta-la-nueva-norma-sobre-segundas-viviendas-a-los-inquilinos.js';
import post516 from './posts/como-afecta-la-nueva-rebaja-fiscal-a-los-inquilinos-vulnerables.js';
import post517 from './posts/como-afecta-la-nueva-subasta-de-letras-del-tesoro-a-tu-alquiler-y-ahorro.js';
import post518 from './posts/como-afecta-la-nueva-vigilancia-fiscal-a-inquilinos-vulnerables.js';
import post519 from './posts/como-afecta-la-nueva-vigilancia-fiscal-a-inquilinos-y-que-hacer.js';
import post520 from './posts/como-afecta-la-participacion-ciudadana-a-la-vivienda-en-andalucia.js';
import post521 from './posts/como-afecta-la-politica-electoral-a-la-vivienda-y-alquiler-en-espana.js';
import post522 from './posts/como-afecta-la-residencia-fiscal-del-rey-emerito-a-los-inquilinos-vulnerables.js';
import post523 from './posts/como-afecta-la-seguridad-social-a-los-inquilinos-en-espana.js';
import post524 from './posts/como-afecta-la-semana-santa-2026-a-los-inquilinos-en-sevilla.js';
import post525 from './posts/como-afecta-la-subida-de-hipotecas-a-inquilinos-vulnerables.js';
import post526 from './posts/como-afecta-la-subida-de-la-vivienda-a-inquilinos-vulnerables.js';
import post527 from './posts/como-afecta-la-subida-de-precios-inmobiliarios-a-los-inquilinos-en-espana.js';
import post528 from './posts/como-afecta-la-subida-del-precio-de-la-vivienda-a-los-inquilinos.js';
import post529 from './posts/como-afecta-la-subida-del-tabaco-a-tu-bolsillo-como-inquilino-vulnerable.js';
import post530 from './posts/como-afecta-la-subida-del-taxi-a-inquilinos-y-como-proteger-tu-bolsillo.js';
import post531 from './posts/como-afecta-la-transformacion-urbanistica-a-tu-alquiler.js';
import post532 from './posts/como-afecta-la-venta-de-grandes-propiedades-al-alquiler-en-espana.js';
import post533 from './posts/como-afecta-la-venta-de-mansiones-a-inquilinos-con-alquileres-altos.js';
import post534 from './posts/como-afecta-la-venta-de-mansiones-millonarias-al-inquilino-vulnerable.js';
import post535 from './posts/como-afecta-la-vivienda-de-lujo-al-alquiler-que-pagas.js';
import post536 from './posts/como-afecta-la-vivienda-vacia-a-tus-derechos-como-inquilino.js';
import post537 from './posts/como-afecta-una-crisis-en-la-propiedad-del-club-a-los-inquilinos.js';
import post538 from './posts/como-afectan-las-elecciones-de-presidencia-en-real-madrid-a-sus-socios.js';
import post539 from './posts/como-afectan-las-romerias-y-eventos-masivos-a-los-alquileres-en-sevilla.js';
import post540 from './posts/como-afectan-los-avales-para-jovenes-a-inquilinos-vulnerables.js';
import post541 from './posts/como-afectan-los-cortes-de-trafico-a-inquilinos-en-sevilla-durante-eventos.js';
import post542 from './posts/como-afectara-la-nueva-tasa-de-basuras-a-tu-alquiler-en-madrid.js';
import post543 from './posts/como-afrontar-el-alquiler-en-espana-guia-practica-para-inquilinos.js';
import post544 from './posts/como-afrontar-el-alza-de-luz-calefaccion-y-alquiler-siendo-inquilino-vulnerable.js';
import post545 from './posts/como-afrontar-la-presion-de-la-vivienda-en-espana-guia-para-inquilinos.js';
import post546 from './posts/como-afrontar-la-presion-de-la-vivienda-en-espana-hoy.js';
import post547 from './posts/como-afrontar-la-presion-de-la-vivienda-y-proteger-tus-derechos-como-inquilino.js';
import post548 from './posts/como-afrontar-la-presion-del-alquiler-en-espana-en-2026.js';
import post549 from './posts/como-afrontar-la-presion-del-alquiler-y-proteger-tus-derechos-como-inquilino.js';
import post550 from './posts/como-afrontar-la-subida-del-alquiler-y-proteger-tus-derechos-como-inquilino.js';
import post551 from './posts/como-afrontar-un-alquiler-que-consume-tu-vida-y-tu-dinero.js';
import post552 from './posts/como-ahorrar-con-el-seguro-de-hogar-guia-para-inquilinos-vulnerables.js';
import post553 from './posts/como-ahorrar-en-casa-y-proteger-tus-derechos-como-inquilino-vulnerable.js';
import post554 from './posts/como-ahorrar-en-gasolina-y-proteger-tu-alquiler-en-tiempos-dificiles.js';
import post555 from './posts/como-ahorrar-en-la-compra-de-pollo-y-proteger-tu-bolsillo-como-inquilino.js';
import post556 from './posts/como-ahorrar-en-la-renta-y-proteger-tus-derechos-si-vives-en-pueblos-de-cordoba.js';
import post557 from './posts/como-ahorrar-en-vivienda-deduccion-por-seguro-de-hogar-y-consejos-para-inquilino.js';
import post558 from './posts/como-ahorrar-en-vivienda-deducciones-y-consejos-para-inquilinos-vulnerables.js';
import post559 from './posts/como-ahorrar-en-vivienda-y-transporte-derechos-y-consejos-para-inquilinos.js';
import post560 from './posts/como-ahorrar-y-proteger-tu-alquiler-en-tiempos-de-ofertas-y-cambios.js';
import post561 from './posts/como-ahorrar-y-proteger-tu-salud-y-bolsillo-siendo-inquilino-vulnerable.js';
import post562 from './posts/como-ahorrar-y-proteger-tu-vivienda-claves-sobre-donaciones-y-alquiler.js';
import post563 from './posts/como-ahorrar-y-protegerte-en-alquiler-con-trucos-caseros-y-derechos-claros.js';
import post564 from './posts/como-ahorrar-y-protegerte-en-el-alquiler-en-tiempos-dificiles.js';
import post565 from './posts/como-aprovechar-las-viviendas-protegidas-en-palmas-altas-para-aliviar-tu-alquile.js';
import post566 from './posts/como-aprovechar-mejor-tu-espacio-y-proteger-tus-derechos-como-inquilino.js';
import post567 from './posts/como-armazens-vazios-viram-solucoes-para-arrendamento-em-portugal.js';
import post568 from './posts/como-as-eleicoes-no-peru-podem-inspirar-direitos-dos-inquilinos-em-portugal.js';
import post569 from './posts/como-as-mudancas-politicas-podem-impactar-o-mercado-de-habitacao-em-portugal.js';
import post570 from './posts/como-convertirte-en-propietario-siendo-inquilino-guia-practica.js';
import post571 from './posts/como-defender-tu-vivienda-y-derechos-como-inquilino-vulnerable.js';
import post572 from './posts/como-el-aumento-de-precios-afecta-a-inquilinos-y-como-protegerse.js';
import post573 from './posts/como-el-plan-del-psoe-para-vivienda-puede-protegerte-y-ahorrar-en-alquiler.js';
import post574 from './posts/como-el-precio-del-aceite-afecta-tu-presupuesto-de-alquiler-y-como-protegerte.js';
import post575 from './posts/como-el-valor-de-referencia-impacta-a-inquilinos-y-como-proteger-tu-bolsillo.js';
import post576 from './posts/como-elegir-bien-y-ahorrar-en-navidad-siendo-inquilino-vulnerable.js';
import post577 from './posts/como-elegir-tu-hipoteca-para-proteger-tu-futuro-y-ahorrar.js';
import post578 from './posts/como-elegir-vivienda-en-barcelona-con-un-sueldo-limitado-guia-para-inquilinos.js';
import post579 from './posts/como-enfrentar-la-subida-del-alquiler-sin-perder-tu-hogar.js';
import post580 from './posts/como-enfrentar-pressoes-na-habitacao-em-portugal-guia-pratico-para-inquilinos.js';
import post581 from './posts/como-entender-tu-vivienda-mejora-tu-defensa-como-inquilino.js';
import post582 from './posts/como-entender-y-usar-simuladores-de-hipotecas-para-proteger-tu-bolsillo.js';
import post583 from './posts/como-evaluar-un-contrato-de-alquiler.js';
import post584 from './posts/como-evitar-desahucios-lecciones-del-caso-palmete-en-sevilla.js';
import post585 from './posts/como-evitar-el-desahucio-la-historia-de-juanjo-y-soluciones-reales.js';
import post586 from './posts/como-evitar-multas-y-aprovechar-deducciones-en-tu-alquiler.js';
import post587 from './posts/como-frenar-la-compra-especulativa-y-proteger-tu-alquiler.js';
import post588 from './posts/como-garantir-a-sua-habitacao-segura-e-acessivel-em-tempos-incertos.js';
import post589 from './posts/como-garantir-os-seus-direitos-na-habitacao-em-portugal.js';
import post590 from './posts/como-garantir-seus-direitos-na-habitacao-em-portugal.js';
import post591 from './posts/como-greves-e-crises-afetam-o-mercado-de-habitacao-em-portugal.js';
import post592 from './posts/como-hacer-bien-la-declaracion-de-la-renta-puede-salvar-tu-bolsillo.js';
import post593 from './posts/como-hacer-que-tu-casa-pequena-se-sienta-mas-grande-y-ahorrar-en-alquiler.js';
import post594 from './posts/como-impactan-las-mansiones-millonarias-a-los-inquilinos-vulnerables.js';
import post595 from './posts/como-la-anulacion-del-irph-puede-ayudarte-a-ahorrar-en-vivienda.js';
import post596 from './posts/como-la-carga-mental-afecta-a-inquilinos-vulnerables-y-como-protegerte.js';
import post597 from './posts/como-la-compra-de-bienes-incautados-puede-beneficiar-a-inquilinos-vulnerables.js';
import post598 from './posts/como-la-crisis-geopolitica-afecta-tu-alquiler-y-como-protegerte.js';
import post599 from './posts/como-la-crisis-internacional-afecta-tu-alquiler-y-como-protegerte.js';
import post600 from './posts/como-la-dana-cambia-tu-barrio-y-protege-tu-alquiler.js';
import post601 from './posts/como-la-desigualdad-en-parejas-afecta-tu-alquiler-y-tus-derechos.js';
import post602 from './posts/como-la-inflacion-reduce-el-valor-de-tus-ahorros-y-que-hacer-si-eres-inquilino.js';
import post603 from './posts/como-la-nueva-deduccion-fiscal-puede-aliviar-tu-economia-como-inquilino.js';
import post604 from './posts/como-la-nueva-fiscalidad-puede-proteger-a-inquilinos-vulnerables.js';
import post605 from './posts/como-la-politica-internacional-puede-proteger-tu-derecho-al-alquiler.js';
import post606 from './posts/como-la-regulacion-de-pisos-turisticos-en-toledo-protege-tu-alquiler.js';
import post607 from './posts/como-la-subasta-de-letras-del-tesoro-afecta-a-tu-alquiler-y-derechos.js';
import post608 from './posts/como-la-subida-de-precios-afecta-a-inquilinos-y-como-protegerse.js';
import post609 from './posts/como-la-subida-del-interes-en-letras-del-tesoro-afecta-a-inquilinos-vulnerables.js';
import post610 from './posts/como-la-supervision-del-bce-puede-proteger-a-los-inquilinos-vulnerables.js';
import post611 from './posts/como-la-ue-y-espana-buscan-proteger-a-los-inquilinos-vulnerables.js';
import post612 from './posts/como-lidar-com-a-pressao-da-habitacao-em-portugal-direitos-e-passos-praticos.js';
import post613 from './posts/como-lidar-com-a-pressao-da-habitacao-em-portugal.js';
import post614 from './posts/como-lidar-com-a-pressao-habitacional-e-proteger-se-como-inquilino-em-portugal.js';
import post615 from './posts/como-lidar-com-a-pressao-habitacional-em-portugal-direitos-e-passos-praticos.js';
import post616 from './posts/como-navegar-a-crise-da-habitacao-em-portugal.js';
import post617 from './posts/como-navegar-na-realidade-do-mercado-imobiliario-em-portugal.js';
import post618 from './posts/como-o-atraso-no-iva-a-6-afeta-a-construcao-de-casas-e-os-inquilinos.js';
import post619 from './posts/como-o-atraso-no-iva-a-6-afeta-quem-procura-casa-em-portugal.js';
import post620 from './posts/como-o-aumento-do-petroleo-afeta-o-mercado-de-habitacao-em-portugal.js';
import post621 from './posts/como-o-aumento-dos-precos-afeta-o-arrendamento-em-portugal.js';
import post622 from './posts/como-o-aumento-dos-precos-afeta-quem-vive-de-renda-em-portugal.js';
import post623 from './posts/como-o-aumento-dos-precos-da-energia-afeta-os-inquilinos-em-portugal.js';
import post624 from './posts/como-o-calor-extremo-afeta-inquilinas-em-portugal.js';
import post625 from './posts/como-o-contexto-geopolitico-afeta-a-habitacao-em-portugal.js';
import post626 from './posts/como-o-plano-europeu-para-baixar-a-fatura-energetica-afeta-os-inquilinos-em-port.js';
import post627 from './posts/como-poupar-para-a-habitacao-guia-pratico-para-inquilinos-em-portugal.js';
import post628 from './posts/como-proteger-se-em-arrendamento-direitos-e-deveres-do-inquilino.js';
import post629 from './posts/como-proteger-se-em-arrendamentos-em-portugal.js';
import post630 from './posts/como-proteger-se-em-arrendamentos-sob-pressao-habitacional-em-portugal.js';
import post631 from './posts/como-proteger-se-em-tempos-de-instabilidade-politica-e-economica.js';
import post632 from './posts/como-proteger-se-no-arrendamento-em-portugal-direitos-e-passos-praticos.js';
import post633 from './posts/como-proteger-tu-alquiler-ante-la-burbuja-inmobiliaria-y-gastos-crecientes.js';
import post634 from './posts/como-proteger-tu-alquiler-ante-la-subida-de-precios-en-2026.js';
import post635 from './posts/como-proteger-tu-alquiler-ante-subidas-y-ahorrar-en-2025.js';
import post636 from './posts/como-proteger-tu-alquiler-ante-subidas-y-crisis-de-vivienda.js';
import post637 from './posts/como-proteger-tu-alquiler-ante-subidas-y-rentabilidades-del-tesoro.js';
import post638 from './posts/como-proteger-tu-alquiler-cuando-el-dinero-para-vivienda-crece.js';
import post639 from './posts/como-proteger-tu-alquiler-en-tiempos-de-ferias-y-subidas-de-precios.js';
import post640 from './posts/como-proteger-tu-alquiler-en-tiempos-de-precios-al-alza.js';
import post641 from './posts/como-proteger-tu-alquiler-en-tiempos-de-subidas-y-crisis.js';
import post642 from './posts/como-proteger-tu-bolsillo-ante-las-subidas-del-alquiler-en-2026.js';
import post643 from './posts/como-proteger-tu-bolsillo-frente-a-subidas-y-cambios-en-el-alquiler.js';
import post644 from './posts/como-proteger-tu-bolsillo-y-derechos-en-alquiler-estas-navidades.js';
import post645 from './posts/como-proteger-tu-bolsillo-y-derechos-frente-al-aumento-del-alquiler.js';
import post646 from './posts/como-proteger-tu-hogar-frente-a-pisos-turisticos-en-tu-comunidad.js';
import post647 from './posts/como-proteger-tu-poder-de-compra-si-tu-alquiler-consume-casi-todo-tu-sueldo.js';
import post648 from './posts/como-proteger-tu-salud-y-bolsillo-siendo-inquilino-vulnerable.js';
import post649 from './posts/como-proteger-tu-vivienda-ante-lluvias-persistentes-en-sevilla.js';
import post650 from './posts/como-proteger-tu-vivienda-ante-situaciones-de-violencia-social.js';
import post651 from './posts/como-proteger-tu-vivienda-y-ahorrar-al-maximo-en-tiempos-dificiles.js';
import post652 from './posts/como-proteger-tu-vivienda-y-ahorrar-en-alquiler-siendo-inquilino-vulnerable.js';
import post653 from './posts/como-proteger-tu-vivienda-y-ahorrar-impuestos-a-partir-de-los-65-anos.js';
import post654 from './posts/como-proteger-tus-derechos-ante-acoso-inmobiliario-en-alquiler.js';
import post655 from './posts/como-proteger-tus-derechos-ante-la-subida-del-alquiler-en-espana.js';
import post656 from './posts/como-proteger-tus-derechos-ante-un-desahucio-en-espana.js';
import post657 from './posts/como-proteger-tus-derechos-como-inquilino-en-espana.js';
import post658 from './posts/como-proteger-tus-derechos-como-inquilino-en-tiempos-de-incertidumbre.js';
import post659 from './posts/como-proteger-tus-derechos-como-inquilino-en-tiempos-dificiles.js';
import post660 from './posts/como-proteger-tus-derechos-y-ahorrar-ante-subidas-de-alquiler.js';
import post661 from './posts/como-proteger-tus-derechos-y-ahorrar-en-alquiler-ante-la-crisis-actual.js';
import post662 from './posts/como-proteger-tus-derechos-y-ahorrar-en-alquiler-ante-la-incertidumbre-politica.js';
import post663 from './posts/como-proteger-tus-derechos-y-ahorrar-en-alquiler-ante-la-subida-de-la-derecha.js';
import post664 from './posts/como-proteger-tus-derechos-y-ahorrar-en-alquiler-ante-subidas-y-eventos.js';
import post665 from './posts/como-proteger-tus-derechos-y-ahorrar-en-alquiler-ante-subidas-y-mercado-cambiant.js';
import post666 from './posts/como-proteger-tus-derechos-y-ahorrar-en-alquiler-con-el-nuevo-panorama-politico.js';
import post667 from './posts/como-proteger-tus-derechos-y-ahorrar-en-alquiler-con-la-moratoria-antidesahucios.js';
import post668 from './posts/como-proteger-tus-derechos-y-ahorrar-en-alquiler-en-tiempos-de-bodas-y-lujo.js';
import post669 from './posts/como-proteger-tus-derechos-y-ahorrar-en-alquiler-en-tiempos-de-cambio.js';
import post670 from './posts/como-proteger-tus-derechos-y-ahorrar-en-alquiler-en-tiempos-de-conciertos-y-subi.js';
import post671 from './posts/como-proteger-tus-derechos-y-ahorrar-en-alquiler-en-tiempos-de-subidas.js';
import post672 from './posts/como-proteger-tus-derechos-y-ahorrar-en-alquiler-en-tiempos-dificiles.js';
import post673 from './posts/como-proteger-tus-derechos-y-ahorrar-en-alquiler-guia-para-inquilinos.js';
import post674 from './posts/como-proteger-tus-derechos-y-ahorrar-en-alquiler-siendo-inquilino-vulnerable.js';
import post675 from './posts/como-proteger-tus-derechos-y-ahorrar-en-alquiler-tras-casos-como-el-de-katy-perr.js';
import post676 from './posts/como-proteger-tus-derechos-y-ahorrar-en-alquiler-tras-polemica-en-madrid.js';
import post677 from './posts/como-proteger-tus-derechos-y-ahorrar-en-el-alquiler-en-tiempos-dificiles.js';
import post678 from './posts/como-proteger-tus-derechos-y-ahorrar-en-el-alquiler-siendo-inquilino-vulnerable.js';
import post679 from './posts/como-proteger-tus-derechos-y-ahorrar-en-un-alquiler-cada-vez-mas-caro.js';
import post680 from './posts/como-proteger-tus-derechos-y-ahorrar-en-un-alquiler-caro.js';
import post681 from './posts/como-proteger-tus-derechos-y-ahorrar-en-un-alquiler-cuesta-arriba.js';
import post682 from './posts/como-proteger-tus-derechos-y-ahorrar-en-un-alquiler-que-consume-casi-todo.js';
import post683 from './posts/como-proteger-tus-derechos-y-ahorrar-en-un-mercado-de-alquiler-complicado.js';
import post684 from './posts/como-proteger-tus-derechos-y-ahorrar-en-un-mercado-de-alquiler-dificil.js';
import post685 from './posts/como-proteger-tus-derechos-y-ahorrar-en-un-mercado-de-vivienda-dificil.js';
import post686 from './posts/como-proteger-tus-derechos-y-ahorrar-en-un-mercado-inmobiliario-dificil.js';
import post687 from './posts/como-proteger-tus-derechos-y-ahorrar-en-vivienda-siendo-inquilino-vulnerable.js';
import post688 from './posts/como-protegerse-ante-el-aumento-de-alquileres-en-espana.js';
import post689 from './posts/como-protegerse-ante-problemas-de-alquiler-y-desahucios-en-espana.js';
import post690 from './posts/como-protegerse-ante-problemas-de-vivienda-y-alquiler-en-espana.js';
import post691 from './posts/como-protegerte-ante-cesiones-de-suelo-publico-en-madrid-que-afectan-tu-alquiler.js';
import post692 from './posts/como-protegerte-ante-conflictos-con-el-propietario-en-alquileres-en-espana.js';
import post693 from './posts/como-protegerte-ante-el-auge-de-fondos-inmobiliarios-y-el-coliving.js';
import post694 from './posts/como-protegerte-ante-el-negocio-privado-del-alquiler-publico-en-madrid.js';
import post695 from './posts/como-protegerte-ante-la-presion-del-alquiler-en-espana.js';
import post696 from './posts/como-protegerte-ante-la-subida-del-alquiler-en-2026.js';
import post697 from './posts/como-protegerte-ante-la-subida-del-precio-de-la-vivienda-y-el-credito.js';
import post698 from './posts/como-protegerte-ante-las-subidas-del-alquiler-derechos-y-consejos-practicos.js';
import post699 from './posts/como-protegerte-ante-los-alquileres-imposibles-en-espana.js';
import post700 from './posts/como-protegerte-ante-problemas-de-alquiler-en-espana.js';
import post701 from './posts/como-protegerte-como-inquilino-en-espana-ante-problemas-de-vivienda.js';
import post702 from './posts/como-protegerte-como-inquilino-en-tiempos-de-incertidumbre.js';
import post703 from './posts/como-protegerte-como-inquilino-y-evitar-problemas-con-okupas.js';
import post704 from './posts/como-protegerte-del-auge-del-alquiler-turistico-y-cuidar-tu-bolsillo.js';
import post705 from './posts/como-protegerte-del-desahucio-y-ahorrar-en-alquiler-siendo-inquilino-vulnerable.js';
import post706 from './posts/como-protegerte-y-ahorrar-ante-la-crisis-del-alquiler-en-espana.js';
import post707 from './posts/como-protegerte-y-ahorrar-en-el-alquiler-claves-para-inquilinos-vulnerables.js';
import post708 from './posts/como-protegerte-y-ahorrar-en-el-alquiler-consejos-clave-para-inquilinos.js';
import post709 from './posts/como-protegerte-y-ahorrar-en-un-mercado-de-alquiler-dificil.js';
import post710 from './posts/como-protegerte-y-ahorrar-en-vivienda-ante-subidas-hipotecarias.js';
import post711 from './posts/como-protegerte-y-ahorrar-si-vives-en-vivienda-protegida.js';
import post712 from './posts/como-protegerte-y-ahorrar-siendo-inquilino-ante-subidas-y-gastos-inesperados.js';
import post713 from './posts/como-protegerte-y-ahorrar-siendo-inquilino-en-tiempos-de-cambios-inmobiliarios.js';
import post714 from './posts/como-reducir-tu-factura-fiscal-y-proteger-tu-alquiler-en-2025.js';
import post715 from './posts/como-te-protege-la-nueva-ley-contra-pisos-turisticos-ilegales.js';
import post716 from './posts/como-un-buen-jardin-puede-proteger-tu-vivienda-y-ahorrar-en-alquiler.js';
import post717 from './posts/comprar-casa-em-portugal-entenda-os-precos-e-proteja-se.js';
import post718 from './posts/comprar-casa-en-espana-cuanto-tiempo-y-esfuerzo-te-costara.js';
import post719 from './posts/comprar-casa-en-espana-lo-que-debes-saber-para-protegerte.js';
import post720 from './posts/comprar-casa-en-sevilla-y-si-toca-el-gordo-guia-para-inquilinos.js';
import post721 from './posts/comprar-habitaciones-una-opcion-para-inquilinos-con-pocos-recursos.js';
import post722 from './posts/comprar-o-alquilar-vivienda-en-espana-analisis-practico-para-inquilinos.js';
import post723 from './posts/comprar-piso-en-madrid-con-160-000-realidad-y-consejos-para-inquilinos.js';
import post724 from './posts/comprar-piso-tras-el-gordo-realidad-y-consejos-para-inquilinos.js';
import post725 from './posts/comprar-vivienda-angustia-comun-pero-hay-soluciones-para-inquilinos.js';
import post726 from './posts/comprar-vivienda-en-aragon-una-oportunidad-para-inquilinos-vulnerables.js';
import post727 from './posts/comprar-vivienda-en-canarias-que-significa-para-los-inquilinos-vulnerables.js';
import post728 from './posts/comprar-vivienda-en-madrid-con-160-000-la-realidad-para-inquilinos.js';
import post729 from './posts/comprare-casa-a-milano-e-roma-quanto-serve-davvero.js';
import post730 from './posts/compras-de-viviendas-en-andalucia-lo-que-debes-saber-como-inquilino-vulnerable.js';
import post731 from './posts/compraventa-de-vivienda-sube-claves-para-proteger-tu-alquiler.js';
import post732 from './posts/compraventa-de-viviendas-cae-guia-practica-para-inquilinos-vulnerables.js';
import post733 from './posts/comprendre-et-agir-face-a-l-expulsion-locative-en-france.js';
import post734 from './posts/comprendre-le-droit-au-logement-en-france-et-ses-enjeux-actuels.js';
import post735 from './posts/comprendre-ses-droits-et-agir-face-a-la-pression-du-logement-en-france.js';
import post736 from './posts/comprendre-ses-droits-face-a-une-expulsion-locative-en-france.js';
import post737 from './posts/comprendre-vos-droits-en-tant-que-locataire-face-a-l-expulsion.js';
import post738 from './posts/comprendre-vos-droits-face-a-un-proprietaire-difficile.js';
import post739 from './posts/comprendre-vos-droits-face-a-une-expulsion-locative-en-france.js';
import post740 from './posts/comprendre-vos-droits-face-aux-expulsions-locatives-en-france.js';
import post741 from './posts/concurrentie-bij-oranjevrouwen-en-wat-huurders-kunnen-leren.js';
import post742 from './posts/concurrentieregels-in-europa-wat-betekent-dit-voor-huurders-in-nederland.js';
import post743 from './posts/concurrentiestrijd-in-ruimtevaart-en-lessen-voor-huurders-in-nl.js';
import post744 from './posts/concurrentiestrijd-in-ruimtevaart-wat-betekent-het-voor-huurders.js';
import post745 from './posts/concurso-de-traslados-en-andalucia-2026-2027-guia-para-inquilinos.js';
import post746 from './posts/condominio-trasparenza-e-misure-anti-morosi-per-tutelare-gli-inquilini.js';
import post747 from './posts/conduccion-temeraria-en-torrent-impacto-y-derechos-para-inquilinos.js';
import post748 from './posts/conexiones-humanas-y-vivienda-como-proteger-tus-derechos-en-el-alquiler.js';
import post749 from './posts/conflitos-entre-inquilinos-e-senhorios-prevencao-e-direitos-em-portugal.js';
import post750 from './posts/congelacion-de-alquileres-que-significa-para-ti-como-inquilino.js';
import post751 from './posts/conoce-el-precio-real-de-la-vivienda-y-protege-tu-alquiler.js';
import post752 from './posts/consejos-practicos-para-inquilinos-ante-incertidumbres-politicas-y-sociales.js';
import post753 from './posts/consorcio-autonomico-de-vivienda-que-significa-para-inquilinos-vulnerables.js';
import post754 from './posts/construcao-em-solo-rustico-o-que-os-inquilinos-devem-saber.js';
import post755 from './posts/construccion-insuficiente-que-significa-para-inquilinos-vulnerables.js';
import post756 from './posts/construccion-modular-una-esperanza-real-para-inquilinos-vulnerables.js';
import post757 from './posts/construccion-sin-licencia-que-deben-saber-los-inquilinos-vulnerables.js';
import post758 from './posts/construccion-y-alquiler-como-proteger-tus-derechos-y-ahorrar.js';
import post759 from './posts/construir-em-solo-rustico-o-que-os-proprietarios-e-inquilinos-devem-saber.js';
import post760 from './posts/construir-o-no-construir-que-significa-para-ti-como-inquilino-vulnerable.js';
import post761 from './posts/construir-viviendas-clave-para-proteger-a-inquilinos-vulnerables.js';
import post762 from './posts/conti-correnti-in-coppia-come-tutelare-i-tuoi-diritti-in-affitto.js';
import post763 from './posts/conto-termico-3-0-stop-alle-domande-cosa-cambia-per-gli-inquilini.js';
import post764 from './posts/contrato-do-quartel-da-graca-o-que-os-inquilinos-devem-saber.js';
import post765 from './posts/contratos-de-alquiler-claros-clave-para-proteger-tu-hogar-y-bolsillo.js';
import post766 from './posts/control-de-alquileres-que-significa-para-ti-como-inquilino-vulnerable.js';
import post767 from './posts/controlli-catastali-e-impatto-sugli-inquilini-cosa-sapere.js';
import post768 from './posts/conventos-de-toledo-abren-viviendas-eticas-proteccion-y-ahorro-para-inquilinos.js';
import post769 from './posts/coping-with-pregnancy-loss-emotional-realities-for-tenants.js';
import post770 from './posts/cordoba-y-el-alquiler-que-significa-para-ti-esta-subida-moderada.js';
import post771 from './posts/cordoba-y-el-boom-inmobiliario-claves-para-inquilinos-vulnerables.js';
import post772 from './posts/corrupcion-y-alquiler-como-proteger-tus-derechos-y-ahorrar-hoy.js';
import post773 from './posts/cosa-cambia-per-gli-inquilini-con-la-crisi-di-kasanova-e-il-mercato-immobiliare.js';
import post774 from './posts/cosa-cambia-per-inquilini-e-clienti-bancari-con-l-offerta-intesa-su-mps.js';
import post775 from './posts/cosa-fare-se-il-proprietario-getta-i-tuoi-effetti-personali-nei-rifiuti.js';
import post776 from './posts/cosa-fare-se-il-proprietario-muore-diritti-e-tutele-per-l-inquilino.js';
import post777 from './posts/cosa-fare-se-sei-sotto-pressione-abitativa-in-italia.js';
import post778 from './posts/creating-comfortable-senior-living-spaces-in-swiss-care-homes.js';
import post779 from './posts/creating-your-own-outdoor-oasis-in-swiss-rentals.js';
import post780 from './posts/creative-easter-flower-ideas-to-brighten-your-swiss-home.js';
import post781 from './posts/crecimiento-poblacional-en-dos-hermanas-y-su-impacto-en-la-vivienda.js';
import post782 from './posts/credito-a-habitacao-cresce-10-7-impacto-para-inquilinos-em-portugal.js';
import post783 from './posts/credito-a-habitacao-em-portugal-impactos-para-os-inquilinos-em-2025.js';
import post784 from './posts/credito-a-habitacao-mais-caro-o-que-os-inquilinos-precisam-saber.js';
import post785 from './posts/credito-a-habitacao-novas-medidas-e-o-impacto-para-jovens-e-inquilinos.js';
import post786 from './posts/credito-de-vivienda-y-derechos-del-inquilino-como-protegerte-y-ahorrar.js';
import post787 from './posts/credito-habitacao-e-euribor-impacto-para-inquilinos-em-portugal.js';
import post788 from './posts/crescimento-imobiliario-no-centro-o-que-muda-para-inquilinos.js';
import post789 from './posts/crise-climatica-e-habitacao-o-que-os-inquilinos-devem-saber.js';
import post790 from './posts/crise-da-habitacao-em-portugal-desafios-e-solucoes-praticas-para-inquilinos.js';
import post791 from './posts/crise-da-habitacao-em-portugal-impactos-e-direitos-dos-inquilinos.js';
import post792 from './posts/crise-da-habitacao-em-portugal-o-que-muda-para-os-inquilinos.js';
import post793 from './posts/crise-da-habitacao-em-portugal-o-que-os-inquilinos-devem-saber.js';
import post794 from './posts/crise-da-habitacao-na-amadora-o-que-os-inquilinos-precisam-saber.js';
import post795 from './posts/crise-da-habitacao-na-europa-impactos-e-solucoes-para-inquilinos-em-portugal.js';
import post796 from './posts/crise-da-habitacao-na-europa-o-que-muda-para-os-inquilinos-em-portugal.js';
import post797 from './posts/crise-du-logement-en-france-comprendre-et-agir-pour-les-locataires.js';
import post798 from './posts/crise-du-logement-en-france-conseils-pratiques-pour-les-locataires.js';
import post799 from './posts/crise-du-logement-en-france-tensions-entre-locataires-et-proprietaires.js';
import post800 from './posts/crise-economica-em-portugal-impacto-na-habitacao-e-direitos-dos-inquilinos.js';
import post801 from './posts/crise-energetica-e-impacto-na-habitacao-guia-para-inquilinos-em-portugal.js';
import post802 from './posts/crise-energetica-e-impacto-na-habitacao-o-que-os-inquilinos-devem-saber.js';
import post803 from './posts/crise-no-mv-hondius-o-que-inquilinos-portugueses-devem-saber.js';
import post804 from './posts/crise-nos-transportes-em-coimbra-impacto-para-inquilinos-e-moradores.js';
import post805 from './posts/crisi-abitativa-giovani-in-italia-come-affrontarla-oggi.js';
import post806 from './posts/crisi-abitativa-in-italia-come-affrontare-caro-affitti-e-sfratti.js';
import post807 from './posts/crisi-immobiliare-a-dubai-cosa-significa-per-chi-cerca-casa-in-italia.js';
import post808 from './posts/crisis-de-la-vivienda-en-espana-guia-para-inquilinos-vulnerables.js';
import post809 from './posts/crisis-de-vivienda-como-proteger-tus-derechos-y-ahorrar-en-alquiler.js';
import post810 from './posts/crisis-de-vivienda-en-espana-guia-para-inquilinos-vulnerables.js';
import post811 from './posts/crisis-de-vivienda-en-europa-lo-que-debes-saber-para-protegerte.js';
import post812 from './posts/crisis-de-vivienda-que-significa-para-ti-y-como-protegerte.js';
import post813 from './posts/crisis-de-vivienda-y-salud-mental-guia-para-jovenes-inquilinos-en-espana.js';
import post814 from './posts/crisis-habitacional-en-espana-que-significa-para-ti-como-inquilino.js';
import post815 from './posts/cuando-bajara-el-precio-del-alquiler-guia-para-inquilinos-vulnerables.js';
import post816 from './posts/cuando-el-alquiler-consume-casi-todo-como-protegerte-y-ahorrar.js';
import post817 from './posts/cuando-el-alquiler-consume-tu-sueldo-como-protegerte-y-ahorrar.js';
import post818 from './posts/cuando-el-alquiler-consume-tu-vida-como-proteger-tus-derechos.js';
import post819 from './posts/cuando-el-alquiler-consume-tu-vida-como-protegerte-y-ahorrar.js';
import post820 from './posts/cuando-el-alquiler-consume-tu-vida-proteger-tus-derechos-en-la-crisis-inmobiliar.js';
import post821 from './posts/cuando-el-alquiler-pesa-derechos-y-soluciones-para-inquilinos-vulnerables.js';
import post822 from './posts/cuando-el-alquiler-pone-en-riesgo-tu-hogar-derechos-y-proteccion.js';
import post823 from './posts/cuando-el-alquiler-se-convierte-en-una-lucha-derechos-y-soluciones-para-inquilin.js';
import post824 from './posts/cuando-el-alquiler-se-vuelve-una-lucha-derechos-y-soluciones-para-inquilinos.js';
import post825 from './posts/cuando-el-dolor-se-enfrenta-a-la-vivienda-derechos-para-inquilinos-vulnerables.js';
import post826 from './posts/cuando-el-hogar-esta-en-riesgo-derechos-y-soluciones-para-inquilinos-vulnerables.js';
import post827 from './posts/cuando-el-hogar-se-convierte-en-riesgo-proteger-tu-vivienda-y-tus-derechos.js';
import post828 from './posts/cuando-el-hogar-se-tambalea-protegerse-ante-riesgos-en-la-vivienda.js';
import post829 from './posts/cuando-la-justicia-protege-tu-dignidad-y-tu-bolsillo.js';
import post830 from './posts/cuando-la-tension-en-casa-afecta-tu-alquiler-consejos-para-inquilinos-vulnerable.js';
import post831 from './posts/cuando-la-vivienda-peligra-como-protegerte-como-inquilino-vulnerable.js';
import post832 from './posts/cuando-la-vivienda-pesa-derechos-y-soluciones-para-inquilinos-vulnerables.js';
import post833 from './posts/cuando-la-vivienda-publica-tambalea-que-pueden-hacer-los-inquilinos.js';
import post834 from './posts/cuando-la-vivienda-se-convierte-en-un-riesgo-derechos-y-proteccion-para-inquilin.js';
import post835 from './posts/cuando-la-vivienda-se-vuelve-insegura-protegerte-como-inquilino-vulnerable.js';
import post836 from './posts/cuando-los-garajes-se-vuelven-hogares-claves-para-inquilinos-vulnerables.js';
import post837 from './posts/cuando-los-lujos-se-vuelven-un-reto-derechos-y-proteccion-para-inquilinos-vulner.js';
import post838 from './posts/cuando-puede-el-propietario-recuperar-tu-vivienda-protege-tus-derechos.js';
import post839 from './posts/cuando-recuperar-tu-hogar-se-convierte-en-pesadilla-guia-para-inquilinos.js';
import post840 from './posts/cuando-tu-casa-puede-ser-un-riesgo-como-protegerte-y-ahorrar.js';
import post841 from './posts/cuando-tu-hogar-se-tambalea-protegerse-en-tiempos-inciertos.js';
import post842 from './posts/cuando-tu-vivienda-esta-en-riesgo-protege-tus-derechos-como-inquilino.js';
import post843 from './posts/cuando-un-local-iconico-cierra-que-derechos-tienen-los-inquilinos.js';
import post844 from './posts/cuando-una-casa-se-vende-rapido-lecciones-para-inquilinos-vulnerables.js';
import post845 from './posts/cuanto-tiempo-trabajaras-para-comprar-tu-casa-lo-que-debes-saber.js';
import post846 from './posts/cucina-del-futuro-e-tecnologia-domestica-cosa-cambia-per-l-inquilino.js';
import post847 from './posts/cumplir-la-ley-para-inquilinos-protege-tu-vivienda-y-tu-bolsillo.js';
import post848 from './posts/cuotas-de-comunidad-lo-que-todo-inquilino-debe-saber-para-protegerse.js';
import post849 from './posts/dakloos-in-amsterdam-zo-helpt-verhuizen-naar-andere-gemeenten.js';
import post850 from './posts/dakloos-in-amsterdam-zo-vind-je-sneller-een-woning-buiten-de-stad.js';
import post851 from './posts/danni-da-negligenza-medica-cosa-fare-per-tutelare-i-propri-diritti.js';
import post852 from './posts/danos-em-patrimonio-historico-e-responsabilidades-o-que-os-inquilinos-devem-sabe.js';
import post853 from './posts/datacenter-e-immobili-impatti-per-chi-cerca-casa-in-italia.js';
import post854 from './posts/debiti-vecchi-e-pignoramento-casa-diritti-e-soluzioni-per-gli-inquilini.js';
import post855 from './posts/debo-pagar-el-ibi-y-tasa-de-basuras-protege-tus-derechos-como-inquilino.js';
import post856 from './posts/declaracion-de-la-renta-2024-clave-para-inquilinos-que-luchan-con-el-alquiler.js';
import post857 from './posts/declaracion-de-la-renta-2024-una-oportunidad-para-inquilinos-vulnerables.js';
import post858 from './posts/declaracion-de-la-renta-2025-2026-guia-para-inquilinos-en-espana.js';
import post859 from './posts/declaracion-de-la-renta-2025-claves-para-inquilinos-que-luchan-con-su-alquiler.js';
import post860 from './posts/declaracion-de-la-renta-2025-guia-para-inquilinos-que-buscan-ahorrar-y-protegers.js';
import post861 from './posts/deduccion-por-hipoteca-una-oportunidad-para-ahorrar-y-protegerte.js';
import post862 from './posts/deducciones-en-andalucia-ahorra-y-protege-tu-alquiler-en-2026.js';
import post863 from './posts/deducciones-en-andalucia-un-respiro-para-inquilinos-vulnerables.js';
import post864 from './posts/deducciones-en-la-declaracion-de-la-renta-y-su-impacto-en-inquilinos.js';
import post865 from './posts/deducciones-irpf-2026-ahorra-y-protege-tu-alquiler-en-andalucia.js';
import post866 from './posts/deducciones-por-alquiler-en-andalucia-como-ahorrar-y-proteger-tus-derechos.js';
import post867 from './posts/deducciones-por-alquiler-en-andalucia-protege-tu-bolsillo-hoy.js';
import post868 from './posts/deja-atras-el-alquiler-como-lograr-tu-propio-hogar-sin-arruinarte.js';
import post869 from './posts/deja-de-pagar-alquiler-casas-desde-29-000-para-inquilinos-vulnerables.js';
import post870 from './posts/del-fracaso-a-la-esperanza-lecciones-para-inquilinos-vulnerables.js';
import post871 from './posts/del-lujo-a-la-realidad-proteger-tus-derechos-como-inquilino-vulnerable.js';
import post872 from './posts/dementievriendelijke-woonomgeving-wat-huurders-moeten-weten.js';
import post873 from './posts/demenz-wg-in-oberasbach-schutz-fur-mieter-unter-druck.js';
import post874 from './posts/demolicao-do-edificio-transparente-impacto-para-inquilinos-e-moradores.js';
import post875 from './posts/demolicao-do-edificio-transparente-impactos-para-inquilinos-no-porto.js';
import post876 from './posts/derecho-a-la-vivienda-como-protegerte-y-ahorrar-siendo-inquilino.js';
import post877 from './posts/derechos-y-ahorro-para-inquilinos-frente-al-mercado-de-alquiler-actual.js';
import post878 from './posts/derechos-y-consejos-para-inquilinos-ante-la-presion-del-mercado-inmobiliario.js';
import post879 from './posts/derechos-y-consejos-para-inquilinos-bajo-presion-de-vivienda-en-espana.js';
import post880 from './posts/derechos-y-consejos-para-inquilinos-bajo-presion-en-espana.js';
import post881 from './posts/derechos-y-consejos-para-inquilinos-en-espana-ante-la-presion-de-alquiler.js';
import post882 from './posts/derechos-y-consejos-para-inquilinos-en-espana-ante-la-presion-de-la-vivienda.js';
import post883 from './posts/derechos-y-consejos-para-inquilinos-en-espana-bajo-presion-de-vivienda.js';
import post884 from './posts/derechos-y-consejos-para-inquilinos-frente-a-problemas-de-vivienda.js';
import post885 from './posts/derechos-y-estrategias-para-inquilinos-en-espana-ante-la-presion-inmobiliaria.js';
import post886 from './posts/derechos-y-pasos-para-inquilinos-ante-conflictos-en-alquileres-en-espana.js';
import post887 from './posts/derechos-y-proteccion-del-inquilino-frente-al-desahucio-en-espana.js';
import post888 from './posts/derechos-y-proteccion-para-inquilinos-en-situacion-vulnerable.js';
import post889 from './posts/derechos-y-recursos-para-inquilinos-bajo-presion-en-espana.js';
import post890 from './posts/derechos-y-soluciones-para-inquilinos-bajo-presion-en-espana.js';
import post891 from './posts/desafios-das-mulheres-portuguesas-no-mercado-de-habitacao.js';
import post892 from './posts/desagravamento-fiscal-na-habitacao-impacto-para-inquilinos-em-portugal.js';
import post893 from './posts/desagravamento-fiscal-na-habitacao-o-que-os-inquilinos-devem-saber.js';
import post894 from './posts/desahucio-en-malaga-que-hacer-ante-la-perdida-de-vivienda.js';
import post895 from './posts/desahucio-tras-54-anos-de-alquiler-que-derechos-tiene-el-inquilino.js';
import post896 from './posts/desahucios-en-espana-que-debes-saber-para-proteger-tu-hogar.js';
import post897 from './posts/desahucios-en-sevilla-protege-tu-hogar-y-tus-derechos-hoy.js';
import post898 from './posts/desahucios-y-alquiler-como-proteger-tus-derechos-y-ahorrar.js';
import post899 from './posts/desahucios-y-alquiler-como-protegerte-y-ahorrar-en-2026.js';
import post900 from './posts/desahucios-y-alquileres-como-proteger-tus-derechos-y-ahorrar.js';
import post901 from './posts/desahucios-y-vulnerabilidad-como-proteger-tus-derechos-y-ahorrar-en-alquiler.js';
import post902 from './posts/desalojos-y-derechos-como-protegerte-como-inquilino-vulnerable.js';
import post903 from './posts/descubre-como-el-hallazgo-romano-en-sevilla-puede-ayudarte-como-inquilino.js';
import post904 from './posts/descubrimiento-romano-en-sevilla-como-afecta-al-alquiler-y-tus-derechos.js';
import post905 from './posts/descuentos-en-alquiler-como-pagar-con-reformas-y-ahorrar.js';
import post906 from './posts/design-trifft-alltag-wie-kunst-und-gebrauchsmobel-den-wohnraum-bereichern.js';
import post907 from './posts/designer-mobel-wohntrends-was-mieter-wissen-sollten.js';
import post908 from './posts/desigualdad-en-vivienda-en-andalucia-como-proteger-tu-alquiler.js';
import post909 from './posts/despejos-aumentam-40-em-2025-o-que-os-inquilinos-devem-saber.js';
import post910 from './posts/despejos-e-arrendamento-em-portugal-direitos-e-solucoes-praticas.js';
import post911 from './posts/despejos-em-portugal-o-que-muda-e-como-agir.js';
import post912 from './posts/despejos-em-portugal-o-que-muda-e-como-proteger-se.js';
import post913 from './posts/despidos-y-sanciones-que-hacer-si-tu-empresa-actua-injustamente.js';
import post914 from './posts/detrazioni-fiscali-casa-e-bonus-elettrodomestici-guida-per-inquilini.js';
import post915 from './posts/digitalizacion-inmobiliaria-como-beneficia-a-inquilinos-vulnerables.js';
import post916 from './posts/direito-a-habitacao-em-portugal-direitos-e-desafios-para-inquilinos.js';
import post917 from './posts/direito-a-habitacao-em-portugal-entenda-a-crise-e-saiba-agir.js';
import post918 from './posts/direito-a-habitacao-em-portugal-entenda-a-crise-e-saiba-como-agir.js';
import post919 from './posts/direito-a-habitacao-em-portugal-resistencia-e-acao-dos-inquilinos.js';
import post920 from './posts/direito-de-preferencia-na-habitacao-o-que-muda-para-os-inquilinos-em-lisboa.js';
import post921 from './posts/direitos-das-inquilinas-em-portugal-desafios-e-solucoes-praticas.js';
import post922 from './posts/direitos-do-inquilino-em-portugal-como-agir-em-situacoes-de-pressao-habitacional.js';
import post923 from './posts/direitos-dos-inquilinos-em-portugal-como-agir-em-conflitos-com-senhorios.js';
import post924 from './posts/direitos-dos-inquilinos-em-portugal-como-enfrentar-pressoes-na-habitacao.js';
import post925 from './posts/direitos-dos-inquilinos-em-portugal-como-proteger-se-do-despejo.js';
import post926 from './posts/direitos-dos-inquilinos-em-portugal-como-proteger-se-na-crise-habitacional.js';
import post927 from './posts/direitos-dos-inquilinos-em-portugal-como-proteger-se-no-mercado-de-arrendamento.js';
import post928 from './posts/direitos-dos-inquilinos-em-portugal-guia-pratico-contra-despejos.js';
import post929 from './posts/direitos-dos-inquilinos-em-portugal-guia-pratico-para-situacoes-de-pressao-habit.js';
import post930 from './posts/direitos-dos-inquilinos-em-portugal-protecao-e-passos-praticos.js';
import post931 from './posts/direitos-dos-inquilinos-em-tempos-de-crise-politica.js';
import post932 from './posts/direitos-e-desafios-do-arrendamento-em-portugal-guia-para-inquilinos.js';
import post933 from './posts/direitos-e-desafios-do-arrendamento-em-portugal-guia-pratico-para-inquilinos.js';
import post934 from './posts/direitos-e-desafios-dos-inquilinos-em-portugal-em-2026.js';
import post935 from './posts/direitos-e-desafios-dos-inquilinos-em-portugal-guia-pratico.js';
import post936 from './posts/direitos-e-desafios-dos-inquilinos-em-portugal-saiba-agir.js';
import post937 from './posts/direitos-e-desafios-dos-inquilinos-em-portugal-saiba-como-agir.js';
import post938 from './posts/direitos-e-desafios-dos-inquilinos-em-portugal-saiba-como-proteger-se.js';
import post939 from './posts/direitos-e-desafios-dos-inquilinos-em-portugal.js';
import post940 from './posts/direitos-e-deveres-do-inquilino-em-portugal-guia-pratico.js';
import post941 from './posts/direitos-e-deveres-dos-inquilinos-em-portugal-guia-pratico.js';
import post942 from './posts/diritti-degli-inquilini-come-affrontare-le-incertezze-abitative-in-italia.js';
import post943 from './posts/diritti-degli-inquilini-cosa-fare-se-il-proprietario-chiude-anticipatamente.js';
import post944 from './posts/diritti-degli-inquilini-e-tutela-contro-sfratti-ingiustificati-in-italia.js';
import post945 from './posts/diritti-degli-inquilini-in-italia-come-affrontare-il-caro-affitti-e-lo-sfratto.js';
import post946 from './posts/diritti-degli-inquilini-in-italia-come-affrontare-il-caro-affitti.js';
import post947 from './posts/diritti-degli-inquilini-in-italia-come-affrontare-l-affitto-e-lo-sfratto.js';
import post948 from './posts/diritti-degli-inquilini-in-italia-come-affrontare-le-difficolta-abitative.js';
import post949 from './posts/diritti-degli-inquilini-in-italia-come-affrontare-le-pressioni-abitative.js';
import post950 from './posts/diritti-degli-inquilini-in-italia-come-affrontare-pressioni-abitative.js';
import post951 from './posts/diritti-degli-inquilini-in-italia-come-affrontare-sfratti-e-caro-affitti.js';
import post952 from './posts/diritti-degli-inquilini-sotto-pressione-abitativa-in-italia.js';
import post953 from './posts/diritti-e-doveri-degli-inquilini-in-situazioni-di-emergenza-abitativa.js';
import post954 from './posts/diritti-e-sfide-degli-inquilini-in-italia-come-affrontare-le-pressioni-abitative.js';
import post955 from './posts/diritti-e-sfide-degli-inquilini-in-italia-guida-pratica.js';
import post956 from './posts/diritti-e-sicurezza-degli-inquilini-affrontare-le-sfide-dell-abitare.js';
import post957 from './posts/diritti-e-soluzioni-per-chi-vive-sotto-pressione-abitativa-in-italia.js';
import post958 from './posts/diritti-e-tutela-degli-inquilini-in-italia-cosa-fare-contro-lo-sfratto.js';
import post959 from './posts/diritti-e-tutele-degli-inquilini-in-italia-come-affrontare-la-crisi-abitativa.js';
import post960 from './posts/diritti-e-tutele-degli-inquilini-in-italia-cosa-fare-sotto-pressione-abitativa.js';
import post961 from './posts/diritti-e-tutele-degli-inquilini-in-italia-cosa-sapere.js';
import post962 from './posts/diritti-e-tutele-degli-inquilini-in-italia-guida-pratica.js';
import post963 from './posts/diritti-e-tutele-degli-inquilini-in-situazioni-di-convivenza-difficile.js';
import post964 from './posts/diritti-e-tutele-dell-inquilino-in-italia-guida-pratica.js';
import post965 from './posts/discrecion-y-proteccion-lo-que-inquilinos-pueden-aprender-de-zendaya-y-holland.js';
import post966 from './posts/drohnen-uber-wohngebieten-was-mieter-wissen-sollten.js';
import post967 from './posts/droit-au-logement-comprendre-ses-droits-face-aux-expulsions-en-france.js';
import post968 from './posts/droits-des-locataires-en-france-comprendre-et-agir-face-aux-defis-du-logement.js';
import post969 from './posts/dsl-glasfaser-schnelles-internet-fur-mieter-in-deutschland.js';
import post970 from './posts/duracion-minima-del-alquiler-tu-derecho-para-evitar-desahucios-injustos.js';
import post971 from './posts/ecb-renteverhoging-wat-betekent-dit-voor-huurders-in-nederland.js';
import post972 from './posts/ecosistema-urbano-2025-cosa-significa-per-chi-vive-in-citta-italiane.js';
import post973 from './posts/ecrans-et-interactions-parents-bebes-impact-et-conseils-pratiques.js';
import post974 from './posts/edificios-vacios-y-alquileres-caros-como-proteger-tus-derechos-hoy.js';
import post975 from './posts/eduardo-casanova-y-el-valor-de-romper-silencios-lecciones-para-inquilinos-vulner.js';
import post976 from './posts/eficiencia-energetica-en-viviendas-que-significa-para-ti-como-inquilino.js';
import post977 from './posts/ehrenamt-in-berlin-engagement-starkt-nachbarschaft-und-mieterrechte.js';
import post978 from './posts/ehrenamtstag-2026-gemeinschaft-starken-auch-beim-wohnen.js';
import post979 from './posts/eigenbedarfskundigung-bei-wohnungseigentum-was-mieter-wissen-sollten.js';
import post980 from './posts/eigenheim-finanzieren-so-viel-immobilie-konnen-sie-sich-leisten.js';
import post981 from './posts/el-abismo-inmobiliario-en-cordoba-como-afecta-a-inquilinos-vulnerables.js';
import post982 from './posts/el-desgaste-emocional-del-alquiler-como-protegerte-y-ahorrar.js';
import post983 from './posts/el-espacio-en-la-vivienda-un-lujo-y-una-oportunidad-para-inquilinos-vulnerables.js';
import post984 from './posts/el-gran-desequilibrio-de-la-vivienda-en-espana-y-como-protegerte.js';
import post985 from './posts/el-impacto-real-del-boom-hipotecario-en-el-alquiler-y-tus-derechos.js';
import post986 from './posts/el-supremo-frena-subidas-abusivas-del-alquiler-guia-para-inquilinos.js';
import post987 from './posts/el-tiempo-y-tus-derechos-como-proteger-tu-alquiler-hoy.js';
import post988 from './posts/elecciones-andalucia-2026-impacto-en-vivienda-y-alquileres.js';
import post989 from './posts/elecciones-en-el-real-madrid-que-impacto-tiene-para-los-inquilinos.js';
import post990 from './posts/elecciones-y-vivienda-como-afectan-los-cambios-politicos-a-los-inquilinos.js';
import post991 from './posts/eleicoes-em-israel-e-o-impacto-indireto-na-habitacao-em-portugal.js';
import post992 from './posts/elektrische-huurfietsen-en-woonoverlast-wat-huurders-moeten-weten.js';
import post993 from './posts/elterngeldkurzungen-was-mieter-in-deutschland-jetzt-wissen-sollten.js';
import post994 from './posts/emergenza-abitativa-in-italia-come-difendersi-dalla-crisi-degli-affitti.js';
import post995 from './posts/emergenza-casa-in-italia-il-ruolo-del-patrimonio-immobiliare-pubblico.js';
import post996 from './posts/emergenza-casa-per-i-giovani-come-affrontare-l-alto-costo-dell-affitto.js';
import post997 from './posts/emotionele-avond-bij-sc-elim-samen-voetballen-voor-moeder-roelie.js';
import post998 from './posts/empadronamiento-clave-para-proteger-tus-derechos-como-inquilino.js';
import post999 from './posts/empty-affordable-flats-in-zurich-what-tenants-should-know.js';
import post1000 from './posts/energetische-sanierung-was-mieter-von-privaten-vermietern-erwarten-konnen.js';
import post1001 from './posts/energieausweis-was-mieter-und-vermieter-jetzt-wissen-mussen.js';
import post1002 from './posts/enfrentando-retos-cuidar-tu-salud-y-proteger-tu-alquiler.js';
import post1003 from './posts/entenda-os-direitos-dos-inquilinos-em-portugal-em-tempos-de-mudanca.js';
import post1004 from './posts/entenda-os-seus-direitos-no-arrendamento-em-portugal.js';
import post1005 from './posts/entenda-seus-direitos-como-inquilino-em-portugal-em-2024.js';
import post1006 from './posts/entenda-seus-direitos-no-arrendamento-guia-pratico-para-inquilinos-em-portugal.js';
import post1007 from './posts/entradas-agotadas-y-alquileres-altos-como-proteger-tus-derechos.js';
import post1008 from './posts/entrenucleos-oportunidad-para-inquilinos-que-buscan-calidad-y-ahorro.js';
import post1009 from './posts/entrenucleos-y-el-alquiler-como-protegerte-y-ahorrar-en-vivienda.js';
import post1010 from './posts/entschadigung-bei-gesperrter-dachterrasse-rechte-fur-eigentumer.js';
import post1011 from './posts/eredita-e-testamento-cosa-fare-se-sospetti-un-falso.js';
import post1012 from './posts/eres-inquilino-claves-para-protegerte-en-un-mercado-dificil.js';
import post1013 from './posts/eres-inquilino-como-protegerte-y-ahorrar-ante-el-auge-de-la-vivienda-en-solitari.js';
import post1014 from './posts/eres-inquilino-vulnerable-lo-que-debes-saber-sobre-el-nuevo-escudo-social.js';
import post1015 from './posts/eres-inquilino-vulnerable-protege-tu-hogar-y-tus-derechos-hoy.js';
import post1016 from './posts/ernstige-woningvervuiling-wat-huurders-moeten-weten.js';
import post1017 from './posts/es-tu-casero-un-gran-tenedor-conoce-tus-derechos-y-protegete.js';
import post1018 from './posts/es-una-habitacion-alquilada-una-vivienda-derechos-y-prorrogas.js';
import post1019 from './posts/escandalo-en-vivienda-publica-que-deben-saber-los-inquilinos-vulnerables.js';
import post1020 from './posts/escape-de-gas-en-albacete-protege-tu-hogar-y-tu-salud.js';
import post1021 from './posts/espana-crece-una-luz-para-inquilinos-en-alquiler-vulnerable.js';
import post1022 from './posts/espana-y-eeuu-que-significa-para-ti-como-inquilino-vulnerable.js';
import post1023 from './posts/espana-y-la-otan-que-significa-para-tu-alquiler-y-derechos.js';
import post1024 from './posts/essere-lasciati-fuori-casa-dall-ex-diritti-e-tutela-in-italia.js';
import post1025 from './posts/estafas-en-reformas-como-proteger-tu-hogar-y-tus-ahorros.js';
import post1026 from './posts/estudantes-dos-palop-em-portugal-desafios-e-habitacao.js';
import post1027 from './posts/eu-housing-red-tape-what-it-means-for-renters.js';
import post1028 from './posts/euribor-al-alza-como-afecta-a-inquilinos-y-como-protegerte.js';
import post1029 from './posts/euribor-estable-que-significa-para-inquilinos-con-alquileres-altos.js';
import post1030 from './posts/euribor-sube-claves-para-inquilinos-vulnerables-y-como-protegerse.js';
import post1031 from './posts/euribor-y-alquiler-claves-para-proteger-tu-bolsillo-y-tus-derechos.js';
import post1032 from './posts/euribor-y-alquiler-como-proteger-tu-bolsillo-en-tiempos-inciertos.js';
import post1033 from './posts/euribor-y-alquiler-como-proteger-tu-bolsillo-y-tus-derechos.js';
import post1034 from './posts/europe-s-housing-crisis-what-renters-need-to-know.js';
import post1035 from './posts/europe-s-housing-crisis-who-bears-the-burden.js';
import post1036 from './posts/europe-s-luxury-housing-boom-what-renters-need-to-know.js';
import post1037 from './posts/europe-s-rising-rents-what-tenants-need-to-know-in-2025.js';
import post1038 from './posts/european-rent-crisis-rising-costs-and-what-tenants-can-do.js';
import post1039 from './posts/ex-vereador-de-urbanismo-e-o-impacto-no-mercado-imobiliario-em-portugal.js';
import post1040 from './posts/existe-burbuja-inmobiliaria-lo-que-debes-saber-como-inquilino-vulnerable.js';
import post1041 from './posts/expulsions-locatives-en-france-comprendre-vos-droits-et-agir.js';
import post1042 from './posts/f24-automatico-e-prelievo-diretto-cosa-cambia-per-gli-inquilini.js';
import post1043 from './posts/facing-housing-challenges-while-managing-serious-illness.js';
import post1044 from './posts/fake-wohnungsanzeigen-erkennen-und-betrug-vermeiden.js';
import post1045 from './posts/faltan-casas-o-sobran-derechos-lo-que-debes-saber-inquilino.js';
import post1046 from './posts/famiglia-e-casa-cosa-fare-se-vivi-una-separazione-con-figli.js';
import post1047 from './posts/familias-monoparentais-e-direitos-na-assistencia-a-filhos-em-portugal.js';
import post1048 from './posts/farre-engagerar-sig-i-bostadsrattsforeningar-efter-ny-lag.js';
import post1049 from './posts/farre-planerar-renovera-efter-nya-bolaneregler.js';
import post1050 from './posts/fehlerhafte-produkttests-was-mieter-von-pyrexx-gegen-stiftung-warentest-lernen-k.js';
import post1051 from './posts/fernwarme-in-deutschland-was-mieter-jetzt-wissen-sollten.js';
import post1052 from './posts/fianza-del-alquiler-tu-derecho-a-recuperarla-en-30-dias.js';
import post1053 from './posts/fianzas-en-alquiler-protege-tu-dinero-y-tus-derechos-hoy.js';
import post1054 from './posts/fin-a-las-subidas-del-alquiler-como-proteger-tus-derechos-y-ahorrar.js';
import post1055 from './posts/fin-de-la-moratoria-de-desahucios-que-deben-saber-los-inquilinos-vulnerables.js';
import post1056 from './posts/fin-des-anciens-loyers-plafonnes-ce-que-cela-change-pour-les-locataires.js';
import post1057 from './posts/financiacion-autonomica-y-alquiler-que-debe-saber-el-inquilino-vulnerable.js';
import post1058 from './posts/finanza-pubblica-e-casa-cosa-cambia-per-gli-inquilini-in-italia.js';
import post1059 from './posts/finanzskandal-bei-berliner-zahnarzte-versorgungswerk-was-mieter-wissen-sollten.js';
import post1060 from './posts/firmas-un-contrato-de-alquiler-evita-perder-dinero-y-protege-tus-derechos.js';
import post1061 from './posts/fisco-e-conto-corrente-cosa-sapere-per-gli-inquilini-in-difficolta.js';
import post1062 from './posts/fler-bostader-saljs-utanfor-hemnet-vad-betyder-det-for-dig.js';
import post1063 from './posts/flexibilidade-nos-requisitos-ambientais-para-habitacao-acessivel.js';
import post1064 from './posts/fondo-soberano-y-vivienda-que-significa-para-los-inquilinos-vulnerables.js';
import post1065 from './posts/fondo-soberano-y-vivienda-que-significa-para-ti-como-inquilino.js';
import post1066 from './posts/foro-retos-una-esperanza-para-inquilinos-en-crisis-de-vivienda.js';
import post1067 from './posts/forte-dei-marmi-cosa-cambia-per-chi-vive-e-affitta.js';
import post1068 from './posts/fracaso-y-esperanza-lecciones-para-inquilinos-en-tiempos-dificiles.js';
import post1069 from './posts/fracaso-y-resiliencia-lecciones-para-inquilinos-en-tiempos-dificiles.js';
import post1070 from './posts/frankenschnellweg-ausbau-in-nurnberg-was-mieter-wissen-sollten.js';
import post1071 from './posts/fsh-och-hyresnivaer-vad-innebar-det-for-dig-som-hyresgast.js';
import post1072 from './posts/funderingsproblemen-in-nederland-wat-huurders-moeten-weten.js';
import post1073 from './posts/funderingsschade-wie-betaalt-en-wat-betekent-het-voor-huurders.js';
import post1074 from './posts/fusion-netflix-warner-que-significa-para-tu-alquiler-y-derechos.js';
import post1075 from './posts/gaia-aprova-o-dobro-das-casas-da-media-nacional-o-que-muda-para-os-inquilinos.js';
import post1076 from './posts/gaia-duplica-aprovacao-de-habitacoes-o-que-muda-para-os-inquilinos.js';
import post1077 from './posts/galeria-mietausfalle-was-mieter-jetzt-wissen-sollten.js';
import post1078 from './posts/gasto-en-vivienda-baja-que-significa-para-ti-como-inquilino-vulnerable.js';
import post1079 from './posts/gastos-de-comunidad-en-alquiler-protege-tu-bolsillo-y-tus-derechos.js';
import post1080 from './posts/gattificazione-come-adattare-casa-per-vivere-bene-col-gatto.js';
import post1081 from './posts/geburtenruckgang-und-regionale-unterschiede-auf-dem-wohnungsmarkt.js';
import post1082 from './posts/geopolitiek-en-woningmarkt-wat-huurders-moeten-weten.js';
import post1083 from './posts/geschiedenis-en-huur-wat-huurders-kunnen-leren-van-verhalen.js';
import post1084 from './posts/gesetzliche-rente-als-basis-was-mieter-jetzt-wissen-sollten.js';
import post1085 from './posts/gesetzliche-rente-auswirkungen-auf-mieter-und-wohnkosten.js';
import post1086 from './posts/gestire-la-pressione-abitativa-in-italia-guida-pratica-per-gli-inquilini.js';
import post1087 from './posts/gesunder-schlaf-und-zellregeneration-was-mieter-wissen-sollten.js';
import post1088 from './posts/gewalt-in-der-partnerschaft-schutz-und-wohnsituation-fur-betroffene.js';
import post1089 from './posts/gezond-wonen-risico-s-van-resistente-schimmels-in-huis-vermijden.js';
import post1090 from './posts/gezonde-woning-zonder-schimmel-recht-voor-elk-kind.js';
import post1091 from './posts/gifzones-belemmeren-woningbouw-wat-betekent-dit-voor-huurders.js';
import post1092 from './posts/glasgow-s-alternative-budget-a-new-hope-for-housing-rights.js';
import post1093 from './posts/government-benefits-for-uk-landlords-what-tenants-should-know.js';
import post1094 from './posts/governo-acelera-despejos-por-falta-de-pagamento-de-renda.js';
import post1095 from './posts/gran-barcelona-planea-131-000-pisos-sin-consumir-suelo-que-significa-para-ti.js';
import post1096 from './posts/gran-hermano-20-y-tu-alquiler-como-protegerte-y-ahorrar-hoy.js';
import post1097 from './posts/grandes-caseros-en-madrid-como-proteger-tus-derechos-y-ahorrar.js';
import post1098 from './posts/greves-e-habitacao-impactos-para-inquilinos-em-portugal.js';
import post1099 from './posts/grundstucksteilung-zugunsten-der-kinder-chancen-und-fallstricke.js';
import post1100 from './posts/grune-oasen-schaffen-mehr-lebensqualitat-auch-in-kleinen-mietwohnungen.js';
import post1101 from './posts/guadalajara-y-albacete-que-significa-para-ti-como-inquilino-vulnerable.js';
import post1102 from './posts/guia-clave-para-inquilinos-bajo-presion-en-el-mercado-inmobiliario-espanol.js';
import post1103 from './posts/guia-esencial-para-inquilinos-bajo-presion-en-espana.js';
import post1104 from './posts/guia-para-inquilinos-bajo-presion-de-vivienda-en-espana.js';
import post1105 from './posts/guia-para-inquilinos-como-proteger-tu-vivienda-en-espana.js';
import post1106 from './posts/guia-para-inquilinos-derechos-y-soluciones-ante-la-presion-de-la-vivienda.js';
import post1107 from './posts/guia-para-inquilinos-en-espana-ante-la-presion-de-la-vivienda.js';
import post1108 from './posts/guia-para-inquilinos-en-espana-derechos-y-consejos-practicos.js';
import post1109 from './posts/guia-para-inquilinos-en-espana-derechos-y-pasos-ante-problemas-de-vivienda.js';
import post1110 from './posts/guia-para-inquilinos-en-espana-derechos-y-soluciones-ante-la-presion-de-la-vivie.js';
import post1111 from './posts/guia-para-inquilinos-sobre-derechos-y-alquiler-en-espana.js';
import post1112 from './posts/guia-practica-para-inquilinos-ante-alquileres-y-desahucios-en-espana.js';
import post1113 from './posts/guia-practica-para-inquilinos-ante-la-presion-de-alquiler-en-espana.js';
import post1114 from './posts/guia-practica-para-inquilinos-ante-la-presion-de-vivienda-en-espana.js';
import post1115 from './posts/guia-practica-para-inquilinos-ante-la-presion-del-alquiler-en-espana.js';
import post1116 from './posts/guia-practica-para-inquilinos-ante-la-presion-del-mercado-inmobiliario-en-espana.js';
import post1117 from './posts/guia-practica-para-inquilinos-ante-la-presion-del-mercado-inmobiliario.js';
import post1118 from './posts/guia-practica-para-inquilinos-ante-la-presion-inmobiliaria-en-espana.js';
import post1119 from './posts/guia-practica-para-inquilinos-ante-presiones-en-el-alquiler-en-espana.js';
import post1120 from './posts/guia-practica-para-inquilinos-ante-problemas-de-vivienda-en-espana.js';
import post1121 from './posts/guia-practica-para-inquilinos-bajo-presion-de-vivienda-en-espana.js';
import post1122 from './posts/guia-practica-para-inquilinos-bajo-presion-en-el-mercado-de-vivienda.js';
import post1123 from './posts/guia-practica-para-inquilinos-bajo-presion-en-el-mercado-inmobiliario-espanol.js';
import post1124 from './posts/guia-practica-para-inquilinos-bajo-presion-en-espana.js';
import post1125 from './posts/guia-practica-para-inquilinos-derechos-y-consejos-en-alquileres-en-espana.js';
import post1126 from './posts/guia-practica-para-inquilinos-derechos-y-consejos-en-el-alquiler-en-espana.js';
import post1127 from './posts/guia-practica-para-inquilinos-derechos-y-desafios-en-el-alquiler-en-espana.js';
import post1128 from './posts/guia-practica-para-inquilinos-derechos-y-obligaciones-en-el-alquiler-en-espana.js';
import post1129 from './posts/guia-practica-para-inquilinos-derechos-y-opciones-ante-problemas-de-vivienda.js';
import post1130 from './posts/guia-practica-para-inquilinos-derechos-y-pasos-ante-problemas-de-vivienda.js';
import post1131 from './posts/guia-practica-para-inquilinos-derechos-y-soluciones-ante-la-presion-de-la-vivien.js';
import post1132 from './posts/guia-practica-para-inquilinos-derechos-y-soluciones-ante-la-presion-inmobiliaria.js';
import post1133 from './posts/guia-practica-para-inquilinos-derechos-y-soluciones-en-alquiler.js';
import post1134 from './posts/guia-practica-para-inquilinos-derechos-y-soluciones-en-el-alquiler.js';
import post1135 from './posts/guia-practica-para-inquilinos-derechos-y-soluciones-en-vivienda.js';
import post1136 from './posts/guia-practica-para-inquilinos-en-el-mercado-de-alquiler-en-espana.js';
import post1137 from './posts/guia-practica-para-inquilinos-en-espana-ante-cambios-en-vivienda-y-alquiler.js';
import post1138 from './posts/guia-practica-para-inquilinos-en-espana-ante-crisis-habitacional.js';
import post1139 from './posts/guia-practica-para-inquilinos-en-espana-ante-la-presion-de-la-vivienda.js';
import post1140 from './posts/guia-practica-para-inquilinos-en-espana-ante-la-presion-inmobiliaria.js';
import post1141 from './posts/guia-practica-para-inquilinos-en-espana-ante-presiones-de-vivienda.js';
import post1142 from './posts/guia-practica-para-inquilinos-en-espana-bajo-presion-de-vivienda.js';
import post1143 from './posts/guia-practica-para-inquilinos-en-espana-derechos-y-alquiler-seguro.js';
import post1144 from './posts/guia-practica-para-inquilinos-en-espana-derechos-y-alquiler.js';
import post1145 from './posts/guia-practica-para-inquilinos-en-espana-derechos-y-alquileres.js';
import post1146 from './posts/guia-practica-para-inquilinos-en-espana-derechos-y-ayudas-al-alquiler.js';
import post1147 from './posts/guia-practica-para-inquilinos-en-espana-derechos-y-como-actuar.js';
import post1148 from './posts/guia-practica-para-inquilinos-en-espana-derechos-y-consejos-ante-el-alquiler.js';
import post1149 from './posts/guia-practica-para-inquilinos-en-espana-derechos-y-consejos-ante-la-presion-de-l.js';
import post1150 from './posts/guia-practica-para-inquilinos-en-espana-derechos-y-consejos-ante-la-presion-inmo.js';
import post1151 from './posts/guia-practica-para-inquilinos-en-espana-derechos-y-consejos-esenciales.js';
import post1152 from './posts/guia-practica-para-inquilinos-en-espana-derechos-y-consejos.js';
import post1153 from './posts/guia-practica-para-inquilinos-en-espana-derechos-y-opciones-ante-la-presion-inmo.js';
import post1154 from './posts/guia-practica-para-inquilinos-en-espana-derechos-y-opciones.js';
import post1155 from './posts/guia-practica-para-inquilinos-en-espana-derechos-y-pasos-ante-el-alquiler.js';
import post1156 from './posts/guia-practica-para-inquilinos-en-espana-derechos-y-pasos-ante-problemas-de-alqui.js';
import post1157 from './posts/guia-practica-para-inquilinos-en-espana-derechos-y-pasos-ante-problemas-de-vivie.js';
import post1158 from './posts/guia-practica-para-inquilinos-en-espana-derechos-y-proteccion.js';
import post1159 from './posts/guia-practica-para-inquilinos-en-espana-derechos-y-recursos-frente-al-alquiler.js';
import post1160 from './posts/guia-practica-para-inquilinos-en-espana-derechos-y-recursos.js';
import post1161 from './posts/guia-practica-para-inquilinos-en-espana-derechos-y-soluciones-ante-la-presion-de.js';
import post1162 from './posts/guia-practica-para-inquilinos-en-espana-derechos-y-soluciones.js';
import post1163 from './posts/guia-practica-para-inquilinos-en-espana-frente-a-la-presion-de-la-vivienda.js';
import post1164 from './posts/guia-practica-para-inquilinos-en-espana-frente-a-la-presion-inmobiliaria.js';
import post1165 from './posts/guia-practica-para-inquilinos-en-espana-sobre-alquiler-y-desahucios.js';
import post1166 from './posts/guia-practica-para-inquilinos-en-sevilla-ante-la-presion-del-mercado-inmobiliari.js';
import post1167 from './posts/guia-practica-para-inquilinos-en-sevilla-como-afrontar-la-presion-de-la-vivienda.js';
import post1168 from './posts/guia-practica-para-inquilinos-en-situacion-de-presion-habitacional.js';
import post1169 from './posts/guia-practica-para-inquilinos-en-situaciones-de-presion-habitacional-en-espana.js';
import post1170 from './posts/guia-practica-para-inquilinos-frente-a-la-presion-del-alquiler-en-espana.js';
import post1171 from './posts/guia-practica-para-inquilinos-sobre-alquiler-y-desahucios-en-espana.js';
import post1172 from './posts/guia-practica-para-inquilinos-sobre-alquiler-y-vivienda-en-espana.js';
import post1173 from './posts/guia-practica-para-inquilinos-sobre-derechos-y-alquiler-en-espana.js';
import post1174 from './posts/guia-practica-sobre-alquiler-y-derechos-del-inquilino-en-espana.js';
import post1175 from './posts/guia-practica-sobre-alquileres-y-derechos-del-inquilino-en-espana.js';
import post1176 from './posts/guia-practica-sobre-derechos-y-desafios-del-alquiler-en-espana.js';
import post1177 from './posts/guia-practica-sobre-el-alquiler-y-derechos-de-los-inquilinos-en-espana.js';
import post1178 from './posts/habitacao-acessivel-em-portugal-direitos-e-estrategias-para-inquilinos.js';
import post1179 from './posts/habitacao-acessivel-em-santiago-do-cacem-o-que-muda-para-inquilinos.js';
import post1180 from './posts/habitacao-acessivel-na-ue-o-que-muda-para-os-inquilinos-em-portugal.js';
import post1181 from './posts/habitacao-colaborativa-viver-em-comunidade-com-independencia.js';
import post1182 from './posts/habitacao-em-portugal-a-emergencia-nacional-e-o-direito-dos-inquilinos.js';
import post1183 from './posts/habitacao-em-portugal-da-casa-como-direito-a-mercadoria.js';
import post1184 from './posts/habitacao-publica-do-futuro-o-que-muda-para-os-inquilinos.js';
import post1185 from './posts/habitacao-publica-em-portugal-desafios-e-oportunidades-para-inquilinos.js';
import post1186 from './posts/habitacao-senior-em-portugal-impactos-e-direitos-dos-inquilinos.js';
import post1187 from './posts/habitacao-senior-em-portugal-o-que-os-inquilinos-precisam-saber.js';
import post1188 from './posts/hantavirus-e-abitazioni-cosa-devono-sapere-gli-inquilini-in-italia.js';
import post1189 from './posts/hasta-2-000-para-jovenes-protege-tu-alquiler-en-sevilla.js';
import post1190 from './posts/haus-geerbt-unter-30-herausforderungen-und-chancen-fur-junge-erben.js';
import post1191 from './posts/hausbau-mit-architekt-worauf-bauherren-achten-sollten.js';
import post1192 from './posts/hausbau-und-baurisiken-vermeiden-was-mieter-wissen-sollten.js';
import post1193 from './posts/hausboot-statt-teurer-wohnung-wohnen-auf-dem-wasser-in-deutschland.js';
import post1194 from './posts/hausgeldpflicht-trotz-fehlender-jahresabrechnung.js';
import post1195 from './posts/hauskauf-in-deutschland-hurden-verstehen-und-meistern.js';
import post1196 from './posts/hauskauf-ohne-vertrag-risiken-und-was-mieter-daraus-lernen-konnen.js';
import post1197 from './posts/hauskauf-per-auktion-chancen-und-risiken-fur-mieter.js';
import post1198 from './posts/hauskauf-und-baufinanzierung-ki-zinsen-beratung-verstehen.js';
import post1199 from './posts/hausordnung-in-mietwohnungen-rechte-und-pflichten-verstehen.js';
import post1200 from './posts/hausschaden-vor-verkauf-was-mieter-wissen-sollten.js';
import post1201 from './posts/hausse-des-loyers-comprendre-et-agir-face-a-la-crise-du-logement.js';
import post1202 from './posts/hausverkauf-und-immobilienbewertung-was-mieter-wissen-sollten.js';
import post1203 from './posts/hausverwalter-zertifizierung-was-mieter-wissen-sollten.js';
import post1204 from './posts/hay-hogar-para-todos-protege-tu-derecho-como-inquilino-vulnerable.js';
import post1205 from './posts/heimatgefuhl-in-neuen-quartieren-was-mietende-wissen-sollten.js';
import post1206 from './posts/heizkostenbremse-was-mieter-und-vermieter-jetzt-wissen-mussen.js';
import post1207 from './posts/heizkostenteilung-bei-fossilen-heizungen-was-mieter-wissen-sollten.js';
import post1208 from './posts/heizungsgesetz-und-mieterschutz-was-mieter-jetzt-wissen-sollten.js';
import post1209 from './posts/herancas-indivisas-e-arrendamento-o-que-muda-para-inquilinos-e-herdeiros.js';
import post1210 from './posts/herancas-indivisas-e-arrendamento-o-que-mudam-as-novas-regras.js';
import post1211 from './posts/heredar-una-vivienda-que-deben-saber-los-inquilinos-vulnerables.js';
import post1212 from './posts/herede-una-vivienda-alquilada-protege-tus-derechos-como-inquilino.js';
import post1213 from './posts/herederos-okupa-y-alquiler-como-proteger-tus-derechos-y-ahorrar.js';
import post1214 from './posts/herencias-millonarias-y-alquiler-que-debes-saber-para-protegerte.js';
import post1215 from './posts/herencias-record-y-tu-alquiler-como-proteger-tu-hogar-y-ahorrar.js';
import post1216 from './posts/herencias-y-alquiler-como-proteger-tu-vivienda-y-ahorrar-impuestos.js';
import post1217 from './posts/herencias-y-donaciones-claves-para-inquilinos-que-luchan-por-su-hogar.js';
import post1218 from './posts/herencias-y-vivienda-lo-que-todo-inquilino-debe-saber-para-protegerse.js';
import post1219 from './posts/high-taxes-hit-swiss-retirees-hard-what-tenants-should-know.js';
import post1220 from './posts/hipoteca-inversa-y-alquiler-como-proteger-tus-derechos-y-ahorrar.js';
import post1221 from './posts/hipotecas-al-100-que-significa-para-los-inquilinos-vulnerables.js';
import post1222 from './posts/hipotecas-al-100-una-oportunidad-para-inquilinos-vulnerables.js';
import post1223 from './posts/hipotecas-al-alza-como-afecta-a-inquilinos-vulnerables.js';
import post1224 from './posts/hipotecas-al-alza-como-proteger-tus-derechos-como-inquilino-vulnerable.js';
import post1225 from './posts/hipotecas-al-alza-en-cordoba-que-significa-para-ti-como-inquilino.js';
import post1226 from './posts/hipotecas-al-alza-que-implica-para-inquilinos-vulnerables.js';
import post1227 from './posts/hipotecas-al-alza-que-significa-para-ti-como-inquilino.js';
import post1228 from './posts/hipotecas-bajas-y-alquileres-altos-como-proteger-tu-bolsillo.js';
import post1229 from './posts/hipotecas-baratas-en-espana-que-significa-para-los-inquilinos.js';
import post1230 from './posts/hipotecas-en-2026-que-significa-para-los-inquilinos-vulnerables.js';
import post1231 from './posts/hipotecas-en-canarias-y-como-proteger-tu-alquiler-hoy.js';
import post1232 from './posts/hipotecas-fijas-y-alquiler-claves-para-proteger-tu-bolsillo-en-2025.js';
import post1233 from './posts/hipotecas-irph-y-alquiler-que-debes-saber-para-proteger-tu-bolsillo.js';
import post1234 from './posts/hipotecas-mas-baratas-en-espana-que-significa-para-ti-como-inquilino.js';
import post1235 from './posts/hipotecas-record-y-alquiler-como-proteger-tus-derechos-y-ahorrar.js';
import post1236 from './posts/hipotecas-record-y-precios-altos-como-protegerte-como-inquilino.js';
import post1237 from './posts/hipotecas-suben-pero-inquilinos-pueden-proteger-su-bolsillo-hoy.js';
import post1238 from './posts/hoe-nieuwe-woongebouwen-bijdragen-aan-betaalbare-huisvesting.js';
import post1239 from './posts/hoe-staatssteun-aan-chinese-bedrijven-de-woningmarkt-indirect-raakt.js';
import post1240 from './posts/hoe-woningkopers-van-buiten-kansen-van-starters-beinvloeden.js';
import post1241 from './posts/hohe-mieten-und-teure-bauplatze-in-mainz-was-mieter-wissen-sollten.js';
import post1242 from './posts/horarios-de-la-feria-de-sevilla-2026-y-su-impacto-en-los-vecinos.js';
import post1243 from './posts/housing-pressure-in-switzerland-what-tenants-should-know.js';
import post1244 from './posts/housing-pressure-on-zurich-lake-s-left-shore-what-tenants-should-know.js';
import post1245 from './posts/housing-regulations-in-zurich-what-tenants-should-know.js';
import post1246 from './posts/housing-safety-and-tenant-rights-in-switzerland-what-you-need-to-know.js';
import post1247 from './posts/housing-shortage-in-switzerland-what-tenants-should-know.js';
import post1248 from './posts/how-ahv-changes-impact-swiss-renters-housing-costs.js';
import post1249 from './posts/how-ahv-contribution-hikes-affect-swiss-renters.js';
import post1250 from './posts/how-buy-to-let-landlords-affect-uk-renters-today.js';
import post1251 from './posts/how-china-s-ban-on-ash-apartments-highlights-housing-challenges.js';
import post1252 from './posts/how-construction-delays-affect-tenants-in-zurich-what-you-need-to-know.js';
import post1253 from './posts/how-consumer-trust-issues-affect-housing-choices-in-switzerland.js';
import post1254 from './posts/how-falling-mortgage-rates-could-affect-uk-renters.js';
import post1255 from './posts/how-governance-shapes-europe-s-housing-crisis-what-tenants-need-to-know.js';
import post1256 from './posts/how-historical-trauma-impacts-housing-stability-for-swiss-tenants.js';
import post1257 from './posts/how-housing-stress-impacts-families-and-what-tenants-can-do.js';
import post1258 from './posts/how-middle-east-conflict-impacts-uk-property-market-and-tenants.js';
import post1259 from './posts/how-middle-east-expats-impact-london-s-luxury-rental-market.js';
import post1260 from './posts/how-neoliberalism-shapes-uk-housing-and-what-tenants-can-do.js';
import post1261 from './posts/how-poverty-impacts-children-s-development-and-housing-stability.js';
import post1262 from './posts/how-rising-interest-rates-affect-uk-renters-and-homebuyers.js';
import post1263 from './posts/how-rising-mortgage-rates-impact-renters-amid-housing-market-shifts.js';
import post1264 from './posts/how-south-london-campaigners-beat-developers-to-protect-affordable-housing.js';
import post1265 from './posts/how-spending-trends-impact-uk-renters-and-housing-stability.js';
import post1266 from './posts/how-swiss-renters-are-affected-by-the-13th-ahv-pension-costs.js';
import post1267 from './posts/how-the-renters-rights-act-affects-uk-tenants-today.js';
import post1268 from './posts/how-to-avoid-becoming-a-landlord-ethical-housing-choices.js';
import post1269 from './posts/how-to-protect-yourself-as-a-tenant-in-the-uk-housing-crisis.js';
import post1270 from './posts/how-uk-housing-policies-are-shifting-power-from-landlords-to-tenants.js';
import post1271 from './posts/how-uk-housing-subsidies-benefit-landlords-more-than-tenants.js';
import post1272 from './posts/how-uk-property-market-shifts-affect-renters-today.js';
import post1273 from './posts/how-uk-tenants-can-navigate-last-minute-evictions.js';
import post1274 from './posts/how-zurich-s-housing-initiatives-impact-tenants.js';
import post1275 from './posts/how-zurich-s-housing-protection-initiative-may-impact-renters.js';
import post1276 from './posts/huisvesting-onder-druk-praktische-tips-voor-huurders-in-nederland.js';
import post1277 from './posts/huisvesting-onder-druk-wat-huurders-moeten-weten-in-2024.js';
import post1278 from './posts/hulp-bij-autopech-wat-kunnen-huurders-leren.js';
import post1279 from './posts/huurders-en-de-woningmarkt-praktische-tips-bij-drukte-en-onzekerheid.js';
import post1280 from './posts/huurders-en-woningnood-praktische-gids-tegen-ontruiming-en-kraak.js';
import post1281 from './posts/huurders-en-woningnood-praktische-hulp-bij-huisvesting.js';
import post1282 from './posts/huurders-in-de-knel-praktische-hulp-bij-woningdruk-in-nederland.js';
import post1283 from './posts/huurders-in-nederland-praktische-hulp-bij-huisvestingsdruk.js';
import post1284 from './posts/huurders-onder-druk-omgaan-met-onzekerheid-op-de-woningmarkt.js';
import post1285 from './posts/huurdersrechten-en-ontruiming-wat-u-moet-weten-in-nl.js';
import post1286 from './posts/huurregels-versoepeld-wat-betekent-dit-voor-huurders.js';
import post1287 from './posts/huurverhoging-sociale-huur-2026-wat-huurders-moeten-weten.js';
import post1288 from './posts/huurverhoging-voorkomen-wat-huurders-nu-moeten-weten.js';
import post1289 from './posts/hypotheekrente-stijgt-wat-betekent-dit-voor-huurders.js';
import post1290 from './posts/hypotheekrenteaftrek-stopt-in-2031-wat-betekent-dit-voor-jou.js';
import post1291 from './posts/hypotheekrenteaftrek-wat-betekent-dit-voor-huurders.js';
import post1292 from './posts/hyresfrysning-och-hojda-bostadsbidrag-vad-det-betyder-for-dig.js';
import post1293 from './posts/hyresgastforeningen-och-hyressattningen-vad-betyder-det-for-dig.js';
import post1294 from './posts/hyresgastforeningen-och-marknadshyror-vad-innebar-det-for-dig.js';
import post1295 from './posts/hyresvarden-titania-utmanar-det-svenska-hyressystemet.js';
import post1296 from './posts/ia-y-vivienda-como-la-tecnologia-puede-proteger-a-inquilinos-vulnerables.js';
import post1297 from './posts/ibi-progresivo-en-barcelona-que-significa-para-los-inquilinos.js';
import post1298 from './posts/ijstad-en-de-nederlandse-woningcrisis-wat-betekent-het-voor-huurders.js';
import post1299 from './posts/il-diritto-di-casa-tra-equivoci-e-diritti-degli-inquilini.js';
import post1300 from './posts/il-futuro-degli-immobili-in-versilia-cosa-cambia-per-gli-inquilini.js';
import post1301 from './posts/il-legame-cuore-cane-cosa-significa-per-chi-vive-in-affitto.js';
import post1302 from './posts/immobilien-und-der-silver-tsunami-was-mieter-wissen-sollten.js';
import post1303 from './posts/immobilien-vererben-in-deutschland-klug-planen-streit-vermeiden.js';
import post1304 from './posts/immobilien-vererben-in-deutschland-so-schutzen-mieter-ihre-rechte.js';
import post1305 from './posts/immobilienboom-und-wohnungsdruck-was-mieter-jetzt-wissen-mussen.js';
import post1306 from './posts/immobilienfinanzierung-in-deutschland-herausforderungen-fur-kaufer.js';
import post1307 from './posts/immobilienkauf-in-berlin-chancen-und-herausforderungen-fur-mieter.js';
import post1308 from './posts/immobilienkauf-in-frankfurt-chancen-und-herausforderungen-fur-mieter.js';
import post1309 from './posts/immobilienkauf-in-frankfurt-chancen-und-risiken-fur-mieter.js';
import post1310 from './posts/immobilienkauf-in-hamburg-chancen-und-herausforderungen-fur-mieter.js';
import post1311 from './posts/immobilienkauf-und-verhandlung-was-mieter-wissen-sollten.js';
import post1312 from './posts/immobilienkredite-und-ihre-folgen-fur-mieter-in-deutschland.js';
import post1313 from './posts/immobilienkrisen-mieterschutz-was-mieter-jetzt-wissen-sollten.js';
import post1314 from './posts/immobilienmarkt-2026-chancen-und-risiken-fur-mieter-in-deutschland.js';
import post1315 from './posts/immobilienpreise-2035-wie-mieter-und-kaufer-sich-jetzt-schutzen-konnen.js';
import post1316 from './posts/immobilienpreise-auf-sylt-und-kustenregionen-was-mieter-wissen-sollten.js';
import post1317 from './posts/immobilienpreise-in-bayerns-alpen-was-mieter-jetzt-wissen-sollten.js';
import post1318 from './posts/immobilienrisiken-und-ihre-folgen-fur-mieter-in-deutschland.js';
import post1319 from './posts/impact-buitenlandse-beleggers-op-betaalbare-huurwoningen.js';
import post1320 from './posts/impacto-da-alta-nos-precos-da-habitacao-de-gama-alta-em-portugal.js';
import post1321 from './posts/impacto-da-crise-energetica-nas-rendas-e-habitacao-em-portugal.js';
import post1322 from './posts/impacto-da-crise-internacional-nos-custos-da-habitacao-em-portugal.js';
import post1323 from './posts/impacto-da-saida-da-habitacao-do-prr-para-inquilinos-em-portugal.js';
import post1324 from './posts/impacto-da-saida-da-ryanair-nos-acores-o-que-muda-para-inquilinos.js';
import post1325 from './posts/impacto-da-subida-da-euribor-nos-contratos-de-arrendamento-em-portugal.js';
import post1326 from './posts/impacto-da-subida-dos-precos-da-habitacao-em-madrid-para-inquilinos.js';
import post1327 from './posts/impacto-de-desastres-ambientais-na-habitacao-o-que-deve-saber.js';
import post1328 from './posts/impacto-de-la-feria-de-sevilla-2026-en-los-inquilinos-y-sus-desplazamientos.js';
import post1329 from './posts/impacto-del-aumento-de-la-plusvalia-municipal-en-la-vivienda-en-espana.js';
import post1330 from './posts/impacto-del-turismo-en-alquileres-y-vivienda-en-sevilla.js';
import post1331 from './posts/impacto-do-investimento-em-tech-no-mercado-imobiliario-para-inquilinos.js';
import post1332 from './posts/impacto-economico-de-competiciones-uefa-en-el-betis-y-lecciones-para-inquilinos.js';
import post1333 from './posts/impacto-en-inquilinos-por-cierres-en-sevilla-por-evento-netflix.js';
import post1334 from './posts/impactos-das-sancoes-internacionais-no-mercado-imobiliario-portugues.js';
import post1335 from './posts/impactos-do-ptrr-para-inquilinos-e-habitacao-em-portugal.js';
import post1336 from './posts/impuestos-a-casas-vacias-y-alquileres-que-significa-para-ti.js';
import post1337 from './posts/impuestos-y-alquiler-como-proteger-tus-derechos-y-ahorrar-en-vivienda.js';
import post1338 from './posts/imu-2026-cosa-cambia-per-la-seconda-casa-in-affitto-o-vacanza.js';
import post1339 from './posts/imu-e-lavoro-da-casa-cosa-devono-sapere-inquilini-e-professionisti.js';
import post1340 from './posts/incendios-en-viviendas-que-hacer-y-como-protegerte-como-inquilino.js';
import post1341 from './posts/incendios-forestales-y-vivienda-derechos-y-precauciones-para-inquilinos.js';
import post1342 from './posts/incendios-y-alquiler-como-proteger-tu-hogar-y-tus-derechos.js';
import post1343 from './posts/income-checks-for-affordable-housing-in-zurich-what-tenants-should-know.js';
import post1344 from './posts/indice-referencia-alquiler-2025.js';
import post1345 from './posts/industrializacion-de-viviendas-una-esperanza-para-inquilinos-vulnerables.js';
import post1346 from './posts/infermieri-assenti-e-risarcimenti-cosa-significa-per-chi-vive-in-affitto.js';
import post1347 from './posts/inflacion-y-alquiler-como-proteger-tus-derechos-y-ahorrar-en-2026.js';
import post1348 from './posts/inflacion-y-alquiler-como-protegerte-y-ahorrar-en-2026.js';
import post1349 from './posts/ingreso-minimo-vital-para-jovenes-una-ayuda-clave-para-inquilinos-vulnerables.js';
import post1350 from './posts/inkassokrav-och-vrakningar-okar-vad-hyresgaster-bor-veta.js';
import post1351 from './posts/innenstadtsterben-was-mieter-uber-steigende-mieten-und-ladensterben-wissen-sollt.js';
import post1352 from './posts/innovacion-inmobiliaria-que-protege-a-inquilinos-vulnerables.js';
import post1353 from './posts/inovacao-na-china-e-o-impacto-na-habitacao-eletrica-em-portugal.js';
import post1354 from './posts/inquilino-joven-como-el-aval-de-la-generalitat-valenciana-puede-ayudarte.js';
import post1355 from './posts/inquilino-y-pagaste-antes-2013-recupera-parte-del-irpf-pagado.js';
import post1356 from './posts/inquilinos-al-limite-como-protegerte-ante-subidas-y-abusos-en-alquiler.js';
import post1357 from './posts/inquilinos-ante-el-auge-inmobiliario-protege-tu-vivienda-y-ahorra.js';
import post1358 from './posts/inquilinos-ante-el-cambio-demografico-derechos-y-proteccion.js';
import post1359 from './posts/inquilinos-ante-el-lujo-y-la-desigualdad-como-proteger-tus-derechos.js';
import post1360 from './posts/inquilinos-ante-inundaciones-como-proteger-tu-vivienda-y-ahorrar.js';
import post1361 from './posts/inquilinos-ante-la-crisis-como-protegerse-y-ahorrar-en-tiempos-dificiles.js';
import post1362 from './posts/inquilinos-ante-la-crisis-del-alquiler-derechos-y-soluciones-reales.js';
import post1363 from './posts/inquilinos-ante-la-incertidumbre-como-proteger-tu-alquiler-en-tiempos-de-cambios.js';
import post1364 from './posts/inquilinos-ante-la-realidad-derechos-y-proteccion-en-tiempos-inciertos.js';
import post1365 from './posts/inquilinos-ante-la-vivienda-global-como-proteger-tu-bolsillo-y-derechos.js';
import post1366 from './posts/inquilinos-ante-subidas-y-novedades-como-proteger-tu-vivienda-y-ahorrar.js';
import post1367 from './posts/inquilinos-ante-un-mundo-incierto-como-proteger-tu-vivienda-y-ahorrar.js';
import post1368 from './posts/inquilinos-bajo-presion-como-protegerte-y-ahorrar-ante-subidas-y-desahucios.js';
import post1369 from './posts/inquilinos-como-detectar-y-evitar-clausulas-abusivas-en-tu-alquiler.js';
import post1370 from './posts/inquilinos-como-evitar-pagar-deudas-ocultas-y-proteger-tu-alquiler.js';
import post1371 from './posts/inquilinos-como-evitar-perder-dinero-y-proteger-tu-vivienda.js';
import post1372 from './posts/inquilinos-como-exigir-indemnizacion-y-proteger-tus-derechos-en-alquileres.js';
import post1373 from './posts/inquilinos-como-proteger-tu-hogar-frente-a-pisos-turisticos.js';
import post1374 from './posts/inquilinos-como-proteger-tu-hogar-y-ahorrar-en-tiempos-dificiles.js';
import post1375 from './posts/inquilinos-como-proteger-tus-derechos-y-ahorrar-en-alquiler-hoy.js';
import post1376 from './posts/inquilinos-como-protegerse-ante-la-incertidumbre-del-mercado-inmobiliario.js';
import post1377 from './posts/inquilinos-como-protegerte-ante-la-subida-imparable-del-alquiler.js';
import post1378 from './posts/inquilinos-como-protegerte-si-el-dueno-quiere-recuperar-la-vivienda.js';
import post1379 from './posts/inquilinos-como-protegerte-y-ahorrar-frente-a-abusos-inmobiliarios.js';
import post1380 from './posts/inquilinos-como-quedarte-en-tu-alquiler-para-siempre-y-proteger-tus-derechos.js';
import post1381 from './posts/inquilinos-como-quedarte-en-tu-alquiler-y-proteger-tus-derechos.js';
import post1382 from './posts/inquilinos-como-renovar-tu-alquiler-hasta-3-anos-mas-y-proteger-tus-derechos.js';
import post1383 from './posts/inquilinos-derecho-a-quedarse-en-alquiler-y-proteger-tu-hogar.js';
import post1384 from './posts/inquilinos-en-2025-como-proteger-tu-hogar-y-ahorrar-en-tiempos-dificiles.js';
import post1385 from './posts/inquilinos-en-alerta-como-proteger-tu-vivienda-y-ahorrar-en-tiempos-dificiles.js';
import post1386 from './posts/inquilinos-en-alerta-como-proteger-tus-derechos-y-ahorrar-en-alquiler.js';
import post1387 from './posts/inquilinos-en-alerta-como-protegerte-ante-fraudes-inmobiliarios-y-abusos.js';
import post1388 from './posts/inquilinos-en-alerta-protege-tus-derechos-ante-tiempos-dificiles.js';
import post1389 from './posts/inquilinos-en-alerta-proteger-tu-vivienda-y-derechos-ante-incertidumbres.js';
import post1390 from './posts/inquilinos-en-alerta-que-significa-para-ti-la-nueva-ley-de-vivienda.js';
import post1391 from './posts/inquilinos-en-cordoba-como-enfrentar-el-mercado-inmobiliario-2026.js';
import post1392 from './posts/inquilinos-en-crisis-como-protegerse-ante-la-vivienda-precaria-y-abusos.js';
import post1393 from './posts/inquilinos-en-crisis-como-protegerte-y-ahorrar-ante-la-emergencia-de-vivienda.js';
import post1394 from './posts/inquilinos-en-espana-como-entender-el-mercado-inmobiliario-para-protegerte.js';
import post1395 from './posts/inquilinos-en-espana-como-entender-las-hipotecas-para-proteger-tu-alquiler.js';
import post1396 from './posts/inquilinos-en-espana-como-proteger-tus-derechos-ante-la-crisis-de-vivienda.js';
import post1397 from './posts/inquilinos-en-espana-como-proteger-tus-derechos-y-ahorrar-ante-cambios-legales.js';
import post1398 from './posts/inquilinos-en-espana-como-proteger-tus-derechos-y-ahorrar-en-alquiler.js';
import post1399 from './posts/inquilinos-en-espana-como-protegerte-ante-el-encarecimiento-y-bajos-salarios.js';
import post1400 from './posts/inquilinos-en-espana-como-protegerte-y-ahorrar-ante-la-crisis-del-alquiler.js';
import post1401 from './posts/inquilinos-en-espana-derechos-y-consejos-para-proteger-tu-vivienda.js';
import post1402 from './posts/inquilinos-en-espana-mas-que-un-telefono-soluciones-reales-para-protegerte.js';
import post1403 from './posts/inquilinos-en-espana-protege-tus-derechos-y-ahorra-en-alquiler-hoy.js';
import post1404 from './posts/inquilinos-en-espana-protege-tus-derechos-y-ahorra-en-alquiler.js';
import post1405 from './posts/inquilinos-en-espana-protege-tus-derechos-y-ahorra-en-el-alquiler.js';
import post1406 from './posts/inquilinos-en-lucha-como-protegerte-del-acoso-inmobiliario-y-ahorrar.js';
import post1407 from './posts/inquilinos-en-lucha-protege-tus-derechos-frente-al-acoso-inmobiliario.js';
import post1408 from './posts/inquilinos-en-lucha-protegerse-ante-desahucios-y-abusos-en-alquiler.js';
import post1409 from './posts/inquilinos-en-lucha-protegerse-del-desahucio-y-ahorrar-en-madrid.js';
import post1410 from './posts/inquilinos-en-madrid-como-protegerte-en-tiempos-de-incertidumbre-politica.js';
import post1411 from './posts/inquilinos-en-madrid-como-protegerte-y-ahorrar-con-la-nueva-tasa-de-basuras.js';
import post1412 from './posts/inquilinos-en-pie-como-defender-tu-hogar-frente-a-fondos-y-alzas.js';
import post1413 from './posts/inquilinos-en-riesgo-como-proteger-tu-hogar-ante-desahucios-y-abusos.js';
import post1414 from './posts/inquilinos-en-riesgo-como-proteger-tu-hogar-y-tus-derechos.js';
import post1415 from './posts/inquilinos-en-riesgo-como-protegerte-ante-desalojos-y-subidas-de-alquiler.js';
import post1416 from './posts/inquilinos-en-riesgo-como-protegerte-ante-operaciones-inmobiliarias-dudosas.js';
import post1417 from './posts/inquilinos-en-riesgo-como-protegerte-y-ahorrar-en-tiempos-dificiles.js';
import post1418 from './posts/inquilinos-en-toledo-como-las-inversiones-en-vivienda-pueden-protegerte.js';
import post1419 from './posts/inquilinos-en-toledo-luchan-contra-desahucios-como-protegerte-y-ahorrar.js';
import post1420 from './posts/inquilinos-estabilidad-y-derechos-para-proteger-tu-hogar.js';
import post1421 from './posts/inquilinos-frente-a-la-desigualdad-como-protegerse-y-ahorrar-en-alquiler.js';
import post1422 from './posts/inquilinos-para-siempre-como-proteger-tus-derechos-y-ahorrar-en-alquiler.js';
import post1423 from './posts/inquilinos-protege-tu-hogar-y-conoce-tus-derechos-frente-al-desahucio.js';
import post1424 from './posts/inquilinos-protege-tu-vivienda-y-ahorra-con-estos-consejos-clave.js';
import post1425 from './posts/inquilinos-protege-tu-vivienda-y-evita-sorpresas-legales.js';
import post1426 from './posts/inquilinos-protege-tus-derechos-si-cambia-el-propietario-de-tu-alquiler.js';
import post1427 from './posts/inquilinos-protege-tus-derechos-tras-cinco-anos-de-alquiler.js';
import post1428 from './posts/inquilinos-protege-tus-derechos-y-ahorra-en-tu-alquiler-hoy.js';
import post1429 from './posts/inquilinos-protege-tus-derechos-y-ahorra-frente-a-abusos-en-alquiler.js';
import post1430 from './posts/inquilinos-protege-tus-derechos-y-ahorra-pese-a-la-subida-del-alquiler.js';
import post1431 from './posts/inquilinos-protegidos-como-defender-tus-derechos-y-ahorrar-en-alquiler.js';
import post1432 from './posts/inquilinos-protegidos-como-evitar-alquileres-abusivos-y-ahorrar.js';
import post1433 from './posts/inquilinos-protegidos-como-la-ley-actual-defiende-tu-hogar.js';
import post1434 from './posts/inquilinos-protegidos-como-la-ley-te-ayuda-a-quedarte-y-ahorrar.js';
import post1435 from './posts/inquilinos-protegidos-como-la-nueva-ley-asegura-tu-hogar.js';
import post1436 from './posts/inquilinos-protegidos-como-la-nueva-ley-garantiza-tu-hogar.js';
import post1437 from './posts/inquilinos-protegidos-como-quedarte-en-tu-alquiler-y-ahorrar.js';
import post1438 from './posts/inquilinos-protegidos-como-quedarte-en-tu-hogar-pese-a-la-oposicion-del-propieta.js';
import post1439 from './posts/inquilinos-protegidos-compensacion-por-venta-de-vivienda-alquilada.js';
import post1440 from './posts/inquilinos-protegidos-derecho-a-quedarse-y-consejos-para-ahorrar.js';
import post1441 from './posts/inquilinos-protegidos-indemnizacion-si-cambia-el-dueno-de-tu-alquiler.js';
import post1442 from './posts/inquilinos-protegidos-indemnizacion-si-el-propietario-incumple-la-ley.js';
import post1443 from './posts/inquilinos-protegidos-indemnizacion-y-derechos-ante-venta-de-vivienda.js';
import post1444 from './posts/inquilinos-protegidos-indemnizaciones-si-el-propietario-incumple-la-ley.js';
import post1445 from './posts/inquilinos-protegidos-indemnizaciones-y-derechos-en-la-venta-de-viviendas.js';
import post1446 from './posts/inquilinos-protegidos-no-te-pueden-echar-por-vender-la-vivienda.js';
import post1447 from './posts/inquilinos-protegidos-que-cambia-la-nueva-ley-de-alquileres.js';
import post1448 from './posts/inquilinos-protegidos-que-hacer-ante-reparaciones-y-gastos-en-tu-alquiler.js';
import post1449 from './posts/inquilinos-protegidos-que-hacer-si-tu-vivienda-cambia-de-dueno.js';
import post1450 from './posts/inquilinos-sin-alternativas-como-proteger-tus-derechos-y-ahorrar-en-alquiler.js';
import post1451 from './posts/inquilinos-unidos-como-defender-tus-derechos-y-ahorrar-en-alquiler.js';
import post1452 from './posts/inquilinos-vulnerables-claves-para-proteger-tu-vivienda-y-ahorrar.js';
import post1453 from './posts/inquilinos-vulnerables-como-proteger-tus-derechos-y-ahorrar-en-alquiler.js';
import post1454 from './posts/inquilinos-vulnerables-como-protegerte-y-ahorrar-ante-abusos-en-vivienda.js';
import post1455 from './posts/inquilinos-vulnerables-como-protegerte-y-ahorrar-en-un-mercado-dificil.js';
import post1456 from './posts/inquilinos-vulnerables-protege-tu-hogar-y-ahorra-en-un-mercado-incierto.js';
import post1457 from './posts/inquilinos-vulnerables-y-el-escandalo-de-viviendas-protegidas-en-alicante.js';
import post1458 from './posts/inquilinos-y-alquiler-como-proteger-tu-bolsillo-y-derechos-hoy.js';
import post1459 from './posts/inquilinos-y-derechos-protegerse-en-un-mercado-de-alquiler-dificil.js';
import post1460 from './posts/inquilinos-y-el-impacto-social-proteger-tus-derechos-en-tiempos-dificiles.js';
import post1461 from './posts/inquilinos-y-el-origen-de-lo-que-consumen-como-proteger-tu-bolsillo.js';
import post1462 from './posts/inquilinos-y-la-burbuja-inmobiliaria-como-proteger-tus-derechos-y-ahorrar.js';
import post1463 from './posts/inquilinos-y-movilidad-como-el-plan-de-coches-electricos-puede-aliviar-tu-bolsil.js';
import post1464 from './posts/inquilinos-y-precios-justos-protege-tu-bolsillo-y-tus-derechos.js';
import post1465 from './posts/inquilinos-y-ruido-en-apartamentos-turisticos-como-proteger-tus-derechos.js';
import post1466 from './posts/inquilinos-y-vivienda-como-protegerte-y-ahorrar-en-un-mercado-al-alza.js';
import post1467 from './posts/inquilinos-y-vivienda-que-significa-el-nuevo-fondo-de-mutuactivos.js';
import post1468 from './posts/inquilinos-y-vivienda-turistica-conoce-tus-derechos-y-protege-tu-bolsillo.js';
import post1469 from './posts/inquilinos-y-viviendas-proteger-tus-derechos-en-tiempos-dificiles.js';
import post1470 from './posts/inquinamento-da-pfas-e-impatto-sulla-casa-cosa-sapere-per-gli-inquilini.js';
import post1471 from './posts/integracion-del-tranvibus-en-sevilla-este-como-afecta-a-los-usuarios.js';
import post1472 from './posts/integration-durch-gemeinschaftliches-wohnen-hoffnungshauser-in-deutschland.js';
import post1473 from './posts/internationale-druk-en-lokale-huurproblematiek-wat-huurders-moeten-weten.js';
import post1474 from './posts/intransparente-verfahren-und-ihre-folgen-fur-mieter-in-deutschland.js';
import post1475 from './posts/inversion-record-en-vivienda-que-significa-para-ti-inquilino.js';
import post1476 from './posts/inversores-y-vivienda-asequible-que-significa-para-ti-como-inquilino.js';
import post1477 from './posts/invertir-con-poco-dinero-claves-para-inquilinos-vulnerables.js';
import post1478 from './posts/invertir-en-vivienda-como-protegerte-y-ahorrar-siendo-inquilino.js';
import post1479 from './posts/investimento-na-construcao-cresce-em-portugal-impacto-para-inquilinos.js';
import post1480 from './posts/investire-in-immobili-cosa-significa-per-chi-affitta-in-italia.js';
import post1481 from './posts/inzicht-in-huurrecht-en-huisvesting-in-nederland.js';
import post1482 from './posts/irpf-y-alquiler-como-proteger-tus-derechos-y-ahorrar-hoy.js';
import post1483 from './posts/irregularidades-en-alquileres-como-proteger-tus-derechos-hoy.js';
import post1484 from './posts/isencoes-fiscais-no-arrendamento-acessivel-o-que-os-inquilinos-devem-saber.js';
import post1485 from './posts/jaen-y-el-alquiler-como-proteger-tu-bolsillo-y-tus-derechos-hoy.js';
import post1486 from './posts/jouw-rechten-bij-ontruiming-en-kraak-in-nederland.js';
import post1487 from './posts/jovenes-atrapados-en-el-alquiler-como-proteger-tus-derechos-y-ahorrar.js';
import post1488 from './posts/jovenes-e-inquilinos-claves-para-proteger-tu-hogar-y-bolsillo.js';
import post1489 from './posts/jovenes-e-inquilinos-como-proteger-tus-derechos-y-ahorrar-en-alquiler.js';
import post1490 from './posts/jovenes-e-inquilinos-como-protegerse-ante-el-encarecimiento-de-la-vivienda.js';
import post1491 from './posts/jovenes-inquilinos-como-proteger-tus-derechos-y-ahorrar-en-alquiler.js';
import post1492 from './posts/jovenes-y-alquiler-como-protegerte-y-ahorrar-en-tiempos-dificiles.js';
import post1493 from './posts/jovenes-y-vivienda-como-proteger-tus-derechos-y-ahorrar-en-alquiler.js';
import post1494 from './posts/jovens-e-a-compra-de-casa-em-lisboa-desafios-e-solucoes.js';
import post1495 from './posts/juan-carlos-i-y-la-vivienda-lo-que-todo-inquilino-debe-saber.js';
import post1496 from './posts/junta-de-andalucia-impulsa-vivienda-claves-para-inquilinos-vulnerables.js';
import post1497 from './posts/juros-do-credito-a-habitacao-sobem-impacto-para-inquilinos-em-portugal.js';
import post1498 from './posts/justicia-y-proteccion-ante-tragedias-en-el-hogar-derechos-y-pasos-para-inquilino.js';
import post1499 from './posts/kabinet-versoepelt-huurregels-wat-betekent-dit-voor-huurders.js';
import post1500 from './posts/kan-de-bank-mijn-hypotheek-beeindigen-bij-hogere-rente.js';
import post1501 from './posts/kaution-und-bohrlocher-was-mieter-in-deutschland-wissen-sollten.js';
import post1502 from './posts/kd-s-forslag-om-sankt-reavinstskatt-vad-betyder-det-for-dig.js';
import post1503 from './posts/keine-rendite-mit-der-miete-was-mieter-jetzt-wissen-sollten.js';
import post1504 from './posts/kinderbonus-beim-immobilienkauf-in-bayern-was-mieter-wissen-sollten.js';
import post1505 from './posts/kinderlosigkeit-und-rente-was-mieter-in-deutschland-wissen-sollten.js';
import post1506 from './posts/kirchen-werden-zu-wohnungen-chancen-fur-mieter-in-deutschland.js';
import post1507 from './posts/kleur-en-durf-in-huis-durf-jezelf-te-laten-zien-als-huurder.js';
import post1508 from './posts/kleur-en-durf-in-huis-inspiratie-voor-huurders-onder-druk.js';
import post1509 from './posts/kraak-en-huurrecht-wat-huurders-in-nederland-moeten-weten.js';
import post1510 from './posts/kraak-en-ontruiming-wat-huurders-moeten-weten.js';
import post1511 from './posts/kraak-huren-en-ontruiming-wat-huurders-moeten-weten.js';
import post1512 from './posts/krassen-door-schuursponzen-wat-huurders-moeten-weten.js';
import post1513 from './posts/kronofogdens-auktioner-okar-vad-innebar-det-for-dig-som-hyresgast.js';
import post1514 from './posts/kulturmuseer-hotas-av-vrakning-vad-betyder-det-for-hyresgaster.js';
import post1515 from './posts/kundigung-nach-messerattacke-rechte-von-mietern-in-deutschland.js';
import post1516 from './posts/kunstenaarswoningen-voor-ouderen-wonen-met-zorg-en-creativiteit.js';
import post1517 from './posts/kunstliche-intelligenz-und-die-zukunft-des-wohnens-in-deutschland.js';
import post1518 from './posts/la-bombona-de-butano-una-ayuda-real-para-inquilinos-en-crisis.js';
import post1519 from './posts/la-brecha-de-renta-en-espana-y-como-proteger-tu-alquiler.js';
import post1520 from './posts/la-brecha-generacional-en-vivienda-como-proteger-tus-derechos-hoy.js';
import post1521 from './posts/la-brecha-generacional-en-vivienda-que-significa-para-ti-como-inquilino.js';
import post1522 from './posts/la-casa-que-cambio-la-arquitectura-y-que-ensena-a-inquilinos-vulnerables.js';
import post1523 from './posts/la-compra-del-sevilla-lo-que-los-inquilinos-deben-saber-para-proteger-su-viviend.js';
import post1524 from './posts/la-crisis-del-alquiler-en-espana-jovenes-enfrentan-una-oferta-de-vivienda-cada-v.js';
import post1525 from './posts/la-crisis-del-alquiler-en-espana-por-que-los-jovenes-estan-durmiendo-en-la-calle.js';
import post1526 from './posts/la-crisis-oculta-de-viviendas-inseguras-como-proteger-tu-hogar-y-bolsillo.js';
import post1527 from './posts/la-donacion-de-viviendas-una-alternativa-creciente-para-que-los-jovenes-accedan-.js';
import post1528 from './posts/la-gran-revision-de-alquileres-como-protegerte-y-ahorrar.js';
import post1529 from './posts/la-iglesia-cede-propiedades-para-vivienda-social-una-esperanza-para-inquilinos.js';
import post1530 from './posts/la-nucia-pines-que-significa-para-inquilinos-en-situacion-vulnerable.js';
import post1531 from './posts/la-paradoja-inmobiliaria-en-madrid-como-afecta-a-tu-alquiler.js';
import post1532 from './posts/la-protesta-contro-nuove-sedi-politiche-e-l-impatto-sugli-inquilini.js';
import post1533 from './posts/la-realidad-del-alquiler-que-aprender-de-la-subasta-de-cantora.js';
import post1534 from './posts/la-realidad-del-alquiler-que-nos-dice-la-mansion-de-bertin-osborne.js';
import post1535 from './posts/la-vivienda-y-tu-como-proteger-tus-derechos-y-ahorrar-en-alquiler.js';
import post1536 from './posts/lagandring-om-foretagsbostader-kan-paverka-hyresgaster.js';
import post1537 from './posts/lagunas-de-ambroz-un-pulmon-verde-que-protege-tu-hogar-y-tu-bolsillo.js';
import post1538 from './posts/latrelaties-en-woningbezit-wat-betekent-dit-voor-huurders.js';
import post1539 from './posts/lecciones-de-memoria-y-futuro-para-inquilinos-vulnerables.js';
import post1540 from './posts/leegstand-dreigt-wat-betekent-dit-voor-huurders-in-nl.js';
import post1541 from './posts/leerstand-in-bielefeld-was-mieter-jetzt-wissen-sollten.js';
import post1542 from './posts/leerstand-in-stadten-was-mieter-jetzt-wissen-sollten.js';
import post1543 from './posts/leerstand-nutzen-neue-chancen-fur-bezahlbaren-wohnraum-in-bayern.js';
import post1544 from './posts/leerstand-und-sanierung-chancen-fur-bezahlbaren-wohnraum.js';
import post1545 from './posts/leerstand-und-wohnungsnot-was-mieter-in-deutschland-wissen-sollten.js';
import post1546 from './posts/leerstehende-buros-zu-wohnungen-chancen-und-herausforderungen.js';
import post1547 from './posts/ley-de-alquileres-en-espana-derechos-y-pasos-para-inquilinos.js';
import post1548 from './posts/ley-de-alquileres-reparaciones-y-derechos-del-inquilino-en-espana.js';
import post1549 from './posts/ley-de-vivienda-y-tus-derechos-como-protegerte-y-ahorrar-en-alquiler.js';
import post1550 from './posts/libertad-y-derechos-en-el-alquiler-aprende-a-proteger-tu-hogar.js';
import post1551 from './posts/licenca-parental-e-habitacao-impactos-para-inquilinos-em-portugal.js';
import post1552 from './posts/licenca-parental-em-portugal-impacto-na-habitacao-e-direitos-dos-inquilinos.js';
import post1553 from './posts/licenca-parental-inicial-o-que-muda-com-a-reforma-do-governo.js';
import post1554 from './posts/licenziamento-e-diritti-cosa-fare-in-caso-di-ingiustizie-sul-lavoro.js';
import post1555 from './posts/limitacion-de-compras-especulativas-una-esperanza-para-inquilinos.js';
import post1556 from './posts/limites-legales-a-subidas-de-alquiler-una-victoria-para-inquilinos-vulnerables.js';
import post1557 from './posts/litigios-inmobiliarios-que-frenan-tu-barrio-lo-que-debes-saber.js';
import post1558 from './posts/living-in-a-london-housing-co-op-amid-the-rental-crisis.js';
import post1559 from './posts/living-small-in-switzerland-adapting-to-shrinking-apartments.js';
import post1560 from './posts/lluvias-y-tormentas-protege-tu-alquiler-y-ahorra-en-vivienda.js';
import post1561 from './posts/lo-que-debes-saber-para-proteger-tu-bolsillo-al-alquilar-vivienda.js';
import post1562 from './posts/locales-reconvertidos-una-oportunidad-para-inquilinos-vulnerables.js';
import post1563 from './posts/locales-transformados-en-viviendas-una-esperanza-para-inquilinos-vulnerables.js';
import post1564 from './posts/logement-a-paris-quelles-perspectives-pour-les-locataires.js';
import post1565 from './posts/logement-en-france-comprendre-vos-droits-et-agir-face-a-la-crise.js';
import post1566 from './posts/logement-social-a-saint-denis-un-maire-engage-pour-preserver-l-habitat.js';
import post1567 from './posts/logements-energetiquement-precaires-nouvelles-mesures-pour-proteger-les-locatair.js';
import post1568 from './posts/london-s-luxury-property-slump-what-renters-should-know.js';
import post1569 from './posts/loteria-de-navidad-y-alquiler-como-proteger-tu-bolsillo-y-derechos.js';
import post1570 from './posts/loteria-de-navidad-y-alquiler-como-proteger-tus-derechos-y-ahorrar.js';
import post1571 from './posts/love-scamming-wie-mieter-vor-finanziellen-betrugereien-geschutzt-sind.js';
import post1572 from './posts/lujo-inmobiliario-vs-inquilinos-como-protegerte-y-ahorrar-en-alquiler.js';
import post1573 from './posts/lujo-inmobiliario-y-realidad-como-proteger-tus-derechos-como-inquilino.js';
import post1574 from './posts/lujo-inmobiliario-y-realidades-del-alquiler-como-proteger-tus-derechos.js';
import post1575 from './posts/lujo-y-alquiler-lo-que-debes-saber-para-protegerte-hoy.js';
import post1576 from './posts/luxusimmobilienrekord-in-london-was-mieter-in-deutschland-daraus-lernen-konnen.js';
import post1577 from './posts/luz-para-inquilinos-como-la-vivienda-publica-puede-protegerte-hoy.js';
import post1578 from './posts/lyxbostader-forfaller-vad-innebar-det-for-dig-som-hyresgast.js';
import post1579 from './posts/madrid-abandona-a-sus-vecinos-como-proteger-tu-hogar-y-ahorrar.js';
import post1580 from './posts/madrid-construye-11-000-viviendas-baratas-una-oportunidad-para-inquilinos.js';
import post1581 from './posts/madrid-de-barrios-vs-madrid-global-que-significa-para-tu-alquiler.js';
import post1582 from './posts/madrid-impulsa-mas-de-6-100-viviendas-de-alquiler-asequible-una-esperanza-real-p.js';
import post1583 from './posts/madrid-reduce-pisos-turisticos-y-tu-como-proteges-tu-alquiler.js';
import post1584 from './posts/madrid-sortea-378-viviendas-asequibles-una-oportunidad-para-inquilinos-vulnerabl.js';
import post1585 from './posts/madrid-vertical-como-proteger-tus-derechos-y-ahorrar-en-alquiler.js';
import post1586 from './posts/madrid-y-la-brecha-de-precios-como-proteger-tu-alquiler-hoy.js';
import post1587 from './posts/mairena-del-aljarafe-cuando-y-como-proteger-tu-alquiler.js';
import post1588 from './posts/maklervertrage-online-was-mieter-und-kaufer-wissen-sollten.js';
import post1589 from './posts/malaga-lidera-viviendas-de-lujo-que-significa-para-inquilinos-vulnerables.js';
import post1590 from './posts/maltrattamenti-in-casa-cosa-fare-se-vivi-una-situazione-difficile.js';
import post1591 from './posts/managing-mortgage-and-housing-pressure-after-50-in-switzerland.js';
import post1592 from './posts/manifestazioni-e-blocchi-al-brennero-impatti-per-chi-abita-e-lavora.js';
import post1593 from './posts/maricarmen-y-la-lucha-por-la-vivienda-digna-derechos-y-proteccion-para-inquilino.js';
import post1594 from './posts/maricarmen-y-la-lucha-por-su-hogar-derechos-que-debes-conocer.js';
import post1595 from './posts/maricarmen-y-tu-como-proteger-tu-hogar-ante-subidas-y-desahucios.js';
import post1596 from './posts/mas-casas-en-construccion-menos-entregas-que-significa-para-ti.js';
import post1597 from './posts/mas-casas-y-menos-burocracia-esperanza-para-inquilinos-vulnerables.js';
import post1598 from './posts/mas-de-1-2-millones-de-andaluces-con-problemas-graves-de-vivienda-que-pueden-hac.js';
import post1599 from './posts/mas-de-10-millones-de-extranjeros-en-espana-claves-para-proteger-tu-alquiler.js';
import post1600 from './posts/mas-de-11-500-viviendas-sociales-para-proteger-a-inquilinos-vulnerables.js';
import post1601 from './posts/mas-de-300-viviendas-publicas-para-inquilinos-en-situacion-vulnerable.js';
import post1602 from './posts/mas-de-600-viviendas-asequibles-en-madrid-una-esperanza-real-para-inquilinos.js';
import post1603 from './posts/mas-gasto-publico-en-vivienda-lo-que-implica-para-ti-como-inquilino.js';
import post1604 from './posts/mas-mujeres-y-cambios-en-la-casa-real-que-significa-para-tu-alquiler.js';
import post1605 from './posts/mas-proteccion-para-inquilinos-subinspectores-contra-viviendas-ilegales.js';
import post1606 from './posts/mas-ventas-de-casas-lo-que-debes-saber-si-eres-inquilino-vulnerable.js';
import post1607 from './posts/mas-vivienda-publica-en-galicia-una-esperanza-para-inquilinos-vulnerables.js';
import post1608 from './posts/mas-vivienda-publica-esperanza-real-para-inquilinos-vulnerables.js';
import post1609 from './posts/mas-viviendas-asequibles-una-luz-para-inquilinos-vulnerables.js';
import post1610 from './posts/mas-viviendas-en-sevilla-que-significa-para-inquilinos-vulnerables.js';
import post1611 from './posts/mas-viviendas-lo-que-debes-saber-para-proteger-tu-alquiler.js';
import post1612 from './posts/mas-viviendas-publicas-en-galicia-una-esperanza-para-inquilinos-vulnerables.js';
import post1613 from './posts/mas-viviendas-publicas-en-madrid-que-significa-para-ti.js';
import post1614 from './posts/mas-viviendas-publicas-una-esperanza-real-para-inquilinos-vulnerables.js';
import post1615 from './posts/mas-viviendas-publicas-una-oportunidad-para-inquilinos-vulnerables.js';
import post1616 from './posts/mas-viviendas-y-derechos-para-inquilinos-como-protegerte-hoy.js';
import post1617 from './posts/mascotas-y-alquiler-como-proteger-tus-derechos-y-ahorrar-en-vivienda.js';
import post1618 from './posts/medidas-del-gobierno-para-aliviar-la-crisis-energetica-y-su-impacto-en-la-vivien.js';
import post1619 from './posts/medidas-para-el-alquiler-que-significan-para-ti-hoy.js';
import post1620 from './posts/meer-miljoenenwoningen-wat-betekent-dit-voor-huurders.js';
import post1621 from './posts/meer-woningen-verkocht-wat-betekent-dit-voor-huurders.js';
import post1622 from './posts/mehr-raum-durch-kluge-ordnung-statt-neuer-mobel.js';
import post1623 from './posts/mejoras-en-accesibilidad-en-la-calle-santa-vicenta-maria-impacto-para-inquilinos.js';
import post1624 from './posts/mejoras-en-barrios-y-como-proteger-tus-derechos-como-inquilino-vulnerable.js';
import post1625 from './posts/menos-burocracia-para-mas-vivienda-como-te-afecta-como-inquilino.js';
import post1626 from './posts/menos-pisos-turisticos-en-madrid-como-protege-esto-a-los-inquilinos.js';
import post1627 from './posts/menos-pisos-turisticos-una-oportunidad-para-inquilinos-vulnerables.js';
import post1628 from './posts/menos-promesas-mas-derechos-protege-tu-alquiler-hoy.js';
import post1629 from './posts/mercado-da-habitacao-em-portugal-o-que-muda-para-os-inquilinos.js';
import post1630 from './posts/mercado-de-vivienda-frena-claves-para-proteger-a-inquilinos-vulnerables.js';
import post1631 from './posts/mercado-hipotecario-al-alza-que-significa-para-inquilinos-vulnerables.js';
import post1632 from './posts/mercado-hipotecario-competitivo-claves-para-proteger-a-los-inquilinos.js';
import post1633 from './posts/mercado-imobiliario-de-luxo-em-portugal-impacto-para-os-inquilinos.js';
import post1634 from './posts/mercado-imobiliario-em-portugal-como-lidar-com-a-crise-da-habitacao.js';
import post1635 from './posts/mercado-inmobiliario-en-auge-guia-para-inquilinos-vulnerables.js';
import post1636 from './posts/mercado-inmobiliario-toca-techo-que-significa-para-inquilinos-vulnerables.js';
import post1637 from './posts/mercato-immobiliare-2025-cosa-cambia-per-chi-cerca-casa.js';
import post1638 from './posts/mercato-immobiliare-di-lusso-a-firenze-cosa-significa-per-gli-inquilini.js';
import post1639 from './posts/microplastiche-in-casa-come-proteggere-chi-vive-in-affitto.js';
import post1640 from './posts/mieten-in-gro-stadten-steigen-was-mieter-jetzt-wissen-sollten.js';
import post1641 from './posts/mieten-in-gro-stadten-steigende-preise-was-mieter-jetzt-wissen-sollten.js';
import post1642 from './posts/mieten-in-munchen-so-teuer-wird-der-umzug-wirklich.js';
import post1643 from './posts/mietendeckel-vs-mietpreisbremse-was-mieter-jetzt-wissen-sollten.js';
import post1644 from './posts/mieterfuhrerschein-mehr-rucksicht-und-weniger-arger-im-alltag.js';
import post1645 from './posts/mieterhohung-in-saarbrucken-gericht-stoppt-uberhohte-forderung.js';
import post1646 from './posts/mieterrechte-bei-schimmel-und-eigenbedarf-was-tun.js';
import post1647 from './posts/mieterschutz-und-subkultur-munchens-krachparade-gegen-verdrangung.js';
import post1648 from './posts/mietfrei-wohnen-gegen-content-chancen-und-risiken-fur-mieter.js';
import post1649 from './posts/mietminderung-bei-wasserflecken-was-mieter-wissen-sollten.js';
import post1650 from './posts/mietpreisbremse-in-deutschland-chancen-und-grenzen.js';
import post1651 from './posts/mietpreisbremse-in-deutschland-was-mieter-jetzt-wissen-sollten.js';
import post1652 from './posts/mietpreise-in-gro-stadten-was-mieter-jetzt-wissen-sollten.js';
import post1653 from './posts/mietpreissteigerungen-verstehen-was-mieter-jetzt-wissen-sollten.js';
import post1654 from './posts/mietrecht-auskunft-zur-vormiete-rechte-fur-mieter.js';
import post1655 from './posts/mietrecht-und-wohnschutz-in-deutschland-was-mieter-jetzt-wissen-sollten.js';
import post1656 from './posts/mietzahlungen-in-konigshausern-was-mieter-in-deutschland-daraus-lernen.js';
import post1657 from './posts/migrante-y-con-hijos-como-protegerte-en-un-alquiler-dificil.js';
import post1658 from './posts/milano-porta-est-nuove-case-in-affitto-a-lungo-termine-a-segrate.js';
import post1659 from './posts/milano-rigenerazione-urbana-e-nuovi-spazi-abitativi-alla-darsena.js';
import post1660 from './posts/millones-de-casas-vacias-en-espana-que-significa-para-ti.js';
import post1661 from './posts/minder-huurwoningen-door-verkoop-door-particuliere-beleggers.js';
import post1662 from './posts/minder-verkoop-huurwoningen-door-beleggers-wat-betekent-dit-voor-huurders.js';
import post1663 from './posts/ministero-della-casa-cosa-cambia-per-gli-inquilini-italiani.js';
import post1664 from './posts/misdaad-op-het-platteland-herkennen-wat-huurders-moeten-weten.js';
import post1665 from './posts/mit-kindern-aufs-land-ziehen-chancen-und-herausforderungen.js';
import post1666 from './posts/moblierte-wohnungen-in-deutschland-was-mieter-jetzt-wissen-sollten.js';
import post1667 from './posts/moblierte-wohnungen-und-wohnraummangel-in-deutschland.js';
import post1668 from './posts/mobliertes-wohnen-in-deutschland-chancen-und-risiken-fur-mieter.js';
import post1669 from './posts/modelo-amsterdam-y-su-impacto-en-inquilinos-vulnerables-en-espana.js';
import post1670 from './posts/modular-construction-a-new-hope-for-europe-s-housing-crisis.js';
import post1671 from './posts/montepio-e-o-crescimento-dos-imoveis-para-habitacao-em-portugal.js';
import post1672 from './posts/moratoria-antidesahucios-clave-para-proteger-a-inquilinos-vulnerables.js';
import post1673 from './posts/moratoria-antidesahucios-proteccion-vital-para-inquilinos-vulnerables.js';
import post1674 from './posts/moratoria-y-ayudas-en-cataluna-que-deben-saber-los-inquilinos-vulnerables.js';
import post1675 from './posts/morosidad-en-alquileres-en-andalucia-como-protegerte-y-ahorrar.js';
import post1676 from './posts/mortgage-rate-hikes-and-housing-pressure-what-renters-should-know.js';
import post1677 from './posts/mortgage-rate-hikes-what-uk-renters-should-know-now.js';
import post1678 from './posts/mudancas-na-lideranca-da-dgeg-impactos-para-inquilinos-em-portugal.js';
import post1679 from './posts/multa-millonaria-a-alquiler-seguro-una-victoria-para-inquilinos-vulnerables.js';
import post1680 from './posts/multas-y-control-de-alquiler-claves-para-proteger-al-inquilino-vulnerable.js';
import post1681 from './posts/munchen-hohe-mieten-reduzieren-wohnungsnachfrage-spurbar.js';
import post1682 from './posts/munchen-immobilientransaktionen-stocken-was-mieter-wissen-sollten.js';
import post1683 from './posts/munchens-bauakten-engpasse-bei-akteneinsicht-und-folgen-fur-mieter.js';
import post1684 from './posts/munchens-wohnungsmarkt-was-mieter-jetzt-wissen-sollten.js';
import post1685 from './posts/munchner-immobilienmarkt-rekorde-und-was-mieter-wissen-sollten.js';
import post1686 from './posts/munchner-mietpreise-steigen-was-mieter-jetzt-wissen-sollten.js';
import post1687 from './posts/munchner-wohnkosten-was-mieter-jetzt-wissen-sollten.js';
import post1688 from './posts/mutui-casa-in-calo-cosa-significa-per-chi-cerca-casa-in-affitto.js';
import post1689 from './posts/mutui-in-aumento-come-affrontare-la-crescita-dei-tassi-in-italia.js';
import post1690 from './posts/na-brand-in-hoogeveen-wat-huurders-moeten-weten-over-ontruiming.js';
import post1691 from './posts/nachhaltig-bauen-mit-laubholz-chancen-fur-mieter-in-deutschland.js';
import post1692 from './posts/naturschutzgebiete-und-immobilienkauf-was-mieter-wissen-sollten.js';
import post1693 from './posts/natuurbescherming-en-woningmarkt-wat-huurders-kunnen-leren-van-wolven-en-grazers.js';
import post1694 from './posts/navidad-en-el-bernabeu-que-significa-para-tu-bolsillo-y-alquiler.js';
import post1695 from './posts/navidad-mas-cara-como-proteger-tu-alquiler-y-ahorrar-en-casa.js';
import post1696 from './posts/navigalia-y-tu-alquiler-como-proteger-tus-derechos-y-ahorrar-esta-navidad.js';
import post1697 from './posts/navigating-europe-s-housing-challenges-a-tenant-s-guide.js';
import post1698 from './posts/navigating-europe-s-housing-crisis-a-tenant-s-guide.js';
import post1699 from './posts/navigating-europe-s-housing-crisis-a-tenant-s-practical-guide.js';
import post1700 from './posts/navigating-europe-s-housing-crisis-what-tenants-need-to-know.js';
import post1701 from './posts/navigating-eviction-and-housing-pressure-in-zurich.js';
import post1702 from './posts/navigating-home-buying-in-switzerland-practical-tips-for-renters.js';
import post1703 from './posts/navigating-housing-challenges-a-guide-for-uk-renters.js';
import post1704 from './posts/navigating-housing-challenges-amid-economic-uncertainty-in-the-uk.js';
import post1705 from './posts/navigating-housing-challenges-amid-family-business-changes.js';
import post1706 from './posts/navigating-housing-challenges-amid-political-shifts-in-europe.js';
import post1707 from './posts/navigating-housing-challenges-amid-rising-costs-in-the-uk.js';
import post1708 from './posts/navigating-housing-challenges-amid-rising-pressures-in-the-uk.js';
import post1709 from './posts/navigating-housing-challenges-amid-uk-immigration-debates.js';
import post1710 from './posts/navigating-housing-challenges-in-europe-a-tenant-s-guide.js';
import post1711 from './posts/navigating-housing-challenges-in-switzerland-a-tenant-s-guide.js';
import post1712 from './posts/navigating-housing-challenges-in-switzerland-as-a-tenant.js';
import post1713 from './posts/navigating-housing-challenges-in-switzerland-practical-tenant-guidance.js';
import post1714 from './posts/navigating-housing-challenges-in-the-uk-a-practical-guide-for-renters.js';
import post1715 from './posts/navigating-housing-challenges-in-the-uk-a-tenant-s-guide.js';
import post1716 from './posts/navigating-housing-challenges-practical-advice-for-uk-renters.js';
import post1717 from './posts/navigating-housing-challenges-what-tenants-in-the-uk-need-to-know.js';
import post1718 from './posts/navigating-housing-pressure-in-switzerland-a-tenant-s-guide.js';
import post1719 from './posts/navigating-housing-pressure-in-switzerland-practical-tenant-guidance.js';
import post1720 from './posts/navigating-housing-pressure-in-switzerland-tenant-rights-practical-guidance.js';
import post1721 from './posts/navigating-housing-pressure-practical-guidance-for-uk-renters.js';
import post1722 from './posts/navigating-housing-pressures-in-europe-practical-guidance-for-renters.js';
import post1723 from './posts/navigating-housing-pressures-in-switzerland-a-tenant-s-guide.js';
import post1724 from './posts/navigating-housing-pressures-in-switzerland-practical-tenant-guidance.js';
import post1725 from './posts/navigating-housing-pressures-practical-guidance-for-uk-renters.js';
import post1726 from './posts/navigating-rental-challenges-in-switzerland-a-tenant-s-guide.js';
import post1727 from './posts/navigating-rents-and-rights-amid-uk-housing-pressures.js';
import post1728 from './posts/navigating-rising-rents-and-housing-challenges-in-europe.js';
import post1729 from './posts/navigating-rising-rents-and-housing-pressure-in-switzerland.js';
import post1730 from './posts/navigating-rising-rents-and-tenant-rights-in-zurich.js';
import post1731 from './posts/navigating-switzerland-s-housing-crunch-what-tenants-should-know.js';
import post1732 from './posts/navigating-switzerland-s-housing-market-a-tenant-s-guide.js';
import post1733 from './posts/navigating-switzerland-s-housing-shortage-a-tenant-s-guide.js';
import post1734 from './posts/navigating-tenant-rights-amid-uk-housing-challenges.js';
import post1735 from './posts/navigating-the-uk-housing-crisis-a-tenant-s-guide.js';
import post1736 from './posts/navigating-the-uk-housing-crisis-practical-steps-for-renters.js';
import post1737 from './posts/navigating-the-uk-housing-crisis-tenant-challenges-rights.js';
import post1738 from './posts/navigating-uk-housing-pressures-a-tenant-s-guide.js';
import post1739 from './posts/navigating-uk-housing-pressures-a-tenant-s-practical-guide.js';
import post1740 from './posts/navigating-uk-housing-pressures-practical-tenant-guidance.js';
import post1741 from './posts/navigating-uk-renting-amid-housing-pressures.js';
import post1742 from './posts/navigating-zurich-s-housing-crisis-a-tenant-s-guide.js';
import post1743 from './posts/navigating-zurich-s-housing-debate-what-tenants-need-to-know.js';
import post1744 from './posts/navigating-zurich-s-housing-shortage-what-tenants-need-to-know.js';
import post1745 from './posts/netbewust-bouwen-nieuwe-kansen-voor-woningzoekenden.js';
import post1746 from './posts/netflix-compra-warner-bros-que-significa-para-tu-alquiler-y-bolsillo.js';
import post1747 from './posts/neue-baugesetzbuch-novelle-chancen-und-risiken-fur-mieter.js';
import post1748 from './posts/neue-eigentumer-haften-nicht-fur-fruhere-spenden-an-mieter.js';
import post1749 from './posts/neue-finanzkrise-und-ihre-folgen-fur-mieter-in-deutschland.js';
import post1750 from './posts/neue-haftungsregeln-fur-e-scooter-was-mieter-wissen-sollten.js';
import post1751 from './posts/neue-rentenreform-was-mieter-in-deutschland-jetzt-wissen-sollten.js';
import post1752 from './posts/neue-vergaberegeln-bremsen-seriellen-wohnungsbau-in-deutschland.js';
import post1753 from './posts/neuer-mietendeckel-in-berlin-was-mieter-jetzt-wissen-sollten.js';
import post1754 from './posts/neues-altersvorsorge-modell-was-mieter-jetzt-wissen-sollten.js';
import post1755 from './posts/neues-wohnhaus-in-munchen-chancen-und-herausforderungen-fur-mieter.js';
import post1756 from './posts/new-sbb-housing-project-in-wollishofen-what-tenants-should-know.js';
import post1757 from './posts/nieuwe-woningen-zonder-natuur-op-te-offeren-kansen-in-bestaande-steden.js';
import post1758 from './posts/nochevieja-fria-como-proteger-tu-hogar-y-ahorrar-en-alquiler.js';
import post1759 from './posts/novas-linhas-do-banco-de-fomento-para-habitacao-publica-em-portugal.js';
import post1760 from './posts/novas-medidas-do-governo-para-rendas-moderadas-e-habitacao.js';
import post1761 from './posts/novas-regras-para-apps-no-brasil-impacto-para-inquilinos-em-portugal.js';
import post1762 from './posts/novedades-en-la-ley-de-arrendamientos-urbanos-que-implica-alquilar-sin-contrato-.js';
import post1763 from './posts/novo-direito-de-habitacao-para-ocupantes-de-casas-de-funcao-do-estado.js';
import post1764 from './posts/novo-edificio-de-habitacao-social-na-amadora-com-rendas-reduzidas.js';
import post1765 from './posts/novo-pacote-fiscal-da-habitacao-em-portugal-o-que-muda-para-os-inquilinos.js';
import post1766 from './posts/novo-pacote-fiscal-da-habitacao-o-que-muda-para-os-inquilinos.js';
import post1767 from './posts/novo-pacote-fiscal-da-habitacao-o-que-os-inquilinos-devem-saber.js';
import post1768 from './posts/novo-pacote-fiscal-para-habitacao-impacto-para-inquilinos-em-portugal.js';
import post1769 from './posts/nuda-propiedad-que-es-y-como-afecta-a-inquilinos-vulnerables.js';
import post1770 from './posts/nuda-propiedad-una-oportunidad-o-riesgo-para-inquilinos-vulnerables.js';
import post1771 from './posts/nueva-barriada-en-sevilla-esperanza-para-inquilinos-vulnerables.js';
import post1772 from './posts/nueva-empresa-estatal-una-luz-para-inquilinos-vulnerables-en-2026.js';
import post1773 from './posts/nueva-ley-de-alquileres-en-espana-seguridad-para-inquilinos-ante-la-no-renovacio.js';
import post1774 from './posts/nueva-ley-de-alquileres-mas-derechos-y-proteccion-para-inquilinos.js';
import post1775 from './posts/nueva-ley-de-alquileres-mas-proteccion-para-inquilinos-vulnerables.js';
import post1776 from './posts/nueva-ley-de-alquileres-proteccion-y-ahorro-para-inquilinos-vulnerables.js';
import post1777 from './posts/nueva-ley-de-vivienda-en-andalucia-que-significa-para-los-inquilinos-vulnerables.js';
import post1778 from './posts/nueva-ley-de-vivienda-en-espana-que-significa-para-los-inquilinos-y-propietarios.js';
import post1779 from './posts/nueva-ley-en-canarias-que-significa-para-los-inquilinos.js';
import post1780 from './posts/nueva-ley-para-alquileres-temporales-que-debes-saber-como-inquilino.js';
import post1781 from './posts/nueva-norma-en-cataluna-que-cambia-para-inquilinos-vulnerables.js';
import post1782 from './posts/nueva-oportunidad-para-vivienda-protegida-en-cordoba-lo-que-debes-saber.js';
import post1783 from './posts/nueva-regulacion-en-cataluna-proteccion-real-para-inquilinos-vulnerables.js';
import post1784 from './posts/nueva-regulacion-europea-que-significa-para-tu-alquiler-y-derechos.js';
import post1785 from './posts/nueva-regulacion-europea-una-esperanza-para-inquilinos-vulnerables.js';
import post1786 from './posts/nueva-torre-en-porvenir-que-significa-para-inquilinos-vulnerables.js';
import post1787 from './posts/nueva-vida-en-hita-esperanza-para-inquilinos-vulnerables.js';
import post1788 from './posts/nueva-vida-para-carabanchel-esperanza-para-inquilinos-vulnerables.js';
import post1789 from './posts/nuevas-ayudas-en-castilla-la-mancha-para-jovenes-y-su-vivienda.js';
import post1790 from './posts/nuevas-ayudas-para-jovenes-y-consejos-para-inquilinos-en-apuros.js';
import post1791 from './posts/nuevas-ayudas-para-vivienda-tras-la-dana-que-pueden-hacer-los-inquilinos.js';
import post1792 from './posts/nuevas-deducciones-irpf-2026-alivio-para-inquilinos-vulnerables.js';
import post1793 from './posts/nuevas-medidas-para-proteger-a-inquilinos-que-cambia-en-tu-alquiler.js';
import post1794 from './posts/nuevas-obligaciones-para-propietarios-en-alquileres-tras-la-venta-de-viviendas-e.js';
import post1795 from './posts/nuevas-reglas-para-alquileres-en-espana-que-deben-saber-los-inquilinos.js';
import post1796 from './posts/nuevas-viviendas-asequibles-en-sevilla-esperanza-para-inquilinos-vulnerables.js';
import post1797 from './posts/nuevas-viviendas-asequibles-en-valencia-una-esperanza-para-inquilinos.js';
import post1798 from './posts/nuevas-viviendas-asequibles-una-esperanza-real-para-inquilinos-vulnerables.js';
import post1799 from './posts/nuevas-viviendas-en-albacete-una-oportunidad-para-inquilinos-vulnerables.js';
import post1800 from './posts/nuevas-viviendas-en-alcosa-una-esperanza-para-inquilinos-vulnerables.js';
import post1801 from './posts/nuevas-viviendas-en-barcelona-que-significa-para-inquilinos-vulnerables.js';
import post1802 from './posts/nuevas-viviendas-en-entrenucleos-que-implican-para-ti-como-inquilino.js';
import post1803 from './posts/nuevas-viviendas-en-madrid-que-significa-para-inquilinos-vulnerables.js';
import post1804 from './posts/nuevas-viviendas-en-sevilla-que-significa-para-ti-como-inquilino.js';
import post1805 from './posts/nuevas-viviendas-en-sevilla-una-esperanza-real-para-inquilinos-vulnerables.js';
import post1806 from './posts/nuevas-viviendas-en-toledo-que-significa-para-inquilinos-vulnerables.js';
import post1807 from './posts/nuevas-viviendas-en-valencia-que-significa-para-inquilinos-vulnerables.js';
import post1808 from './posts/nuevas-viviendas-en-valencia-una-esperanza-para-inquilinos-vulnerables.js';
import post1809 from './posts/nuevas-viviendas-protegidas-en-sevilla-que-significa-para-inquilinos-vulnerables.js';
import post1810 from './posts/nuevas-viviendas-publicas-en-albacete-una-esperanza-para-inquilinos-vulnerables.js';
import post1811 from './posts/nuevas-vpo-cerca-de-sevilla-una-oportunidad-para-inquilinos-vulnerables.js';
import post1812 from './posts/nuevo-barrio-en-alicante-que-significa-para-inquilinos-vulnerables.js';
import post1813 from './posts/nuevo-barrio-en-sevilla-esperanza-para-inquilinos-vulnerables.js';
import post1814 from './posts/nuevo-cambio-en-fianzas-de-alquiler-en-andalucia-lo-que-debes-saber.js';
import post1815 from './posts/nuevo-decreto-antidesahucios-que-debes-saber-para-protegerte.js';
import post1816 from './posts/nuevo-decreto-para-proteger-inquilinos-lo-que-debes-saber.js';
import post1817 from './posts/nuevo-edificio-en-prado-de-san-sebastian-esperanza-para-inquilinos-vulnerables.js';
import post1818 from './posts/nuevo-edificio-en-sevilla-que-significa-para-inquilinos-vulnerables.js';
import post1819 from './posts/nuevo-impulso-a-viviendas-asequibles-en-alicante-que-significa-para-ti.js';
import post1820 from './posts/nuevo-proyecto-en-valencia-que-significa-para-inquilinos-vulnerables.js';
import post1821 from './posts/nuevo-proyecto-inmobiliario-en-sevilla-que-significa-para-ti.js';
import post1822 from './posts/nuevo-rascacielos-en-alcala-que-significa-para-inquilinos-vulnerables.js';
import post1823 from './posts/nuevo-residencial-en-porvenir-que-significa-para-inquilinos-vulnerables.js';
import post1824 from './posts/nuevo-villamarin-y-tu-alquiler-derechos-y-proteccion-para-inquilinos.js';
import post1825 from './posts/nuevos-pisos-en-cataluna-que-significa-para-inquilinos-vulnerables.js';
import post1826 from './posts/nuevos-pisos-vpo-en-sevilla-una-esperanza-para-inquilinos-vulnerables.js';
import post1827 from './posts/nuove-regole-sfratti-in-italia-cosa-cambia-per-gli-inquilini.js';
import post1828 from './posts/nutzungsdauergutachten-was-mieter-wissen-sollten.js';
import post1829 from './posts/nya-eu-regler-forbjuder-flygbolag-ta-betalt-for-barnplatser.js';
import post1830 from './posts/nya-hyreshus-utan-forrad-vad-betyder-det-for-dig.js';
import post1831 from './posts/nya-hyreslagenheter-i-fittja-flytta-in-2026.js';
import post1832 from './posts/nya-regler-for-andrahandsuthyrning-vad-betyder-det-for-dig.js';
import post1833 from './posts/nya-regler-for-studentbostader-mindre-badrum-och-lagre-hyra.js';
import post1834 from './posts/o-futuro-da-habitacao-em-portugal-o-que-os-inquilinos-precisam-saber.js';
import post1835 from './posts/obras-comunitarias-obligatorias-protege-tu-vivienda-y-ahorra-en-alquiler.js';
import post1836 from './posts/obras-en-madrid-y-alquiler-como-proteger-tus-derechos-y-ahorrar.js';
import post1837 from './posts/obras-en-tu-alquiler-tus-derechos-para-proteger-tu-hogar-y-bolsillo.js';
import post1838 from './posts/ockerhyror-och-mobeltillagg-i-forna-bordellhuset-pa-sodermalm.js';
import post1839 from './posts/oecd-fordert-reformen-was-mieter-in-deutschland-wissen-sollten.js';
import post1840 from './posts/oferta-de-alquiler-cae-50-como-proteger-tus-derechos-y-ahorrar.js';
import post1841 from './posts/okupacion-en-andalucia-que-deben-saber-los-inquilinos-vulnerables.js';
import post1842 from './posts/okupacion-y-alquiler-como-proteger-tus-derechos-y-ahorrar-en-vivienda.js';
import post1843 from './posts/okupacion-y-vivienda-protegida-derechos-y-proteccion-para-inquilinos.js';
import post1844 from './posts/okupan-tu-casa-guia-para-proteger-tus-derechos-y-tu-bolsillo.js';
import post1845 from './posts/okupan-tu-vivienda-protege-tus-derechos-y-ahorra-en-alquiler.js';
import post1846 from './posts/okupas-de-lujo-y-tu-alquiler-como-proteger-tus-derechos-hoy.js';
import post1847 from './posts/okupas-y-cortes-de-luz-como-proteger-tus-derechos-como-inquilino.js';
import post1848 from './posts/olvida-tu-ayuntamiento-la-vivienda-protege-tus-derechos-hoy.js';
import post1849 from './posts/olympia-bewerbung-nrw-was-mieter-jetzt-wissen-sollten.js';
import post1850 from './posts/ongelijkheid-en-huisvesting-wat-huurders-kunnen-leren.js';
import post1851 from './posts/over-65-in-italia-casa-di-proprieta-e-stabilita-economica.js';
import post1852 from './posts/overtourism-a-firenze-i-diritti-degli-inquilini-sotto-pressione.js';
import post1853 from './posts/pacote-fiscal-de-habitacao-atrasado-o-que-significa-para-inquilinos.js';
import post1854 from './posts/pacto-por-la-vivienda-en-sevilla-que-significa-para-los-inquilinos.js';
import post1855 from './posts/paga-menos-alquiler-con-reformas-derechos-y-consejos-para-inquilinos.js';
import post1856 from './posts/pagamenti-f24-automatici-cosa-significa-per-chi-affitta-casa.js';
import post1857 from './posts/pagar-la-tasa-de-basuras-lo-que-todo-inquilino-debe-saber.js';
import post1858 from './posts/pago-adelantado-del-alquiler-como-proteger-tus-derechos-y-ahorrar.js';
import post1859 from './posts/palacios-y-alquileres-como-proteger-tu-derecho-a-una-vivienda-digna.js';
import post1860 from './posts/palma-limita-alquiler-turistico-que-significa-para-inquilinos-vulnerables.js';
import post1861 from './posts/parcela-estatal-en-huelva-que-significa-para-inquilinos-vulnerables.js';
import post1862 from './posts/parcheggio-viola-park-cosa-cambia-per-residenti-e-inquilini.js';
import post1863 from './posts/parentifizierung-wenn-kinder-zu-eltern-werden.js';
import post1864 from './posts/parlamento-europeu-e-as-novas-medidas-para-habitacao-acessivel.js';
import post1865 from './posts/passaggio-dal-rame-alla-fibra-cosa-cambia-per-gli-inquilini.js';
import post1866 from './posts/permanent-uppehallsratt-i-sverige-vad-hyresgaster-bor-veta.js';
import post1867 from './posts/personal-property-shopper-una-guida-per-chi-compra-casa-in-italia.js';
import post1868 from './posts/photovoltaik-auf-mietdachern-haftung-und-rechte-fur-mieter.js';
import post1869 from './posts/piano-casa-100mila-alloggi-accessibili-in-10-anni.js';
import post1870 from './posts/piano-casa-2024-cosa-cambia-per-chi-affitta-e-come-difendersi.js';
import post1871 from './posts/piano-casa-2026-cosa-cambia-per-chi-affitta-e-cerca-casa.js';
import post1872 from './posts/piano-casa-2026-cosa-cambia-per-chi-cerca-casa-in-affitto.js';
import post1873 from './posts/piano-casa-2026-cosa-cambia-per-giovani-anziani-e-famiglie.js';
import post1874 from './posts/piano-casa-2026-cosa-cambia-per-gli-inquilini-in-italia.js';
import post1875 from './posts/piano-casa-2026-cosa-cambia-per-inquilini-e-affitti.js';
import post1876 from './posts/piano-casa-2026-cosa-cambia-per-inquilini-e-ristrutturazioni.js';
import post1877 from './posts/piano-casa-cosa-cambia-per-inquilini-e-proprietari-in-italia.js';
import post1878 from './posts/piano-casa-cosa-succede-se-perdi-i-requisiti-per-l-alloggio.js';
import post1879 from './posts/piano-casa-e-bonus-affitti-cosa-cambia-per-gli-inquilini-in-italia.js';
import post1880 from './posts/piano-casa-e-condono-edilizio-cosa-cambia-per-gli-inquilini.js';
import post1881 from './posts/piano-casa-e-maxi-bonus-volumetria-cosa-significa-per-gli-inquilini.js';
import post1882 from './posts/piano-casa-e-tensioni-politiche-cosa-significa-per-gli-inquilini-italiani.js';
import post1883 from './posts/pignoramento-del-conto-corrente-come-tutelare-l-inquilino.js';
import post1884 from './posts/pirineo-y-alquiler-proteger-tus-derechos-en-un-mercado-desigual.js';
import post1885 from './posts/pisos-turisticos-en-badalona-que-significa-para-ti-como-inquilino.js';
import post1886 from './posts/pisos-turisticos-en-cordoba-que-significa-para-los-inquilinos.js';
import post1887 from './posts/pisos-turisticos-en-tu-comunidad-protege-tu-hogar-y-tu-bolsillo.js';
import post1888 from './posts/pisos-turisticos-ilegales-como-protegerte-y-ahorrar-en-tu-alquiler.js';
import post1889 from './posts/pisos-turisticos-y-alquiler-como-proteger-tus-derechos-y-ahorrar.js';
import post1890 from './posts/pisos-turisticos-y-alquiler-que-implica-para-ti-como-inquilino.js';
import post1891 from './posts/plan-de-choque-vivienda-como-proteger-tus-derechos-y-ahorrar.js';
import post1892 from './posts/plan-estatal-de-vivienda-en-espana-que-implica-para-los-inquilinos.js';
import post1893 from './posts/plan-vivienda-castilla-la-mancha-oportunidad-para-inquilinos-vulnerables.js';
import post1894 from './posts/plano-do-governo-para-baixar-rendas-o-que-inquilinos-devem-saber.js';
import post1895 from './posts/plofkraken-en-jouw-woonsituatie-wat-huurders-moeten-weten.js';
import post1896 from './posts/polizze-casa-nuovi-incentivi-per-proteggere-la-prima-abitazione.js';
import post1897 from './posts/por-que-ahorrar-para-una-vivienda-es-tan-dificil-y-como-protegerte-como-inquilin.js';
import post1898 from './posts/por-que-bajan-los-inversores-en-alquiler-y-que-significa-para-ti.js';
import post1899 from './posts/por-que-el-90-no-puede-comprar-piso-y-como-protegerse-como-inquilino.js';
import post1900 from './posts/por-que-el-alquiler-consume-casi-todo-tu-sueldo-descubre-tus-derechos.js';
import post1901 from './posts/por-que-el-alquiler-te-ahoga-entiende-y-protege-tu-bolsillo.js';
import post1902 from './posts/por-que-es-dificil-encontrar-alquiler-asequible-guia-para-inquilinos.js';
import post1903 from './posts/por-que-es-tan-dificil-comprar-vivienda-y-como-protegerte-como-inquilino.js';
import post1904 from './posts/por-que-es-tan-dificil-para-los-jovenes-pagar-el-alquiler-hoy.js';
import post1905 from './posts/por-que-escasea-la-vivienda-y-que-hacer-si-eres-inquilino-vulnerable.js';
import post1906 from './posts/por-que-frenar-el-control-de-algoritmos-puede-afectar-tu-alquiler.js';
import post1907 from './posts/por-que-jose-elias-no-compra-loteria-y-que-puedes-aprender-para-ahorrar-en-alqui.js';
import post1908 from './posts/por-que-la-vivienda-es-clave-para-proteger-a-los-inquilinos.js';
import post1909 from './posts/por-que-la-vivienda-es-tan-cara-y-que-puedes-hacer-como-inquilino.js';
import post1910 from './posts/por-que-la-vivienda-puede-bajar-y-como-protegerte-como-inquilino.js';
import post1911 from './posts/por-que-la-vivienda-sube-y-como-proteger-tu-alquiler.js';
import post1912 from './posts/por-que-los-alquileres-suben-tanto-y-como-protegerte.js';
import post1913 from './posts/por-que-los-precios-del-alquiler-parecen-tan-altos-guia-para-inquilinos.js';
import post1914 from './posts/por-que-seguimos-pagando-alquileres-altos-la-ciencia-y-tus-derechos.js';
import post1915 from './posts/por-que-sevilla-recibe-menos-ayudas-y-que-significa-para-ti-como-inquilino.js';
import post1916 from './posts/por-que-sube-el-precio-de-la-vivienda-y-como-proteger-tu-alquiler.js';
import post1917 from './posts/por-que-sube-tanto-el-alquiler-y-como-protegerte-como-inquilino.js';
import post1918 from './posts/por-que-sube-tanto-el-precio-de-la-vivienda-y-como-protegerte.js';
import post1919 from './posts/por-que-suben-los-alquileres-y-que-pueden-hacer-los-inquilinos.js';
import post1920 from './posts/por-que-suben-tanto-los-alquileres-lo-que-debes-saber-para-protegerte.js';
import post1921 from './posts/por-que-subiran-los-alquileres-y-como-protegerte-como-inquilino-vulnerable.js';
import post1922 from './posts/por-que-subiran-los-precios-y-que-pueden-hacer-los-inquilinos-vulnerables.js';
import post1923 from './posts/por-que-tardan-anos-en-entregarte-la-vivienda-claves-para-inquilinos.js';
import post1924 from './posts/por-que-tus-hijos-podrian-no-comprar-casa-protege-tu-alquiler-hoy.js';
import post1925 from './posts/portugal-e-o-espaco-oportunidades-e-impactos-na-habitacao.js';
import post1926 from './posts/portugal-lidera-subida-dos-precos-da-habitacao-impacto-para-inquilinos.js';
import post1927 from './posts/portugal-s-new-housing-tax-incentives-what-renters-should-know.js';
import post1928 from './posts/praktische-orientierung-fur-mieter-in-deutschlands-wohnungsmarkt.js';
import post1929 from './posts/precio-de-la-vivienda-sube-como-proteger-tus-derechos-y-ahorrar-en-alquiler.js';
import post1930 from './posts/precios-al-alza-en-sevilla-guia-para-inquilinos-en-apuros.js';
import post1931 from './posts/precios-de-alquiler-al-alza-como-proteger-tus-derechos-y-ahorrar.js';
import post1932 from './posts/precios-de-vivienda-al-alza-guia-para-inquilinos-vulnerables.js';
import post1933 from './posts/precios-de-vivienda-en-alza-como-proteger-tu-alquiler-y-ahorrar.js';
import post1934 from './posts/precios-de-vivienda-en-alza-protege-tu-alquiler-y-ahorra-hoy.js';
import post1935 from './posts/precios-de-vivienda-en-valencia-como-proteger-tus-derechos-y-ahorrar.js';
import post1936 from './posts/precios-de-vivienda-suben-guia-para-proteger-tu-alquiler-y-ahorrar.js';
import post1937 from './posts/precios-en-alza-protege-tu-alquiler-y-ahorra-en-sevilla.js';
import post1938 from './posts/precios-record-de-la-vivienda-como-proteger-tus-derechos-y-ahorrar.js';
import post1939 from './posts/precios-record-en-vivienda-guia-para-inquilinos-vulnerables.js';
import post1940 from './posts/precos-da-habitacao-sobem-em-portugal-impactos-e-dicas-para-inquilinos.js';
import post1941 from './posts/precos-variaveis-online-impactos-para-inquilinos-em-portugal.js';
import post1942 from './posts/prefab-bouwen-kan-woningnood-verlichten-maar-niet-meteen.js';
import post1943 from './posts/preparar-se-para-emergencias-habitacionais-em-portugal.js';
import post1944 from './posts/preserving-heritage-homes-what-tenants-should-know-in-switzerland.js';
import post1945 from './posts/pressione-abitativa-in-italia-come-affrontare-caro-affitti-e-sfratti.js';
import post1946 from './posts/pressione-abitativa-in-italia-come-difendersi-e-orientarsi.js';
import post1947 from './posts/pressione-abitativa-in-italia-come-tutelarsi-da-affitti-e-sfratti.js';
import post1948 from './posts/prestacao-da-casa-duplicou-como-enfrentar-a-crise-da-habitacao-em-portugal.js';
import post1949 from './posts/prezzi-delle-case-in-aumento-cosa-significa-per-gli-inquilini.js';
import post1950 from './posts/prioridad-nacional-y-vivienda-que-significa-para-los-inquilinos-en-espana.js';
import post1951 from './posts/prisuppgang-pa-bostadsratter-i-stockholm-vad-betyder-det-for-dig.js';
import post1952 from './posts/private-altersvorsorge-statt-riester-rente-was-mieter-wissen-sollten.js';
import post1953 from './posts/private-altersvorsorge-und-wohnen-was-mieter-jetzt-wissen-sollten.js';
import post1954 from './posts/private-altersvorsorge-und-wohnkosten-was-mieter-jetzt-wissen-sollten.js';
import post1955 from './posts/privatisering-publieke-ruimte-lessen-voor-huurders-in-nederland.js';
import post1956 from './posts/prohibicion-de-compra-en-cataluna-lo-que-debes-saber-como-inquilino.js';
import post1957 from './posts/prohibicion-de-pisos-turisticos-como-afecta-a-inquilinos-vulnerables.js';
import post1958 from './posts/prohibir-la-compra-especulativa-claves-para-proteger-tu-alquiler.js';
import post1959 from './posts/prohibir-la-compra-especulativa-lo-que-debes-saber-como-inquilino.js';
import post1960 from './posts/prohibir-la-venta-especulativa-un-paso-para-proteger-a-inquilinos-vulnerables.js';
import post1961 from './posts/propietarios-deben-compensar-a-inquilinos-como-proteger-tus-derechos.js';
import post1962 from './posts/propietarios-deben-pagar-reparaciones-protege-tu-alquiler-y-ahorra.js';
import post1963 from './posts/propietarios-en-apuros-que-significa-para-los-inquilinos.js';
import post1964 from './posts/propostas-para-habitacao-em-portugal-o-que-mudancas-podem-significar-para-inquil.js';
import post1965 from './posts/prorroga-de-alquiler-tras-caida-del-decreto-que-hacer.js';
import post1966 from './posts/prorroga-de-contratos-de-alquiler-en-2026-que-debes-saber.js';
import post1967 from './posts/proteccion-de-viviendas-en-madrid-lo-que-debes-saber-para-proteger-tu-alquiler.js';
import post1968 from './posts/proteccion-para-jubilados-frente-a-desahucios-en-espana.js';
import post1969 from './posts/proteccion-real-para-inquilinos-vulnerables-que-hacer-ante-impagos.js';
import post1970 from './posts/protecting-swiss-renters-from-financial-exploitation.js';
import post1971 from './posts/protecting-your-housing-rights-amid-property-disputes.js';
import post1972 from './posts/protege-tu-alquiler-aprende-de-casos-y-defiende-tus-derechos.js';
import post1973 from './posts/protege-tu-alquiler-aprende-de-fraudes-inmobiliarios-y-ahorra.js';
import post1974 from './posts/protege-tu-alquiler-certificado-energetico-y-tus-derechos-como-inquilino.js';
import post1975 from './posts/protege-tu-alquiler-claves-para-evitar-problemas-y-ahorrar-dinero.js';
import post1976 from './posts/protege-tu-alquiler-claves-para-inquilinos-ante-crisis-y-abusos.js';
import post1977 from './posts/protege-tu-alquiler-claves-para-inquilinos-ante-la-crisis-inmobiliaria.js';
import post1978 from './posts/protege-tu-alquiler-claves-para-inquilinos-ante-problemas-en-tu-barrio.js';
import post1979 from './posts/protege-tu-alquiler-claves-para-inquilinos-en-crisis-de-vivienda.js';
import post1980 from './posts/protege-tu-alquiler-claves-para-inquilinos-en-tiempos-dificiles.js';
import post1981 from './posts/protege-tu-alquiler-claves-para-inquilinos-tras-la-nueva-ley-en-cataluna.js';
import post1982 from './posts/protege-tu-alquiler-claves-para-inquilinos-vulnerables-en-espana.js';
import post1983 from './posts/protege-tu-alquiler-como-frenar-subidas-y-defender-tus-derechos.js';
import post1984 from './posts/protege-tu-alquiler-como-vigilar-y-defender-tus-derechos.js';
import post1985 from './posts/protege-tu-alquiler-conoce-tus-derechos-frente-a-clausulas-abusivas.js';
import post1986 from './posts/protege-tu-alquiler-derechos-y-ahorro-para-inquilinos-vulnerables.js';
import post1987 from './posts/protege-tu-alquiler-derechos-y-compensaciones-si-cambia-el-dueno.js';
import post1988 from './posts/protege-tu-alquiler-derechos-y-compensaciones-si-cambian-de-dueno.js';
import post1989 from './posts/protege-tu-alquiler-derechos-y-compensaciones-si-venden-tu-vivienda.js';
import post1990 from './posts/protege-tu-alquiler-derechos-y-consejos-ante-subidas-y-abusos.js';
import post1991 from './posts/protege-tu-alquiler-derechos-y-consejos-frente-a-abusos-y-subidas.js';
import post1992 from './posts/protege-tu-alquiler-derechos-y-consejos-frente-a-desalojos-inesperados.js';
import post1993 from './posts/protege-tu-alquiler-derechos-y-consejos-para-inquilinos-vulnerables.js';
import post1994 from './posts/protege-tu-alquiler-derechos-y-soluciones-ante-cambios-de-propietario.js';
import post1995 from './posts/protege-tu-alquiler-evita-las-trampas-mas-comunes-en-tu-contrato.js';
import post1996 from './posts/protege-tu-alquiler-indemnizacion-si-cambia-el-dueno-de-tu-piso.js';
import post1997 from './posts/protege-tu-alquiler-indemnizacion-si-cambia-el-propietario.js';
import post1998 from './posts/protege-tu-alquiler-indemnizacion-si-el-propietario-incumple-la-ley.js';
import post1999 from './posts/protege-tu-alquiler-lecciones-desde-la-crisis-de-cantora.js';
import post2000 from './posts/protege-tu-alquiler-lo-que-debes-saber-si-venden-tu-vivienda.js';
import post2001 from './posts/protege-tu-alquiler-lo-que-debes-saber-tras-polemica-en-valencia.js';
import post2002 from './posts/protege-tu-alquiler-nueva-ley-y-tus-derechos-como-inquilino.js';
import post2003 from './posts/protege-tu-alquiler-nuevas-ayudas-y-consejos-para-inquilinos-vulnerables.js';
import post2004 from './posts/protege-tu-alquiler-nuevas-medidas-para-inquilinos-vulnerables.js';
import post2005 from './posts/protege-tu-alquiler-nuevas-reglas-en-cataluna-para-inquilinos-vulnerables.js';
import post2006 from './posts/protege-tu-alquiler-nuevos-derechos-y-consejos-para-inquilinos-vulnerables.js';
import post2007 from './posts/protege-tu-alquiler-que-hacer-si-cae-la-ley-anti-desahucios.js';
import post2008 from './posts/protege-tu-alquiler-que-significa-la-ley-contra-la-compra-especulativa.js';
import post2009 from './posts/protege-tu-alquiler-que-significa-la-paralizacion-en-san-francisco-de-paula.js';
import post2010 from './posts/protege-tu-alquiler-vigilancia-y-derechos-para-inquilinos-vulnerables.js';
import post2011 from './posts/protege-tu-alquiler-y-ahorra-claves-para-inquilinos-vulnerables.js';
import post2012 from './posts/protege-tu-alquiler-y-ahorra-consejos-para-inquilinos-vulnerables.js';
import post2013 from './posts/protege-tu-alquiler-y-ahorra-en-vivienda-derechos-y-consejos-practicos.js';
import post2014 from './posts/protege-tu-alquiler-y-tus-derechos-consejos-practicos-para-inquilinos.js';
import post2015 from './posts/protege-tu-derecho-un-inmueble-no-tributa-distinto-para-copropietarios.js';
import post2016 from './posts/protege-tu-hogar-aprende-a-defender-tus-derechos-como-inquilino.js';
import post2017 from './posts/protege-tu-hogar-arboles-y-alquiler-derechos-y-ahorro.js';
import post2018 from './posts/protege-tu-hogar-clausulas-clave-para-evitar-desahucios-injustos.js';
import post2019 from './posts/protege-tu-hogar-claves-para-inquilinos-ante-abusos-en-viviendas-protegidas.js';
import post2020 from './posts/protege-tu-hogar-claves-para-inquilinos-ante-la-crisis-del-alquiler.js';
import post2021 from './posts/protege-tu-hogar-claves-para-inquilinos-ante-la-gentrificacion-en-palma.js';
import post2022 from './posts/protege-tu-hogar-claves-para-inquilinos-ante-robos-y-abusos.js';
import post2023 from './posts/protege-tu-hogar-claves-para-inquilinos-frente-a-robos-y-abusos.js';
import post2024 from './posts/protege-tu-hogar-claves-para-inquilinos-frente-al-miedo-a-la-okupacion.js';
import post2025 from './posts/protege-tu-hogar-conoce-tus-derechos-frente-al-desahucio.js';
import post2026 from './posts/protege-tu-hogar-consejos-clave-para-inquilinos-vulnerables.js';
import post2027 from './posts/protege-tu-hogar-derechos-ante-problemas-ocultos-en-viviendas-alquiladas.js';
import post2028 from './posts/protege-tu-hogar-derechos-clave-contra-danos-por-goteras.js';
import post2029 from './posts/protege-tu-hogar-derechos-claves-ante-clausulas-abusivas-en-alquiler.js';
import post2030 from './posts/protege-tu-hogar-derechos-y-consejos-ante-okupas-y-abusos-en-alquiler.js';
import post2031 from './posts/protege-tu-hogar-derechos-y-consejos-para-inquilinos-en-colonias-historicas.js';
import post2032 from './posts/protege-tu-hogar-derechos-y-consejos-para-inquilinos-vulnerables.js';
import post2033 from './posts/protege-tu-hogar-derechos-y-reparaciones-en-alquileres-dificiles.js';
import post2034 from './posts/protege-tu-hogar-lo-que-debes-saber-sobre-embargos-y-desahucios.js';
import post2035 from './posts/protege-tu-hogar-nuevas-reglas-para-inquilinos-en-espana.js';
import post2036 from './posts/protege-tu-hogar-nuevos-derechos-para-inquilinos-ante-venta-y-desahucio.js';
import post2037 from './posts/protege-tu-hogar-que-clausulas-deben-incluir-los-contratos-de-alquiler.js';
import post2038 from './posts/protege-tu-hogar-que-hacer-si-tu-casero-quiere-recuperar-la-vivienda.js';
import post2039 from './posts/protege-tu-hogar-que-hacer-tras-un-incendio-por-rayo-en-alquiler.js';
import post2040 from './posts/protege-tu-hogar-y-ahorra-claves-para-inquilinos-en-tiempos-de-cambios-fiscales.js';
import post2041 from './posts/protege-tu-hogar-y-ahorra-claves-tras-recientes-robos-en-oropesa.js';
import post2042 from './posts/protege-tu-hogar-y-bolsillo-derechos-y-consejos-para-inquilinos-vulnerables.js';
import post2043 from './posts/protege-tu-hogar-y-derechos-guia-para-inquilinos-ante-situaciones-dificiles.js';
import post2044 from './posts/protege-tu-hogar-y-tu-dinero-claves-para-inquilinos-vulnerables.js';
import post2045 from './posts/protege-tu-hogar-y-tus-derechos-ante-emergencias-en-viviendas-alquiladas.js';
import post2046 from './posts/protege-tu-hogar-y-tus-derechos-claves-para-inquilinos-vulnerables.js';
import post2047 from './posts/protege-tu-hogar-y-tus-derechos-como-inquilino-vulnerable.js';
import post2048 from './posts/protege-tu-hogar-y-tus-derechos-guia-para-inquilinos-vulnerables.js';
import post2049 from './posts/protege-tu-vivienda-derechos-clave-para-inquilinos-vulnerables.js';
import post2050 from './posts/protege-tu-vivienda-derechos-y-consejos-para-inquilinos-vulnerables.js';
import post2051 from './posts/protege-tu-vivienda-derechos-y-consejos-tras-fallo-clave-del-constitucional.js';
import post2052 from './posts/protege-tu-vivienda-y-derechos-clave-ante-la-ley-de-propiedad-horizontal.js';
import post2053 from './posts/protege-tu-vivienda-y-tus-derechos-ante-robos-y-abusos-en-el-alquiler.js';
import post2054 from './posts/protege-tu-vivienda-y-tus-derechos-guia-para-inquilinos-vulnerables.js';
import post2055 from './posts/protege-tus-derechos-ante-abusos-en-vivienda-protegida.js';
import post2056 from './posts/protege-tus-derechos-como-afecta-la-descalificacion-de-vpo-en-castilla-y-leon.js';
import post2057 from './posts/protege-tus-derechos-compensacion-al-inquilino-si-venden-tu-alquiler.js';
import post2058 from './posts/protege-tus-derechos-el-escudo-social-y-el-alquiler-en-riesgo.js';
import post2059 from './posts/protege-tus-derechos-evita-clausulas-que-facilitan-el-desahucio.js';
import post2060 from './posts/protege-tus-derechos-indemnizacion-en-alquiler-tras-venta-de-vivienda.js';
import post2061 from './posts/protege-tus-derechos-indemnizacion-si-cambian-de-dueno-tu-alquiler.js';
import post2062 from './posts/protege-tus-derechos-indemnizacion-si-cambian-el-dueno-de-tu-alquiler.js';
import post2063 from './posts/protege-tus-derechos-indemnizacion-si-tu-casero-incumple-la-ley.js';
import post2064 from './posts/protege-tus-derechos-que-cambia-en-contratos-antiguos-de-alquiler.js';
import post2065 from './posts/protege-tus-derechos-que-hacer-si-tu-casero-abusa-de-ti.js';
import post2066 from './posts/protege-tus-derechos-que-hacer-si-tu-vivienda-cambia-de-dueno.js';
import post2067 from './posts/protege-tus-derechos-que-hacer-si-venden-tu-piso-alquilado.js';
import post2068 from './posts/protege-tus-derechos-reparaciones-que-debe-pagar-tu-casero.js';
import post2069 from './posts/protege-tus-derechos-viviendas-oficiales-y-como-afectan-a-inquilinos.js';
import post2070 from './posts/protege-tus-derechos-y-ahorra-que-significa-el-control-de-pisos-turisticos.js';
import post2071 from './posts/proteggersi-dalle-truffe-in-casa-guida-pratica-per-gli-inquilini.js';
import post2072 from './posts/protocolo-de-acoso-escolar-y-su-impacto-en-la-vivienda-guia-para-inquilinos.js';
import post2073 from './posts/psoe-impulsa-vivienda-en-clm-claves-para-proteger-a-inquilinos-vulnerables.js';
import post2074 from './posts/psoe-lidera-intencion-de-voto-que-significa-para-inquilinos-vulnerables.js';
import post2075 from './posts/puede-el-casero-subir-el-alquiler-de-golpe-tras-anos-sin-hacerlo.js';
import post2076 from './posts/puede-prohibirse-comprar-pisos-para-especular-protege-tu-alquiler.js';
import post2077 from './posts/puede-tu-contrato-de-alquiler-prorrogarse-indefinidamente-lo-que-debes-saber.js';
import post2078 from './posts/pueden-echarme-si-venden-mi-piso-derechos-clave-para-inquilinos.js';
import post2079 from './posts/pueden-los-duenos-obligarte-a-pagar-la-tasa-de-basura.js';
import post2080 from './posts/pueden-los-grandes-inversores-afectar-tu-alquiler-protege-tu-hogar.js';
import post2081 from './posts/pueden-pedirte-varios-meses-de-alquiler-por-adelantado-lo-que-debes-saber.js';
import post2082 from './posts/puedes-colgar-macetas-en-tu-balcon-lo-que-todo-inquilino-debe-saber.js';
import post2083 from './posts/puedes-quedarte-en-casa-sin-pagar-alquiler-derechos-y-consejos.js';
import post2084 from './posts/puedo-poner-aire-acondicionado-guia-para-inquilinos-vulnerables.js';
import post2085 from './posts/quando-il-ritorno-a-casa-e-una-lunga-avventura-cosa-imparare.js';
import post2086 from './posts/quarantena-per-hantavirus-cosa-sapere-per-gli-inquilini-in-toscana.js';
import post2087 from './posts/que-hacer-si-tu-vivienda-esta-en-riesgo-de-desahucio-en-espana.js';
import post2088 from './posts/que-obras-puede-exigir-tu-casero-protege-tus-derechos-en-el-alquiler.js';
import post2089 from './posts/que-pasa-con-la-hipoteca-si-fallece-el-titular-guia-para-inquilinos.js';
import post2090 from './posts/que-pasa-con-la-vivienda-en-castilla-la-mancha-guia-para-inquilinos-vulnerables.js';
import post2091 from './posts/que-pasa-si-decae-el-decreto-de-prorroga-y-control-del-alquiler.js';
import post2092 from './posts/que-puede-aprender-un-inquilino-de-la-compra-de-casa-de-una-estrella.js';
import post2093 from './posts/que-significa-el-auge-de-la-compra-de-vivienda-para-ti-inquilino.js';
import post2094 from './posts/que-significa-el-fracaso-de-la-ley-de-alquileres-temporales-para-ti.js';
import post2095 from './posts/que-significa-el-plan-de-illa-para-los-inquilinos-vulnerables.js';
import post2096 from './posts/que-significa-el-record-en-compraventa-para-inquilinos-vulnerables.js';
import post2097 from './posts/que-significa-la-caida-de-la-compra-de-casas-para-ti-como-inquilino.js';
import post2098 from './posts/que-significa-la-caida-en-compra-de-viviendas-para-inquilinos-vulnerables.js';
import post2099 from './posts/que-significa-la-caida-en-compraventas-para-los-inquilinos-vulnerables.js';
import post2100 from './posts/que-significa-la-permuta-de-viviendas-protegidas-para-inquilinos.js';
import post2101 from './posts/que-significa-para-ti-el-fondo-espana-crece-y-como-proteger-tu-alquiler.js';
import post2102 from './posts/que-significa-para-ti-el-indice-estatal-de-alquiler-protege-tus-derechos.js';
import post2103 from './posts/que-significa-para-ti-la-compra-de-170-viviendas-por-el-govern.js';
import post2104 from './posts/quien-compra-vivienda-en-espana-lo-que-debes-saber-como-inquilino.js';
import post2105 from './posts/quien-es-el-verdadero-dueno-de-tu-casa-protege-tu-alquiler-hoy.js';
import post2106 from './posts/quien-mueve-el-mercado-inmobiliario-y-como-proteger-tu-alquiler.js';
import post2107 from './posts/quien-mueve-el-mercado-inmobiliario-y-que-significa-para-ti.js';
import post2108 from './posts/quien-paga-la-calefaccion-guia-para-inquilinos-vulnerables.js';
import post2109 from './posts/quien-paga-la-tasa-de-basuras-en-alquiler-guia-para-inquilinos.js';
import post2110 from './posts/quien-paga-las-reparaciones-del-alquiler-protege-tus-derechos-hoy.js';
import post2111 from './posts/quien-paga-los-gastos-de-comunidad-protege-tu-bolsillo-en-el-alquiler.js';
import post2112 from './posts/quien-paga-los-impuestos-si-fallece-el-titular-de-la-vivienda.js';
import post2113 from './posts/quien-paga-los-impuestos-si-fallece-el-titular-de-tu-vivienda.js';
import post2114 from './posts/quien-puede-comprar-vivienda-en-baleares-lo-que-debes-saber.js';
import post2115 from './posts/quieres-comprar-la-parte-de-una-casa-heredada-guia-para-inquilinos.js';
import post2116 from './posts/racismo-en-el-alquiler-como-proteger-tus-derechos-y-ahorrar.js';
import post2117 from './posts/raising-retirement-age-what-it-means-for-swiss-renters.js';
import post2118 from './posts/rechten-en-plichten-bij-ontruiming-en-kraak-in-nederland.js';
import post2119 from './posts/recognising-red-flags-in-uk-tenancies-a-tenant-s-guide.js';
import post2120 from './posts/record-en-compraventas-en-cordoba-y-los-inquilinos-que.js';
import post2121 from './posts/recuperacao-habitacional-em-leiria-e-ourem-impactos-e-direitos-dos-inquilinos.js';
import post2122 from './posts/recuperacao-habitacional-em-leiria-e-ourem-o-que-os-inquilinos-devem-saber.js';
import post2123 from './posts/red-electrica-y-vivienda-claves-para-proteger-tu-derecho-al-alquiler.js';
import post2124 from './posts/referendum-giustizia-2026-cosa-significa-per-gli-inquilini.js';
import post2125 from './posts/referendum-giustizia-e-diritti-degli-inquilini-cosa-sapere.js';
import post2126 from './posts/referendum-giustizia-e-impatti-per-gli-inquilini-in-italia.js';
import post2127 from './posts/reform-der-riester-rente-was-mieter-jetzt-wissen-sollten.js';
import post2128 from './posts/reforma-do-estado-e-seus-impactos-na-habitacao-para-inquilinos-em-portugal.js';
import post2129 from './posts/reformas-en-casa-como-ahorrar-y-proteger-tus-derechos-como-inquilino.js';
import post2130 from './posts/rehabilitacion-en-poligono-sur-una-esperanza-para-inquilinos-vulnerables.js';
import post2131 from './posts/rehabilitacion-en-puente-genil-una-luz-para-inquilinos-vulnerables.js';
import post2132 from './posts/rehabilitacion-energetica-ahorro-y-proteccion-para-inquilinos-vulnerables.js';
import post2133 from './posts/rehabilitacion-y-derechos-como-proteger-tu-alquiler-vulnerable.js';
import post2134 from './posts/reinventarse-para-proteger-tu-vivienda-lecciones-para-inquilinos-vulnerables.js';
import post2135 from './posts/relaciones-internacionales-y-tu-alquiler-que-debes-saber-hoy.js';
import post2136 from './posts/rendas-em-portugal-controlo-ou-liberalizacao-impacto-para-inquilinos.js';
import post2137 from './posts/renovacion-de-alquileres-2026-protege-tu-bolsillo-y-tus-derechos.js';
import post2138 from './posts/rente-aufbessern-durch-weiterarbeiten-ab-67-chancen-fur-mieter.js';
import post2139 from './posts/rente-mit-63-auswirkungen-auf-mieter-und-wohnsituation.js';
import post2140 from './posts/rente-politik-und-ihre-auswirkungen-auf-mieter-in-deutschland.js';
import post2141 from './posts/rente-und-altersarmut-was-mieter-in-deutschland-wissen-sollten.js';
import post2142 from './posts/rente-und-wohnen-finanzielle-engpasse-im-alter-vermeiden.js';
import post2143 from './posts/rente-und-wohnen-was-mieter-jetzt-wissen-sollten.js';
import post2144 from './posts/rente-und-wohnen-was-mieterinnen-im-alter-beachten-sollten.js';
import post2145 from './posts/rentenfinanzierung-in-deutschland-was-mieter-jetzt-wissen-sollten.js';
import post2146 from './posts/rentenkommission-und-wohnkosten-was-mieter-jetzt-wissen-sollten.js';
import post2147 from './posts/rentenlucke-und-wohnkosten-was-mieter-jetzt-wissen-sollten.js';
import post2148 from './posts/rentenstreit-und-wohnkosten-was-mieter-jetzt-wissen-sollten.js';
import post2149 from './posts/reparaciones-en-alquiler-como-proteger-tus-derechos-y-ahorrar.js';
import post2150 from './posts/reparaciones-en-alquiler-derechos-que-protegen-tu-bolsillo.js';
import post2151 from './posts/resiste-y-protege-tu-hogar-derechos-y-consejos-para-inquilinos-vulnerables.js';
import post2152 from './posts/responsabilidad-de-centros-educativos-en-conflictos-que-deben-saber-los-inquilin.js';
import post2153 from './posts/responsabilita-e-sicurezza-in-ospedale-cosa-sapere-come-inquilini.js';
import post2154 from './posts/revitalizacao-de-santarem-impactos-para-os-inquilinos-locais.js';
import post2155 from './posts/ricostruzione-mammaria-post-tumore-dimissione-in-24-ore.js';
import post2156 from './posts/riester-rente-und-altersvorsorge-was-mieter-wissen-sollten.js';
import post2157 from './posts/rigenerazione-urbana-e-affitti-cosa-cambia-per-gli-inquilini.js';
import post2158 from './posts/rinascere-dopo-la-crisi-storie-di-case-salute-e-resilienza.js';
import post2159 from './posts/risarcimenti-e-giustizia-cosa-significa-per-chi-vive-in-affitto.js';
import post2160 from './posts/risparmiare-energia-in-casa-consigli-pratici-per-inquilini.js';
import post2161 from './posts/ristrutturare-casa-come-aumentare-il-valore-e-migliorare-il-comfort.js';
import post2162 from './posts/ristrutturazione-alloggi-popolari-cosa-sapere-per-gli-inquilini.js';
import post2163 from './posts/ritrovamento-del-motorino-rubato-dopo-33-anni-una-storia-di-speranza-e-burocrazi.js';
import post2164 from './posts/roboter-im-wohnungsbau-chancen-fur-bezahlbares-wohnen.js';
import post2165 from './posts/ruido-en-comunidades-de-vecinos-derechos-y-obligaciones-segun-la-ley-de-propieda.js';
import post2166 from './posts/ruido-y-vivienda-derechos-ante-molestias-en-alquileres-en-espana.js';
import post2167 from './posts/sa-hanterar-du-bostadsbrist-och-hyrespress-i-sverige.js';
import post2168 from './posts/sa-paverkar-bostadskrisen-i-iran-och-varlden-svenska-hyresgaster.js';
import post2169 from './posts/sa-paverkar-hojt-bolanetak-bostadspriser-och-dig-som-hyresgast.js';
import post2170 from './posts/sa-paverkar-partiernas-bostadspolitik-unga-hyresgaster-i-sverige.js';
import post2171 from './posts/sa-paverkar-spaniens-nya-regler-bostadsbristen-lardomar-for-svenska-hyresgaster.js';
import post2172 from './posts/sa-paverkas-du-som-hyresgast-av-bostadsmarknadens-utmaningar.js';
import post2173 from './posts/sa-paverkas-hyresgaster-vid-oroligheter-och-hot-mot-bostader.js';
import post2174 from './posts/sa-upptacker-och-hanterar-du-ohyra-i-din-hyresratt.js';
import post2175 from './posts/sabes-como-afecta-el-boom-inmobiliario-a-tu-alquiler.js';
import post2176 from './posts/sabes-cual-es-el-barrio-mas-caro-de-sevilla-protegete-y-ahorra.js';
import post2177 from './posts/sabes-cuanto-de-tu-salario-va-a-la-vivienda-protege-tu-bolsillo.js';
import post2178 from './posts/sabes-cuanto-tiempo-tienes-para-quedarte-en-tu-alquiler-protege-tu-hogar.js';
import post2179 from './posts/sabes-que-arroz-debes-evitar-para-proteger-tu-salud-y-tu-bolsillo.js';
import post2180 from './posts/sabes-que-aun-no-multan-a-inmobiliarias-por-subir-alquileres-protege-tu-hogar.js';
import post2181 from './posts/sabes-que-hacienda-vigila-las-segundas-viviendas-protege-tu-alquiler.js';
import post2182 from './posts/sabes-que-pasa-si-venden-tu-piso-alquilado-protege-tus-derechos.js';
import post2183 from './posts/sabes-que-si-tu-casero-tiene-3-propiedades-no-pueden-desalojarte-facilmente.js';
import post2184 from './posts/sabias-que-a-partir-de-65-anos-donar-vivienda-puede-salir-sin-impuestos.js';
import post2185 from './posts/sabias-que-a-partir-de-65-anos-puedes-donar-tu-vivienda-sin-pagar-impuestos.js';
import post2186 from './posts/sabias-que-vivir-anos-en-alquiler-puede-hacerte-dueno.js';
import post2187 from './posts/salones-de-liria-y-tus-derechos-historia-proteccion-y-ahorro-en-alquiler.js';
import post2188 from './posts/salva-casa-nuove-tolleranze-per-immobili-e-impatto-sugli-inquilini.js';
import post2189 from './posts/san-francisco-de-paula-que-significa-para-inquilinos-vulnerables.js';
import post2190 from './posts/sanatorie-edilizie-storiche-cosa-cambia-per-gli-inquilini.js';
import post2191 from './posts/sanciones-a-propietarios-una-luz-para-inquilinos-vulnerables.js';
import post2192 from './posts/sanidad-y-vivienda-preocupaciones-reales-que-afectan-a-tu-alquiler.js';
import post2193 from './posts/sanierung-und-modernisierung-was-mieter-wissen-sollten.js';
import post2194 from './posts/sanierungsumlage-was-mieter-jetzt-wissen-sollten.js';
import post2195 from './posts/santa-casa-e-habitacao-acessivel-em-lisboa-o-que-muda-para-inquilinos.js';
import post2196 from './posts/schimmel-en-vocht-wat-te-doen-als-je-woning-tekortschiet.js';
import post2197 from './posts/schimmel-in-huurwoning-rechten-en-oplossingen-voor-huurders.js';
import post2198 from './posts/schlafkultur-und-wohnkomfort-mehr-luxus-im-schlafzimmer.js';
import post2199 from './posts/schlosswechsel-durch-vermieter-aussperrung-ist-unzulassig.js';
import post2200 from './posts/schwedens-rentensystem-lehren-fur-deutschlands-wohnungsmarkt.js';
import post2201 from './posts/sedie-ergonomiche-e-smart-working-guida-per-inquilini-italiani.js';
import post2202 from './posts/segundas-viviendas-y-alquiler-lo-que-debes-saber-para-protegerte.js';
import post2203 from './posts/seguridad-en-casa-protege-tu-vivienda-y-tus-derechos-como-inquilino.js';
import post2204 from './posts/seguridad-en-el-hogar-protege-tu-vivienda-y-tus-derechos-como-inquilino.js';
import post2205 from './posts/seguridad-en-el-hogar-que-hacer-tras-incidentes-violentos-cerca.js';
import post2206 from './posts/seguridad-en-sevilla-y-su-impacto-en-los-inquilinos-de-la-macarena.js';
import post2207 from './posts/seguridad-juridica-tu-mejor-defensa-como-inquilino-vulnerable.js';
import post2208 from './posts/seguridad-y-convivencia-riesgos-de-motos-sin-casco-en-barrios-vulnerables.js';
import post2209 from './posts/seguridad-y-derechos-como-protegerte-como-inquilino-vulnerable.js';
import post2210 from './posts/seguridad-y-derechos-en-viviendas-claves-para-inquilinos-en-espana.js';
import post2211 from './posts/seguro-de-alquiler-protege-tu-vivienda-y-tus-derechos-hoy.js';
import post2212 from './posts/seis-familias-en-maria-guerrero-luchan-y-ganan-guia-para-proteger-tu-alquiler.js';
import post2213 from './posts/seis-libros-para-reencontrar-esperanza-y-fuerza-en-tiempos-dificiles.js';
import post2214 from './posts/sentencia-del-supremo-un-respiro-para-inquilinos-vulnerables.js';
import post2215 from './posts/sentido-comun-para-aliviar-el-peso-del-alquiler-en-tu-vida.js';
import post2216 from './posts/separati-in-casa-e-annullamento-nozze-cosa-sapere.js';
import post2217 from './posts/sepulveda-83-como-proteger-tus-derechos-como-inquilino-vulnerable.js';
import post2218 from './posts/serielles-bauen-in-deutschland-chancen-und-grenzen-fur-bezahlbaren-wohnraum.js';
import post2219 from './posts/servicio-de-vivienda-en-la-sagra-apoyo-real-para-inquilinos-vulnerables.js';
import post2220 from './posts/setor-imobiliario-em-portugal-direitos-e-desafios-para-inquilinos.js';
import post2221 from './posts/sevilla-abre-camino-a-7-400-vpo-una-esperanza-para-inquilinos-vulnerables.js';
import post2222 from './posts/sevilla-crea-viviendas-sociales-para-proteger-a-inquilinos-vulnerables.js';
import post2223 from './posts/sevilla-excluida-de-ayudas-a-vivienda-que-significa-para-inquilinos.js';
import post2224 from './posts/sevilla-impulsa-viviendas-protegidas-una-oportunidad-para-inquilinos.js';
import post2225 from './posts/sevilla-lidera-construccion-que-significa-para-inquilinos-vulnerables.js';
import post2226 from './posts/sevilla-lidera-la-subida-del-alquiler-como-proteger-tus-derechos.js';
import post2227 from './posts/sevilla-menos-alquileres-mas-presion-protege-tus-derechos-hoy.js';
import post2228 from './posts/sevilla-supera-los-700-000-habitantes-impacto-en-el-mercado-de-alquiler.js';
import post2229 from './posts/sfratti-e-affitti-in-italia-cosa-devono-sapere-gli-inquilini.js';
import post2230 from './posts/sfratti-e-affitti-in-italia-cosa-serve-sapere-per-tutelarsi.js';
import post2231 from './posts/sfratti-e-affitti-in-italia-guida-pratica-per-gli-inquilini-sotto-pressione.js';
import post2232 from './posts/sfratti-e-caro-affitti-in-italia-come-difendersi-e-trovare-soluzioni-abitative.js';
import post2233 from './posts/sfratti-e-caro-affitti-in-italia-guida-pratica-per-gli-inquilini.js';
import post2234 from './posts/sfratti-e-diritti-degli-inquilini-in-italia-cosa-sapere-e-come-agire.js';
import post2235 from './posts/sfratti-e-mercato-immobiliare-in-italia-come-tutelare-gli-inquilini.js';
import post2236 from './posts/sfratto-e-affitti-in-italia-cosa-fare-in-situazioni-di-emergenza-abitativa.js';
import post2237 from './posts/shadwell-fire-survivors-navigating-homelessness-and-housing-rights.js';
import post2238 from './posts/si-un-heredero-okupa-tu-vivienda-como-proteger-tus-derechos.js';
import post2239 from './posts/sicurezza-abitativa-come-tutelarsi-da-episodi-di-violenza-in-casa.js';
import post2240 from './posts/sicurezza-abitativa-come-tutelarsi-in-quartieri-a-rischio.js';
import post2241 from './posts/sicurezza-abitativa-e-contesti-sociali-cosa-sapere-come-inquilini.js';
import post2242 from './posts/sicurezza-abitativa-e-diritto-all-abitazione-come-tutelarsi-in-tempi-difficili.js';
import post2243 from './posts/sicurezza-abitativa-e-minacce-come-tutelarsi-in-caso-di-intimidazioni.js';
import post2244 from './posts/sicurezza-abitativa-e-protezione-in-situazioni-di-crisi.js';
import post2245 from './posts/sicurezza-abitativa-e-territorio-cosa-fare-di-fronte-a-contesti-di-criminalita.js';
import post2246 from './posts/sicurezza-abitativa-e-tutela-inquilini-prevenire-e-affrontare-rischi.js';
import post2247 from './posts/sicurezza-e-abitare-cosa-fare-in-caso-di-emergenze-in-casa.js';
import post2248 from './posts/sicurezza-e-affitto-cosa-fare-in-caso-di-episodi-di-vandalismo-vicino-casa.js';
import post2249 from './posts/sicurezza-e-comunita-cosa-fare-se-assisti-a-reati-nel-tuo-quartiere.js';
import post2250 from './posts/sicurezza-e-convivenza-come-tutelarsi-in-caso-di-violenza-in-casa-e-nel-quartier.js';
import post2251 from './posts/sicurezza-in-casa-come-proteggersi-da-furti-e-intrusioni.js';
import post2252 from './posts/sicurezza-in-casa-cosa-fare-se-temi-aggressioni-o-violenze.js';
import post2253 from './posts/sicurezza-nell-abitazione-come-proteggersi-da-rischi-e-aggressioni.js';
import post2254 from './posts/simula-tu-declaracion-y-protege-tu-alquiler-guia-para-inquilinos-vulnerables.js';
import post2255 from './posts/sines-e-o-impacto-do-desenvolvimento-industrial-na-habitacao-local.js';
import post2256 from './posts/sinkende-geburtenzahlen-und-ihre-folgen-fur-den-wohnungsmarkt.js';
import post2257 from './posts/social-housing-ad-amsterdam-lezioni-per-l-italia-contro-il-caro-affitti.js';
import post2258 from './posts/social-housing-sales-amid-uk-housing-crisis-what-tenants-should-know.js';
import post2259 from './posts/solaranlagen-im-mietwohnungsmarkt-chancen-und-herausforderungen.js';
import post2260 from './posts/soluciones-reales-para-inquilinos-que-cambiara-en-tu-alquiler.js';
import post2261 from './posts/soluciones-urbanas-que-protegen-tu-alquiler-y-bolsillo.js';
import post2262 from './posts/sostegno-al-south-working-in-sicilia-cosa-cambia-per-gli-inquilini.js';
import post2263 from './posts/soziale-durchmischung-in-quartieren-chancen-und-herausforderungen.js';
import post2264 from './posts/soziale-durchmischung-in-wohnquartieren-chancen-und-herausforderungen.js';
import post2265 from './posts/sozialer-wohnungsbau-in-deutschland-chancen-und-herausforderungen-fur-mieter.js';
import post2266 from './posts/sozialer-wohnungsbau-in-munchen-herausforderungen-und-chancen.js';
import post2267 from './posts/sozialwohnungen-in-deutschland-was-mieter-jetzt-wissen-mussen.js';
import post2268 from './posts/spain-s-7bn-housing-plan-what-it-means-for-renters.js';
import post2269 from './posts/sport-e-spazi-pubblici-come-influiscono-sulla-qualita-abitativa-in-citta.js';
import post2270 from './posts/squatting-and-housing-rights-in-the-uk-what-tenants-need-to-know.js';
import post2271 from './posts/squatting-and-tenant-rights-in-the-uk-what-renters-should-know.js';
import post2272 from './posts/stadtebau-modernisieren-was-mieter-jetzt-wissen-mussen.js';
import post2273 from './posts/stadtleben-und-stress-wie-mieter-gesund-bleiben-konnen.js';
import post2274 from './posts/steigende-mieten-in-deutschland-was-mieter-jetzt-wissen-sollten.js';
import post2275 from './posts/steigende-mieten-und-wohnkosten-was-mieter-jetzt-wissen-mussen.js';
import post2276 from './posts/steigende-spitzenmieten-was-mieter-in-deutschland-jetzt-wissen-sollten.js';
import post2277 from './posts/stroomnetcapaciteit-drukt-op-woningbouw-en-huurmarkt.js';
import post2278 from './posts/studentenhuisvesting-meer-kamers-minder-studio-s-nodig.js';
import post2279 from './posts/stylish-coat-hooks-organize-your-home-with-functional-art.js';
import post2280 from './posts/subastas-de-inmuebles-publicos-que-significa-para-inquilinos-vulnerables.js';
import post2281 from './posts/sube-el-alquiler-como-proteger-tu-bolsillo-y-tus-derechos-hoy.js';
import post2282 from './posts/sube-el-alquiler-como-proteger-tus-derechos-y-ahorrar-hoy.js';
import post2283 from './posts/sube-la-compraventa-en-cordoba-lo-que-debes-saber-si-alquilas.js';
import post2284 from './posts/suben-las-ventas-de-vivienda-lo-que-debes-saber-como-inquilino-vulnerable.js';
import post2285 from './posts/suben-los-alquileres-como-proteger-tus-derechos-y-ahorrar-en-vivienda.js';
import post2286 from './posts/suben-los-precios-como-proteger-tu-alquiler-y-ahorrar-en-vivienda.js';
import post2287 from './posts/suben-los-precios-de-la-vivienda-protegida-guia-para-inquilinos-vulnerables.js';
import post2288 from './posts/subida-das-taxas-de-juro-no-credito-a-habitacao-em-portugal.js';
import post2289 from './posts/subida-de-alquiler-de-golpe-como-proteger-tus-derechos-hoy.js';
import post2290 from './posts/subida-de-precos-na-margem-sul-o-que-muda-para-inquilinos.js';
import post2291 from './posts/subida-del-alquiler-como-proteger-tus-derechos-y-ahorrar-hoy.js';
import post2292 from './posts/subida-del-gasoil-y-su-impacto-en-tu-alquiler-protege-tu-bolsillo.js';
import post2293 from './posts/subida-del-precio-en-sevilla-como-proteger-tu-alquiler-hoy.js';
import post2294 from './posts/subida-del-smi-que-significa-para-inquilinos-y-como-proteger-tu-bolsillo.js';
import post2295 from './posts/subida-dos-precos-das-casas-em-portugal-impacto-para-inquilinos.js';
import post2296 from './posts/subida-dos-precos-das-casas-em-portugal-o-que-os-inquilinos-devem-saber.js';
import post2297 from './posts/subida-historica-del-alquiler-en-galicia-como-protegerte-y-ahorrar.js';
import post2298 from './posts/subida-inesperada-del-alquiler-protege-tu-bolsillo-y-tus-derechos.js';
import post2299 from './posts/subida-inesperada-del-alquiler-protege-tus-derechos-y-ahorra.js';
import post2300 from './posts/subira-mas-el-alquiler-como-protegerte-y-ahorrar-en-2026.js';
import post2301 from './posts/subiran-los-alquileres-en-2026-protege-tu-vivienda-y-ahorra.js';
import post2302 from './posts/subiran-los-precios-del-alquiler-en-2026-lo-que-debes-saber.js';
import post2303 from './posts/subiran-mas-los-alquileres-protege-tu-hogar-en-2026.js';
import post2304 from './posts/suenas-con-tu-primera-vivienda-ayudas-reales-para-lograrlo.js';
import post2305 from './posts/superbonus-110-nuove-verifiche-e-cosa-significa-per-gli-inquilini.js';
import post2306 from './posts/sur-de-madrid-oportunidades-para-inquilinos-en-transformacion-urbana.js';
import post2307 from './posts/swiss-homeowners-what-the-eigenmietwert-abolition-means-for-you.js';
import post2308 from './posts/swiss-imputed-rental-value-tax-ends-in-2029-what-tenants-should-know.js';
import post2309 from './posts/swiss-property-market-growth-what-tenants-should-know-in-2025.js';
import post2310 from './posts/swiss-real-estate-stocks-soar-what-tenants-should-know.js';
import post2311 from './posts/swiss-renters-and-wealth-what-seniors-growing-assets-mean-for-you.js';
import post2312 from './posts/switzerland-boosts-funds-for-non-profit-housing-projects.js';
import post2313 from './posts/switzerland-rent-rise-what-tenants-need-to-know.js';
import post2314 from './posts/switzerland-s-13th-ahv-pension-what-renters-should-know.js';
import post2315 from './posts/switzerland-s-disability-insurance-crisis-what-renters-should-know.js';
import post2316 from './posts/sylt-immobilienpreise-sinken-was-mieter-jetzt-wissen-sollten.js';
import post2317 from './posts/tasa-de-basuras-en-tu-alquiler-protege-tu-bolsillo-y-tus-derechos.js';
import post2318 from './posts/tasa-de-basuras-y-alquiler-lo-que-debes-saber-para-proteger-tu-bolsillo.js';
import post2319 from './posts/tasadores-en-huelga-que-significa-para-los-inquilinos-vulnerables.js';
import post2320 from './posts/tasadores-en-huelga-que-significa-para-tu-alquiler-y-como-protegerte.js';
import post2321 from './posts/taxa-de-esforco-no-credito-a-habitacao-o-que-muda-para-os-inquilinos.js';
import post2322 from './posts/taxa-de-esforco-no-credito-habitacao-reduzida-impacto-para-os-inquilinos.js';
import post2323 from './posts/te-pueden-echar-de-tu-piso-social-protege-tu-hogar-hoy.js';
import post2324 from './posts/te-quieren-desalojar-protege-tus-derechos-y-ahorra-en-alquiler.js';
import post2325 from './posts/techos-en-mal-estado-y-alquiler-como-proteger-tus-derechos.js';
import post2326 from './posts/telefono-047-tu-nueva-herramienta-para-defender-tus-derechos-como-inquilino.js';
import post2327 from './posts/teletrabajo-y-vivienda-como-proteger-tu-alquiler-y-ahorrar-hoy.js';
import post2328 from './posts/terremoto-a-massa-carrara-impatto-sugli-inquilini-e-consigli-pratici.js';
import post2329 from './posts/terremoto-in-toscana-diritti-degli-inquilini-e-sicurezza-abitativa.js';
import post2330 from './posts/test-casero-para-detectar-deterioro-cognitivo-protege-tu-salud-y-tu-hogar.js';
import post2331 from './posts/testamenteiro-e-herancas-indivisas-o-que-muda-para-os-inquilinos.js';
import post2332 from './posts/tienes-dos-pagadores-como-ahorrar-en-tu-declaracion-y-proteger-tu-alquiler.js';
import post2333 from './posts/tienes-dudas-sobre-tu-alquiler-protege-tu-hogar-y-ahorra-hoy.js';
import post2334 from './posts/tiny-houses-in-heidelberg-chancen-und-grenzen-fur-mieter.js';
import post2335 from './posts/tiny-houses-innovative-antworten-auf-wohnungsnot.js';
import post2336 from './posts/toison-de-oro-y-la-vivienda-derechos-y-proteccion-para-inquilinos.js';
import post2337 from './posts/toledo-crece-en-viviendas-que-significa-para-inquilinos-vulnerables.js';
import post2338 from './posts/toledo-impulsa-viviendas-asequibles-que-significa-para-ti.js';
import post2339 from './posts/top-european-cities-for-rental-yields-in-2026-what-tenants-should-know.js';
import post2340 from './posts/torre-arenal-y-tu-alquiler-que-debes-saber-y-como-protegerte.js';
import post2341 from './posts/trabalho-social-e-apoios-o-que-os-inquilinos-precisam-saber.js';
import post2342 from './posts/transformacao-digital-no-imobiliario-impacto-para-inquilinos-em-portugal.js';
import post2343 from './posts/transformar-edificios-en-desuso-una-oportunidad-para-inquilinos-vulnerables.js';
import post2344 from './posts/transparencia-en-vivienda-como-protegerte-y-ahorrar-en-alquiler.js';
import post2345 from './posts/transparencia-salarial-e-impacto-na-habitacao-em-portugal.js';
import post2346 from './posts/trasteros-en-madrid-una-carga-mas-para-el-inquilino-vulnerable.js';
import post2347 from './posts/truffe-negli-hotel-di-lusso-cosa-fare-se-l-affitto-non-viene-pagato.js';
import post2348 from './posts/tu-alquiler-consume-casi-todo-protege-tus-derechos-y-ahorra-hoy.js';
import post2349 from './posts/tu-alquiler-consume-casi-todo-tu-sueldo-protege-tu-hogar-hoy.js';
import post2350 from './posts/tu-alquiler-consume-casi-todo-tu-sueldo-protege-tus-derechos-hoy.js';
import post2351 from './posts/tu-alquiler-consume-tu-vida-protege-tus-derechos-y-ahorra-hoy.js';
import post2352 from './posts/tu-alquiler-no-subio-en-5-anos-descubre-que-hacer-para-protegerte.js';
import post2353 from './posts/tu-alquiler-puede-renovarse-3-anos-mas-protege-tus-derechos-hoy.js';
import post2354 from './posts/tu-alquiler-se-come-tu-sueldo-protege-tus-derechos-y-ahorra.js';
import post2355 from './posts/tu-alquiler-seguro-hasta-5-anos-protege-tu-hogar-y-tus-derechos.js';
import post2356 from './posts/tu-casero-puede-subir-el-alquiler-sin-avisar-lo-que-debes-saber.js';
import post2357 from './posts/tu-casero-quiere-cambiar-el-color-de-la-fachada-protege-tus-derechos.js';
import post2358 from './posts/tu-contrato-de-alquiler-puede-renovarse-3-anos-mas-lo-que-debes-saber.js';
import post2359 from './posts/tu-derecho-a-la-vivienda-como-protegerte-y-ahorrar-ante-la-crisis-del-alquiler.js';
import post2360 from './posts/tu-derecho-a-la-vivienda-lo-que-debes-saber-hoy-como-inquilino.js';
import post2361 from './posts/tu-derecho-a-quedarte-en-casa-estabilidad-para-inquilinos-vulnerables.js';
import post2362 from './posts/tu-derecho-a-quedarte-en-casa-protege-tu-alquiler-y-ahorra.js';
import post2363 from './posts/tu-derecho-a-quedarte-estabilidad-y-proteccion-en-el-alquiler.js';
import post2364 from './posts/tu-derecho-a-quedarte-nueva-ley-protege-a-inquilinos-vulnerables.js';
import post2365 from './posts/tu-derecho-a-quedarte-proteccion-real-para-inquilinos-vulnerables.js';
import post2366 from './posts/tu-derecho-a-un-hogar-digno-reparaciones-y-proteccion-en-el-alquiler.js';
import post2367 from './posts/tu-derecho-a-un-hogar-seguro-como-afecta-la-nueva-ley-de-alquileres.js';
import post2368 from './posts/tu-hijo-nace-debiendo-como-afecta-la-deuda-publica-al-alquiler.js';
import post2369 from './posts/tu-hogar-seguro-como-protegerte-ante-impagos-y-desahucios.js';
import post2370 from './posts/tu-hogar-seguro-nuevos-derechos-para-inquilinos-en-espana.js';
import post2371 from './posts/tu-perro-ladra-y-molesta-derechos-y-soluciones-para-inquilinos.js';
import post2372 from './posts/tu-vivienda-esta-a-nombre-de-un-fallecido-protege-tus-derechos-como-inquilino.js';
import post2373 from './posts/tu-vivienda-tus-derechos-protege-tu-hogar-y-ahorra-en-alquiler.js';
import post2374 from './posts/turismo-e-habitacao-impactos-da-instabilidade-global-nos-inquilinos-em-portugal.js';
import post2375 from './posts/turismo-masivo-y-alquiler-como-proteger-tu-hogar-y-tu-bolsillo.js';
import post2376 from './posts/turning-old-barns-into-unique-homes-inspiration-for-swiss-tenants.js';
import post2377 from './posts/tutela-degli-inquilini-sotto-pressione-abitativa-in-italia.js';
import post2378 from './posts/tutela-dei-disabili-e-uso-improprio-dei-fondi-cosa-sapere.js';
import post2379 from './posts/tweede-kamer-debatteert-over-woningtekort-wat-betekent-dit-voor-huurders.js';
import post2380 from './posts/u-bahn-larm-in-munchen-was-mieter-jetzt-wissen-sollten.js';
import post2381 from './posts/uk-housing-market-challenges-amid-rising-mortgage-rates.js';
import post2382 from './posts/uk-property-market-slump-what-renters-need-to-know.js';
import post2383 from './posts/un-mismo-inmueble-un-solo-impuesto-protege-tus-derechos-como-inquilino.js';
import post2384 from './posts/una-familia-una-casa-protege-tu-derecho-a-un-alquiler-justo.js';
import post2385 from './posts/understanding-and-navigating-the-eu-housing-crisis.js';
import post2386 from './posts/understanding-bristol-s-tiny-flats-amid-housing-crisis.js';
import post2387 from './posts/understanding-disability-politics-and-housing-rights-in-the-uk.js';
import post2388 from './posts/understanding-europe-s-housing-crisis-what-renters-need-to-know.js';
import post2389 from './posts/understanding-european-housing-challenges-and-tenant-rights.js';
import post2390 from './posts/understanding-housing-pressures-amid-political-campaigns-in-europe.js';
import post2391 from './posts/understanding-landlord-power-in-uk-property-what-tenants-should-know.js';
import post2392 from './posts/understanding-lloyds-homebuying-tasting-menu-amid-housing-pressures.js';
import post2393 from './posts/understanding-local-council-spending-inspections-and-what-it-means-for-renters.js';
import post2394 from './posts/understanding-london-s-housing-crisis-impact-on-tenants.js';
import post2395 from './posts/understanding-media-funding-why-it-matters-for-tenants.js';
import post2396 from './posts/understanding-mietkautionsversicherungen-in-switzerland.js';
import post2397 from './posts/understanding-pension-choices-and-their-impact-on-swiss-renters.js';
import post2398 from './posts/understanding-property-ownership-complexities-in-switzerland.js';
import post2399 from './posts/understanding-rent-control-plans-and-what-they-mean-for-uk-tenants.js';
import post2400 from './posts/understanding-rent-controls-and-council-housing-in-the-uk.js';
import post2401 from './posts/understanding-rent-controls-and-tenant-rights-in-the-uk.js';
import post2402 from './posts/understanding-rent-controls-and-what-they-mean-for-uk-tenants.js';
import post2403 from './posts/understanding-revenge-evictions-protecting-your-rights-as-a-tenant.js';
import post2404 from './posts/understanding-rising-uk-property-taxes-what-renters-need-to-know.js';
import post2405 from './posts/understanding-rogue-landlords-and-your-rights-in-uk-renting.js';
import post2406 from './posts/understanding-ryanair-s-family-seating-fee-and-your-rights.js';
import post2407 from './posts/understanding-scotland-s-housing-legacy-and-tenant-rights.js';
import post2408 from './posts/understanding-smarter-regulation-in-uk-housing-what-tenants-need-to-know.js';
import post2409 from './posts/understanding-social-housing-and-what-it-means-for-tenants.js';
import post2410 from './posts/understanding-squatters-rights-and-your-rental-security-in-the-uk.js';
import post2411 from './posts/understanding-squatters-rights-and-your-tenancy-in-the-uk.js';
import post2412 from './posts/understanding-squatters-rights-in-the-uk-a-guide-for-tenants.js';
import post2413 from './posts/understanding-squatters-rights-in-uk-housing-what-tenants-should-know.js';
import post2414 from './posts/understanding-squatting-and-your-rights-as-a-tenant-in-the-uk.js';
import post2415 from './posts/understanding-squatting-and-your-rights-as-a-uk-tenant.js';
import post2416 from './posts/understanding-squatting-rights-and-eviction-in-uk-housing.js';
import post2417 from './posts/understanding-squatting-rights-and-risks-in-uk-housing.js';
import post2418 from './posts/understanding-tenant-complaints-and-corrections-in-uk-housing.js';
import post2419 from './posts/understanding-tenant-rights-amid-housing-pressures-in-the-uk.js';
import post2420 from './posts/understanding-tenant-rights-and-housing-options-in-the-uk.js';
import post2421 from './posts/understanding-the-13th-ahv-pension-and-its-impact-on-swiss-renters.js';
import post2422 from './posts/understanding-the-13th-ahv-pension-debate-what-renters-should-know.js';
import post2423 from './posts/understanding-the-burnham-premium-and-its-impact-on-uk-renters.js';
import post2424 from './posts/understanding-the-eu-s-housing-plan-what-it-means-for-tenants.js';
import post2425 from './posts/understanding-the-eu-s-new-housing-plan-what-it-means-for-tenants.js';
import post2426 from './posts/understanding-the-global-housing-crisis-what-it-means-for-european-renters.js';
import post2427 from './posts/understanding-the-impact-of-pension-schemes-bill-on-uk-renters.js';
import post2428 from './posts/understanding-the-renters-rights-act-and-its-impact-on-uk-tenants.js';
import post2429 from './posts/understanding-the-renters-rights-act-what-tenants-need-to-know.js';
import post2430 from './posts/understanding-the-renters-rights-act-what-uk-tenants-need-to-know.js';
import post2431 from './posts/understanding-the-uk-s-digital-tax-changes-for-landlords.js';
import post2432 from './posts/understanding-uk-house-price-trends-and-what-they-mean-for-renters.js';
import post2433 from './posts/understanding-uk-housing-pressures-what-tenants-need-to-know.js';
import post2434 from './posts/understanding-uk-renters-growing-frustration-with-landlords.js';
import post2435 from './posts/understanding-uk-waterway-housing-rights-risks-for-boat-dwellers.js';
import post2436 from './posts/understanding-your-rights-against-illegal-eviction-and-squatting.js';
import post2437 from './posts/understanding-your-rights-against-squatters-in-uk-rental-homes.js';
import post2438 from './posts/understanding-your-rights-amid-europe-s-housing-challenges.js';
import post2439 from './posts/understanding-your-rights-amid-housing-pressures-in-the-uk.js';
import post2440 from './posts/understanding-your-rights-amid-the-uk-housing-crisis.js';
import post2441 from './posts/understanding-your-rights-amid-uk-housing-challenges.js';
import post2442 from './posts/understanding-your-rights-and-privacy-as-a-tenant-in-the-uk.js';
import post2443 from './posts/understanding-your-rights-as-a-tenant-in-the-uk-housing-crisis.js';
import post2444 from './posts/understanding-your-rights-eviction-and-squatters-in-uk-housing.js';
import post2445 from './posts/understanding-your-rights-eviction-and-squatting-in-the-uk.js';
import post2446 from './posts/understanding-your-rights-eviction-and-squatting-in-uk-housing.js';
import post2447 from './posts/understanding-your-rights-eviction-and-squatting-in-uk-rental-homes.js';
import post2448 from './posts/understanding-your-rights-eviction-squatting-and-renting-in-the-uk.js';
import post2449 from './posts/understanding-your-rights-illegal-evictions-and-squatting-in-the-uk.js';
import post2450 from './posts/understanding-your-rights-navigating-housing-challenges-in-the-uk.js';
import post2451 from './posts/understanding-your-rights-rent-and-housing-challenges-in-europe.js';
import post2452 from './posts/understanding-your-rights-squatters-and-private-renting-in-the-uk.js';
import post2453 from './posts/understanding-your-rights-squatters-and-tenants-in-uk-housing.js';
import post2454 from './posts/understanding-your-rights-squatting-and-eviction-in-uk-rental-housing.js';
import post2455 from './posts/understanding-your-rights-terms-conditions-in-renting.js';
import post2456 from './posts/understanding-your-rights-when-facing-eviction-or-squatting.js';
import post2457 from './posts/understanding-your-rights-when-facing-squatters-in-the-uk.js';
import post2458 from './posts/understanding-your-rights-when-facing-squatters-in-your-rental-property.js';
import post2459 from './posts/understanding-zurich-s-housing-challenges-what-tenants-should-know.js';
import post2460 from './posts/understanding-zurich-s-housing-crisis-what-tenants-need-to-know.js';
import post2461 from './posts/understanding-zurich-s-housing-protection-initiative-and-its-impact-on-tenants.js';
import post2462 from './posts/ungewohnliches-wohnen-leben-auf-verkehrsinseln-und-alternative-wohnformen.js';
import post2463 from './posts/unidad-antidesahucios-en-cataluna-tu-derecho-a-proteger-tu-hogar.js';
import post2464 from './posts/unite-to-fight-britain-s-housing-crisis-what-tenants-need-to-know.js';
import post2465 from './posts/untermiete-nach-auszug-rechte-der-mitmieter-starken.js';
import post2466 from './posts/unwirksame-kundigung-durch-vermieter-rechte-und-pflichten.js';
import post2467 from './posts/urbanismo-sostenible-clave-para-proteger-tu-alquiler-y-ahorrar.js';
import post2468 from './posts/urbanizacao-de-renda-acessivel-nas-olaias-em-lisboa-o-que-muda-para-os-inquilino.js';
import post2469 from './posts/usera-y-el-alquiler-como-proteger-tus-derechos-y-ahorrar-hoy.js';
import post2470 from './posts/uw-rechten-bij-ontruiming-en-kraak-in-nederland.js';
import post2471 from './posts/vale-la-pena-alquilar-un-trastero-guia-para-inquilinos-que-buscan-ahorrar.js';
import post2472 from './posts/vale-la-pena-gastar-en-loteria-de-navidad-guia-para-inquilinos-vulnerables.js';
import post2473 from './posts/valencia-amplia-acceso-a-vivienda-asequible-clave-para-inquilinos-vulnerables.js';
import post2474 from './posts/valencia-amplia-el-alquiler-asequible-una-oportunidad-para-inquilinos-vulnerable.js';
import post2475 from './posts/valencia-impulsa-viviendas-asequibles-clave-para-inquilinos-vulnerables.js';
import post2476 from './posts/valor-catastral-y-alquiler-como-proteger-tu-bolsillo-y-derechos.js';
import post2477 from './posts/vapeo-y-vivienda-proteger-tu-salud-y-derechos-como-inquilino.js';
import post2478 from './posts/variazione-catastale-per-pannelli-e-pompe-di-calore-cosa-sapere.js';
import post2479 from './posts/vecinos-contra-pisos-turisticos-protege-tu-hogar-y-tu-bolsillo.js';
import post2480 from './posts/vecinos-en-riesgo-protege-tu-hogar-ante-ventas-y-especulacion.js';
import post2481 from './posts/veilig-online-wat-huurders-en-hun-kinderen-moeten-weten.js';
import post2482 from './posts/veilig-wonen-in-onrustige-tijden-wat-huurders-moeten-weten.js';
import post2483 from './posts/veilig-wonen-in-onzekere-tijden-wat-huurders-moeten-weten.js';
import post2484 from './posts/veilig-wonen-in-tijden-van-conflict-wat-huurders-moeten-weten.js';
import post2485 from './posts/veilig-wonen-na-plofkraak-wat-huurders-moeten-weten.js';
import post2486 from './posts/veilig-wonen-onder-druk-bij-spanningen-in-belfast.js';
import post2487 from './posts/veilig-wonen-onder-druk-omgaan-met-spanningen-in-je-buurt.js';
import post2488 from './posts/veilig-wonen-onder-druk-wat-huurders-kunnen-leren-van-belfast.js';
import post2489 from './posts/veilig-wonen-onder-druk-wat-te-doen-bij-spanningen-in-je-buurt.js';
import post2490 from './posts/veilig-wonen-tijdens-crisistijden-wat-huurders-moeten-weten.js';
import post2491 from './posts/veilig-wonen-wat-huurders-kunnen-leren-van-beveiligingsincidenten.js';
import post2492 from './posts/veilig-wonen-wat-te-doen-bij-incidenten-in-je-woning.js';
import post2493 from './posts/veilig-wonen-wat-te-doen-bij-intimidatie-en-vandalisme-aan-je-woning.js';
import post2494 from './posts/veiligheid-en-woningbescherming-in-onzekere-tijden-in-nederland.js';
import post2495 from './posts/veiligheid-in-huis-wat-huurders-moeten-weten-na-incidenten.js';
import post2496 from './posts/venda-de-terrenos-publicos-e-impacto-no-mercado-habitacional-em-portugal.js';
import post2497 from './posts/venda-dos-ativos-do-boavista-fc-e-impacto-na-habitacao-local.js';
import post2498 from './posts/venden-tu-piso-protege-tus-derechos-y-evita-el-desahucio-inesperado.js';
import post2499 from './posts/ventajas-fiscales-y-proteccion-para-inquilinos-en-municipios-medianos.js';
import post2500 from './posts/verduurzaming-gaat-sneller-bij-rijke-huiseigenaren.js';
import post2501 from './posts/verduurzaming-in-nederland-kansen-en-uitdagingen-voor-huurders.js';
import post2502 from './posts/verhuizen-door-klimaat-wat-huurders-in-nederland-moeten-weten.js';
import post2503 from './posts/verhuizen-door-klimaat-wat-huurders-in-nl-moeten-weten.js';
import post2504 from './posts/verwaarlozing-huisdieren-in-huurwoningen-wat-huurders-moeten-weten.js';
import post2505 from './posts/verwalterwechsel-in-der-weg-was-mieter-und-eigentumer-wissen-sollten.js';
import post2506 from './posts/viajar-barato-y-proteger-tu-alquiler-claves-para-inquilinos-vulnerables.js';
import post2507 from './posts/victoria-en-portugal-lecciones-para-proteger-tu-alquiler-en-espana.js';
import post2508 from './posts/victoria-vecinal-como-proteger-tu-alquiler-frente-a-los-pisos-turisticos.js';
import post2509 from './posts/violencia-machista-y-vivienda-como-afecta-a-inquilinos-y-comunidades.js';
import post2510 from './posts/violenza-domestica-e-sicurezza-abitativa-cosa-fare-in-situazioni-di-emergenza.js';
import post2511 from './posts/violenza-domestica-e-tutela-abitativa-cosa-fare-in-caso-di-aggressione.js';
import post2512 from './posts/visibilizar-para-proteger-lecciones-para-inquilinos-vulnerables.js';
import post2513 from './posts/visita-tu-piso-con-confianza-consejos-para-inquilinos-vulnerables.js';
import post2514 from './posts/vitoria-de-setubal-aprova-projeto-imobiliario-para-reduzir-divida.js';
import post2515 from './posts/vives-de-alquiler-como-proteger-tus-derechos-y-ahorrar-hoy.js';
import post2516 from './posts/vives-en-casa-de-tu-pareja-protege-tus-derechos-y-ahorra-en-vivienda.js';
import post2517 from './posts/vives-en-casa-de-tus-padres-protege-tu-derecho-tras-su-fallecimiento.js';
import post2518 from './posts/vives-en-casa-heredada-protege-tus-derechos-y-ahorra-en-alquiler.js';
import post2519 from './posts/vives-en-cordoba-protege-tu-alquiler-ante-subidas-y-abusos.js';
import post2520 from './posts/vives-en-zona-tensionada-protege-tu-alquiler-y-ahorra-hoy.js';
import post2521 from './posts/vives-gratis-en-casa-de-tus-padres-lo-que-hacienda-puede-exigirte.js';
import post2522 from './posts/vives-pagando-demasiado-protege-tus-derechos-y-ahorra-en-alquiler.js';
import post2523 from './posts/vivienda-a-nombre-de-fallecido-que-debes-saber-como-inquilino.js';
import post2524 from './posts/vivienda-accesible-casas-prefabricadas-una-opcion-real-para-inquilinos.js';
import post2525 from './posts/vivienda-accesible-como-las-casas-prefabricadas-pueden-aliviar-tu-alquiler.js';
import post2526 from './posts/vivienda-asequible-casas-prefabricadas-una-opcion-para-inquilinos-vulnerables.js';
import post2527 from './posts/vivienda-asequible-casas-prefabricadas-y-como-proteger-tus-derechos.js';
import post2528 from './posts/vivienda-asequible-claves-para-inquilinos-que-luchan-con-el-alquiler.js';
import post2529 from './posts/vivienda-asequible-en-andalucia-una-esperanza-para-inquilinos-vulnerables.js';
import post2530 from './posts/vivienda-asequible-en-la-cataluna-rural-una-oportunidad-para-inquilinos-vulnerab.js';
import post2531 from './posts/vivienda-asequible-en-madrid-una-oportunidad-real-para-inquilinos-vulnerables.js';
import post2532 from './posts/vivienda-asequible-en-sevilla-esperanza-para-inquilinos-vulnerables.js';
import post2533 from './posts/vivienda-asequible-en-sevilla-guia-para-inquilinos-vulnerables.js';
import post2534 from './posts/vivienda-asequible-o-engano-protege-tus-derechos-como-inquilino.js';
import post2535 from './posts/vivienda-asequible-una-luz-para-inquilinos-vulnerables.js';
import post2536 from './posts/vivienda-asequible-una-oportunidad-real-para-inquilinos-vulnerables.js';
import post2537 from './posts/vivienda-cara-en-espana-como-proteger-tus-derechos-y-ahorrar-siendo-inquilino.js';
import post2538 from './posts/vivienda-cara-y-construccion-estancada-guia-para-inquilinos-vulnerables.js';
import post2539 from './posts/vivienda-de-lujo-en-madrid-que-significa-para-los-inquilinos-vulnerables.js';
import post2540 from './posts/vivienda-de-lujo-en-sevilla-que-significa-para-los-inquilinos-vulnerables.js';
import post2541 from './posts/vivienda-de-lujo-en-sevilla-y-la-realidad-del-inquilino-vulnerable.js';
import post2542 from './posts/vivienda-de-lujo-y-alquiler-como-proteger-tus-derechos-y-ahorrar.js';
import post2543 from './posts/vivienda-digna-como-proteger-tus-derechos-y-ahorrar-en-alquiler.js';
import post2544 from './posts/vivienda-digna-como-proteger-tus-derechos-y-evitar-desahucios.js';
import post2545 from './posts/vivienda-digna-derechos-y-soluciones-para-inquilinos-vulnerables.js';
import post2546 from './posts/vivienda-digna-y-asequible-un-sueno-posible-para-inquilinos.js';
import post2547 from './posts/vivienda-en-2026-como-protegerte-y-ahorrar-siendo-inquilino.js';
import post2548 from './posts/vivienda-en-andalucia-lo-que-deben-saber-los-inquilinos-vulnerables.js';
import post2549 from './posts/vivienda-en-andalucia-oportunidades-y-derechos-para-inquilinos-vulnerables.js';
import post2550 from './posts/vivienda-en-andalucia-que-significa-para-ti-como-inquilino.js';
import post2551 from './posts/vivienda-en-canarias-como-afecta-la-subida-a-los-inquilinos-vulnerables.js';
import post2552 from './posts/vivienda-en-castilla-la-mancha-claves-para-proteger-a-inquilinos-vulnerables.js';
import post2553 from './posts/vivienda-en-castilla-la-mancha-nuevas-ayudas-que-pueden-cambiar-tu-alquiler.js';
import post2554 from './posts/vivienda-en-castilla-la-mancha-que-significa-para-ti-como-inquilino.js';
import post2555 from './posts/vivienda-en-cataluna-2026-protege-tu-alquiler-y-ahorra-con-estos-consejos.js';
import post2556 from './posts/vivienda-en-crisis-como-proteger-tus-derechos-como-inquilino-vulnerable.js';
import post2557 from './posts/vivienda-en-crisis-como-proteger-tus-derechos-y-ahorrar-en-alquiler.js';
import post2558 from './posts/vivienda-en-espana-claves-para-protegerte-y-ahorrar-en-alquiler.js';
import post2559 from './posts/vivienda-en-espana-como-proteger-tus-derechos-y-ahorrar-en-alquiler.js';
import post2560 from './posts/vivienda-en-espana-como-proteger-tus-derechos-y-ahorrar-siendo-inquilino.js';
import post2561 from './posts/vivienda-en-espana-derechos-y-retos-para-inquilinos-bajo-presion.js';
import post2562 from './posts/vivienda-en-espana-que-significa-compartir-piso-en-2055.js';
import post2563 from './posts/vivienda-en-espana-que-significa-el-choque-psoe-sumar-para-ti.js';
import post2564 from './posts/vivienda-en-espana-que-significa-para-los-inquilinos-vulnerables.js';
import post2565 from './posts/vivienda-en-europa-como-proteger-tus-derechos-y-ahorrar-en-alquiler.js';
import post2566 from './posts/vivienda-en-madrid-como-afecta-a-los-inquilinos-vulnerables-y-como-protegerte.js';
import post2567 from './posts/vivienda-en-madrid-como-proteger-tus-derechos-y-ahorrar-en-alquiler.js';
import post2568 from './posts/vivienda-en-pueblos-como-san-pedro-manrique-que-derechos-y-soluciones-tienes.js';
import post2569 from './posts/vivienda-en-sevilla-claves-para-inquilinos-ante-nuevos-pisos-caros.js';
import post2570 from './posts/vivienda-en-sevilla-como-protegerte-y-ahorrar-frente-a-precios-altos.js';
import post2571 from './posts/vivienda-en-sevilla-como-protegerte-y-ahorrar-siendo-inquilino.js';
import post2572 from './posts/vivienda-en-sevilla-que-significan-los-nuevos-duplex-para-inquilinos-vulnerables.js';
import post2573 from './posts/vivienda-en-tension-como-proteger-tus-derechos-y-ahorrar-en-alquiler.js';
import post2574 from './posts/vivienda-en-vitoria-como-el-urbanismo-sostenible-protege-tus-derechos.js';
import post2575 from './posts/vivienda-oficial-y-alquiler-lo-que-debes-saber-para-protegerte.js';
import post2576 from './posts/vivienda-propia-guia-para-inquilinos-que-luchan-con-el-alquiler.js';
import post2577 from './posts/vivienda-protegida-clave-para-inquilinos-con-bajos-ingresos.js';
import post2578 from './posts/vivienda-protegida-en-andalucia-esperanza-y-derechos-para-inquilinos-vulnerables.js';
import post2579 from './posts/vivienda-protegida-en-andalucia-que-significa-para-inquilinos-vulnerables.js';
import post2580 from './posts/vivienda-protegida-en-andalucia-que-significa-para-ti-como-inquilino.js';
import post2581 from './posts/vivienda-protegida-en-espana-realidad-o-esperanza-para-inquilinos.js';
import post2582 from './posts/vivienda-protegida-en-vigo-una-luz-para-inquilinos-vulnerables.js';
import post2583 from './posts/vivienda-protegida-protege-realmente-a-los-inquilinos-vulnerables.js';
import post2584 from './posts/vivienda-protegida-que-implica-para-inquilinos-vulnerables.js';
import post2585 from './posts/vivienda-protegida-una-esperanza-real-para-inquilinos-vulnerables.js';
import post2586 from './posts/vivienda-publica-clave-para-proteger-a-inquilinos-vulnerables.js';
import post2587 from './posts/vivienda-publica-en-alicante-lo-que-debes-saber-para-protegerte.js';
import post2588 from './posts/vivienda-publica-en-alicante-que-significa-para-ti-como-inquilino.js';
import post2589 from './posts/vivienda-publica-en-valencia-prioridad-para-vecinos-y-proteccion-para-inquilinos.js';
import post2590 from './posts/vivienda-publica-innovadora-esperanza-para-inquilinos-vulnerables.js';
import post2591 from './posts/vivienda-publica-para-jovenes-una-oportunidad-para-inquilinos-vulnerables.js';
import post2592 from './posts/vivienda-publica-una-luz-para-inquilinos-que-destinan-casi-todo-su-sueldo-al-alq.js';
import post2593 from './posts/vivienda-publica-y-alquiler-claves-para-protegerte-y-ahorrar.js';
import post2594 from './posts/vivienda-publica-y-alquiler-protege-tus-derechos-y-ahorra-hoy.js';
import post2595 from './posts/vivienda-publica-y-derechos-clave-para-inquilinos-vulnerables.js';
import post2596 from './posts/vivienda-publica-y-derechos-que-debe-saber-todo-inquilino.js';
import post2597 from './posts/vivienda-rural-una-oportunidad-para-inquilinos-que-sufren-alquileres-altos.js';
import post2598 from './posts/vivienda-rural-una-oportunidad-para-inquilinos-vulnerables.js';
import post2599 from './posts/vivienda-segura-como-protegerte-tras-derrumbes-y-otros-riesgos.js';
import post2600 from './posts/vivienda-segura-derechos-y-consejos-para-inquilinos-vulnerables.js';
import post2601 from './posts/vivienda-segura-protege-tus-derechos-y-ahorra-en-alquiler.js';
import post2602 from './posts/vivienda-segura-y-derechos-claros-para-inquilinos-vulnerables.js';
import post2603 from './posts/vivienda-segura-y-derechos-protegerse-ante-riesgos-y-abusos.js';
import post2604 from './posts/vivienda-urbana-como-afecta-a-inquilinos-con-alquileres-altos.js';
import post2605 from './posts/vivienda-y-alquiler-claves-para-proteger-tus-derechos-y-ahorrar.js';
import post2606 from './posts/vivienda-y-alquiler-claves-para-protegerte-y-ahorrar-hoy.js';
import post2607 from './posts/vivienda-y-alquiler-como-proteger-tu-bolsillo-y-tus-derechos-hoy.js';
import post2608 from './posts/vivienda-y-alquiler-como-proteger-tus-derechos-y-ahorrar-cada-mes.js';
import post2609 from './posts/vivienda-y-alquiler-como-proteger-tus-derechos-y-ahorrar-en-2025.js';
import post2610 from './posts/vivienda-y-alquiler-como-proteger-tus-derechos-y-ahorrar-en-tiempos-dificiles.js';
import post2611 from './posts/vivienda-y-alquiler-como-proteger-tus-derechos-y-ahorrar-hoy.js';
import post2612 from './posts/vivienda-y-alquiler-como-protegerte-y-ahorrar-en-tiempos-dificiles.js';
import post2613 from './posts/vivienda-y-alquiler-derechos-y-consejos-para-inquilinos-vulnerables.js';
import post2614 from './posts/vivienda-y-alquiler-en-madrid-que-puede-hacer-el-inquilino-vulnerable.js';
import post2615 from './posts/vivienda-y-alquiler-proteger-tus-derechos-y-ahorrar-en-tiempos-dificiles.js';
import post2616 from './posts/vivienda-y-alquiler-que-significa-para-ti-el-plan-de-sanchez.js';
import post2617 from './posts/vivienda-y-alquiler-que-significa-para-ti-la-nueva-accion-de-la-ue.js';
import post2618 from './posts/vivienda-y-compromiso-clave-para-proteger-tu-alquiler.js';
import post2619 from './posts/vivienda-y-derechos-como-protegerte-ante-un-alquiler-que-consume-tu-vida.js';
import post2620 from './posts/vivienda-y-derechos-como-protegerte-y-ahorrar-siendo-inquilino.js';
import post2621 from './posts/vivienda-y-derechos-protegerse-ante-situaciones-vulnerables.js';
import post2622 from './posts/vivienda-y-desigualdad-como-proteger-tus-derechos-como-inquilino-vulnerable.js';
import post2623 from './posts/vivienda-y-exclusion-claves-para-protegerte-como-inquilino-vulnerable.js';
import post2624 from './posts/vivienda-y-justicia-que-aprende-un-inquilino-vulnerable-del-caso-sarkozy.js';
import post2625 from './posts/vivienda-y-justicia-social-lo-que-el-ecopopulismo-britanico-ensena-a-inquilinos.js';
import post2626 from './posts/vivienda-y-naturaleza-como-proteger-tus-derechos-y-ahorrar-en-alquiler.js';
import post2627 from './posts/vivienda-y-naturaleza-una-inspiracion-para-inquilinos-en-lucha.js';
import post2628 from './posts/vivienda-y-pobreza-en-cataluna-como-proteger-tus-derechos-como-inquilino.js';
import post2629 from './posts/vivienda-y-resiliencia-derechos-y-proteccion-para-inquilinos-vulnerables.js';
import post2630 from './posts/vivienda-y-salud-en-andalucia-lo-que-inquilinos-deben-saber-ya.js';
import post2631 from './posts/vivienda-y-trabajo-como-proteger-tus-derechos-y-ahorrar-en-alquiler.js';
import post2632 from './posts/vivienda-y-vulnerabilidad-derechos-y-proteccion-para-inquilinos-en-crisis.js';
import post2633 from './posts/viviendas-asequibles-en-la-rinconada-una-oportunidad-para-inquilinos-jovenes.js';
import post2634 from './posts/viviendas-asequibles-en-valencia-una-esperanza-para-inquilinos-vulnerables.js';
import post2635 from './posts/viviendas-baratas-en-espana-como-protegerte-y-ahorrar-siendo-inquilino.js';
import post2636 from './posts/viviendas-bioclimaticas-ahorro-real-para-inquilinos-vulnerables.js';
import post2637 from './posts/viviendas-bloqueadas-protege-tus-derechos-como-inquilino-vulnerable.js';
import post2638 from './posts/viviendas-colaborativas-asequibles-una-esperanza-para-inquilinos-jovenes.js';
import post2639 from './posts/viviendas-de-alquiler-asequible-en-madrid-una-oportunidad-real-para-inquilinos.js';
import post2640 from './posts/viviendas-de-lujo-y-derechos-de-inquilinos-como-proteger-tu-alquiler.js';
import post2641 from './posts/viviendas-de-lujo-y-la-realidad-del-inquilino-vulnerable-en-espana.js';
import post2642 from './posts/viviendas-de-lujo-y-tus-derechos-como-proteger-tu-alquiler.js';
import post2643 from './posts/viviendas-exclusivas-y-derechos-para-inquilinos-vulnerables.js';
import post2644 from './posts/viviendas-grandes-y-alquileres-altos-como-proteger-tus-derechos.js';
import post2645 from './posts/viviendas-okupadas-a-la-venta-guia-para-proteger-tus-derechos.js';
import post2646 from './posts/viviendas-okupadas-en-venta-que-deben-saber-los-inquilinos-vulnerables.js';
import post2647 from './posts/viviendas-prefabricadas-una-opcion-real-para-inquilinos-con-pocos-recursos.js';
import post2648 from './posts/viviendas-protegidas-caras-como-afecta-al-inquilino-vulnerable.js';
import post2649 from './posts/viviendas-protegidas-caras-que-significa-para-inquilinos-vulnerables.js';
import post2650 from './posts/viviendas-protegidas-en-alicante-que-significa-para-los-inquilinos.js';
import post2651 from './posts/viviendas-protegidas-en-malaga-una-oportunidad-real-para-inquilinos-vulnerables.js';
import post2652 from './posts/viviendas-protegidas-en-malilla-una-esperanza-para-inquilinos-vulnerables.js';
import post2653 from './posts/viviendas-protegidas-en-palmas-altas-una-oportunidad-para-inquilinos-vulnerables.js';
import post2654 from './posts/viviendas-protegidas-en-sevilla-una-oportunidad-para-inquilinos-vulnerables.js';
import post2655 from './posts/viviendas-protegidas-en-velez-malaga-una-esperanza-para-inquilinos.js';
import post2656 from './posts/viviendas-protegidas-y-alquiler-como-defender-tus-derechos-y-ahorrar.js';
import post2657 from './posts/viviendas-protegidas-y-derechos-de-inquilinos-que-debes-saber.js';
import post2658 from './posts/viviendas-publicas-en-toledo-que-significa-para-los-inquilinos-vulnerables.js';
import post2659 from './posts/viviendas-publicas-en-toledo-una-oportunidad-para-inquilinos-vulnerables.js';
import post2660 from './posts/viviendas-sin-luz-lo-que-debes-saber-para-proteger-tu-alquiler.js';
import post2661 from './posts/viviendas-sobre-viviendas-una-esperanza-para-inquilinos-jovenes.js';
import post2662 from './posts/viviendas-vpo-en-palmas-altas-una-oportunidad-para-inquilinos-vulnerables.js';
import post2663 from './posts/viviendas-vpo-en-sevilla-2026-esperanza-para-inquilinos-vulnerables.js';
import post2664 from './posts/viviendo-con-dignidad-derechos-y-proteccion-para-inquilinos-vulnerables.js';
import post2665 from './posts/vivir-bien-en-poco-espacio-claves-para-inquilinos-vulnerables.js';
import post2666 from './posts/vivir-bien-en-poco-espacio-guia-para-inquilinos-con-alquileres-altos.js';
import post2667 from './posts/vivir-cerca-de-un-castillo-sueno-o-realidad-para-inquilinos.js';
import post2668 from './posts/vivir-cerca-del-trabajo-clave-para-ahorrar-y-proteger-tus-derechos-como-inquilin.js';
import post2669 from './posts/vivir-con-1-200-en-sevilla-claves-para-protegerte-y-ahorrar-en-alquiler.js';
import post2670 from './posts/vivir-con-hijos-en-casa-como-evitar-impuestos-y-proteger-tu-alquiler.js';
import post2671 from './posts/vivir-con-menos-puede-una-casa-prefabricada-ser-tu-solucion.js';
import post2672 from './posts/vivir-con-poco-espacio-derechos-y-soluciones-para-inquilinos-vulnerables.js';
import post2673 from './posts/vivir-de-alquiler-en-espana-derechos-y-consejos-para-inquilinos-vulnerables.js';
import post2674 from './posts/vivir-de-alquiler-tras-los-45-como-proteger-tus-derechos-y-ahorrar.js';
import post2675 from './posts/vivir-en-alquiler-sin-perder-la-dignidad-soluciones-para-inquilinos.js';
import post2676 from './posts/vivir-en-autocaravana-alternativas-reales-ante-el-alquiler-insostenible.js';
import post2677 from './posts/vivir-en-barcelona-claves-para-protegerte-y-ahorrar-en-tu-alquiler.js';
import post2678 from './posts/vivir-en-casa-container-una-alternativa-asequible-y-sostenible.js';
import post2679 from './posts/vivir-en-el-centro-de-valencia-que-significa-para-inquilinos-vulnerables.js';
import post2680 from './posts/vivir-seguro-en-tu-alquiler-derechos-y-proteccion-para-inquilinos.js';
import post2681 from './posts/vivir-sin-miedo-derechos-y-consejos-para-inquilinos-vulnerables.js';
import post2682 from './posts/vogelgriep-en-jouw-woonomgeving-wat-huurders-moeten-weten.js';
import post2683 from './posts/volver-a-casa-tras-la-tormenta-guia-para-inquilinos-en-riesgo.js';
import post2684 from './posts/vom-einfamilienhaus-zum-mehrparteienhaus-chancen-und-herausforderungen.js';
import post2685 from './posts/vonovia-masterplan-was-mieter-jetzt-wissen-sollten.js';
import post2686 from './posts/vonovia-und-steigende-mieten-was-mieter-jetzt-wissen-sollten.js';
import post2687 from './posts/voorjaar-en-woningcheck-zo-pak-je-het-slim-aan-als-huurder.js';
import post2688 from './posts/voorrang-voor-statushouders-en-de-impact-op-huurders.js';
import post2689 from './posts/vulnerabilidad-y-salud-mental-guia-para-inquilinos-bajo-presion.js';
import post2690 from './posts/wachttijden-en-huisvesting-wat-huurders-moeten-weten.js';
import post2691 from './posts/warmtenet-aansluiting-wat-huurders-moeten-weten.js';
import post2692 from './posts/warum-mieten-in-deutschland-oft-die-bessere-wahl-ist.js';
import post2693 from './posts/warum-neubau-stockt-und-mieten-in-deutschland-steigen.js';
import post2694 from './posts/wasserspiele-in-der-stadt-mehr-als-nur-erfrischung.js';
import post2695 from './posts/wat-betekent-de-chipsoft-hack-voor-huurders-en-woningmarkt.js';
import post2696 from './posts/wat-betekent-de-daling-van-huizenprijzen-in-dubai-voor-nederlandse-huurders.js';
import post2697 from './posts/wat-betekent-de-energietransitie-voor-huurders-in-nederland.js';
import post2698 from './posts/wat-betekent-de-groei-van-ambtenaren-voor-huurders.js';
import post2699 from './posts/wat-betekent-de-koninkrijksconferentie-voor-huurders.js';
import post2700 from './posts/wat-betekent-de-navo-persconferentie-voor-huurders-in-nederland.js';
import post2701 from './posts/wat-betekent-de-renteverhoging-van-de-ecb-voor-huurders.js';
import post2702 from './posts/wat-betekent-de-verkoop-van-vakantiewoningen-voor-huurders.js';
import post2703 from './posts/wat-betekent-europese-veiligheid-voor-huurders-in-nederland.js';
import post2704 from './posts/wat-betekent-het-afbouwen-van-hypotheekrenteaftrek-voor-huurders.js';
import post2705 from './posts/wat-betekent-het-nieuwe-gezamenlijke-epd-voor-huurders-in-ziekenhuizen.js';
import post2706 from './posts/wat-betekent-renteverhoging-voor-huurders-in-nederland.js';
import post2707 from './posts/wat-betekent-staatssteun-aan-chinese-bedrijven-voor-nederlandse-huurders.js';
import post2708 from './posts/wat-botswana-s-diamantcrisis-betekent-voor-nederlandse-huurders.js';
import post2709 from './posts/wat-de-kunstroof-in-assen-betekent-voor-huurders-en-woningmarkt.js';
import post2710 from './posts/wat-de-val-van-chinese-vastgoedkeizer-betekent-voor-huurders.js';
import post2711 from './posts/wat-een-kunstroof-leert-over-huurdersrechten-en-woningbescherming.js';
import post2712 from './posts/wat-huurders-kunnen-leren-van-de-afhandeling-van-de-drentse-kunstroof.js';
import post2713 from './posts/wat-huurders-kunnen-leren-van-de-kunstroof-in-het-drents-museum.js';
import post2714 from './posts/wat-huurders-kunnen-leren-van-keniaanse-families-in-crisissituaties.js';
import post2715 from './posts/wat-huurders-kunnen-leren-van-nachtelijke-zorg-in-dierentuinen.js';
import post2716 from './posts/wat-huurders-moeten-weten-over-kraak-en-ontruiming-in-nederland.js';
import post2717 from './posts/wat-huurders-moeten-weten-over-politieke-onzekerheid-en-woningmarkt.js';
import post2718 from './posts/wat-kunnen-huurders-leren-van-maatschappelijke-spanningen.js';
import post2719 from './posts/wat-leert-de-deense-gettowet-huurders-in-nederland.js';
import post2720 from './posts/wat-libanese-crisis-betekent-voor-huurders-in-nederland.js';
import post2721 from './posts/wat-nederlandse-huurders-kunnen-leren-van-de-vastgoedcrisis-in-china.js';
import post2722 from './posts/wat-rentebeleid-betekent-voor-huurders-in-nederland.js';
import post2723 from './posts/wat-spaanse-corruptiezaak-betekent-voor-huurders-in-nederland.js';
import post2724 from './posts/wat-te-doen-als-een-auto-je-woning-beschadigt.js';
import post2725 from './posts/wat-te-doen-als-je-ongewild-betrokken-raakt-bij-een-strafzaak.js';
import post2726 from './posts/wat-te-doen-bij-brand-in-of-nabij-uw-huurwoning.js';
import post2727 from './posts/wat-te-doen-bij-brandstichting-in-je-huurwoning.js';
import post2728 from './posts/wat-te-doen-bij-dreigende-ontruiming-door-conflicten.js';
import post2729 from './posts/wat-te-doen-bij-dreigende-ontruiming-in-nederland.js';
import post2730 from './posts/wat-te-doen-bij-dreigende-ontruiming-of-kraak-in-nederland.js';
import post2731 from './posts/wat-te-doen-bij-dreigende-ontruiming-of-kraak-van-je-huurwoning.js';
import post2732 from './posts/wat-te-doen-bij-dreigende-ontruiming-of-kraak-van-je-woning.js';
import post2733 from './posts/wat-te-doen-bij-een-hack-in-je-woonomgeving-praktische-tips-voor-huurders.js';
import post2734 from './posts/wat-te-doen-bij-een-woningbrand-rechten-en-stappen-voor-huurders.js';
import post2735 from './posts/wat-te-doen-bij-kraak-en-ontruiming-praktische-gids-voor-huurders.js';
import post2736 from './posts/wat-te-doen-bij-ontruiming-en-kraak-in-jouw-huurwoning.js';
import post2737 from './posts/wat-te-doen-bij-ontruiming-en-kraak-in-nederland.js';
import post2738 from './posts/wat-te-doen-bij-ontruiming-en-kraak-van-je-woning.js';
import post2739 from './posts/wat-te-doen-bij-ontruiming-en-woningnood-in-nederland.js';
import post2740 from './posts/wat-te-doen-bij-ontruiming-of-kraak-van-je-woning.js';
import post2741 from './posts/wat-te-doen-bij-ontruimingen-en-woningconflicten-in-nederland.js';
import post2742 from './posts/wat-te-doen-bij-onverwachte-huisvestingproblemen.js';
import post2743 from './posts/wat-te-doen-bij-overlast-door-militaire-activiteiten-in-je-woonomgeving.js';
import post2744 from './posts/wat-te-doen-bij-schade-door-onverwachte-gebeurtenissen-in-huis.js';
import post2745 from './posts/wat-te-doen-bij-schade-door-plofkraak-in-je-woonwijk.js';
import post2746 from './posts/wat-te-doen-bij-sluiting-van-woonzorglocaties-tijdens-crises.js';
import post2747 from './posts/wat-te-doen-bij-te-hoge-servicekosten-van-je-verhuurder.js';
import post2748 from './posts/wat-te-doen-bij-vermissing-of-diefstal-van-waardevolle-spullen-in-huurwoningen.js';
import post2749 from './posts/wat-te-doen-bij-woninginbraak-praktische-tips-voor-huurders.js';
import post2750 from './posts/wat-te-doen-bij-woningontruiming-en-brand-in-huurwoning.js';
import post2751 from './posts/weg-verwalter-und-gemeinschaftsgeld-rechte-und-pflichten.js';
import post2752 from './posts/wenn-kinder-elternrolle-ubernehmen-auswirkungen-und-hilfe.js';
import post2753 from './posts/wg-der-generation-z-neue-wohnformen-und-herausforderungen.js';
import post2754 from './posts/what-andy-burnham-s-public-control-plans-mean-for-uk-renters.js';
import post2755 from './posts/what-brentford-stadium-concerts-mean-for-local-tenants.js';
import post2756 from './posts/what-new-york-s-luxury-second-home-tax-means-for-swiss-tenants.js';
import post2757 from './posts/what-to-do-if-your-landlord-is-neglecting-their-responsibilities.js';
import post2758 from './posts/when-billionaire-landlords-bully-tenants-and-journalists.js';
import post2759 from './posts/when-rent-exceeds-minimum-wage-in-eu-capitals-what-tenants-should-know.js';
import post2760 from './posts/when-social-housing-fails-navigating-tenant-challenges-in-the-uk.js';
import post2761 from './posts/why-affordable-housing-is-scarce-in-switzerland.js';
import post2762 from './posts/why-labour-s-housing-plan-won-t-solve-uk-s-housing-crisis.js';
import post2763 from './posts/why-luxury-apartments-in-zurich-stay-empty-amid-housing-pressure.js';
import post2764 from './posts/why-rental-ads-can-mislead-swiss-tenants-on-prices.js';
import post2765 from './posts/why-uk-renters-should-rethink-home-insurance-amid-housing-risks.js';
import post2766 from './posts/why-young-renters-in-spain-spend-nearly-all-their-income-on-rent.js';
import post2767 from './posts/why-zurich-rents-are-so-high-and-what-tenants-can-do.js';
import post2768 from './posts/wie-der-irankrieg-den-deutschen-wohnungsmarkt-belastet.js';
import post2769 from './posts/wie-mieter-erbschaften-und-schenkungen-sinnvoll-nutzen.js';
import post2770 from './posts/woekerhuur-en-arbeidsmigranten-wat-huurders-moeten-weten.js';
import post2771 from './posts/wohneigentum-in-munchen-warum-es-fur-viele-unerreichbar-bleibt.js';
import post2772 from './posts/wohneigentum-wird-teurer-was-mieter-jetzt-wissen-sollten.js';
import post2773 from './posts/wohnen-am-stadtrand-chancen-und-risiken-fur-mieter.js';
import post2774 from './posts/wohnen-im-bunker-chancen-und-herausforderungen-fur-mieter.js';
import post2775 from './posts/wohnen-im-denkmal-alt-tempelhof-als-vorbild-fur-gesundes-wohnen.js';
import post2776 from './posts/wohnen-im-stil-der-60er-wohnkultur-und-mieterrechte-in-deutschland.js';
import post2777 from './posts/wohnen-in-kleinstadten-herausforderungen-und-chancen-fur-mieter.js';
import post2778 from './posts/wohnen-mit-naturgefuhl-inspiration-fur-mieter-in-deutschland.js';
import post2779 from './posts/wohnen-nach-dem-frauenhaus-schutz-und-perspektiven-fur-betroffene.js';
import post2780 from './posts/wohnimmobilienpreise-steigen-was-mieter-jetzt-wissen-sollten.js';
import post2781 from './posts/wohnraum-auf-inseln-chancen-und-herausforderungen-fur-mieter.js';
import post2782 from './posts/wohnraum-fur-senioren-herausforderungen-und-losungen.js';
import post2783 from './posts/wohnraum-gestalten-moderne-architektur-und-mieterinteressen.js';
import post2784 from './posts/wohnraum-in-deutschland-herausforderungen-und-chancen-fur-mieter.js';
import post2785 from './posts/wohnraum-in-deutschland-herausforderungen-und-praktische-tipps-fur-mieter.js';
import post2786 from './posts/wohnraum-in-deutschland-rechte-chancen-und-schutz-fur-mieter.js';
import post2787 from './posts/wohnraum-in-deutschland-rechte-und-chancen-fur-mieter.js';
import post2788 from './posts/wohnraumdebatte-und-leg-was-mieter-jetzt-wissen-sollten.js';
import post2789 from './posts/wohnraumknappheit-in-gro-stadten-praktische-hilfe-fur-mieter.js';
import post2790 from './posts/wohnraummangel-und-verdichtung-was-mieter-jetzt-wissen-mussen.js';
import post2791 from './posts/wohnstadt-asemwald-verwaltung-gro-er-eigentumergemeinschaften.js';
import post2792 from './posts/wohnstil-der-grunderzeit-einblick-und-bedeutung-fur-mieter.js';
import post2793 from './posts/wohntextilien-mit-charakter-mehr-leben-fur-dein-zuhause.js';
import post2794 from './posts/wohntrends-und-ihre-folgen-fur-mieter-in-deutschland.js';
import post2795 from './posts/wohnung-individuell-gestalten-trotz-wohnungsdruck.js';
import post2796 from './posts/wohnungsbau-im-berliner-umland-chancen-und-herausforderungen.js';
import post2797 from './posts/wohnungsbau-in-deutschland-herausforderungen-und-chancen-fur-mieter.js';
import post2798 from './posts/wohnungsdruck-in-deutschland-was-mieter-jetzt-wissen-sollten.js';
import post2799 from './posts/wohnungskauf-in-berlin-chancen-und-hurden-fur-mieter.js';
import post2800 from './posts/wohnungsknappheit-in-deutschland-tipps-fur-mieter-unter-druck.js';
import post2801 from './posts/wohnungsknappheit-in-deutschland-was-mieter-jetzt-wissen-sollten.js';
import post2802 from './posts/wohnungskrise-in-deutschland-praktische-hilfe-fur-mieter.js';
import post2803 from './posts/wohnungskrise-in-deutschland-was-mieter-jetzt-wissen-mussen.js';
import post2804 from './posts/wohnungskrise-in-deutschland-was-mieter-jetzt-wissen-sollten.js';
import post2805 from './posts/wohnungskrise-in-deutschland-wie-mieter-sich-schutzen-konnen.js';
import post2806 from './posts/wohnungskrise-in-paris-was-mieter-in-deutschland-daraus-lernen-konnen.js';
import post2807 from './posts/wohnungskrise-und-politische-entscheidungen-was-mieter-jetzt-wissen-sollten.js';
import post2808 from './posts/wohnungskrise-und-rechte-der-mieter-in-deutschland-verstehen.js';
import post2809 from './posts/wohnungskrise-und-staatliche-eingriffe-was-mieter-wissen-sollten.js';
import post2810 from './posts/wohnungskrise-verstehen-wie-mieten-aktionstage-mobilisieren.js';
import post2811 from './posts/wohnungslosigkeit-bei-kindern-in-deutschland-ursachen-und-hilfe.js';
import post2812 from './posts/wohnungsmarkt-in-deutschland-chancen-und-herausforderungen-fur-mieter.js';
import post2813 from './posts/wohnungsmarkt-in-deutschland-herausforderungen-und-chancen-fur-mieter.js';
import post2814 from './posts/wohnungsmarkt-in-deutschland-tipps-fur-mieter-unter-druck.js';
import post2815 from './posts/wohnungsmarkt-in-deutschland-was-mieter-jetzt-wissen-mussen.js';
import post2816 from './posts/wohnungsmarkt-in-deutschland-was-mieter-jetzt-wissen-sollten.js';
import post2817 from './posts/wohnungsmarkt-und-mietdruck-was-mieter-jetzt-wissen-sollten.js';
import post2818 from './posts/wohnungsmarkt-unter-druck-praktische-tipps-fur-mieter-in-deutschland.js';
import post2819 from './posts/wohnungsneubau-in-deutschland-was-mieter-jetzt-wissen-mussen.js';
import post2820 from './posts/wohnungsnot-in-berlin-brutalismus-verstehen-wohnraum-schaffen.js';
import post2821 from './posts/wohnungsnot-trotz-immobilienboom-was-mieter-jetzt-wissen-mussen.js';
import post2822 from './posts/wohnungspolitik-und-demokratie-einfluss-auf-mieter-in-deutschland.js';
import post2823 from './posts/wohnungspolitik-und-mieterproteste-wie-sie-sich-wehren-konnen.js';
import post2824 from './posts/wohnungssuche-in-deutschland-herausforderungen-und-chancen-fur-mieter.js';
import post2825 from './posts/wohnungssuche-und-mieten-in-deutschland-was-mieter-wissen-sollten.js';
import post2826 from './posts/women-leaders-inspire-change-in-housing-and-tenancy.js';
import post2827 from './posts/wonen-in-verandering-wat-jan-rothuizen-s-tekeningen-ons-leren.js';
import post2828 from './posts/wonen-onder-druk-in-nederland-praktische-tips-voor-huurders.js';
import post2829 from './posts/wonen-onder-druk-praktische-hulp-voor-huurders-in-nederland.js';
import post2830 from './posts/wonen-op-vakantieparken-kansen-en-onzekerheden-voor-huurders.js';
import post2831 from './posts/woningcorporaties-en-belastingdruk-wat-betekent-het-voor-huurders.js';
import post2832 from './posts/woningcorporaties-en-de-toekomst-van-sociale-huur-in-nederland.js';
import post2833 from './posts/woningdelen-als-oplossing-voor-statushouders-en-woningmarkt.js';
import post2834 from './posts/woningdelen-in-nederland-kansen-en-obstakels-voor-huurders.js';
import post2835 from './posts/woningmarkt-en-kunst-wat-betekent-dit-voor-huurders.js';
import post2836 from './posts/woningmarkt-in-nederland-wat-huurders-moeten-weten.js';
import post2837 from './posts/woningmarkt-onder-druk-wat-betekent-het-voor-huurders.js';
import post2838 from './posts/woningnood-en-betaalbare-energie-wat-huurders-moeten-weten.js';
import post2839 from './posts/woningnood-en-rechten-van-huurders-in-nederland-wat-kunt-u-doen.js';
import post2840 from './posts/woningnood-en-rechten-van-huurders-in-nederland.js';
import post2841 from './posts/woningnood-in-nederland-praktische-stappen-voor-huurders.js';
import post2842 from './posts/woningnood-in-nederland-wat-huurders-moeten-weten-en-doen.js';
import post2843 from './posts/woonblok-ontruimd-door-brand-wat-huurders-moeten-weten.js';
import post2844 from './posts/woonfraude-in-rotterdam-wat-arbeidsmigranten-moeten-weten.js';
import post2845 from './posts/woutertje-pieterseprijs-en-wat-het-betekent-voor-huurders.js';
import post2846 from './posts/yoga-e-benessere-abitativo-una-guida-pratica-per-inquilini.js';
import post2847 from './posts/zu-geringer-kaufpreis-kann-sittenwidrig-sein-was-mieter-wissen-sollten.js';
import post2848 from './posts/zukunft-des-wohnens-ki-und-holz-hybrid-bau-in-deutschland.js';
import post2849 from './posts/zurich-housing-initiative-what-tenants-should-know.js';
import post2850 from './posts/zurich-s-housing-vote-what-renters-need-to-know.js';
import post2851 from './posts/zwangsraumungen-in-hamburg-was-mieter-jetzt-wissen-sollten.js';
import post2852 from './posts/zwembaden-verduurzamen-lessen-voor-huurders-in-nederland.js';

const rawPosts: StaticBlogPostInput[] = [
  post1,
  post2,
  post3,
  post4,
  post5,
  post6,
  post7,
  post8,
  post9,
  post10,
  post11,
  post12,
  post13,
  post14,
  post15,
  post16,
  post17,
  post18,
  post19,
  post20,
  post21,
  post22,
  post23,
  post24,
  post25,
  post26,
  post27,
  post28,
  post29,
  post30,
  post31,
  post32,
  post33,
  post34,
  post35,
  post36,
  post37,
  post38,
  post39,
  post40,
  post41,
  post42,
  post43,
  post44,
  post45,
  post46,
  post47,
  post48,
  post49,
  post50,
  post51,
  post52,
  post53,
  post54,
  post55,
  post56,
  post57,
  post58,
  post59,
  post60,
  post61,
  post62,
  post63,
  post64,
  post65,
  post66,
  post67,
  post68,
  post69,
  post70,
  post71,
  post72,
  post73,
  post74,
  post75,
  post76,
  post77,
  post78,
  post79,
  post80,
  post81,
  post82,
  post83,
  post84,
  post85,
  post86,
  post87,
  post88,
  post89,
  post90,
  post91,
  post92,
  post93,
  post94,
  post95,
  post96,
  post97,
  post98,
  post99,
  post100,
  post101,
  post102,
  post103,
  post104,
  post105,
  post106,
  post107,
  post108,
  post109,
  post110,
  post111,
  post112,
  post113,
  post114,
  post115,
  post116,
  post117,
  post118,
  post119,
  post120,
  post121,
  post122,
  post123,
  post124,
  post125,
  post126,
  post127,
  post128,
  post129,
  post130,
  post131,
  post132,
  post133,
  post134,
  post135,
  post136,
  post137,
  post138,
  post139,
  post140,
  post141,
  post142,
  post143,
  post144,
  post145,
  post146,
  post147,
  post148,
  post149,
  post150,
  post151,
  post152,
  post153,
  post154,
  post155,
  post156,
  post157,
  post158,
  post159,
  post160,
  post161,
  post162,
  post163,
  post164,
  post165,
  post166,
  post167,
  post168,
  post169,
  post170,
  post171,
  post172,
  post173,
  post174,
  post175,
  post176,
  post177,
  post178,
  post179,
  post180,
  post181,
  post182,
  post183,
  post184,
  post185,
  post186,
  post187,
  post188,
  post189,
  post190,
  post191,
  post192,
  post193,
  post194,
  post195,
  post196,
  post197,
  post198,
  post199,
  post200,
  post201,
  post202,
  post203,
  post204,
  post205,
  post206,
  post207,
  post208,
  post209,
  post210,
  post211,
  post212,
  post213,
  post214,
  post215,
  post216,
  post217,
  post218,
  post219,
  post220,
  post221,
  post222,
  post223,
  post224,
  post225,
  post226,
  post227,
  post228,
  post229,
  post230,
  post231,
  post232,
  post233,
  post234,
  post235,
  post236,
  post237,
  post238,
  post239,
  post240,
  post241,
  post242,
  post243,
  post244,
  post245,
  post246,
  post247,
  post248,
  post249,
  post250,
  post251,
  post252,
  post253,
  post254,
  post255,
  post256,
  post257,
  post258,
  post259,
  post260,
  post261,
  post262,
  post263,
  post264,
  post265,
  post266,
  post267,
  post268,
  post269,
  post270,
  post271,
  post272,
  post273,
  post274,
  post275,
  post276,
  post277,
  post278,
  post279,
  post280,
  post281,
  post282,
  post283,
  post284,
  post285,
  post286,
  post287,
  post288,
  post289,
  post290,
  post291,
  post292,
  post293,
  post294,
  post295,
  post296,
  post297,
  post298,
  post299,
  post300,
  post301,
  post302,
  post303,
  post304,
  post305,
  post306,
  post307,
  post308,
  post309,
  post310,
  post311,
  post312,
  post313,
  post314,
  post315,
  post316,
  post317,
  post318,
  post319,
  post320,
  post321,
  post322,
  post323,
  post324,
  post325,
  post326,
  post327,
  post328,
  post329,
  post330,
  post331,
  post332,
  post333,
  post334,
  post335,
  post336,
  post337,
  post338,
  post339,
  post340,
  post341,
  post342,
  post343,
  post344,
  post345,
  post346,
  post347,
  post348,
  post349,
  post350,
  post351,
  post352,
  post353,
  post354,
  post355,
  post356,
  post357,
  post358,
  post359,
  post360,
  post361,
  post362,
  post363,
  post364,
  post365,
  post366,
  post367,
  post368,
  post369,
  post370,
  post371,
  post372,
  post373,
  post374,
  post375,
  post376,
  post377,
  post378,
  post379,
  post380,
  post381,
  post382,
  post383,
  post384,
  post385,
  post386,
  post387,
  post388,
  post389,
  post390,
  post391,
  post392,
  post393,
  post394,
  post395,
  post396,
  post397,
  post398,
  post399,
  post400,
  post401,
  post402,
  post403,
  post404,
  post405,
  post406,
  post407,
  post408,
  post409,
  post410,
  post411,
  post412,
  post413,
  post414,
  post415,
  post416,
  post417,
  post418,
  post419,
  post420,
  post421,
  post422,
  post423,
  post424,
  post425,
  post426,
  post427,
  post428,
  post429,
  post430,
  post431,
  post432,
  post433,
  post434,
  post435,
  post436,
  post437,
  post438,
  post439,
  post440,
  post441,
  post442,
  post443,
  post444,
  post445,
  post446,
  post447,
  post448,
  post449,
  post450,
  post451,
  post452,
  post453,
  post454,
  post455,
  post456,
  post457,
  post458,
  post459,
  post460,
  post461,
  post462,
  post463,
  post464,
  post465,
  post466,
  post467,
  post468,
  post469,
  post470,
  post471,
  post472,
  post473,
  post474,
  post475,
  post476,
  post477,
  post478,
  post479,
  post480,
  post481,
  post482,
  post483,
  post484,
  post485,
  post486,
  post487,
  post488,
  post489,
  post490,
  post491,
  post492,
  post493,
  post494,
  post495,
  post496,
  post497,
  post498,
  post499,
  post500,
  post501,
  post502,
  post503,
  post504,
  post505,
  post506,
  post507,
  post508,
  post509,
  post510,
  post511,
  post512,
  post513,
  post514,
  post515,
  post516,
  post517,
  post518,
  post519,
  post520,
  post521,
  post522,
  post523,
  post524,
  post525,
  post526,
  post527,
  post528,
  post529,
  post530,
  post531,
  post532,
  post533,
  post534,
  post535,
  post536,
  post537,
  post538,
  post539,
  post540,
  post541,
  post542,
  post543,
  post544,
  post545,
  post546,
  post547,
  post548,
  post549,
  post550,
  post551,
  post552,
  post553,
  post554,
  post555,
  post556,
  post557,
  post558,
  post559,
  post560,
  post561,
  post562,
  post563,
  post564,
  post565,
  post566,
  post567,
  post568,
  post569,
  post570,
  post571,
  post572,
  post573,
  post574,
  post575,
  post576,
  post577,
  post578,
  post579,
  post580,
  post581,
  post582,
  post583,
  post584,
  post585,
  post586,
  post587,
  post588,
  post589,
  post590,
  post591,
  post592,
  post593,
  post594,
  post595,
  post596,
  post597,
  post598,
  post599,
  post600,
  post601,
  post602,
  post603,
  post604,
  post605,
  post606,
  post607,
  post608,
  post609,
  post610,
  post611,
  post612,
  post613,
  post614,
  post615,
  post616,
  post617,
  post618,
  post619,
  post620,
  post621,
  post622,
  post623,
  post624,
  post625,
  post626,
  post627,
  post628,
  post629,
  post630,
  post631,
  post632,
  post633,
  post634,
  post635,
  post636,
  post637,
  post638,
  post639,
  post640,
  post641,
  post642,
  post643,
  post644,
  post645,
  post646,
  post647,
  post648,
  post649,
  post650,
  post651,
  post652,
  post653,
  post654,
  post655,
  post656,
  post657,
  post658,
  post659,
  post660,
  post661,
  post662,
  post663,
  post664,
  post665,
  post666,
  post667,
  post668,
  post669,
  post670,
  post671,
  post672,
  post673,
  post674,
  post675,
  post676,
  post677,
  post678,
  post679,
  post680,
  post681,
  post682,
  post683,
  post684,
  post685,
  post686,
  post687,
  post688,
  post689,
  post690,
  post691,
  post692,
  post693,
  post694,
  post695,
  post696,
  post697,
  post698,
  post699,
  post700,
  post701,
  post702,
  post703,
  post704,
  post705,
  post706,
  post707,
  post708,
  post709,
  post710,
  post711,
  post712,
  post713,
  post714,
  post715,
  post716,
  post717,
  post718,
  post719,
  post720,
  post721,
  post722,
  post723,
  post724,
  post725,
  post726,
  post727,
  post728,
  post729,
  post730,
  post731,
  post732,
  post733,
  post734,
  post735,
  post736,
  post737,
  post738,
  post739,
  post740,
  post741,
  post742,
  post743,
  post744,
  post745,
  post746,
  post747,
  post748,
  post749,
  post750,
  post751,
  post752,
  post753,
  post754,
  post755,
  post756,
  post757,
  post758,
  post759,
  post760,
  post761,
  post762,
  post763,
  post764,
  post765,
  post766,
  post767,
  post768,
  post769,
  post770,
  post771,
  post772,
  post773,
  post774,
  post775,
  post776,
  post777,
  post778,
  post779,
  post780,
  post781,
  post782,
  post783,
  post784,
  post785,
  post786,
  post787,
  post788,
  post789,
  post790,
  post791,
  post792,
  post793,
  post794,
  post795,
  post796,
  post797,
  post798,
  post799,
  post800,
  post801,
  post802,
  post803,
  post804,
  post805,
  post806,
  post807,
  post808,
  post809,
  post810,
  post811,
  post812,
  post813,
  post814,
  post815,
  post816,
  post817,
  post818,
  post819,
  post820,
  post821,
  post822,
  post823,
  post824,
  post825,
  post826,
  post827,
  post828,
  post829,
  post830,
  post831,
  post832,
  post833,
  post834,
  post835,
  post836,
  post837,
  post838,
  post839,
  post840,
  post841,
  post842,
  post843,
  post844,
  post845,
  post846,
  post847,
  post848,
  post849,
  post850,
  post851,
  post852,
  post853,
  post854,
  post855,
  post856,
  post857,
  post858,
  post859,
  post860,
  post861,
  post862,
  post863,
  post864,
  post865,
  post866,
  post867,
  post868,
  post869,
  post870,
  post871,
  post872,
  post873,
  post874,
  post875,
  post876,
  post877,
  post878,
  post879,
  post880,
  post881,
  post882,
  post883,
  post884,
  post885,
  post886,
  post887,
  post888,
  post889,
  post890,
  post891,
  post892,
  post893,
  post894,
  post895,
  post896,
  post897,
  post898,
  post899,
  post900,
  post901,
  post902,
  post903,
  post904,
  post905,
  post906,
  post907,
  post908,
  post909,
  post910,
  post911,
  post912,
  post913,
  post914,
  post915,
  post916,
  post917,
  post918,
  post919,
  post920,
  post921,
  post922,
  post923,
  post924,
  post925,
  post926,
  post927,
  post928,
  post929,
  post930,
  post931,
  post932,
  post933,
  post934,
  post935,
  post936,
  post937,
  post938,
  post939,
  post940,
  post941,
  post942,
  post943,
  post944,
  post945,
  post946,
  post947,
  post948,
  post949,
  post950,
  post951,
  post952,
  post953,
  post954,
  post955,
  post956,
  post957,
  post958,
  post959,
  post960,
  post961,
  post962,
  post963,
  post964,
  post965,
  post966,
  post967,
  post968,
  post969,
  post970,
  post971,
  post972,
  post973,
  post974,
  post975,
  post976,
  post977,
  post978,
  post979,
  post980,
  post981,
  post982,
  post983,
  post984,
  post985,
  post986,
  post987,
  post988,
  post989,
  post990,
  post991,
  post992,
  post993,
  post994,
  post995,
  post996,
  post997,
  post998,
  post999,
  post1000,
  post1001,
  post1002,
  post1003,
  post1004,
  post1005,
  post1006,
  post1007,
  post1008,
  post1009,
  post1010,
  post1011,
  post1012,
  post1013,
  post1014,
  post1015,
  post1016,
  post1017,
  post1018,
  post1019,
  post1020,
  post1021,
  post1022,
  post1023,
  post1024,
  post1025,
  post1026,
  post1027,
  post1028,
  post1029,
  post1030,
  post1031,
  post1032,
  post1033,
  post1034,
  post1035,
  post1036,
  post1037,
  post1038,
  post1039,
  post1040,
  post1041,
  post1042,
  post1043,
  post1044,
  post1045,
  post1046,
  post1047,
  post1048,
  post1049,
  post1050,
  post1051,
  post1052,
  post1053,
  post1054,
  post1055,
  post1056,
  post1057,
  post1058,
  post1059,
  post1060,
  post1061,
  post1062,
  post1063,
  post1064,
  post1065,
  post1066,
  post1067,
  post1068,
  post1069,
  post1070,
  post1071,
  post1072,
  post1073,
  post1074,
  post1075,
  post1076,
  post1077,
  post1078,
  post1079,
  post1080,
  post1081,
  post1082,
  post1083,
  post1084,
  post1085,
  post1086,
  post1087,
  post1088,
  post1089,
  post1090,
  post1091,
  post1092,
  post1093,
  post1094,
  post1095,
  post1096,
  post1097,
  post1098,
  post1099,
  post1100,
  post1101,
  post1102,
  post1103,
  post1104,
  post1105,
  post1106,
  post1107,
  post1108,
  post1109,
  post1110,
  post1111,
  post1112,
  post1113,
  post1114,
  post1115,
  post1116,
  post1117,
  post1118,
  post1119,
  post1120,
  post1121,
  post1122,
  post1123,
  post1124,
  post1125,
  post1126,
  post1127,
  post1128,
  post1129,
  post1130,
  post1131,
  post1132,
  post1133,
  post1134,
  post1135,
  post1136,
  post1137,
  post1138,
  post1139,
  post1140,
  post1141,
  post1142,
  post1143,
  post1144,
  post1145,
  post1146,
  post1147,
  post1148,
  post1149,
  post1150,
  post1151,
  post1152,
  post1153,
  post1154,
  post1155,
  post1156,
  post1157,
  post1158,
  post1159,
  post1160,
  post1161,
  post1162,
  post1163,
  post1164,
  post1165,
  post1166,
  post1167,
  post1168,
  post1169,
  post1170,
  post1171,
  post1172,
  post1173,
  post1174,
  post1175,
  post1176,
  post1177,
  post1178,
  post1179,
  post1180,
  post1181,
  post1182,
  post1183,
  post1184,
  post1185,
  post1186,
  post1187,
  post1188,
  post1189,
  post1190,
  post1191,
  post1192,
  post1193,
  post1194,
  post1195,
  post1196,
  post1197,
  post1198,
  post1199,
  post1200,
  post1201,
  post1202,
  post1203,
  post1204,
  post1205,
  post1206,
  post1207,
  post1208,
  post1209,
  post1210,
  post1211,
  post1212,
  post1213,
  post1214,
  post1215,
  post1216,
  post1217,
  post1218,
  post1219,
  post1220,
  post1221,
  post1222,
  post1223,
  post1224,
  post1225,
  post1226,
  post1227,
  post1228,
  post1229,
  post1230,
  post1231,
  post1232,
  post1233,
  post1234,
  post1235,
  post1236,
  post1237,
  post1238,
  post1239,
  post1240,
  post1241,
  post1242,
  post1243,
  post1244,
  post1245,
  post1246,
  post1247,
  post1248,
  post1249,
  post1250,
  post1251,
  post1252,
  post1253,
  post1254,
  post1255,
  post1256,
  post1257,
  post1258,
  post1259,
  post1260,
  post1261,
  post1262,
  post1263,
  post1264,
  post1265,
  post1266,
  post1267,
  post1268,
  post1269,
  post1270,
  post1271,
  post1272,
  post1273,
  post1274,
  post1275,
  post1276,
  post1277,
  post1278,
  post1279,
  post1280,
  post1281,
  post1282,
  post1283,
  post1284,
  post1285,
  post1286,
  post1287,
  post1288,
  post1289,
  post1290,
  post1291,
  post1292,
  post1293,
  post1294,
  post1295,
  post1296,
  post1297,
  post1298,
  post1299,
  post1300,
  post1301,
  post1302,
  post1303,
  post1304,
  post1305,
  post1306,
  post1307,
  post1308,
  post1309,
  post1310,
  post1311,
  post1312,
  post1313,
  post1314,
  post1315,
  post1316,
  post1317,
  post1318,
  post1319,
  post1320,
  post1321,
  post1322,
  post1323,
  post1324,
  post1325,
  post1326,
  post1327,
  post1328,
  post1329,
  post1330,
  post1331,
  post1332,
  post1333,
  post1334,
  post1335,
  post1336,
  post1337,
  post1338,
  post1339,
  post1340,
  post1341,
  post1342,
  post1343,
  post1344,
  post1345,
  post1346,
  post1347,
  post1348,
  post1349,
  post1350,
  post1351,
  post1352,
  post1353,
  post1354,
  post1355,
  post1356,
  post1357,
  post1358,
  post1359,
  post1360,
  post1361,
  post1362,
  post1363,
  post1364,
  post1365,
  post1366,
  post1367,
  post1368,
  post1369,
  post1370,
  post1371,
  post1372,
  post1373,
  post1374,
  post1375,
  post1376,
  post1377,
  post1378,
  post1379,
  post1380,
  post1381,
  post1382,
  post1383,
  post1384,
  post1385,
  post1386,
  post1387,
  post1388,
  post1389,
  post1390,
  post1391,
  post1392,
  post1393,
  post1394,
  post1395,
  post1396,
  post1397,
  post1398,
  post1399,
  post1400,
  post1401,
  post1402,
  post1403,
  post1404,
  post1405,
  post1406,
  post1407,
  post1408,
  post1409,
  post1410,
  post1411,
  post1412,
  post1413,
  post1414,
  post1415,
  post1416,
  post1417,
  post1418,
  post1419,
  post1420,
  post1421,
  post1422,
  post1423,
  post1424,
  post1425,
  post1426,
  post1427,
  post1428,
  post1429,
  post1430,
  post1431,
  post1432,
  post1433,
  post1434,
  post1435,
  post1436,
  post1437,
  post1438,
  post1439,
  post1440,
  post1441,
  post1442,
  post1443,
  post1444,
  post1445,
  post1446,
  post1447,
  post1448,
  post1449,
  post1450,
  post1451,
  post1452,
  post1453,
  post1454,
  post1455,
  post1456,
  post1457,
  post1458,
  post1459,
  post1460,
  post1461,
  post1462,
  post1463,
  post1464,
  post1465,
  post1466,
  post1467,
  post1468,
  post1469,
  post1470,
  post1471,
  post1472,
  post1473,
  post1474,
  post1475,
  post1476,
  post1477,
  post1478,
  post1479,
  post1480,
  post1481,
  post1482,
  post1483,
  post1484,
  post1485,
  post1486,
  post1487,
  post1488,
  post1489,
  post1490,
  post1491,
  post1492,
  post1493,
  post1494,
  post1495,
  post1496,
  post1497,
  post1498,
  post1499,
  post1500,
  post1501,
  post1502,
  post1503,
  post1504,
  post1505,
  post1506,
  post1507,
  post1508,
  post1509,
  post1510,
  post1511,
  post1512,
  post1513,
  post1514,
  post1515,
  post1516,
  post1517,
  post1518,
  post1519,
  post1520,
  post1521,
  post1522,
  post1523,
  post1524,
  post1525,
  post1526,
  post1527,
  post1528,
  post1529,
  post1530,
  post1531,
  post1532,
  post1533,
  post1534,
  post1535,
  post1536,
  post1537,
  post1538,
  post1539,
  post1540,
  post1541,
  post1542,
  post1543,
  post1544,
  post1545,
  post1546,
  post1547,
  post1548,
  post1549,
  post1550,
  post1551,
  post1552,
  post1553,
  post1554,
  post1555,
  post1556,
  post1557,
  post1558,
  post1559,
  post1560,
  post1561,
  post1562,
  post1563,
  post1564,
  post1565,
  post1566,
  post1567,
  post1568,
  post1569,
  post1570,
  post1571,
  post1572,
  post1573,
  post1574,
  post1575,
  post1576,
  post1577,
  post1578,
  post1579,
  post1580,
  post1581,
  post1582,
  post1583,
  post1584,
  post1585,
  post1586,
  post1587,
  post1588,
  post1589,
  post1590,
  post1591,
  post1592,
  post1593,
  post1594,
  post1595,
  post1596,
  post1597,
  post1598,
  post1599,
  post1600,
  post1601,
  post1602,
  post1603,
  post1604,
  post1605,
  post1606,
  post1607,
  post1608,
  post1609,
  post1610,
  post1611,
  post1612,
  post1613,
  post1614,
  post1615,
  post1616,
  post1617,
  post1618,
  post1619,
  post1620,
  post1621,
  post1622,
  post1623,
  post1624,
  post1625,
  post1626,
  post1627,
  post1628,
  post1629,
  post1630,
  post1631,
  post1632,
  post1633,
  post1634,
  post1635,
  post1636,
  post1637,
  post1638,
  post1639,
  post1640,
  post1641,
  post1642,
  post1643,
  post1644,
  post1645,
  post1646,
  post1647,
  post1648,
  post1649,
  post1650,
  post1651,
  post1652,
  post1653,
  post1654,
  post1655,
  post1656,
  post1657,
  post1658,
  post1659,
  post1660,
  post1661,
  post1662,
  post1663,
  post1664,
  post1665,
  post1666,
  post1667,
  post1668,
  post1669,
  post1670,
  post1671,
  post1672,
  post1673,
  post1674,
  post1675,
  post1676,
  post1677,
  post1678,
  post1679,
  post1680,
  post1681,
  post1682,
  post1683,
  post1684,
  post1685,
  post1686,
  post1687,
  post1688,
  post1689,
  post1690,
  post1691,
  post1692,
  post1693,
  post1694,
  post1695,
  post1696,
  post1697,
  post1698,
  post1699,
  post1700,
  post1701,
  post1702,
  post1703,
  post1704,
  post1705,
  post1706,
  post1707,
  post1708,
  post1709,
  post1710,
  post1711,
  post1712,
  post1713,
  post1714,
  post1715,
  post1716,
  post1717,
  post1718,
  post1719,
  post1720,
  post1721,
  post1722,
  post1723,
  post1724,
  post1725,
  post1726,
  post1727,
  post1728,
  post1729,
  post1730,
  post1731,
  post1732,
  post1733,
  post1734,
  post1735,
  post1736,
  post1737,
  post1738,
  post1739,
  post1740,
  post1741,
  post1742,
  post1743,
  post1744,
  post1745,
  post1746,
  post1747,
  post1748,
  post1749,
  post1750,
  post1751,
  post1752,
  post1753,
  post1754,
  post1755,
  post1756,
  post1757,
  post1758,
  post1759,
  post1760,
  post1761,
  post1762,
  post1763,
  post1764,
  post1765,
  post1766,
  post1767,
  post1768,
  post1769,
  post1770,
  post1771,
  post1772,
  post1773,
  post1774,
  post1775,
  post1776,
  post1777,
  post1778,
  post1779,
  post1780,
  post1781,
  post1782,
  post1783,
  post1784,
  post1785,
  post1786,
  post1787,
  post1788,
  post1789,
  post1790,
  post1791,
  post1792,
  post1793,
  post1794,
  post1795,
  post1796,
  post1797,
  post1798,
  post1799,
  post1800,
  post1801,
  post1802,
  post1803,
  post1804,
  post1805,
  post1806,
  post1807,
  post1808,
  post1809,
  post1810,
  post1811,
  post1812,
  post1813,
  post1814,
  post1815,
  post1816,
  post1817,
  post1818,
  post1819,
  post1820,
  post1821,
  post1822,
  post1823,
  post1824,
  post1825,
  post1826,
  post1827,
  post1828,
  post1829,
  post1830,
  post1831,
  post1832,
  post1833,
  post1834,
  post1835,
  post1836,
  post1837,
  post1838,
  post1839,
  post1840,
  post1841,
  post1842,
  post1843,
  post1844,
  post1845,
  post1846,
  post1847,
  post1848,
  post1849,
  post1850,
  post1851,
  post1852,
  post1853,
  post1854,
  post1855,
  post1856,
  post1857,
  post1858,
  post1859,
  post1860,
  post1861,
  post1862,
  post1863,
  post1864,
  post1865,
  post1866,
  post1867,
  post1868,
  post1869,
  post1870,
  post1871,
  post1872,
  post1873,
  post1874,
  post1875,
  post1876,
  post1877,
  post1878,
  post1879,
  post1880,
  post1881,
  post1882,
  post1883,
  post1884,
  post1885,
  post1886,
  post1887,
  post1888,
  post1889,
  post1890,
  post1891,
  post1892,
  post1893,
  post1894,
  post1895,
  post1896,
  post1897,
  post1898,
  post1899,
  post1900,
  post1901,
  post1902,
  post1903,
  post1904,
  post1905,
  post1906,
  post1907,
  post1908,
  post1909,
  post1910,
  post1911,
  post1912,
  post1913,
  post1914,
  post1915,
  post1916,
  post1917,
  post1918,
  post1919,
  post1920,
  post1921,
  post1922,
  post1923,
  post1924,
  post1925,
  post1926,
  post1927,
  post1928,
  post1929,
  post1930,
  post1931,
  post1932,
  post1933,
  post1934,
  post1935,
  post1936,
  post1937,
  post1938,
  post1939,
  post1940,
  post1941,
  post1942,
  post1943,
  post1944,
  post1945,
  post1946,
  post1947,
  post1948,
  post1949,
  post1950,
  post1951,
  post1952,
  post1953,
  post1954,
  post1955,
  post1956,
  post1957,
  post1958,
  post1959,
  post1960,
  post1961,
  post1962,
  post1963,
  post1964,
  post1965,
  post1966,
  post1967,
  post1968,
  post1969,
  post1970,
  post1971,
  post1972,
  post1973,
  post1974,
  post1975,
  post1976,
  post1977,
  post1978,
  post1979,
  post1980,
  post1981,
  post1982,
  post1983,
  post1984,
  post1985,
  post1986,
  post1987,
  post1988,
  post1989,
  post1990,
  post1991,
  post1992,
  post1993,
  post1994,
  post1995,
  post1996,
  post1997,
  post1998,
  post1999,
  post2000,
  post2001,
  post2002,
  post2003,
  post2004,
  post2005,
  post2006,
  post2007,
  post2008,
  post2009,
  post2010,
  post2011,
  post2012,
  post2013,
  post2014,
  post2015,
  post2016,
  post2017,
  post2018,
  post2019,
  post2020,
  post2021,
  post2022,
  post2023,
  post2024,
  post2025,
  post2026,
  post2027,
  post2028,
  post2029,
  post2030,
  post2031,
  post2032,
  post2033,
  post2034,
  post2035,
  post2036,
  post2037,
  post2038,
  post2039,
  post2040,
  post2041,
  post2042,
  post2043,
  post2044,
  post2045,
  post2046,
  post2047,
  post2048,
  post2049,
  post2050,
  post2051,
  post2052,
  post2053,
  post2054,
  post2055,
  post2056,
  post2057,
  post2058,
  post2059,
  post2060,
  post2061,
  post2062,
  post2063,
  post2064,
  post2065,
  post2066,
  post2067,
  post2068,
  post2069,
  post2070,
  post2071,
  post2072,
  post2073,
  post2074,
  post2075,
  post2076,
  post2077,
  post2078,
  post2079,
  post2080,
  post2081,
  post2082,
  post2083,
  post2084,
  post2085,
  post2086,
  post2087,
  post2088,
  post2089,
  post2090,
  post2091,
  post2092,
  post2093,
  post2094,
  post2095,
  post2096,
  post2097,
  post2098,
  post2099,
  post2100,
  post2101,
  post2102,
  post2103,
  post2104,
  post2105,
  post2106,
  post2107,
  post2108,
  post2109,
  post2110,
  post2111,
  post2112,
  post2113,
  post2114,
  post2115,
  post2116,
  post2117,
  post2118,
  post2119,
  post2120,
  post2121,
  post2122,
  post2123,
  post2124,
  post2125,
  post2126,
  post2127,
  post2128,
  post2129,
  post2130,
  post2131,
  post2132,
  post2133,
  post2134,
  post2135,
  post2136,
  post2137,
  post2138,
  post2139,
  post2140,
  post2141,
  post2142,
  post2143,
  post2144,
  post2145,
  post2146,
  post2147,
  post2148,
  post2149,
  post2150,
  post2151,
  post2152,
  post2153,
  post2154,
  post2155,
  post2156,
  post2157,
  post2158,
  post2159,
  post2160,
  post2161,
  post2162,
  post2163,
  post2164,
  post2165,
  post2166,
  post2167,
  post2168,
  post2169,
  post2170,
  post2171,
  post2172,
  post2173,
  post2174,
  post2175,
  post2176,
  post2177,
  post2178,
  post2179,
  post2180,
  post2181,
  post2182,
  post2183,
  post2184,
  post2185,
  post2186,
  post2187,
  post2188,
  post2189,
  post2190,
  post2191,
  post2192,
  post2193,
  post2194,
  post2195,
  post2196,
  post2197,
  post2198,
  post2199,
  post2200,
  post2201,
  post2202,
  post2203,
  post2204,
  post2205,
  post2206,
  post2207,
  post2208,
  post2209,
  post2210,
  post2211,
  post2212,
  post2213,
  post2214,
  post2215,
  post2216,
  post2217,
  post2218,
  post2219,
  post2220,
  post2221,
  post2222,
  post2223,
  post2224,
  post2225,
  post2226,
  post2227,
  post2228,
  post2229,
  post2230,
  post2231,
  post2232,
  post2233,
  post2234,
  post2235,
  post2236,
  post2237,
  post2238,
  post2239,
  post2240,
  post2241,
  post2242,
  post2243,
  post2244,
  post2245,
  post2246,
  post2247,
  post2248,
  post2249,
  post2250,
  post2251,
  post2252,
  post2253,
  post2254,
  post2255,
  post2256,
  post2257,
  post2258,
  post2259,
  post2260,
  post2261,
  post2262,
  post2263,
  post2264,
  post2265,
  post2266,
  post2267,
  post2268,
  post2269,
  post2270,
  post2271,
  post2272,
  post2273,
  post2274,
  post2275,
  post2276,
  post2277,
  post2278,
  post2279,
  post2280,
  post2281,
  post2282,
  post2283,
  post2284,
  post2285,
  post2286,
  post2287,
  post2288,
  post2289,
  post2290,
  post2291,
  post2292,
  post2293,
  post2294,
  post2295,
  post2296,
  post2297,
  post2298,
  post2299,
  post2300,
  post2301,
  post2302,
  post2303,
  post2304,
  post2305,
  post2306,
  post2307,
  post2308,
  post2309,
  post2310,
  post2311,
  post2312,
  post2313,
  post2314,
  post2315,
  post2316,
  post2317,
  post2318,
  post2319,
  post2320,
  post2321,
  post2322,
  post2323,
  post2324,
  post2325,
  post2326,
  post2327,
  post2328,
  post2329,
  post2330,
  post2331,
  post2332,
  post2333,
  post2334,
  post2335,
  post2336,
  post2337,
  post2338,
  post2339,
  post2340,
  post2341,
  post2342,
  post2343,
  post2344,
  post2345,
  post2346,
  post2347,
  post2348,
  post2349,
  post2350,
  post2351,
  post2352,
  post2353,
  post2354,
  post2355,
  post2356,
  post2357,
  post2358,
  post2359,
  post2360,
  post2361,
  post2362,
  post2363,
  post2364,
  post2365,
  post2366,
  post2367,
  post2368,
  post2369,
  post2370,
  post2371,
  post2372,
  post2373,
  post2374,
  post2375,
  post2376,
  post2377,
  post2378,
  post2379,
  post2380,
  post2381,
  post2382,
  post2383,
  post2384,
  post2385,
  post2386,
  post2387,
  post2388,
  post2389,
  post2390,
  post2391,
  post2392,
  post2393,
  post2394,
  post2395,
  post2396,
  post2397,
  post2398,
  post2399,
  post2400,
  post2401,
  post2402,
  post2403,
  post2404,
  post2405,
  post2406,
  post2407,
  post2408,
  post2409,
  post2410,
  post2411,
  post2412,
  post2413,
  post2414,
  post2415,
  post2416,
  post2417,
  post2418,
  post2419,
  post2420,
  post2421,
  post2422,
  post2423,
  post2424,
  post2425,
  post2426,
  post2427,
  post2428,
  post2429,
  post2430,
  post2431,
  post2432,
  post2433,
  post2434,
  post2435,
  post2436,
  post2437,
  post2438,
  post2439,
  post2440,
  post2441,
  post2442,
  post2443,
  post2444,
  post2445,
  post2446,
  post2447,
  post2448,
  post2449,
  post2450,
  post2451,
  post2452,
  post2453,
  post2454,
  post2455,
  post2456,
  post2457,
  post2458,
  post2459,
  post2460,
  post2461,
  post2462,
  post2463,
  post2464,
  post2465,
  post2466,
  post2467,
  post2468,
  post2469,
  post2470,
  post2471,
  post2472,
  post2473,
  post2474,
  post2475,
  post2476,
  post2477,
  post2478,
  post2479,
  post2480,
  post2481,
  post2482,
  post2483,
  post2484,
  post2485,
  post2486,
  post2487,
  post2488,
  post2489,
  post2490,
  post2491,
  post2492,
  post2493,
  post2494,
  post2495,
  post2496,
  post2497,
  post2498,
  post2499,
  post2500,
  post2501,
  post2502,
  post2503,
  post2504,
  post2505,
  post2506,
  post2507,
  post2508,
  post2509,
  post2510,
  post2511,
  post2512,
  post2513,
  post2514,
  post2515,
  post2516,
  post2517,
  post2518,
  post2519,
  post2520,
  post2521,
  post2522,
  post2523,
  post2524,
  post2525,
  post2526,
  post2527,
  post2528,
  post2529,
  post2530,
  post2531,
  post2532,
  post2533,
  post2534,
  post2535,
  post2536,
  post2537,
  post2538,
  post2539,
  post2540,
  post2541,
  post2542,
  post2543,
  post2544,
  post2545,
  post2546,
  post2547,
  post2548,
  post2549,
  post2550,
  post2551,
  post2552,
  post2553,
  post2554,
  post2555,
  post2556,
  post2557,
  post2558,
  post2559,
  post2560,
  post2561,
  post2562,
  post2563,
  post2564,
  post2565,
  post2566,
  post2567,
  post2568,
  post2569,
  post2570,
  post2571,
  post2572,
  post2573,
  post2574,
  post2575,
  post2576,
  post2577,
  post2578,
  post2579,
  post2580,
  post2581,
  post2582,
  post2583,
  post2584,
  post2585,
  post2586,
  post2587,
  post2588,
  post2589,
  post2590,
  post2591,
  post2592,
  post2593,
  post2594,
  post2595,
  post2596,
  post2597,
  post2598,
  post2599,
  post2600,
  post2601,
  post2602,
  post2603,
  post2604,
  post2605,
  post2606,
  post2607,
  post2608,
  post2609,
  post2610,
  post2611,
  post2612,
  post2613,
  post2614,
  post2615,
  post2616,
  post2617,
  post2618,
  post2619,
  post2620,
  post2621,
  post2622,
  post2623,
  post2624,
  post2625,
  post2626,
  post2627,
  post2628,
  post2629,
  post2630,
  post2631,
  post2632,
  post2633,
  post2634,
  post2635,
  post2636,
  post2637,
  post2638,
  post2639,
  post2640,
  post2641,
  post2642,
  post2643,
  post2644,
  post2645,
  post2646,
  post2647,
  post2648,
  post2649,
  post2650,
  post2651,
  post2652,
  post2653,
  post2654,
  post2655,
  post2656,
  post2657,
  post2658,
  post2659,
  post2660,
  post2661,
  post2662,
  post2663,
  post2664,
  post2665,
  post2666,
  post2667,
  post2668,
  post2669,
  post2670,
  post2671,
  post2672,
  post2673,
  post2674,
  post2675,
  post2676,
  post2677,
  post2678,
  post2679,
  post2680,
  post2681,
  post2682,
  post2683,
  post2684,
  post2685,
  post2686,
  post2687,
  post2688,
  post2689,
  post2690,
  post2691,
  post2692,
  post2693,
  post2694,
  post2695,
  post2696,
  post2697,
  post2698,
  post2699,
  post2700,
  post2701,
  post2702,
  post2703,
  post2704,
  post2705,
  post2706,
  post2707,
  post2708,
  post2709,
  post2710,
  post2711,
  post2712,
  post2713,
  post2714,
  post2715,
  post2716,
  post2717,
  post2718,
  post2719,
  post2720,
  post2721,
  post2722,
  post2723,
  post2724,
  post2725,
  post2726,
  post2727,
  post2728,
  post2729,
  post2730,
  post2731,
  post2732,
  post2733,
  post2734,
  post2735,
  post2736,
  post2737,
  post2738,
  post2739,
  post2740,
  post2741,
  post2742,
  post2743,
  post2744,
  post2745,
  post2746,
  post2747,
  post2748,
  post2749,
  post2750,
  post2751,
  post2752,
  post2753,
  post2754,
  post2755,
  post2756,
  post2757,
  post2758,
  post2759,
  post2760,
  post2761,
  post2762,
  post2763,
  post2764,
  post2765,
  post2766,
  post2767,
  post2768,
  post2769,
  post2770,
  post2771,
  post2772,
  post2773,
  post2774,
  post2775,
  post2776,
  post2777,
  post2778,
  post2779,
  post2780,
  post2781,
  post2782,
  post2783,
  post2784,
  post2785,
  post2786,
  post2787,
  post2788,
  post2789,
  post2790,
  post2791,
  post2792,
  post2793,
  post2794,
  post2795,
  post2796,
  post2797,
  post2798,
  post2799,
  post2800,
  post2801,
  post2802,
  post2803,
  post2804,
  post2805,
  post2806,
  post2807,
  post2808,
  post2809,
  post2810,
  post2811,
  post2812,
  post2813,
  post2814,
  post2815,
  post2816,
  post2817,
  post2818,
  post2819,
  post2820,
  post2821,
  post2822,
  post2823,
  post2824,
  post2825,
  post2826,
  post2827,
  post2828,
  post2829,
  post2830,
  post2831,
  post2832,
  post2833,
  post2834,
  post2835,
  post2836,
  post2837,
  post2838,
  post2839,
  post2840,
  post2841,
  post2842,
  post2843,
  post2844,
  post2845,
  post2846,
  post2847,
  post2848,
  post2849,
  post2850,
  post2851,
  post2852,
];

function normalizeBlogLanguage(value: string | undefined): BlogLanguage {
  switch (value) {
    case 'en':
    case 'fr':
    case 'de':
    case 'pt':
    case 'it':
    case 'nl':
    case 'sv':
      return value;
    case 'es':
    default:
      return 'es';
  }
}

export const blogPosts: StaticBlogPost[] = [...rawPosts]
  .map(post => ({
    ...post,
    language: normalizeBlogLanguage(post.language),
    // Compatibilidad histórica: si no hay país guardado, asumimos ES para posts legacy.
    countryCode: resolvePostCountryCode(post.countryCode),
  }))
  .sort((a, b) => (a.publishedAt > b.publishedAt ? -1 : 1));

export function getBlogPostsByLanguage(language: BlogLanguage, countryCode?: string | null) {
  const scopedCountry = normalizeBlogCountryCode(countryCode);
  const countryScopedPosts = scopedCountry
    ? blogPosts.filter(post => post.countryCode === scopedCountry)
    : blogPosts;

  const filteredByLanguage = countryScopedPosts.filter(post => post.language === language);
  return filteredByLanguage.length > 0 ? filteredByLanguage : countryScopedPosts;
}

export function findBlogPostBySlug(
  slug: string,
  language?: BlogLanguage,
  countryCode?: string | null
) {
  const scopedCountry = normalizeBlogCountryCode(countryCode);
  const countryScopedPosts = scopedCountry
    ? blogPosts.filter(post => post.countryCode === scopedCountry)
    : blogPosts;

  if (language) {
    const localized = countryScopedPosts.find(
      post => post.slug === slug && post.language === language
    );
    if (localized) return localized;
  }
  return countryScopedPosts.find(post => post.slug === slug);
}

export function computeReadingMinutes(content: string, fallback?: number | null) {
  if (fallback && Number.isFinite(fallback)) {
    return fallback;
  }
  const words = content.split(/\s+/).filter(Boolean);
  if (words.length === 0) return null;
  return Math.max(1, Math.round(words.length / 220));
}
