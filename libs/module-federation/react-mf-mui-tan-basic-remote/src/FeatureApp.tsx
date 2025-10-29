import { useLocation } from '@tanstack/react-router';

const FeatureLanding = () => <div>Feature Landing</div>;
const FeatureDetails = () => <div>Feature Details</div>;
const FeatureNotFound = ({ path }: { path: string }) => <div>Feature route not found: {path}</div>;

const getRouteComponent = (subPath: string) => {
  if (subPath === '/' || subPath === '') {
    return <FeatureLanding />;
  }
  
  if (subPath === '/details') {
    return <FeatureDetails />;
  }
  
  return <FeatureNotFound path={subPath} />;
};

// Component that renders based on the current route
export const FeatureApp = () => {
  // This will work when used within the host's router context
  const location = useLocation();
  const pathname = location.pathname;
  
  // Extract the sub-path after /feat
  const subPath = pathname.replace('/feat', '') || '/';
  
  return getRouteComponent(subPath);
};

// Keep the original App for standalone usage
export { default as BasicApp } from './App';