import { useHomeShowcase } from './useHomeShowcase';
import HomeHero from './HomeHero';
import HomeStats from './HomeStats';
import HomeScores from './HomeScores';
import HomeRentCheck from './HomeRentCheck';
import HomeBuilding from './HomeBuilding';
import HomeQuote from './HomeQuote';
import HomeGuides from './HomeGuides';
import HomeClosing from './HomeClosing';
import DataSourcesNote from '../data-sources/DataSourcesNote';

// Home page, section by section as in the "1 · Landing" design.
const HomePage = () => {
  const { reviews, featured, building, quote } = useHomeShowcase();

  return (
    <div className="bg-white text-ink">
      <HomeHero featured={featured} />
      <HomeStats reviewCount={reviews.length || null} />
      <HomeScores />
      <HomeRentCheck />
      <HomeBuilding building={building} />
      <HomeQuote review={quote} />
      <HomeGuides />
      <DataSourcesNote sources={['reviews', 'serpavi', 'catastro', 'tensioned']} className="pb-24" />
      <HomeClosing />
    </div>
  );
};

export default HomePage;
