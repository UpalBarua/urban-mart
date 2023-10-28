import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@/components/theme-provider';
import RootLayout from '@/layouts/root-layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { AuthContextProvider } from '@/context/auth-context';
import { CartContextProvider } from '@/context/cart-context';

const queryClient = new QueryClient({});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <CartContextProvider>
            <RootLayout>
              <Component {...pageProps} />
              <Toaster richColors />
            </RootLayout>
          </CartContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
