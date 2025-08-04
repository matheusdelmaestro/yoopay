import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Layout from "@/components/Layout";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "@/contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider 
        attribute="class" 
        defaultTheme="light" 
        enableSystem={false}
        disableTransitionOnChange={false}
      >
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />} />
              <Route path="/cadastro" element={<Layout />} />
              <Route path="/pedidos" element={<Layout />} />
              <Route path="/transacoes" element={<Layout />} />
              <Route path="/credenciamentos" element={<Layout />} />
              <Route path="/pendentes" element={<Layout />} />
              <Route path="/repasses" element={<Layout />} />
              <Route path="/relatorios" element={<Layout />} />
              <Route path="/logs" element={<Layout />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
