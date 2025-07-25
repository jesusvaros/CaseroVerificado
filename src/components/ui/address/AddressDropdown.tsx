import React from 'react';
import type { AddressResult } from './types';

interface AddressDropdownProps {
  results: AddressResult[];
  isFocused: boolean;
  hideLabel?: boolean;
  onSelect: (result: AddressResult) => void;
}

export const AddressDropdown: React.FC<AddressDropdownProps> = ({
  results,
  isFocused,
  hideLabel = false,
  onSelect,
}) => {
  if (results.length === 0 || !isFocused) {
    return null;
  }

  return (
    <ul
      className={`absolute left-0 right-0 z-[10000] mt-1 max-h-60 overflow-y-auto rounded-b-lg bg-white shadow-lg ${
        hideLabel ? 'top-[48px]' : 'top-[80px]'
      }`}
    >
      {results.map((result, index) => {
        const road = result.components.road;
        const park = result.components.park;
        const parking = result.components.parking;
        const city =
          result.components.city || result.components.town || result.components.village || '';
        const postcode = result.components.postcode || '';

        if (!(road || park || parking) || !city) {
          return null;
        }

        // Format with street highlighted
        const displayAddress = (
          <span>
            <strong>{road || park || parking}</strong>, {city} {postcode}
          </span>
        );

        // Use a combination of geohash and index to ensure uniqueness
        // If geohash is missing, use formatted_address or index as fallback
        const uniqueKey = result.annotations?.geohash
          ? `${result.annotations.geohash}-${index}`
          : result.formatted
            ? `addr-${result.formatted}-${index}`
            : `result-${index}`;

        return (
          <li
            key={uniqueKey}
            onClick={() => onSelect(result)}
            className="cursor-pointer px-3 py-2 hover:bg-gray-100"
          >
            {displayAddress}
          </li>
        );
      })}
    </ul>
  );
};
