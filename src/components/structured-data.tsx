export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Burger House",
    description: "Hambúrgueres artesanais com ingredientes premium",
    image: "/og-image.jpg",
    servesCuisine: "Americana",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressCountry: "BR",
      addressLocality: "Aparecida do Taboado",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "2543",
    },
    menu: {
      "@type": "Menu",
      hasMenuSection: {
        "@type": "MenuSection",
        name: "Hambúrgueres",
        description: "Nossos deliciosos hambúrgueres artesanais",
      },
    },
    acceptsReservations: "False",
    hasDeliveryMethod: {
      "@type": "ParcelDelivery",
      deliveryTime: "30 minutes",
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}
