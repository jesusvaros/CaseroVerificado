import React, { useEffect, useMemo, useState } from 'react';
import { upsertBlogAiComments, deleteBlogAiComments, type BlogAiComment } from '../../services/supabase/blogAiComments';

type BlogCommentsSectionProps = {
  postSlug: string;
};

const personaPool = [
  // Nombres
  'Alex', 'Laura', 'Juan', 'Marta', 'Carlos', 'Sofia', 'David', 'Lucia', 'Pablo', 'Ana', 'Sergio', 'Elena',
  'Diego', 'Natalia', 'Ruben', 'Paula', 'Adrian', 'Clara', 'Javier', 'Irene', 'Marcos', 'Noelia', 'Alberto',
  'Patricia', 'Raul', 'Cristina', 'Daniel', 'Monica', 'Guillermo', 'Silvia',
  // Apellidos
  'Moreno', 'Gomez', 'Perez', 'Rodriguez', 'Lopez', 'Sanchez', 'Ruiz', 'Martin', 'Navarro', 'Torres', 'Vidal',
  'Castro', 'Ferrer', 'Ortiz', 'Herrera', 'Ramos', 'Flores', 'Dominguez', 'Suarez', 'Molina', 'Blanco', 'Garcia',
  'Mendez', 'Soto', 'Romero', 'Vargas', 'Iglesias', 'Luna', 'Pena', 'Cruz',
  // Motes / nicks
  'ElGato', 'LaRubia', 'ElProfe', 'LaJefa', 'ElChino', 'LaNena', 'ElFlaco', 'ElTio', 'LaCrack', 'ElJefe',
  'LaPantera', 'ElToro', 'ElMago', 'LaBruja', 'ElMono', 'ElViejo', 'LaReina', 'ElPirata', 'ElLoco', 'LaSombra',
  'PanConQueso', 'CafeySuenos', 'SinDormir', 'SoyEse', 'OtroMas', 'NoSeQuePoner', 'DonNadie', 'HolaQueTal',
  'YoMismo', 'ElDeSiempre', 'MateYFacturas', 'PizzaLover', 'SiPeroNo', 'CasiGenio', 'MedioListo', 'AlBorde',
  'RandomUser', 'Probando123', 'TeLeo', 'SinFiltro',
  // Internet style / cortos / abstractos
  'pixelero', 'devmode', 'bitflow', 'neonwave', 'cloudmind', 'dataroot', 'nightcode', 'softlayer', 'openfile',
  'lazybyte', 'bluecursor', 'stacklife', 'darktheme', 'zerolag', 'fastclick', 'lowbattery', 'ghostuser',
  'silentmode', 'wiredmind', 'draftpost', 'mono', 'beta', 'delta', 'echo', 'nova', 'flux', 'zen', 'halo', 'core',
  'node', 'loop', 'dash', 'peak', 'wave', 'root', 'void', 'spark', 'atom', 'byte', 'link', 'bluur', 'noxx',
  'qwerty', 'zeta9', 'nuller', 'xframe', 'yaxis', 'kappa', 'rando', 'vektor', 'glitch', 'frgmnt', 'echoid',
  '_shift', 'softx', 'hardy', 'drift', 'offset', 'modulo', 'cache',
];

const bannedPlaceholders = ['Inquilino veterano', 'Nómada digital', 'Vecino atento', 'Estudiante', 'Madre de familia', 'Joven pareja'];

function sanitizeAuthorName(name: string | null | undefined): string {
  if (!name) return pickSeeded(personaPool, 'sanitize-name', 0);
  if (bannedPlaceholders.some(b => b.toLowerCase() === name.toLowerCase())) {
    return pickSeeded(personaPool, 'sanitize-name', 1);
  }
  return name;
}

// Simple deterministic hash function to generate consistent hashes from strings
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// Generate a deterministic random number based on the post slug and index
function seededRandom(seed: string, index: number): number {
  const x = Math.sin(hashString(`${seed}-${index}`)) * 10000;
  return x - Math.floor(x);
}

// Pick a random item from an array using a seed
function pickSeeded<T>(items: T[], seed: string, index: number): T {
  const rand = seededRandom(seed, index);
  return items[Math.floor(rand * items.length)];
}

// Generate a deterministic date based on the post slug and index
function generateSeededDate(seed: string, index: number, daysBack = 90): string {
  const now = Date.now();
  // Use a wider range and more variation in dates
  const daysAgo = Math.floor(seededRandom(seed, index) * daysBack) + 7; // At least 7 days ago
  const date = new Date(now - daysAgo * 24 * 60 * 60 * 1000);
  
  // Add some random hours and minutes to make it more realistic
  const hours = Math.floor(seededRandom(`${seed}-hours-${index}`, 0) * 24);
  const minutes = Math.floor(seededRandom(`${seed}-minutes-${index}`, 0) * 60);
  
  date.setHours(hours, minutes, 0, 0);
  
  return date.toISOString();
}

const BlogCommentsSection: React.FC<BlogCommentsSectionProps> = ({ postSlug }) => {
  const [aiComments, setAiComments] = useState<BlogAiComment[]>([]);
  const [loadingAiComments, setLoadingAiComments] = useState<boolean>(false);

  // Comment templates with more variety and natural language
  const commentTemplates = useMemo(() => [
    // Personal experience with specific details
    (index: number) => {
      const experiences = [
        `En mi edificio de ${pickSeeded(['10', '15', '20', '25'], `${postSlug}-floors-${index}`, 0)} viviendas, ya se han ido ${pickSeeded(['tres', 'cuatro', 'varias'], `${postSlug}-families-${index}`, 0)} familias este año por las subidas de alquiler.`,
        `Llevo ${pickSeeded(['6', '8', '12', '18'], `${postSlug}-months-${index}`, 0)} meses buscando piso y es imposible encontrar algo asequible en la zona.`,
        `El año pasado me subieron el alquiler un ${pickSeeded(['15%', '20%', '25%', '30%'], `${postSlug}-increase-${index}`, 0)} y tuve que buscar otra vivienda.`,
        `Varias personas de mi entorno han tenido que compartir piso para poder hacer frente a los precios actuales.`,
        `En mi barrio, los alquileres han subido una media del ${pickSeeded(['20%', '25%', '30%', '35%'], `${postSlug}-avg-increase-${index}`, 0)} en los últimos dos años.`,
      ];
      
      const reactions = [
        ' La situación se está volviendo insostenible para muchas familias.',
        ' ¿Hasta cuándo podrá aguantar la gente con estas subidas?',
        ' Algo tendrá que cambiar pronto en el mercado de la vivienda.',
        ' Me preocupa especialmente cómo afecta esto a los jóvenes.',
        ' ¿Qué soluciones propondríais para mejorar esta situación?',
      ];
      
      return `${pickSeeded(experiences, `${postSlug}-exp-${index}`, 0)}${pickSeeded(reactions, `${postSlug}-react-${index}`, 0)}`;
    },
    
    // Short reactions with more variety and natural language
    (index: number) => {
      const shortComments = [
        'Interesante análisis. Comparto muchos de los puntos que mencionas.',
        'Gracias por compartir esta información, ayuda a entender mejor la situación actual.',
        '¿Qué medidas concretas crees que podrían mejorar la situación?',
        'El artículo refleja muy bien la realidad que estamos viviendo en el sector inmobiliario.',
        'Me ha gustado especialmente cómo se aborda este tema tan complejo.',
        'Sería interesante profundizar en posibles alternativas y soluciones.',
        'La situación actual es más preocupante de lo que parece a simple vista.',
        '¿Conoces alguna iniciativa que esté dando buenos resultados en otros lugares?',
        'Ojalá las administraciones tomen medidas efectivas pronto.',
        'Gracias por visibilizar este problema que afecta a tantas personas.',
      ];
      return pickSeeded(shortComments, `${postSlug}-short-${index}`, 0);
    },
    
    // Questions and discussions
    (index: number) => {
      const questions = [
        `¿Cómo está la situación en ${pickSeeded(['otras ciudades', 'el área metropolitana', 'los pueblos cercanos'], `${postSlug}-location-${index}`, 0)}?`,
        '¿Existen plataformas donde los afectados puedan organizarse?',
        '¿Qué opinas sobre las últimas medidas anunciadas por el gobierno?',
        '¿Algún profesional que pueda asesorar sobre los derechos de los inquilinos?',
        '¿Conoces asociaciones que estén trabajando en este ámbito?',
      ];
      
      const context = [
        ' Llevo tiempo buscando alternativas sin mucho éxito.',
        ' Me preocupa especialmente cómo afecta esto a los colectivos más vulnerables.',
        ' Creo que entre todos podemos encontrar soluciones creativas.',
        ' Me interesaría conocer tu punto de vista al respecto.',
      ];
      
      return `${pickSeeded(questions, `${postSlug}-q-${index}`, 0)}${pickSeeded(context, `${postSlug}-ctx-${index}`, 0)}`;
    },
    
    // Personal stories with more variety
    (index: number) => {
      const stories = [
        `El piso donde llevo viviendo ${pickSeeded(['5', '7', '10'], `${postSlug}-years-${index}`, 0)} años va a ser reformado, lo que supondrá una subida del alquiler del ${pickSeeded(['35%', '40%', '50%'], `${postSlug}-hike-${index}`, 0)}.`,
        `Mis hijos, el menor de ${pickSeeded(['28', '30', '32'], `${postSlug}-age-${index}`, 0)} años, no pueden permitirse independizarse debido a los precios actuales.`,
        `En mi comunidad de vecinos, ya son ${pickSeeded(['tres', 'cuatro', 'varias'], `${postSlug}-moved-${index}`, 0)} las familias que han tenido que mudarse por las subidas de alquiler.`,
        `Aunque trabajo en ${pickSeeded(['el centro', 'Barcelona', 'una gran empresa'], `${postSlug}-work-${index}`, 0)}, me vi obligado a trasladarme a ${pickSeeded(['un pueblo cercano', 'otra localidad', 'la periferia'], `${postSlug}-move-${index}`, 0)} para poder pagar un alquiler asequible.`,
        `Conozco varios casos de parejas jóvenes que han tenido que posponer sus planes de formar una familia por la situación del mercado inmobiliario.`,
      ];
      
      const feelings = [
        ' La situación es realmente preocupante.',
        ' No sé muy bien cómo afrontar esta situación.',
        ' Me gustaría saber si más personas están pasando por lo mismo.',
        ' Espero que se encuentren soluciones pronto.',
        ' ¿Alguna sugerencia sobre cómo gestionar esta situación?',
      ];
      
      // Sometimes add a feeling, sometimes not
      const shouldAddFeeling = seededRandom(`${postSlug}-addfeeling-${index}`, 0) > 0.3;
      return shouldAddFeeling 
        ? `${pickSeeded(stories, `${postSlug}-story-${index}`, 0)}${pickSeeded(feelings, `${postSlug}-feel-${index}`, 0)}`
        : pickSeeded(stories, `${postSlug}-story-${index}`, 0);
    },
    
    // Data and statistics with more natural phrasing
    (index: number) => {
      const dataPoints = [
        `Según los últimos informes, los alquileres han experimentado una subida del ${pickSeeded(['15%', '18%', '20%'], `${postSlug}-rise-${index}`, 0)} en el último año.`,
        `En ${pickSeeded(['Barcelona', 'esta zona', 'la ciudad'], `${postSlug}-area-${index}`, 0)}, el precio medio de los alquileres supera los ${pickSeeded(['1000', '1100', '1200'], `${postSlug}-price-${index}`, 0)} euros mensuales.`,
        `Cada vez son más las personas que dedican más del ${pickSeeded(['40%', '45%', '50%'], `${postSlug}-income-${index}`, 0)} de sus ingresos al pago del alquiler.`,
        `En los últimos ${pickSeeded(['dos', 'tres', 'cinco'], `${postSlug}-years-${index}`, 0)} años, el precio de los alquileres ha aumentado un ${pickSeeded(['25%', '30%', '35%'], `${postSlug}-total-rise-${index}`, 0)}.`,
        `Solo una de cada ${pickSeeded(['cuatro', 'cinco', 'seis'], `${postSlug}-affordable-${index}`, 0)} viviendas en alquiler resulta asequible para familias con ingresos medios.`,
      ];
      
      const analysis = [
        ' Los datos son bastante elocuentes.',
        ' ¿Hasta cuándo podrá mantenerse esta situación?',
        ' Es evidente que se necesitan cambios en el sector.',
        ' Son cifras que invitan a la reflexión.',
      ];
      
      return `${pickSeeded(dataPoints, `${postSlug}-data-${index}`, 0)}${pickSeeded(analysis, `${postSlug}-anal-${index}`, 0)}`;
    },
    
    // Suggestions and advice
    (index: number) => {
      const suggestions = [
        `Una opción que podría ayudar sería ${pickSeeded(['regular los precios', 'incentivar el alquiler a largo plazo', 'aumentar la oferta de vivienda protegida'], `${postSlug}-suggestion-${index}`, 0)}.`,
        `Quizás sería interesante ${pickSeeded(['crear más ayudas al alquiler', 'fomentar la rehabilitación de viviendas vacías', 'impulsar el cooperativismo de vivienda'], `${postSlug}-idea-${index}`, 0)}.`,
        `En otros países han tenido éxito con medidas como ${pickSeeded(['el control de alquileres', 'la limitación de subidas anuales', 'la promoción de vivienda social'], `${postSlug}-measure-${index}`, 0)}.`,
        `Una posible solución pasaría por ${pickSeeded(['revisar la fiscalidad de las viviendas vacías', 'agilizar los trámites de construcción', 'mejorar el transporte público a zonas más asequibles'], `${postSlug}-solution-${index}`, 0)}.`,
      ];
      
      const reflections = [
        ' ¿Qué opináis sobre esta propuesta?',
        ' Me gustaría conocer vuestra experiencia al respecto.',
        ' ¿Creéis que sería una medida efectiva?',
        ' ¿Se os ocurren otras alternativas?',
      ];
      
      return `${pickSeeded(suggestions, `${postSlug}-suggestion-${index}`, 0)}${pickSeeded(reflections, `${postSlug}-reflection-${index}`, 0)}`;
    }
  ], [postSlug]);

  useEffect(() => {
    let isMounted = true;
    setLoadingAiComments(true);

    // Generate AI comments with better variety and no repetition
    const generateAiComments = async (slug: string, count: number): Promise<BlogAiComment[]> => {
      const comments: BlogAiComment[] = [];
      const usedTemplates = new Set<number>();
      const recentContents = new Set<string>();
      
      // Banned phrases to avoid
      const bannedPhrases = [
        'Sobre "', 
        'me quedo con la idea principal',
        'artículo interesante',
        'gracias por compartir',
        'confirmo, la información',
        'en mi experiencia,',
        'me parece útil'
      ];

      // Generate comments
      for (let i = 0; i < count; i++) {
        let attempts = 0;
        const maxAttempts = 10;
        let comment: BlogAiComment | null = null;
        
        while (attempts < maxAttempts && !comment) {
          const templateIndex = Math.floor(seededRandom(`${slug}-${i}-${attempts}`, 0) * commentTemplates.length);
          const template = commentTemplates[templateIndex];
          
          // Generate content and clean it
          let content = template(i)
            .replace(/^[,\s.]+/, '')
            .replace(/[\s.]+$/, '')
            .trim();
          
          // Capitalize first letter
          content = content.charAt(0).toUpperCase() + content.slice(1);
          
          // Check for banned phrases
          const hasBannedPhrase = bannedPhrases.some(phrase => 
            content.toLowerCase().includes(phrase.toLowerCase())
          );
          
          // Check for duplicates
          const isDuplicate = Array.from(recentContents).some(c => 
            c.toLowerCase() === content.toLowerCase() ||
            c.toLowerCase().includes(content.toLowerCase()) ||
            content.toLowerCase().includes(c.toLowerCase())
          );
          
          if (!hasBannedPhrase && !isDuplicate && content.length > 20) {
            // Generate a unique author name for each comment
            const authorSeed = `${slug}-author-${i}-${attempts}`;
            const authorName = (() => {
              const nameCount = seededRandom(authorSeed, 0) * 3;
              let name = '';
              
              if (nameCount < 1) {
                name = pickSeeded(personaPool.slice(0, 40), `${authorSeed}-first`, 0); // Only names
              } else if (nameCount < 2) {
                const firstName = pickSeeded(personaPool.slice(0, 40), `${authorSeed}-first`, 0);
                const lastName = pickSeeded(personaPool.slice(40, 80), `${authorSeed}-last`, 0);
                name = `${firstName} ${lastName}`;
              } else {
                name = pickSeeded(personaPool.slice(80), `${authorSeed}-nick`, 0); // Only nicks
              }
              
              return sanitizeAuthorName(name);
            })();
            
            comment = {
              id: `ai-${slug}-${Date.now()}-${i}`,
              post_slug: slug,
              ordinal: i + 1,
              author_name: authorName,
              content: content.slice(0, 800),
              created_at: generateSeededDate(slug, i),
              is_auto: true,
            };
            comments.push(comment);
            recentContents.add(content);
            usedTemplates.add(templateIndex);
            
            // Keep only the last 10 comments to check against
            if (recentContents.size > 10) {
              const first = Array.from(recentContents)[0];
              recentContents.delete(first);
            }
          }
          
          attempts++;
        }
        
        // If we couldn't generate a valid comment, use a fallback
        if (!comment && comments.length === 0) {
          const authorSeed = `${slug}-author-fallback-${i}`;
          const authorName = (() => {
            const nameCount = seededRandom(authorSeed, 0) * 3;
            let name = '';
            
            if (nameCount < 1) {
              name = pickSeeded(personaPool.slice(0, 40), `${authorSeed}-first`, 0);
            } else if (nameCount < 2) {
              const firstName = pickSeeded(personaPool.slice(0, 40), `${authorSeed}-first`, 0);
              const lastName = pickSeeded(personaPool.slice(40, 80), `${authorSeed}-last`, 0);
              name = `${firstName} ${lastName}`;
            } else {
              name = pickSeeded(personaPool.slice(80), `${authorSeed}-nick`, 0);
            }
            
            return sanitizeAuthorName(name);
          })();
          
          comment = {
            id: `ai-${slug}-fallback-${i}`,
            post_slug: slug,
            ordinal: i + 1,
            author_name: authorName,
            content: 'Este artículo plantea puntos interesantes sobre la situación de la vivienda.',
            created_at: generateSeededDate(slug, i),
            is_auto: true,
          };
          comments.push(comment);
        }
      }
      
      return comments;
    };

    const loadAndGenerateComments = async () => {
      try {
        // First, delete any existing AI comments
        await deleteBlogAiComments(postSlug);
        
        // Then generate new ones
        const commentCount = Math.max(2, Math.floor(seededRandom(postSlug, 0) * 4) + 2);
        const newComments = await generateAiComments(postSlug, commentCount);
        
        // Save the new comments
        const saved = await upsertBlogAiComments(
          postSlug,
          newComments
        );

        if (isMounted && saved) {
          setAiComments(saved);
        }
      } catch (error) {
        console.error('Error generating AI comments:', error);
      } finally {
        if (isMounted) {
          setLoadingAiComments(false);
        }
      }
    };

    loadAndGenerateComments();

    return () => {
      isMounted = false;
    };
  }, [postSlug, commentTemplates]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Comentarios</h2>
      
      {/* Comments list */}
      <div className="space-y-6">
        {loadingAiComments ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-500"></div>
          </div>
        ) : aiComments.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            No hay comentarios aún
          </p>
        ) : (
          <div className="space-y-6">
            {aiComments.map((comment) => {
              const authorName = sanitizeAuthorName(comment.author_name || undefined);
              return (
                <div
                  key={comment.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-300 font-bold">
                      {authorName.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          {authorName}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(comment.created_at).toLocaleDateString('es-ES', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCommentsSection;
