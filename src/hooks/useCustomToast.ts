import { toast as originalToast } from "@/hooks/use-toast"

type ToastType = 'success' | 'warning' | 'error' | 'info'

interface CustomToastOptions {
  title?: string
  description?: string
  duration?: number
}

export const useCustomToast = () => {
  const showToast = (type: ToastType, options: CustomToastOptions) => {
    return originalToast({
      variant: type,
      title: options.title,
      description: options.description,
      duration: options.duration || 4000,
    })
  }

  return {
    success: (options: CustomToastOptions) => showToast('success', options),
    warning: (options: CustomToastOptions) => showToast('warning', options),
    error: (options: CustomToastOptions) => showToast('error', options),
    info: (options: CustomToastOptions) => showToast('info', options),
    toast: originalToast, // Keep original for compatibility
  }
}