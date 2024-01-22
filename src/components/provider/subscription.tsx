import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import Purchases from 'react-native-purchases';

import SubscriptionContext from '../context/subscription';

const REVENUECAT_API_KEY =
  Platform.OS === 'ios' ? '' : 'goog_BkHpKcZQALeQdXOuqGXlxHrxvas';

const SubscriptionProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [initialized, setInitialized] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    (async () => {
      await Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);
      await Purchases.configure({ apiKey: REVENUECAT_API_KEY });
      setInitialized(true);
    })();
  }, []);

  useEffect(() => {
    if (initialized) {
      Purchases.addCustomerInfoUpdateListener(customerInfo => {
        setSubscribed(customerInfo.entitlements.all.Premium !== undefined);
      });
    }
  }, [initialized]);

  useEffect(() => {
    if (initialized) {
      (async () => {
        const customerInfo = await Purchases.getCustomerInfo();
        setSubscribed(customerInfo.entitlements.active.Premium !== undefined);
      })();
    }
  }, [initialized]);

  return (
    <SubscriptionContext.Provider value={{ subscribed }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export default SubscriptionProvider;
