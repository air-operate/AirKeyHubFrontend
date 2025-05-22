import { countryMapping } from '@assets/mockData';
import axios from 'axios';

// Function to get country specs from Stripe
const getCountrySpecs = async () => {
  try {
    // Make the API request
    const response = await axios.get(
      'https://api.stripe.com/v1/country_specs',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer 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`,
        },
        params: {
          limit: 100, // Adjust as needed; set to a high number to get all country specs
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching country specs:', error);
    return null;
  }
};

// Function to get country specs and check if a country is supported
export const isCountrySupportedForTransfers = async (countryName: string) => {
  try {
    const data = await getCountrySpecs();

    if (!data || !data.data) {
      throw new Error('Failed to fetch country specs.');
    }

    // Iterate over the country specs to find if the country is supported
    const supportedCountries = data.data.flatMap(
      (countrySpec: any) => countrySpec.supported_transfer_countries
    );
    const supportedCountryCodes = new Set(supportedCountries);

    const countryData = countryMapping[countryName];

    if (!countryData) {
      console.log(`Country code for ${countryName} not found.`);
      return 'USD';
    }

    const isSupported = supportedCountryCodes.has(countryData.countryCode);
    console.log(
      `${countryName} is ${isSupported ? '' : 'not '}supported for transfers.`
    );
    return isSupported ? countryData.currencyCode : 'USD';
  } catch (error) {
    console.error('Error checking country support:', error);
    return 'USD';
  }
};

// Usage example
