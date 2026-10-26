import { useAddressPublicData } from './useAddressPublicData';
import RentCalculator from './RentCalculator';
import BuildingFactsSection from './BuildingFactsSection';
import TensionedZoneNotice from './TensionedZoneNotice';

interface AddressPublicDataProps {
  lat?: number;
  lng?: number;
  postalCode?: string | null;
}

// Public data for an address: reference rent (SERPAVI), the building (Catastro) and stressed-market status.
const AddressPublicData = ({ lat, lng, postalCode }: AddressPublicDataProps) => {
  const { zone, tensioned, building, loading } = useAddressPublicData(lat, lng, postalCode);

  if (loading) {
    return <div className="h-40 animate-pulse rounded-3xl bg-mist" aria-hidden="true" />;
  }

  return (
    <div className="flex flex-col gap-12 text-ink">
      {zone?.rent && <RentCalculator zone={zone} />}
      {building && <BuildingFactsSection facts={building} />}
      {tensioned && <TensionedZoneNotice zone={tensioned} />}
    </div>
  );
};

export default AddressPublicData;
