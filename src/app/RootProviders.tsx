import { HeroUIProvider } from '@heroui/react';

export function RootProviders({ children }: { children: React.ReactNode }) {
   return <HeroUIProvider>{children}</HeroUIProvider>;
}
