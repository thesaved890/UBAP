"use server"

import { createSupabaseClient, isSupabaseConfigured } from "./supabase-service"

export async function logAuditEvent(eventType: string, details: string, metadata: Record<string, unknown> = {}) {
  if (!isSupabaseConfigured) {
    console.info(`[audit] ${eventType}: ${details}`, metadata)
    return null
  }

  try {
    const supabase = createSupabaseClient()
    const { data, error } = await supabase
      .from("audit_logs")
      .insert({
        event_type: eventType,
        details,
        metadata,
        status: "completed",
      })
      .select()
      .single()

    if (error) {
      console.warn("[audit] failed to persist event:", error)
      return null
    }

    return data
  } catch (error) {
    console.warn("[audit] failed to persist event:", error)
    return null
  }
}
