/**
 * GRADIENT // ML EXAM LAB — custom icon set.
 * Hand-built SVGs. Brutalist match: 2.2px strokes, square caps,
 * 24x24 grid, currentColor. No icon library — every glyph drawn here.
 */

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "square",
  strokeLinejoin: "miter",
  "aria-hidden": true,
  focusable: false,
};

/** The brand mark: a point descending a loss curve into the minimum. */
export function IconDescent({ size = 24, ...rest }) {
  return (
    <svg {...base} width={size} height={size} {...rest}>
      <path d="M3 4 C 7 4, 8 17, 12 17 C 16 17, 17 8, 21 8" strokeWidth={2.4} />
      <circle cx="12" cy="17" r="2.4" fill="currentColor" stroke="none" />
      <path d="M12 21 v-2" strokeWidth={2.4} />
    </svg>
  );
}

/** Practice — a bolt of instant feedback. */
export function IconPractice({ size = 24, ...rest }) {
  return (
    <svg {...base} width={size} height={size} {...rest}>
      <path d="M13 2 L4 14 h6 l-1 8 9-12 h-6 z" strokeLinejoin="miter" />
    </svg>
  );
}

/** Mock exam — a timer under pressure. */
export function IconExam({ size = 24, ...rest }) {
  return (
    <svg {...base} width={size} height={size} {...rest}>
      <circle cx="12" cy="13" r="8" />
      <path d="M12 13 V8" />
      <path d="M12 13 l4 3" />
      <path d="M9 2 h6" />
    </svg>
  );
}

/** Review flagged — a planted flag. */
export function IconFlag({ size = 24, ...rest }) {
  return (
    <svg {...base} width={size} height={size} {...rest}>
      <path d="M5 21 V3" />
      <path d="M5 4 h12 l-3 4 3 4 H5" strokeLinejoin="miter" />
    </svg>
  );
}

/** Resume — skip back into a saved run. */
export function IconResume({ size = 24, ...rest }) {
  return (
    <svg {...base} width={size} height={size} {...rest}>
      <path d="M7 5 v14" />
      <path d="M20 5 L9 12 l11 7 z" strokeLinejoin="miter" />
    </svg>
  );
}

/** Back arrow. */
export function IconArrow({ size = 24, ...rest }) {
  return (
    <svg {...base} width={size} height={size} {...rest}>
      <path d="M21 12 H4" />
      <path d="M10 6 L4 12 l6 6" strokeLinejoin="miter" />
    </svg>
  );
}

/** Quit / close. */
export function IconClose({ size = 24, ...rest }) {
  return (
    <svg {...base} width={size} height={size} {...rest}>
      <path d="M5 5 L19 19" />
      <path d="M19 5 L5 19" />
    </svg>
  );
}

/** Target — the set / accuracy stat. */
export function IconTarget({ size = 24, ...rest }) {
  return (
    <svg {...base} width={size} height={size} {...rest}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Stack of topics / layers. */
export function IconLayers({ size = 24, ...rest }) {
  return (
    <svg {...base} width={size} height={size} {...rest}>
      <path d="M12 3 L21 8 l-9 5 -9-5 z" strokeLinejoin="miter" />
      <path d="M3 13 l9 5 9-5" />
    </svg>
  );
}

/** Trend / average performance. */
export function IconTrend({ size = 24, ...rest }) {
  return (
    <svg {...base} width={size} height={size} {...rest}>
      <path d="M3 17 L9 11 l4 4 7-9" strokeLinejoin="miter" />
      <path d="M14 6 h6 v6" strokeLinejoin="miter" />
    </svg>
  );
}

/** Bookmark — flag a question, ANS-style. `filled` paints it in. */
export function IconBookmark({ size = 24, filled = false, ...rest }) {
  return (
    <svg
      {...base}
      width={size}
      height={size}
      fill={filled ? "currentColor" : "none"}
      {...rest}
    >
      <path d="M6 3 h12 v18 l-6-5 -6 5 z" strokeLinejoin="miter" />
    </svg>
  );
}

/** Chevron right — header breadcrumb separator. */
export function IconChevronRight({ size = 24, ...rest }) {
  return (
    <svg {...base} width={size} height={size} {...rest}>
      <path d="M9 5 l7 7 -7 7" strokeLinejoin="miter" />
    </svg>
  );
}

/** Arrow right — navigator next. */
export function IconArrowRight({ size = 24, ...rest }) {
  return (
    <svg {...base} width={size} height={size} {...rest}>
      <path d="M3 12 H20" />
      <path d="M14 6 L20 12 l-6 6" strokeLinejoin="miter" />
    </svg>
  );
}
