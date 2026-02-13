export default function AppLogo() {
  return (
    <div
      className="flex items-center no-select whitespace-nowrap"
      aria-selected={false}
    >
      <img
        draggable={false}
        src="logo.png"
        alt="Meta Hero Logo"
        className="h-16 z-20 logo"
      />
      <span className="logo relative top-[0.75rem] right-[1.5rem] text-zinc-900 font-extrabold text-[1.75rem] z-10">
        Meta Hero{' '}
        <span className="logo relative right-2 text-emerald-500">.</span>
      </span>
    </div>
  )
}
