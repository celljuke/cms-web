import { useMemo, useState } from "react";
import { Country, State, City } from "country-state-city";
import type { SearchableSelectOption } from "@/components/ui/searchable-select";

export function useLocationData(initialCountryCode = "US") {
  const [selectedCountryCode, setSelectedCountryCode] =
    useState(initialCountryCode);
  const [selectedStateCode, setSelectedStateCode] = useState("");

  // Get all countries as options
  const countryOptions = useMemo<SearchableSelectOption[]>(() => {
    return Country.getAllCountries().map((country) => ({
      value: country.isoCode,
      label: `${country.flag} ${country.name}`,
    }));
  }, []);

  // Get states for selected country
  const stateOptions = useMemo<SearchableSelectOption[]>(() => {
    if (!selectedCountryCode) return [];
    return State.getStatesOfCountry(selectedCountryCode).map((state) => ({
      value: state.isoCode,
      label: state.name,
    }));
  }, [selectedCountryCode]);

  // Get cities for selected state
  const cityOptions = useMemo<SearchableSelectOption[]>(() => {
    if (!selectedCountryCode || !selectedStateCode) return [];
    return City.getCitiesOfState(selectedCountryCode, selectedStateCode).map(
      (city) => ({
        value: city.name,
        label: city.name,
      })
    );
  }, [selectedCountryCode, selectedStateCode]);

  const handleCountryChange = (
    countryCode: string,
    onStateChange: (value: string) => void,
    onCityChange: (value: string) => void
  ) => {
    setSelectedCountryCode(countryCode);
    setSelectedStateCode("");
    // Reset dependent fields
    onStateChange("");
    onCityChange("");
  };

  const handleStateChange = (
    stateCode: string,
    onCityChange: (value: string) => void
  ) => {
    setSelectedStateCode(stateCode);
    // Reset city when state changes
    onCityChange("");
  };

  return {
    selectedCountryCode,
    selectedStateCode,
    countryOptions,
    stateOptions,
    cityOptions,
    handleCountryChange,
    handleStateChange,
    setSelectedCountryCode,
    setSelectedStateCode,
  };
}
