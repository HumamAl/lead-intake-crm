export default function IntakeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50">
      {children}
    </div>
  );
}
