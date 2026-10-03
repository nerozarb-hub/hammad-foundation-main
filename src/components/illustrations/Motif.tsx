type Kind = "books" | "calendar" | "school" | "questions" | "payment";

export function Motif({ kind, size = 52, className = "" }: { kind: Kind; size?: number; className?: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 2.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return <svg width={size} height={size} viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false" {...common}>
    <circle cx="32" cy="32" r="29" fill="#DDF7E8" stroke="none" />
    {kind === "books" && <><path d="M12 19c7-3 14-2 20 3 6-5 13-6 20-3v27c-7-3-14-2-20 3-6-5-13-6-20-3V19Z" fill="#fff"/><path d="M32 22v27M17 26c4-1 8 0 11 2m-11 5c4-1 8 0 11 2m8-7c3-2 7-3 11-2m-11 9c3-2 7-3 11-2"/></>}
    {kind === "calendar" && <><rect x="13" y="18" width="38" height="33" rx="3" fill="#fff"/><path d="M13 27h38M22 13v10m20-10v10M21 35h5m6 0h5m6 0h2M21 43h5m6 0h5"/></>}
    {kind === "school" && <><path d="M10 28 32 15l22 13v25H10V28Z" fill="#fff"/><path d="M20 30h8v8h-8zm16 0h8v8h-8zM28 53V42h8v11M10 28h44"/></>}
    {kind === "questions" && <><path d="M13 16h38v27H31L20 52v-9h-7V16Z" fill="#fff"/><path d="M26 26c0-4 3-6 7-6s7 2 7 6c0 5-7 5-7 10m0 5h.01"/></>}
    {kind === "payment" && <><rect x="11" y="19" width="42" height="28" rx="4" fill="#fff"/><path d="M11 28h42M19 39h11m8 0h6"/><circle cx="46" cy="47" r="9" fill="#087E3B" stroke="#087E3B"/><path d="m42 47 3 3 5-6" stroke="#fff"/></>}
  </svg>;
}
