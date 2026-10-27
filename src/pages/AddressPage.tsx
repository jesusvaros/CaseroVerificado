import { useNavigate, useParams, Link } from 'react-router-dom';
import PageSEO from '../seo/PageSEO';
import { useTranslations } from '../i18n/useTranslations';
import { useFormContext } from '../store/useFormContext';
import { useAddressPage } from '../components/address/useAddressPage';
import { useAddressPublicData } from '../components/address-data/useAddressPublicData';
import { provinceFromPostalCode } from '../services/publicData/rentZones';
import { summarise } from '../components/address/addressSummary';
import AddressHero from '../components/address/AddressHero';
import TenantSummary from '../components/address/TenantSummary';
import AddressReviewList from '../components/address/AddressReviewList';
import TenantUnionLink from '../components/address/TenantUnionLink';
import AddressPublicDataView from '../components/address-data/AddressPublicDataView';
import { trackEvent } from '../utils/analytics';
import DataSourcesNote from '../components/data-sources/DataSourcesNote';

// Public page of one address: tenant reviews plus official rent, building and stressed-market data.
const AddressPage = () => {
  const { t } = useTranslations();
  const navigate = useNavigate();
  const { updateFormData } = useFormContext();
  const { citySlug = '', addressSlug = '' } = useParams();
  const { reviews, location, loading } = useAddressPage(citySlug, addressSlug);
  const publicData = useAddressPublicData(location?.lat, location?.lng, location?.postalCode);

  if (loading) {
    return <div className="min-h-screen bg-white pt-24" aria-busy="true" />;
  }

  if (!location) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-5 pt-24 text-center text-ink">
        <PageSEO title={t('addressPage.notFoundTitle')} noindex />
        <h1 className="font-display text-3xl font-extrabold">{t('addressPage.notFoundTitle')}</h1>
        <Link to="/" className="font-bold text-brand underline underline-offset-4">{t('addressPage.searchAnother')}</Link>
      </div>
    );
  }

  const title = `${location.street} ${location.number}`.trim();
  const summary = summarise(reviews);

  const livedHere = () => {
    trackEvent('address:lived-here', { reviews: reviews.length });
    updateFormData({
      addressDetails: {
        street: location.street,
        number: location.number,
        city: location.city,
        postalCode: location.postalCode ?? '',
        fullAddress: `${title}, ${location.city}`,
        coordinates: { lat: location.lat, lng: location.lng },
        components: { road: location.street, house_number: location.number, city: location.city, postcode: location.postalCode ?? undefined },
      },
      addressAutocompleteResult: undefined,
    });
    navigate('/add-review');
  };

  return (
    <div className="bg-white text-ink">
      <PageSEO
        title={t('addressPage.seoTitle', { address: title, city: location.city })}
        description={t('addressPage.seoDescription', { address: title, city: location.city })}
        noindex={reviews.length === 0}
      />
      <AddressHero
        title={title}
        city={location.city}
        cityPath={`/opiniones/espana/${citySlug}`}
        overall={summary.overall}
        reviewCount={reviews.length}
        tensioned={!!publicData.tensioned}
        yearBuilt={publicData.building?.yearBuilt ?? null}
        onLivedHere={livedHere}
      />
      <div className="mx-auto flex max-w-[1320px] flex-wrap items-start gap-16 px-5 pb-24 pt-14 md:px-[5%]">
        <main className="flex min-w-0 flex-[999_1_600px] flex-col gap-16">
          {reviews.length > 0 ? (
            <>
              <TenantSummary summary={summary} />
              <AddressReviewList reviews={reviews} />
            </>
          ) : (
            <section className="flex flex-col items-start gap-4">
              <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-[34px]">{t('addressPage.emptyTitle')}</h2>
              <p className="max-w-xl text-lg text-ink-soft">{t('addressPage.emptyText')}</p>
              <button type="button" onClick={livedHere} className="rounded-full bg-forest px-7 py-4 font-bold text-white transition-colors hover:bg-brand">
                {t('addressPage.livedHere')}
              </button>
            </section>
          )}
        </main>
        <aside className="flex min-w-0 flex-[1_1_340px] flex-col gap-12">
          <AddressPublicDataView data={publicData} />
          <TenantUnionLink province={provinceFromPostalCode(location.postalCode)} />
        </aside>
      </div>
      <DataSourcesNote sources={['reviews', 'serpavi', 'deposits', 'sales', 'catastro', 'tensioned']} className="pb-24" />
    </div>
  );
};

export default AddressPage;
