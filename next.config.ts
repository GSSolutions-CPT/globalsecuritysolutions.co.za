import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'date-fns', 'clsx', 'tailwind-merge'],
  },
  async redirects() {
    return [
      // --- Services ---
      { source: '/alarm-system-cape-town', destination: '/services/alarm-system-installation', permanent: true },
      { source: '/cctv-system-cape-town', destination: '/services/cctv-surveillance-systems', permanent: true },
      { source: '/access-control-cape-town', destination: '/services/access-control-solutions', permanent: true },
      { source: '/intercom-system-cape-town', destination: '/services/intercom-system-installers', permanent: true },
      { source: '/electric-fence-cape-town', destination: '/services/electric-fence-installations', permanent: true },
      { source: '/perimeter-security', destination: '/services/perimeter-security-enhancement', permanent: true },
      { source: '/gate-and-garage-motors', destination: '/services/gate-and-garage-automation', permanent: true },
      { source: '/vehicle-security', destination: '/services/vehicle-security-systems', permanent: true },
      { source: '/smart-home-and-automation', destination: '/services/smart-home-automation', permanent: true },
      { source: '/system-integration', destination: '/services/security-system-integration', permanent: true },
      { source: '/upgrades-and-repairs', destination: '/services/security-repairs-and-upgrades', permanent: true },
      { source: '/maintenance-contracts', destination: '/services/security-maintenance-contracts', permanent: true },

      // --- Sectors ---
      { source: '/residential-solutions', destination: '/sectors/residential-security', permanent: true },
      { source: '/commercial-solutions', destination: '/sectors/commercial-security', permanent: true },
      { source: '/industrial-solutions', destination: '/sectors/industrial-security', permanent: true },
      { source: '/farm-solutions', destination: '/sectors/farm-security-systems', permanent: true },
      { source: '/estate-solutions', destination: '/sectors/estate-security-management', permanent: true },

      // --- General ---
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/book-an-appointment', destination: '/contact', permanent: true },
      { source: '/book-a-service', destination: '/contact', permanent: true },
      { source: '/contact-u', destination: '/contact', permanent: true },
      { source: '/contact-us-1', destination: '/contact', permanent: true },
      { source: '/m/bookings', destination: '/contact', permanent: true },
      { source: '/faq-1', destination: '/faq', permanent: true },

      // --- Old Blog & Feeds ---
      { source: '/relocation-checklist', destination: '/blog', permanent: true },
      { source: '/blog/f/:slug*', destination: '/blog', permanent: true }, // Catches all old blog posts starting with /f/
      { source: '/blog/f.rss', destination: '/blog', permanent: true },
      { source: '/blog/f.atom', destination: '/blog', permanent: true },

      // --- Service Areas ---
      { source: '/belhar-security-services', destination: '/areas/belhar-security-services', permanent: true },
      { source: '/bergvliet-security', destination: '/areas/bergvliet-security-services', permanent: true },
      { source: '/blouberg-security', destination: '/areas/blouberg-security-services', permanent: true },
      { source: '/bothasig-security', destination: '/areas/bothasig-security-services', permanent: true },
      { source: '/camps-bay-security', destination: '/areas/camps-bay-security-services', permanent: true },
      { source: '/clifton-security-services', destination: '/areas/clifton-security-services', permanent: true },
      { source: '/durbanville-security', destination: '/areas/durbanville-security-services', permanent: true },
      { source: '/fish-hoek-security', destination: '/areas/fish-hoek-security-services', permanent: true },
      { source: '/gordons-bay-security', destination: '/areas/gordons-bay-security-services', permanent: true },
      { source: '/gordon%E2%80%99s-bay-security', destination: '/areas/gordons-bay-security-services', permanent: true }, // Encoded apostrophe
      { source: '/kenilworth-security', destination: '/areas/kenilworth-security-services', permanent: true },
      { source: '/kensington-security', destination: '/areas/kensington-security-services', permanent: true },
      { source: '/kommetjie-security', destination: '/areas/kommetjie-security-services', permanent: true },
      { source: '/kuils-river-security', destination: '/areas/kuils-river-security-services', permanent: true },
      { source: '/melkbosstrand-security', destination: '/areas/melkbosstrand-security-services', permanent: true },
      { source: '/milnerton-security', destination: '/areas/milnerton-security-services', permanent: true },
      { source: '/monte-vista-security', destination: '/areas/monte-vista-security-services', permanent: true },
      { source: '/paarl-security-services', destination: '/areas/paarl-security-services', permanent: true },
      { source: '/parklands-security', destination: '/areas/parklands-security-services', permanent: true },
      { source: '/pinelands-security', destination: '/areas/pinelands-security-services', permanent: true },
      { source: '/plattekloof-security', destination: '/areas/plattekloof-security-services', permanent: true },
      { source: '/simons-town-security', destination: '/areas/simons-town-security-services', permanent: true },
      { source: '/somerset-west-security', destination: '/areas/somerset-west-security-services', permanent: true },
      { source: '/stellenbosch-security', destination: '/areas/stellenbosch-security-services', permanent: true },
      { source: '/table-view-security', destination: '/areas/table-view-security-services', permanent: true },
      { source: '/service-areas', destination: '/areas', permanent: true },

      // --- Messy/Duplicate Links ---
      { source: '/alarm-system', destination: '/services/alarm-system-installation', permanent: true },
      { source: '/alarm-system2', destination: '/services/alarm-system-installation', permanent: true },
      { source: '/alarm-system-Cape-Town', destination: '/services/alarm-system-installation', permanent: true },
      { source: '/intruder-and-alarm-system', destination: '/services/alarm-system-installation', permanent: true },
      { source: '/intruder-and-alarm-system-1', destination: '/services/alarm-system-installation', permanent: true },
      { source: '/intruder-and-alarm-system.html', destination: '/services/alarm-system-installation', permanent: true },
      { source: '/cctv-surveillance-systems-1', destination: '/services/cctv-surveillance-systems', permanent: true },
      { source: '/cctv-surveillance-systems.html', destination: '/services/cctv-surveillance-systems', permanent: true },
      { source: '/access-control', destination: '/services/access-control-solutions', permanent: true },
      { source: '/access-control.html', destination: '/services/access-control-solutions', permanent: true },
      { source: '/intercom-systems', destination: '/services/intercom-system-installers', permanent: true },
      { source: '/intercom-systems-1', destination: '/services/intercom-system-installers', permanent: true },
      { source: '/electric-fencing-page', destination: '/services/electric-fence-installations', permanent: true },
      { source: '/electric-fencing-1', destination: '/services/electric-fence-installations', permanent: true },
      { source: '/electric-fence-cape-town.html', destination: '/services/electric-fence-installations', permanent: true },
      { source: '/perimeter-enhancement-1', destination: '/services/perimeter-security-enhancement', permanent: true },
      { source: '/perimeter-security-cape-t', destination: '/services/perimeter-security-enhancement', permanent: true },
      { source: '/perimeter-security.html', destination: '/services/perimeter-security-enhancement', permanent: true },
      { source: '/gate-and-garage-motors.html', destination: '/services/gate-and-garage-automation', permanent: true },
      { source: '/vehicle-security.html', destination: '/services/vehicle-security-systems', permanent: true },
      { source: '/smart-home-and-automation.html', destination: '/services/smart-home-automation', permanent: true },
      { source: '/systems-integration', destination: '/services/security-system-integration', permanent: true },
      { source: '/systems-integration.html', destination: '/services/security-system-integration', permanent: true },
      { source: '/industrial-security-solutions', destination: '/sectors/industrial-security', permanent: true },
      { source: '/industrial-solutions.html', destination: '/sectors/industrial-security', permanent: true },
      { source: '/farm-solutions-1', destination: '/sectors/farm-security-systems', permanent: true },
      { source: '/farm-solutions.html', destination: '/sectors/farm-security-systems', permanent: true },
      { source: '/commercial-solutions.html', destination: '/sectors/commercial-security', permanent: true },
      { source: '/estate-solutions.html', destination: '/sectors/estate-security-management', permanent: true },
      { source: '/terms-and-conditions', destination: '/terms-of-service', permanent: true },
      { source: '/home', destination: '/', permanent: true },
      { source: '/lander', destination: '/', permanent: true },
      { source: '/test-1', destination: '/', permanent: true },
    ]
  },
};

export default nextConfig;
