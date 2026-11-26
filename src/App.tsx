import { lazy, Suspense } from 'react';
import { MotionConfig } from 'motion/react';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { PageTransition } from './components/common/MotionPrimitives';
import { PageSkeleton } from './components/common/PageSkeleton';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { FloatingExtrasBar } from './components/ordering/FloatingExtrasBar';
import { FloatingWhatsAppButton } from './components/ordering/FloatingWhatsAppButton';
import { WhatsAppOrderDrawer } from './components/ordering/WhatsAppOrderDrawer';
import { OrderProvider } from './context/OrderContext';
import { RouterProvider, useRouter } from './lib/router';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';

const MenuPage = lazy(() => import('./pages/MenuPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

function AppRoutes() {
  const { pathname } = useRouter();

  const renderPage = () => {
    switch (pathname) {
      case '/':
        return <HomePage />;
      case '/menu':
        return <MenuPage />;
      case '/services':
        return <ServicesPage />;
      case '/about':
        return <AboutPage />;
      case '/contact':
        return <ContactPage />;
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-cream text-charcoal">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-forest focus:px-3.5 py-2 text-xs font-semibold text-white"
      >
        Skip to main content
      </a>

      <Header />

      <main id="main-content" className="flex-1">
        <Suspense fallback={<PageSkeleton />}>
          <PageTransition routeKey={pathname}>{renderPage()}</PageTransition>
        </Suspense>
      </main>

      <div className="pb-14 md:pb-0">
        <Footer />
      </div>

      <FloatingExtrasBar />
      <FloatingWhatsAppButton />
      <MobileBottomNav />
      <WhatsAppOrderDrawer />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <MotionConfig reducedMotion="user">
        <RouterProvider>
          <OrderProvider>
            <AppRoutes />
          </OrderProvider>
        </RouterProvider>
      </MotionConfig>
    </ErrorBoundary>
  );
}
