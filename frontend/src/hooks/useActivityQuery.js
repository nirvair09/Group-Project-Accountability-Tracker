import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../auth/AuthContext.jsx';

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1';

async function fetchActivity(url, token) {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch activity');
  }

  // task-service returns a plain array of events, not { events, pagination }
  return response.json();
}

export function useProjectActivity(projectId) {
  const { token } = useAuth();

  return useQuery({
    queryKey: ['activity', 'project', projectId],
    queryFn: () => fetchActivity(`${BASE}/projects/${projectId}/activity`, token),
    enabled: !!token && !!projectId,
    staleTime: 1 * 60 * 1000,
  });
}

export function useAllActivity(enabled = true) {
  const { token } = useAuth();

  return useQuery({
    queryKey: ['activity', 'all'],
    queryFn: () => fetchActivity(`${BASE}/activity`, token),
    enabled: !!token && enabled,
    staleTime: 1 * 60 * 1000,
  });
}
