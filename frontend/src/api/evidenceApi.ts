import { evidenceEvents } from "../data/evidence";
import type { EvidenceEvent } from "../types";

export function getEvidenceByProject(
  projectId: string,
): Promise<EvidenceEvent[]> {
  return Promise.resolve(
    evidenceEvents.filter((e) => e.projectId === projectId),
  );
}

export function getEvidenceByTask(taskId: string): Promise<EvidenceEvent[]> {
  return Promise.resolve(
    evidenceEvents.filter((e) => e.metadata?.taskId === taskId),
  );
}
