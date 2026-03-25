import { useMutation, useQuery } from "@tanstack/react-query";
import type { Booking } from "../backend.d";
import { useActor } from "./useActor";

export function useGetStats() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getStats();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetProjects() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProjects();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetFeaturedProject() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["featuredProject"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getFeaturedProject();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetServices() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllServices();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetParts() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["parts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllParts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitBooking() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (booking: Booking) => {
      if (!actor) throw new Error("Actor not available");
      return actor.submitBooking(booking);
    },
  });
}
