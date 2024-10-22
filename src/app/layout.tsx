// app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'Survival Strategy App',
  description: 'Submit your strategy for surviving extreme conditions!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
