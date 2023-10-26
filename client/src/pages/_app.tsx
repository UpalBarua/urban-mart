import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@/components/theme-provider';
import RootLayout from '@/layouts/root-layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { AuthContextProvider } from '@/context/auth-context';

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
          <RootLayout>
            <Component {...pageProps} />
            <Toaster richColors />
          </RootLayout>
        </AuthContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
