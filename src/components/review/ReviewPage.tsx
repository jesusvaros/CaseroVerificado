import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabaseWrapper } from '../../services/supabase/client';
import { useAuth } from '../../store/auth/hooks';
import { getAddressStep1Data } from '../../services/supabase/GetSubmitStep1';
import { getSessionStep2Data } from '../../services/supabase/GetSubmitStep2';
import { getSessionStep3Data } from '../../services/supabase/GetSubmitStep3';
import { getSessionStep4Data } from '../../services/supabase/GetSubmitStep4';
import { getSessionStep5Data } from '../../services/supabase/GetSubmitStep5';
import { trackEvent } from '../../utils/analytics';
import PageSEO from '../../seo/PageSEO';
import { LEGAL_META } from '../../config/legal';

// Importar componentes de sección
import ScoresSection from './ScoresSection';
import ReviewHero from './ReviewHero';
import ReviewFacts from './ReviewFacts';
import ReviewTagChips from './ReviewTagChips';
import { hasScores } from './reviewScores';
import PropertySection from './PropertySection';
import CommunitySection from './CommunitySection';
import AddressPublicData from '../address-data/AddressPublicData';
import { addressPath } from '../../utils/addressPath';

interface Step1Data {
  address_details: {
    street?: string;
    number?: string;
    floor?: string;
    door?: string;
    city?: string;
    postalCode?: string;
    coordinates?: { lat: number; lng: number };
    components?: { postcode?: string; city?: string; house_number?: string };
  };
}

interface Step2Data {
  start_year: number;
  end_year: number | null;
  price: number;
  included_services: string[] | null;
  would_recommend?: '1'|'2'|'3'|'4'|'5';
  deposit_returned?: string | undefined;
  owner_score?: number | null;
  property_score?: number | null;
  building_score?: number | null;
  area_score?: number | null;
  tags?: string[] | null;
  rental_type?: string | null;
}

interface Step3Data {
  summer_temperature: 'Bien aislado' | 'Correcto' | 'Caluroso';
  winter_temperature: 'Bien aislado' | 'Correcto' | 'Frío';
  noise_level: 'Silencioso' | 'Tolerable' | 'Bastante' | 'Se oye todo';
  light_level: 'Nada de luz' | 'Poca luz' | 'Luminoso' | 'Muy luminoso';
  maintenance_status: 'Como nuevo' | 'Bueno' | 'Aceptable' | 'Poco' | 'Malo';
  property_opinion?: string;
}

interface Step4Data {
  neighbor_types?: string[];
  tourist_apartments?: 'Sí, tolerable' | 'Sí, molestos' | 'No hay';
  building_cleanliness?: 'Muy limpio' | 'Buena' | 'Poca' | 'Sin limpieza';
  community_environment?: string[];
  community_security?: 'Muy segura' | 'Sin problemas' | 'Mejorable' | 'Poco segura';
  community_opinion?: string;
}

interface Step5Data {
  owner_type?: 'Particular' | 'Agencia';
  owner_opinion?: string;
}

const ReviewPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUserReview, setIsUserReview] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [isPublicReview, setIsPublicReview] = useState(false);
  
  // Use the auth context
  const { user, isLoading } = useAuth();

    // Estados para cada paso
    const [step1Data, setStep1Data] = useState<Step1Data | null>(null);
    const [step2Data, setStep2Data] = useState<Step2Data | null>(null);
    const [step3Data, setStep3Data] = useState<Step3Data | null>(null);
    const [step4Data, setStep4Data] = useState<Step4Data | null>(null);
    const [step5Data, setStep5Data] = useState<Step5Data | null>(null);
  
    // Función para formatear la dirección como título
    const getAddressTitle = () => {
      if (!step1Data?.address_details) return 'Review de la propiedad';
  
      const { street, number, city } = step1Data.address_details;
      let title = '';
  
      if (street) title += street;
      if (number) title += ` ${number}`;
      if (city) title += `, ${city}`;
  
      return title || 'Review de la propiedad';
    };
  
    useEffect(() => {
      if (!id || isLoading) return;
  
      const fetchAllData = async () => {
        try {
          const client = supabaseWrapper.getClient();
          if (!client) {
            setError('Error de configuración de Supabase');
            return;
          }

          const { data: publicReview, error: publicError } = await client
            .from('public_reviews')
            .select('*')
            .eq('id', id)
            .maybeSingle();

            if (publicError) {
              console.error('Error fetching public review:', publicError);
            }
            if (publicReview) {
              // Public review found. Populate UI from public data and skip session checks.
              setIsUserReview(false);
              setIsValidated(!!publicReview.validated_at || !!publicReview.is_public);
              setIsPublicReview(true);

              // Step 1
              setStep1Data({
                address_details: publicReview.address_details,
              });

              // Step 2
              setStep2Data({
                start_year: publicReview.start_year,
                end_year: publicReview.end_year,
                price: publicReview.price,
                included_services: publicReview.included_services ?? null,
                would_recommend: publicReview.would_recommend ?? undefined,
                deposit_returned: publicReview.deposit_returned ?? undefined,
                owner_score: publicReview.owner_score,
                property_score: publicReview.property_score,
                building_score: publicReview.building_score,
                area_score: publicReview.area_score,
                tags: publicReview.tags,
              });

              // Step 3
              setStep3Data({
                summer_temperature: publicReview.summer_temperature,
                winter_temperature: publicReview.winter_temperature,
                noise_level: publicReview.noise_level,
                light_level: publicReview.light_level,
                maintenance_status: publicReview.maintenance_status,
                property_opinion: publicReview.property_opinion,
              });

              // Step 4
              setStep4Data({
                neighbor_types: publicReview.neighbor_types ?? [],
                tourist_apartments: publicReview.tourist_apartments,
                building_cleanliness: publicReview.building_cleanliness,
                community_environment: publicReview.community_environment ?? [],
                community_security: publicReview.community_security,
                community_opinion: publicReview.community_opinion,
              });

              // Step 5
              setStep5Data({
                owner_type: publicReview.owner_type,
                owner_opinion: publicReview.owner_opinion,
              });

              setLoading(false);
              return;
            }

  
          const { data: reviewSession, error: reviewError } = await client
            .from('review_sessions')
            .select('user_id, validated, step1_completed, step2_completed, step3_completed, step4_completed, step5_completed')
            .eq('id', id)
            .maybeSingle();
  
          if (reviewError || !reviewSession) {
            console.error('Error fetching review session:', reviewError);
            //navigate('/map');
            return;
          }
  
          const isOwnReview = !!user?.id && reviewSession.user_id === user?.id;
          setIsUserReview(isOwnReview);
          setIsValidated(reviewSession.validated);
  
          if (!reviewSession.validated && !isOwnReview) {
            navigate('/map');
            return;
          }
  
          if (isOwnReview) {
            const {
              step1_completed,
              step2_completed,
              step3_completed,
              step4_completed,
              step5_completed,
            } = reviewSession;
  
            if (!(step1_completed && step2_completed && step3_completed && step4_completed && step5_completed)) {
              if (!step1_completed) {
                navigate(`/add-review?step=1`);
                return;
              } else if (!step2_completed) {
                navigate(`/add-review?step=2`);
                return;
              } else if (!step3_completed) {
                navigate(`/add-review?step=3`);
                return;
              } else if (!step4_completed) {
                navigate(`/add-review?step=4`);
                return;
              } else if (!step5_completed) {
                navigate(`/add-review?step=5`);
                return;
              }
            }
          }
  
          const [step1, step2, step3, step4, step5] = await Promise.all([
            getAddressStep1Data(id),
            getSessionStep2Data(id),
            getSessionStep3Data(id),
            getSessionStep4Data(id),
            getSessionStep5Data(id),
          ]);
  
          setStep1Data(step1);
          setStep2Data(step2);
          setStep3Data(step3);
          setStep4Data(step4);
          setStep5Data(step5);
        } catch (err) {
          console.error('Error al cargar los datos:', err);
          setError('Error al cargar los datos de la revisión');
        } finally {
          setLoading(false);
        }
      };
  
      fetchAllData();
    }, [id, navigate, user?.id,isLoading]);
  
  // Fire review:submitted event only once when landing on review page
  useEffect(() => {
    if (!id) return;
    
    // Check if this is from OAuth flow (has sessionId in URL params)
    const urlParams = new URLSearchParams(window.location.search);
    const hasSessionId = urlParams.has('sessionId');
    
    // Clear localStorage if this review matches the stored session
    const storedSessionId = localStorage.getItem('reviewSessionIdBack');
    if (storedSessionId === id) {
      try {
        localStorage.removeItem('reviewSessionId');
        localStorage.removeItem('reviewSessionIdBack');
      } catch {
        // noop - storage may be unavailable
      }
    }
    
    // Only fire event if NOT from OAuth flow (avoids duplicates)
    if (!hasSessionId) {
      trackEvent('review:submitted', {
        authenticated: !!user,
        reviewId: id,
        sessionId: id,
        source: 'review_page',
        allStepsCompleted: true
      });
    }
  }, [id, user]);
  
  const details = step1Data?.address_details;
  const coordinates = details?.coordinates;
  const addressPagePath = addressPath(
    details?.city || details?.components?.city,
    details?.street,
    details?.number || details?.components?.house_number
  );
  const title = [details?.street, details?.number].filter(Boolean).join(' ') || 'Opinión de inquilino';
  const city = details?.city || details?.components?.city;
  const categoryScores = [step2Data?.owner_score, step2Data?.property_score, step2Data?.building_score, step2Data?.area_score].filter(
    (v): v is number => typeof v === 'number'
  );
  const score = categoryScores.length
    ? categoryScores.reduce((a, b) => a + b, 0) / categoryScores.length
    : step2Data?.would_recommend
      ? Number(step2Data.would_recommend)
      : null;

  // Reviews from the one-page form have no step 3 or step 4 answers: hide those sections.
  const hasAnswers = (data: object | null) =>
    !!data && Object.values(data).some(v => (Array.isArray(v) ? v.length > 0 : v != null && v !== ''));
  const opinions = [
    { title: 'El casero y la experiencia', text: step5Data?.owner_opinion },
    { title: 'El piso', text: step3Data?.property_opinion },
    { title: 'La comunidad', text: step4Data?.community_opinion },
  ].filter(o => o.text && o.text.trim());

  return (
    <div className="bg-white text-ink">
      <PageSEO
        title={`Opinión de inquilino: ${getAddressTitle()} | CaseroOk`}
        description={`Experiencia anónima de un inquilino en ${getAddressTitle()}: el piso, la comunidad y el trato con el casero.`}
        noindex={!isPublicReview}
      />
      <ReviewHero
        title={title}
        city={city}
        addressPath={isPublicReview ? addressPagePath : null}
        score={loading ? null : score}
        status={isPublicReview ? 'public' : isUserReview ? (isValidated ? 'published' : 'pending') : null}
      />

      {loading ? (
        <div className="mx-auto max-w-[1320px] px-5 py-16 md:px-[5%]">
          <div className="h-40 animate-pulse rounded-3xl bg-mist" aria-hidden="true" />
        </div>
      ) : error ? (
        <p className="mx-auto max-w-[1320px] px-5 py-16 text-coral-ink md:px-[5%]">{error}</p>
      ) : (
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-start gap-16 px-5 pb-24 pt-14 md:px-[5%]">
          <main className="flex min-w-0 flex-[999_1_600px] flex-col gap-12">
            {isUserReview && !isValidated && (
              <p className="rounded-2xl bg-mist p-5 text-[15px] leading-relaxed text-ink-soft">
                Gracias. Revisamos cada opinión a mano antes de publicarla, normalmente en uno o dos días. Nadie verá tu nombre ni tu email.
              </p>
            )}
            {hasScores(step2Data) && (
              <section className="flex flex-col gap-5">
                <h2 className="font-display text-3xl font-extrabold tracking-tight">La nota</h2>
                <ScoresSection scores={step2Data} />
              </section>
            )}
            <section className="flex flex-col gap-5">
              <ReviewTagChips tags={step2Data?.tags} />
              <ReviewFacts
                startYear={step2Data?.start_year}
                endYear={step2Data?.end_year}
                price={step2Data?.price}
                rentalType={step2Data?.rental_type}
                depositReturned={step2Data?.deposit_returned}
                includedServices={step2Data?.included_services}
                ownerType={step5Data?.owner_type}
              />
            </section>
            {opinions.map(opinion => (
              <section key={opinion.title} className="flex flex-col gap-3">
                <h2 className="font-display text-2xl font-extrabold tracking-tight">{opinions.length > 1 ? opinion.title : 'Lo que cuenta'}</h2>
                <p className="whitespace-pre-line text-[17px] leading-relaxed">{opinion.text}</p>
              </section>
            ))}
            {hasAnswers(step3Data) && (
              <section className="flex flex-col gap-4">
                <h2 className="font-display text-2xl font-extrabold tracking-tight">Características del piso</h2>
                <PropertySection propertyData={step3Data} />
              </section>
            )}
            {hasAnswers(step4Data) && (
              <section className="flex flex-col gap-4">
                <h2 className="font-display text-2xl font-extrabold tracking-tight">Comunidad y vecindario</h2>
                <CommunitySection communityData={step4Data} />
              </section>
            )}
            {isPublicReview && (
              <p className="text-sm text-ink-muted">
                ¿Es falsa, tiene datos personales o eres el propietario y quieres responder?{' '}
                <a
                  className="font-semibold text-brand underline underline-offset-4"
                  href={`mailto:${LEGAL_META.contactEmail}?subject=${encodeURIComponent(`Denuncia o réplica de la opinión ${id ?? ''}`)}`}
                >
                  Escríbenos a {LEGAL_META.contactEmail}
                </a>
              </p>
            )}
          </main>
          <aside className="flex min-w-0 flex-[1_1_340px] flex-col gap-12">
            <AddressPublicData lat={coordinates?.lat} lng={coordinates?.lng} postalCode={details?.postalCode || details?.components?.postcode} />
          </aside>
        </div>
      )}
    </div>
  );
};

export default ReviewPage;
