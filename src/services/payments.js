import Purchases from 'react-native-purchases';
import { Platform } from 'react-native';

const REVENUECAT_ANDROID_KEY = 'REPLACE_WITH_REVENUECAT_ANDROID_KEY';
const REVENUECAT_IOS_KEY = 'REPLACE_WITH_REVENUECAT_IOS_KEY';
const ENTITLEMENT_ID = 'premium';

export function initPurchases() {
  const apiKey = Platform.OS === 'ios' ? REVENUECAT_IOS_KEY : REVENUECAT_ANDROID_KEY;
  if (!apiKey || apiKey.includes('REPLACE')) return;
  Purchases.configure({ apiKey });
}

export async function isPremiumActive() {
  try {
    const info = await Purchases.getCustomerInfo();
    return Boolean(info.entitlements.active[ENTITLEMENT_ID]);
  } catch {
    return false;
  }
}

export async function purchasePremium() {
  const offerings = await Purchases.getOfferings();
  const monthly = offerings.current?.monthly;
  if (!monthly) throw new Error('Premium monthly package not configured in RevenueCat.');
  const { customerInfo } = await Purchases.purchasePackage(monthly);
  return Boolean(customerInfo.entitlements.active[ENTITLEMENT_ID]);
}

export async function restorePurchases() {
  const customerInfo = await Purchases.restorePurchases();
  return Boolean(customerInfo.entitlements.active[ENTITLEMENT_ID]);
}
