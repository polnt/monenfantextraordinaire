"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { Currency } from "@/lib/currency";

interface CurrencyContextValue {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

const STORAGE_KEY = "mef_currency";

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [currency, setCurrencyState] = useState<Currency>("EUR");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "EUR" || stored === "XOF") {
        setCurrencyState(stored);
      }
    } catch {
      // ignore corrupt storage
    }
  }, []);

  const setCurrency = useCallback((next: Currency): void => {
    setCurrencyState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore storage errors
    }
  }, []);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
