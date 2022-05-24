import { createContext, ReactNode, useContext } from "react";

export type MetadataContextProps = {
  name: string;
  description: string;
  url: string;
};

const defaultMetadataContext = {
  name: "Kevin Arifin",
  description: "Kevin's Home on the Internet",
  url: process.env.NEXT_PUBLIC_URL!,
};

export const MetadataContext = createContext<MetadataContextProps>(
  defaultMetadataContext
);

export const useMetadataContext = () => useContext(MetadataContext);

type MetadataProviderProps = {
  children: ReactNode;
};

export function MetadataProvider({ children }: MetadataProviderProps) {
  return (
    <MetadataContext.Provider value={defaultMetadataContext}>
      {children}
    </MetadataContext.Provider>
  );
}
