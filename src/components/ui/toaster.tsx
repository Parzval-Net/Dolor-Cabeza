
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} className="bg-white border-2 border-slate-300 shadow-xl">
            <div className="grid gap-1">
              {title && <ToastTitle className="text-slate-900 font-bold text-base">{title}</ToastTitle>}
              {description && (
                <ToastDescription className="text-slate-700 font-semibold text-sm">{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose className="text-slate-600 hover:text-slate-900" />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
