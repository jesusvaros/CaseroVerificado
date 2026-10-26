// Decorative city map for the hero: shapes and pins only, no data.
const HeroIllustration = () => (
  <div className="relative hidden h-[30rem] min-w-0 flex-[1_1_24rem] md:block" aria-hidden="true">
    <svg viewBox="0 0 420 480" className="h-full w-full">
      <path d="M40 480 C40 260 120 100 300 50 C360 34 420 44 420 44 L420 480 Z" fill="#164D33" />
      <path d="M70 480 C90 330 170 200 330 150 L420 132 L420 480 Z" fill="#1D5C3D" />
      <path d="M60 400 L420 280" stroke="#2A7A50" strokeWidth="10" fill="none" />
      <path d="M150 480 L330 100" stroke="#2A7A50" strokeWidth="8" fill="none" />
      <path d="M100 280 L420 360" stroke="#2A7A50" strokeWidth="6" fill="none" />
      <circle cx="250" cy="250" r="72" fill="#C8F169" opacity="0.16" />
      <path d="M250 214c-17 0-30 13-30 30 0 24 30 52 30 52s30-28 30-52c0-17-13-30-30-30z" fill="#C8F169" />
      <circle cx="250" cy="244" r="10" fill="#0E3B26" />
      <path d="M150 340c-10 0-18 8-18 18 0 14 18 30 18 30s18-16 18-30c0-10-8-18-18-18z" fill="#FF6B4A" />
      <path d="M350 370c-10 0-18 8-18 18 0 14 18 30 18 30s18-16 18-30c0-10-8-18-18-18z" fill="#8FD46B" />
      <path d="M120 170c-8 0-15 7-15 15 0 12 15 25 15 25s15-13 15-25c0-8-7-15-15-15z" fill="#8FD46B" />
    </svg>
  </div>
);

export default HeroIllustration;
