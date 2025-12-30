import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="bottom-right"
      richColors
      closeButton
      icons={{
        success: <CircleCheckIcon className="size-5 text-green-500" />,
        info: <InfoIcon className="size-5 text-blue-500" />,
        warning: <TriangleAlertIcon className="size-5 text-amber-500" />,
        error: <OctagonXIcon className="size-5 text-red-500" />,
        loading: <Loader2Icon className="size-5 animate-spin text-blue-500" />,
      }}
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-white/90 dark:group-[.toaster]:bg-slate-900/90 group-[.toaster]:backdrop-blur-xl group-[.toaster]:border-2 group-[.toaster]:border-white/40 dark:group-[.toaster]:border-white/10 group-[.toaster]:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] dark:group-[.toaster]:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)] group-[.toaster]:rounded-2xl group-[.toaster]:px-4 group-[.toaster]:py-3",
          title: "group-[.toast]:text-gray-900 dark:group-[.toast]:text-slate-50 group-[.toast]:font-semibold group-[.toast]:text-sm",
          description: "group-[.toast]:text-gray-600 dark:group-[.toast]:text-gray-400 group-[.toast]:text-sm",
          actionButton: "group-[.toast]:bg-blue-600 group-[.toast]:text-white group-[.toast]:hover:bg-blue-700 group-[.toast]:rounded-xl group-[.toast]:px-4 group-[.toast]:py-2 group-[.toast]:text-sm group-[.toast]:font-medium group-[.toast]:transition-all",
          cancelButton: "group-[.toast]:bg-gray-100 dark:group-[.toast]:bg-slate-800 group-[.toast]:text-gray-700 dark:group-[.toast]:text-gray-300 group-[.toast]:hover:bg-gray-200 dark:group-[.toast]:hover:bg-slate-700 group-[.toast]:rounded-xl group-[.toast]:px-4 group-[.toast]:py-2 group-[.toast]:text-sm group-[.toast]:font-medium group-[.toast]:transition-all",
          closeButton: "group-[.toast]:bg-transparent group-[.toast]:hover:bg-gray-100 dark:group-[.toast]:hover:bg-slate-800 group-[.toast]:text-gray-500 dark:group-[.toast]:text-gray-400 group-[.toast]:rounded-lg group-[.toast]:transition-all",
        },
      }}
      style={
        {
          "--normal-bg": "rgba(255, 255, 255, 0.9)",
          "--normal-text": "rgb(17, 24, 39)",
          "--normal-border": "rgba(255, 255, 255, 0.4)",
          "--border-radius": "1rem",
          "--success-bg": "rgba(240, 253, 244, 0.9)",
          "--success-text": "rgb(22, 163, 74)",
          "--success-border": "rgba(34, 197, 94, 0.2)",
          "--error-bg": "rgba(254, 242, 242, 0.9)",
          "--error-text": "rgb(220, 38, 38)",
          "--error-border": "rgba(239, 68, 68, 0.2)",
          "--warning-bg": "rgba(255, 251, 235, 0.9)",
          "--warning-text": "rgb(217, 119, 6)",
          "--warning-border": "rgba(245, 158, 11, 0.2)",
          "--info-bg": "rgba(239, 246, 255, 0.9)",
          "--info-text": "rgb(37, 99, 235)",
          "--info-border": "rgba(59, 130, 246, 0.2)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
