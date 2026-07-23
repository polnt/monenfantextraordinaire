"use client";

import React from "react";
import { useCurrency } from "@/contexts/CurrencyContext";

export default function CurrencySwitch(): React.JSX.Element {
  const { currency, setCurrency } = useCurrency();
  const isXof = currency === "XOF";

  return (
    <button
      onClick={() => setCurrency(isXof ? "EUR" : "XOF")}
      title="Changer de devise"
      aria-label="Changer de devise"
      role="switch"
      aria-checked={isXof}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        width: 108,
        height: 32,
        borderRadius: 999,
        border: "1.5px solid #e5e7eb",
        background: "#f0f1f6",
        cursor: "pointer",
        padding: 3,
        flexShrink: 0,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 3,
          left: isXof ? "calc(50% - 1px)" : 3,
          width: "calc(50% - 2px)",
          height: 24,
          borderRadius: 999,
          background: "var(--blue)",
          boxShadow: "0 1px 4px rgba(9,9,67,0.25)",
          transition: "left 0.2s ease",
        }}
      />
      <span
        style={{
          position: "relative",
          flex: 1,
          textAlign: "center",
          fontFamily: "var(--font-nunito)",
          fontWeight: 800,
          fontSize: 11,
          color: isXof ? "var(--gray)" : "white",
          transition: "color 0.2s",
        }}
      >
        EUR
      </span>
      <span
        style={{
          position: "relative",
          flex: 1,
          textAlign: "center",
          fontFamily: "var(--font-nunito)",
          fontWeight: 800,
          fontSize: 11,
          color: isXof ? "white" : "var(--gray)",
          transition: "color 0.2s",
        }}
      >
        FCFA
      </span>
    </button>
  );
}
