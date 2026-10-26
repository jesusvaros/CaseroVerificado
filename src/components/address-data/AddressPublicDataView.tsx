import type { AddressPublicData } from './useAddressPublicData';
import RentCalculator from './RentCalculator';
import BuildingFactsSection from './BuildingFactsSection';
import TensionedZoneNotice from './TensionedZoneNotice';
import CurrentMarket from './CurrentMarket';

// Reference rent (SERPAVI), the building (Catastro) and stressed-market status, once loaded.
const AddressPublicDataView = ({ data }: { data: AddressPublicData }) => {
  const { zone, tensioned, building, market, loading } = data;

  if (loading) {
    return <div className="h-40 animate-pulse rounded-3xl bg-mist" aria-hidden="true" />;
  }

  return (
    <div className="flex flex-col gap-12 text-ink">
      {zone?.rent && <RentCalculator zone={zone} />}
      {market && <CurrentMarket market={market} place={zone?.municipalityName ?? ''} />}
      {building && <BuildingFactsSection facts={building} />}
      {tensioned && <TensionedZoneNotice zone={tensioned} />}
    </div>
  );
};

export default AddressPublicDataView;
