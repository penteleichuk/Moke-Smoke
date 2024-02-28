import { AdaptyPaywallProduct, OfferEligibility } from 'react-native-adapty';

export interface SubscriptionSchema {
  isPremium: boolean;
  products: AdaptyPaywallProduct[];
  eligibility: Record<string, OfferEligibility>;
  isLoading: boolean;
  isError: boolean;
}
