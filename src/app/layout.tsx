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
       {/* <head>
        <script src="https://telegram.org/js/telegram-web-app.js" />
      </head> */}
      <body>{children}</body>
    </html>
  );
}
