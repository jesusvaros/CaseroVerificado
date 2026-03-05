import { useEffect } from 'react';
import { Routes, Route, useLocation, Link, Navigate, useParams } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'react-hot-toast';

// Import our components
import Header from './components/Header';
import PageSEO from './seo/PageSEO';
import HeroSection from './components/HeroSection';
import InputSection from './components/InputSection';
import BenefitsSection from './components/BenefitsSection';
import ChromeStoreSection from './components/ChromeStoreSection';
import PictureSection from './components/PictureSection';
import HowItWorksSection from './components/HowItWorksSection';
//import LatestReviewsSection from './components/LatestReviewsSection';
import FAQSection from './components/FAQSection';
import MapView from './components/MapView';
import AddReviewForm from './components/AddReviewForm';
import AuthCallback from './components/AuthCallback';
import ReviewPage from './components/review/ReviewPage';
import ProfilePage from './components/profile/ProfilePage';
import ModerationPage from './components/admin/ModerationPage';
import BlogListPage from './components/blog/BlogListPage';
import BlogPostPage from './components/blog/BlogPostPage';
// Legal pages
import LegalHub from './pages/LegalHub';
import AvisoLegal from './pages/AvisoLegal';
import PoliticaPrivacidad from './pages/PoliticaPrivacidad';
import PoliticaCookies from './pages/PoliticaCookies';
import CondicionesUso from './pages/CondicionesUso';
import BuenasPracticas from './pages/BuenasPracticas';
import CityReviewsIndexPage from './pages/CityReviewsIndexPage';
import CityReviewsPage from './pages/CityReviewsPage';
import UmamiTracker from './components/analytics/UmamiTracker';
import ScrollToTop from './components/ScrollToTop';
import { useTranslations } from './i18n/useTranslations';
import { buildBlogListPath } from './i18n/routing';

// Import Providers
import { FormProvider } from './store/FormContext';
import { FormMessagesProvider } from './store/FormMessagesProvider';
import { AuthProvider } from './store/auth';
import { umamiEventProps } from './utils/analytics';
import { trackEvent } from './utils/analytics';

function LegacyLocaleBlogRedirect() {
  const location = useLocation();
  const { slug } = useParams<{ slug?: string }>();
  const targetPath = slug ? `/blog/${slug}` : '/blog';
  return <Navigate to={`${targetPath}${location.search}${location.hash}`} replace />;
}

function App() {
  const location = useLocation();
  const { locale, t } = useTranslations();
  const isGrayPage = location.pathname === '/add-review' || location.pathname.includes('/review/') || location.pathname === '/profile' || location.pathname === '/map';

  useEffect(() => {
    trackEvent('app:loaded', { timestamp: new Date().toISOString() });
  }, []);

  return (
    <AuthProvider>
      <FormProvider>
        <div className={`min-h-screen ${isGrayPage ? 'bg-gray-100' : 'bg-white'}`}>
        {/* Vercel Analytics */}
        <Analytics />
        <UmamiTracker />
        <Toaster
          position="bottom-left"
          gutter={8}
          toastOptions={{
            duration: 5000,
            style: {
              background: '#fff',
              color: '#363636',
            },
          }}
        />
        <Header />
        <ScrollToTop />

        <Routes>
          <Route path="/auth/callback" element={
            <>
              <PageSEO title={t('seo.authTitle')} description={t('seo.authDescription')} noindex />
              <AuthCallback />
            </>
          } />
          <Route path="/review/:id" element={
            <>
              <PageSEO title={t('seo.reviewTitle')} description={t('seo.reviewDescription')} />
              <ReviewPage />
            </>
          } />
          <Route path="/map" element={
            <>
              <PageSEO title={t('seo.mapTitle')} description={t('seo.mapDescription')} />
              <MapView />
            </>
          } />
          <Route path="/opiniones" element={<CityReviewsIndexPage />} />
          <Route path="/opiniones/:countrySlug/:citySlug" element={<CityReviewsPage />} />
          <Route path="/opiniones/:citySlug" element={<CityReviewsPage />} />
          <Route path="/:locale/blog" element={<LegacyLocaleBlogRedirect />} />
          <Route path="/:locale/blog/:slug" element={<LegacyLocaleBlogRedirect />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/profile" element={
            <>
              <PageSEO title={t('seo.profileTitle')} description={t('seo.profileDescription')} noindex />
              <ProfilePage />
            </>
          } />
          <Route path="/admin/moderate" element={<ModerationPage />} />
          {/* Legal routes */}
          <Route path="/aviso-legal" element={<><PageSEO title={t('legalNotice.seoTitle')} description={t('legalNotice.seoDescription')} /><AvisoLegal /></>} />
          <Route path="/politica-privacidad" element={<><PageSEO title={t('privacyPolicy.seoTitle')} description={t('privacyPolicy.seoDescription')} /><PoliticaPrivacidad /></>} />
          <Route path="/cookies" element={<><PageSEO title={t('cookiesPolicy.seoTitle')} description={t('cookiesPolicy.seoDescription')} /><PoliticaCookies /></>} />
          <Route path="/condiciones-uso" element={<><PageSEO title={t('termsOfUse.seoTitle')} description={t('termsOfUse.seoDescription')} /><CondicionesUso /></>} />
          <Route path="/buenas-practicas" element={<><PageSEO title={t('goodPractices.seoTitle')} description={t('goodPractices.seoDescription')} /><BuenasPracticas /></>} />
          <Route path="/terminosycondiciones" element={<><PageSEO title={t('legalHub.seoTitle')} description={t('legalHub.seoDescription')} /><LegalHub /></>} />
          <Route path="/terminosCondiciones" element={<><PageSEO title={t('legalHub.seoTitle')} description={t('legalHub.seoDescription')} /><LegalHub /></>} />
          <Route
            path="/add-review"
            element={
              <FormMessagesProvider>
                <PageSEO title={t('seo.addReviewTitle')} description={t('seo.addReviewDescription')} noindex />
                <AddReviewForm />
              </FormMessagesProvider>
            }
          />
              <Route
            path="/"
            element={
              <>
                <PageSEO title={t('seo.homeTitle')} description={t('seo.homeDescription')} />
                <HeroSection />
                <InputSection />
                <HowItWorksSection />
                {/* <StatsSection /> */}
                <BenefitsSection />
                <ChromeStoreSection />
                  <PictureSection />
                  {/* <LatestReviewsSection /> */}
                  <FAQSection />
                </>
              }
            />
        </Routes>


        <footer className="mx-auto mt-8 max-w-6xl py-6 text-center text-sm text-gray-600">
          <nav className="mb-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <Link className="hover:text-gray-700" to={buildBlogListPath(locale)} {...umamiEventProps('footer:blog')}>{t('footer.blog')}</Link>
            <span className="text-gray-400">•</span>
            <Link className="hover:text-gray-700" to="/opiniones" {...umamiEventProps('footer:opiniones')}>{t('footer.opinionsByCity')}</Link>
            <span className="text-gray-400">•</span>
            <Link className="hover:text-gray-700" to="/terminosycondiciones" {...umamiEventProps('footer:terminos-condiciones')}>{t('footer.termsAndConditions')}</Link>
            <span className="text-gray-400">•</span>
            <Link className="hover:text-gray-700" to="/aviso-legal" {...umamiEventProps('footer:aviso-legal')}>{t('footer.legalNotice')}</Link>
            <span className="text-gray-400">•</span>
            <Link className="hover:text-gray-700" to="/politica-privacidad" {...umamiEventProps('footer:privacidad')}>{t('footer.privacyPolicy')}</Link>
            <span className="text-gray-400">•</span>
            <Link className="hover:text-gray-700" to="/cookies" {...umamiEventProps('footer:cookies')}>{t('footer.cookiesPolicy')}</Link>
            <span className="text-gray-400">•</span>
            <Link className="hover:text-gray-700" to="/condiciones-uso" {...umamiEventProps('footer:condiciones-uso')}>{t('footer.termsOfUse')}</Link>
            <span className="text-gray-400">•</span>
            <Link className="hover:text-gray-700" to="/buenas-practicas" {...umamiEventProps('footer:buenas-practicas')}>{t('footer.goodPractices')}</Link>
          </nav>
            <p>
              © {new Date().getFullYear()} CaseroOk - {t('footer.disclaimer')}
            </p>
          </footer>
        </div>
      </FormProvider>
    </AuthProvider>
  );
}

export default App;
