import { Helmet } from 'react-helmet-async'

interface Props {
  title?: string | null
  description?: string | null
  image?: string | null
}

export function SEO({ title, description, image }: Props) {
  const pageTitle = title
    ? `${title} | Safe Action Foundation`
    : 'Safe Action Foundation'

  const pageDescription =
    description ??
    'Safe Action Foundation humanitarian and development organization.'

  const currentUrl = window.location.href

  const ogImage = image ?? '/og-image.jpg'

  return (
    <Helmet>
      <title>{pageTitle}</title>

      <meta name="description" content={pageDescription} />

      <link rel="canonical" href={currentUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={ogImage} />

      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'NGO',
          name: 'Safe Action Foundation',
          url: window.location.origin,
          logo: `${window.location.origin}/favicon.svg`,
          description: pageDescription,
        })}
      </script>
    </Helmet>
  )
}