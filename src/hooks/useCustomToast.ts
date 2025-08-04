import { toast as originalToast } from "@/hooks/use-toast"

interface CustomToastOptions {
  title?: string
  description?: string
  duration?: number
}

export const useCustomToast = () => {
  return {
    success: (options: CustomToastOptions) => originalToast({
      title: options.title,
      description: options.description,
      duration: options.duration || 4000,
    }),
    warning: (options: CustomToastOptions) => originalToast({
      title: options.title,
      description: options.description,
      duration: options.duration || 4000,
    }),
    error: (options: CustomToastOptions) => originalToast({
      variant: 'destructive',
      title: options.title,
      description: options.description,
      duration: options.duration || 4000,
    }),
    info: (options: CustomToastOptions) => originalToast({
      title: options.title,
      description: options.description,
      duration: options.duration || 4000,
    }),
    toast: originalToast, // Keep original for compatibility
  }
}