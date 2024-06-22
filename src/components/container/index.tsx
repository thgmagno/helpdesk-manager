export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-7xl px-2 pb-20 pt-5">{children}</div>
  )
}
