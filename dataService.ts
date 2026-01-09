
import { QuizResults, BackendDatabase } from "./types";

const WEBHOOK_KEY = "pulse_webhook_url";
const BACKEND_DB_KEY = "mirror_central_database";

export function getWebhookUrl(): string {
  return localStorage.getItem(WEBHOOK_KEY) || "";
}

export function setWebhookUrl(url: string) {
  localStorage.setItem(WEBHOOK_KEY, url);
}

/**
 * SIMULATED BACKEND OPERATIONS
 * Accessible via Creator Portal
 */
export function getBackendDatabase(): BackendDatabase {
  const data = localStorage.getItem(BACKEND_DB_KEY);
  if (!data) return { records: [] };
  try {
    return JSON.parse(data);
  } catch (e) {
    return { records: [] };
  }
}

export function saveToBackend(results: QuizResults) {
  const db = getBackendDatabase();
  const record: QuizResults = {
    ...results,
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString()
  };
  db.records.push(record);
  localStorage.setItem(BACKEND_DB_KEY, JSON.stringify(db));
  return record;
}

export function deleteBackendRecord(id: string) {
  const db = getBackendDatabase();
  db.records = db.records.filter(r => r.id !== id);
  localStorage.setItem(BACKEND_DB_KEY, JSON.stringify(db));
}

export function clearBackend() {
  localStorage.setItem(BACKEND_DB_KEY, JSON.stringify({ records: [] }));
}

/**
 * EXTERNAL SYNC PROTOCOL
 */
export async function submitToResearchLogs(results: QuizResults) {
  // Always save to the "local backend" first
  saveToBackend(results);

  const url = getWebhookUrl();
  if (!url) {
    console.warn("Data Service: External Sync skipped. Internal Backend Updated.");
    return false;
  }

  try {
    await fetch(url, {
      method: "POST",
      mode: 'no-cors',
      body: JSON.stringify({
        ...results,
        timestamp: new Date().toISOString()
      }),
    });
    return true;
  } catch (error) {
    console.error("Data Service: Failed to sync research data.", error);
    return false;
  }
}
