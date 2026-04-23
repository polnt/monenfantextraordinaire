"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function SecondaryDropdown(): React.JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(!open)} aria-label="Menu secondaire">
        ⋮
      </button>
      {open && (
        <ul>
          <li>
            <Link href="/le-site" onClick={() => setOpen(false)}>
              Le site
            </Link>
          </li>
          <li>
            <Link href="/qui-suis-je" onClick={() => setOpen(false)}>
              Qui suis-je ?
            </Link>
          </li>
          <li>
            <Link href="/contact" onClick={() => setOpen(false)}>
              Contact
            </Link>
          </li>
          <li>
            <Link href="/faq" onClick={() => setOpen(false)}>
              FAQ
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
