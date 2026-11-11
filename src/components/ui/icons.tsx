type IconProps = { className?: string }

const base = (path: React.ReactNode) =>
  function Icon({ className = 'h-6 w-6' }: IconProps) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        {path}
      </svg>
    )
  }

export const IconClock = base(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.2 2" />
  </>,
)
export const IconBolt = base(<path d="M13 2 4.5 13.5H11L9.8 22 19 10h-6.5L13 2Z" />)
export const IconCalendar = base(
  <>
    <rect x="3.5" y="5" width="17" height="16" rx="3" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
    <path d="m9.2 15.4 2 2 3.6-3.8" />
  </>,
)
export const IconBell = base(
  <>
    <path d="M6 9.5a6 6 0 1 1 12 0c0 4 1.5 5.4 1.5 5.4h-15S6 13.5 6 9.5" />
    <path d="M10 19a2.2 2.2 0 0 0 4 0" />
  </>,
)
export const IconInbox = base(
  <>
    <path d="M4 5.5h16v13H4z" opacity="0" />
    <path d="M3.5 13.5 6 5h12l2.5 8.5V19a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19v-5.5Z" />
    <path d="M3.5 13.5H9a3 3 0 0 0 6 0h5.5" />
  </>,
)
export const IconSpark = base(
  <>
    <path d="M12 3.5 13.8 9 19.5 10.8 13.8 12.6 12 18.5 10.2 12.6 4.5 10.8 10.2 9 12 3.5Z" />
    <path d="M19 3v3M20.5 4.5h-3" />
  </>,
)
export const IconMessage = base(
  <path d="M21 12a8 8 0 0 1-8 8c-1.3 0-2.6-.3-3.7-.8L4 20l.9-4.9A8 8 0 1 1 21 12Z" />,
)
export const IconArrowRight = base(<path d="M4 12h15m-6-7 7 7-7 7" />)
export const IconCheck = base(<path d="m4.5 12.5 5 5 10-11" />)
export const IconX = base(<path d="M6 6l12 12M18 6 6 18" />)
export const IconMoon = base(<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />)
export const IconPhone = base(
  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />,
)
export const IconPhoneMissed = base(
  <>
    <path d="M5 4h4l1.5 4.5L8 10a12.5 12.5 0 0 0 6 6l1.5-2.5L20 15v4a2 2 0 0 1-2.2 2A17.5 17.5 0 0 1 3 6.2 2 2 0 0 1 5 4Z" />
    <path d="m16 4 5 5m0-5-5 5" />
  </>,
)
export const IconHourglass = base(
  <>
    <path d="M6.5 3.5h11M6.5 20.5h11M7.5 3.5c0 5 9 5.5 9 8.5s-9 3.5-9 8.5M16.5 3.5c0 5-9 5.5-9 8.5s9 3.5 9 8.5" />
  </>,
)
export const IconRepeat = base(
  <>
    <path d="M20 12a8 8 0 1 1-2.3-5.6M20 3.5V8h-4.5" />
  </>,
)
export const IconTrending = base(
  <>
    <path d="m3.5 17.5 5.5-5.5 3.5 3.5 7.5-8" />
    <path d="M15 7.5h5v5" />
  </>,
)
