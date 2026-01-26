import { peerReviews } from "../data/reviews";
import type { PeerReview } from "../types";

export function getReviewsByProject(projectId: string): Promise<PeerReview[]> {
  return Promise.resolve(peerReviews.filter((r) => r.projectId === projectId));
}
