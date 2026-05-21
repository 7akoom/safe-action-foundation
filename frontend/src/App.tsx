import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { SiteFooter } from './components/layout/site-footer'
import { SiteHeader } from './components/layout/site-header'
import { SEO } from './components/seo/seo'
import { getHomeData } from './features/home/api/get-home-data'
import { AboutSection } from './features/home/components/about-section'
import { ContactSection } from './features/home/components/contact-section'
import { HeroSection } from './features/home/components/hero-section'
import { ProgramsSection } from './features/home/components/programs-section'
import { ProgramDetailsPage } from './features/programs/pages/program-details-page'
import { getInitialLanguage, setDocumentLanguage, type Language } from './lib/language'
import { NotFoundPage } from './pages/not-found-page'
import type { HomeResponse } from './types/home'
import { AboutPage } from './features/about/pages/about-page'
import { ProgramsPage } from './features/programs/pages/programs-page'
import { ContactPage } from './features/contact/pages/contact-page'
import { WorkLocationsPage } from './features/work-locations/pages/work-locations-page'
import { GetInvolvedPage } from './features/get-involved/pages/get-involved-page'
import { DonatePage } from './features/donate/pages/donate-page'
import { NewsPage } from './features/news/pages/news-page'
import { NewsDetailsPage } from './features/news/pages/news-details-page'
import { CareersPage } from './features/careers/pages/careers-page'
import { CareerDetailsPage } from './features/careers/pages/career-details-page'
import { ScrollToTop } from './components/scroll-to-top'

function AppRoutes() {
  const [homeData, setHomeData] = useState<HomeResponse | null>(null)
  const [isLoadingHome, setIsLoadingHome] = useState(true)
  const [language, setLanguage] = useState<Language>(getInitialLanguage)
  const location = useLocation()

  useEffect(() => {
    getHomeData()
      .then(setHomeData)
      .catch(console.error)
      .finally(() => setIsLoadingHome(false))
  }, [])

  useEffect(() => {
    localStorage.setItem('language', language)
    setDocumentLanguage(language)
  }, [language])

  useEffect(() => {
    if (isLoadingHome) return

    const state = location.state as { scrollTo?: string } | null
    const target = state?.scrollTo

    if (!target) return

    setTimeout(() => {
      document.getElementById(target)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })

      window.history.replaceState({}, '', '/')
    }, 300)
  }, [isLoadingHome, location.state])

  if (isLoadingHome) {
    return (
      <main className="min-h-screen bg-white text-slate-900">
        <SiteHeader
          settings={homeData?.settings ?? null}
          language={language}
          onLanguageChange={setLanguage}
        />

        <section className="flex min-h-[88vh] items-center px-6 lg:px-24">
          <div className="w-full max-w-3xl animate-pulse">
            <div className="mb-6 h-4 w-56 rounded-full bg-slate-200" />
            <div className="h-16 w-full rounded-3xl bg-slate-200" />
            <div className="mt-4 h-16 w-3/4 rounded-3xl bg-slate-200" />
            <div className="mt-8 h-5 w-full rounded-full bg-slate-200" />
            <div className="mt-3 h-5 w-2/3 rounded-full bg-slate-200" />
            <div className="mt-10 h-12 w-44 rounded-full bg-slate-200" />
          </div>
        </section>
      </main>
    )
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <SEO
              title={
                language === 'ar'
                  ? homeData?.settings?.seo_title_ar
                  : homeData?.settings?.seo_title_en
              }
              description={
                language === 'ar'
                  ? homeData?.settings?.seo_description_ar
                  : homeData?.settings?.seo_description_en
              }
            />

            <main className="min-h-screen bg-white text-slate-900">
              <SiteHeader settings={homeData?.settings ?? null} language={language} onLanguageChange={setLanguage} />
              <HeroSection settings={homeData?.settings ?? null} language={language} />
              <AboutSection settings={homeData?.settings ?? null} language={language} />
              <ProgramsSection programs={homeData?.programs ?? []} language={language} />
              <ContactSection settings={homeData?.settings ?? null} language={language} />
              <SiteFooter settings={homeData?.settings ?? null} language={language} />
            </main>
          </>
        }
      />

      <Route
        path="/about"
        element={
          <AboutPage
            settings={homeData?.settings ?? null}
            language={language}
            onLanguageChange={setLanguage}
          />
        }
      />

      <Route
        path="/programs"
        element={
          <ProgramsPage
            settings={homeData?.settings ?? null}
            programs={homeData?.programs ?? []}
            language={language}
            onLanguageChange={setLanguage}
          />
        }
      />

      <Route
        path="/programs/:slug"
        element={
          <ProgramDetailsPage
            settings={homeData?.settings ?? null}
            language={language}
            onLanguageChange={setLanguage}
          />
        }
      />

      <Route
        path="/contact"
        element={
          <ContactPage
            settings={homeData?.settings ?? null}
            language={language}
            onLanguageChange={setLanguage}
          />
        }
      />

      <Route
        path="/where-we-work"
        element={
          <WorkLocationsPage
            settings={homeData?.settings ?? null}
            language={language}
            onLanguageChange={setLanguage}
          />
        }
      />

      <Route
        path="/get-involved"
        element={
          <GetInvolvedPage
            settings={homeData?.settings ?? null}
            language={language}
            onLanguageChange={setLanguage}
          />
        }
      />

      <Route
        path="/donate"
        element={
          <DonatePage
            settings={homeData?.settings ?? null}
            language={language}
            onLanguageChange={setLanguage}
          />
        }
      />

      <Route
        path="/news"
        element={
          <NewsPage
            settings={homeData?.settings ?? null}
            language={language}
            onLanguageChange={setLanguage}
          />
        }
      />

      <Route
        path="/news/:slug"
        element={
          <NewsDetailsPage
            settings={homeData?.settings ?? null}
            language={language}
            onLanguageChange={setLanguage}
          />
        }
      />

      <Route
        path="/careers"
        element={
          <CareersPage
            settings={homeData?.settings ?? null}
            language={language}
            onLanguageChange={setLanguage}
          />
        }
      />

      <Route
        path="/careers/:slug"
        element={
          <CareerDetailsPage
            settings={homeData?.settings ?? null}
            language={language}
            onLanguageChange={setLanguage}
          />
        }
      />
      
      <Route path="*" element={<NotFoundPage language={language} />} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App