import type { PeerReview } from "../types";

export const peerReviews: PeerReview[] = [
  {
    id: "r1",
    projectId: "p1",
    reviewerId: "u1",
    revieweeId: "u2",
    score: 2,
  },
  {
    id: "r2",
    projectId: "p1",
    reviewerId: "u1",
    revieweeId: "u3",
    score: 1,
  },
  {
    id: "r3",
    projectId: "p1",
    reviewerId: "u2",
    revieweeId: "u1",
    score: 4,
  },
];
