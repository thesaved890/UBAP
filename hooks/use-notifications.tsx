"use client"

import { useState, useCallback } from "react"
import { NotificationToast, type NotificationType } from "@/components/notification-toast"

interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const showNotification = useCallback((type: NotificationType, title: string, message: string) => {
    const id = Math.random().toString(36).substring(7)
    setNotifications((prev) => [...prev, { id, type, title, message }])
  }, [])

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  const showSuccess = useCallback(
    (title: string, message: string) => {
      showNotification("success", title, message)
    },
    [showNotification],
  )

  const showError = useCallback(
    (title: string, message: string) => {
      showNotification("error", title, message)
    },
    [showNotification],
  )

  const showAIInsight = useCallback(
    (title: string, message: string) => {
      showNotification("ai-insight", title, message)
    },
    [showNotification],
  )

  const showSecurityAlert = useCallback(
    (title: string, message: string) => {
      showNotification("security", title, message)
    },
    [showNotification],
  )

  const NotificationContainer = useCallback(
    () => (
      <>
        {notifications.map((notification) => (
          <NotificationToast
            key={notification.id}
            type={notification.type}
            title={notification.title}
            message={notification.message}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </>
    ),
    [notifications, removeNotification],
  )

  return {
    showNotification,
    showSuccess,
    showError,
    showAIInsight,
    showSecurityAlert,
    NotificationContainer,
  }
}
