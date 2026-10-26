import { useAddressPublicData } from './useAddressPublicData';
import AddressPublicDataView from './AddressPublicDataView';

interface AddressPublicDataProps {
  lat?: number;
  lng?: number;
  postalCode?: string | null;
}

const AddressPublicData = ({ lat, lng, postalCode }: AddressPublicDataProps) => (
  <AddressPublicDataView data={useAddressPublicData(lat, lng, postalCode)} />
);

export default AddressPublicData;
