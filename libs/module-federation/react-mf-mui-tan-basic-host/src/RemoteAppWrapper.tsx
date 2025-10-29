import { lazy, Suspense } from 'react';

const FeatureApp = lazy(
  // @ts-expect-error Module federation remote import not recognized by TypeScript
  async () => {
    const module = await import('basicRemote/FeatureApp');
    return { default: module.FeatureApp };
  },
);

// Wrapper component for the router-aware remote
export const RemoteAppWrapper = () => (
  <Suspense fallback={<div>Loading remote app...</div>}>
    <FeatureApp />
  </Suspense>
);