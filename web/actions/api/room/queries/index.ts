"use server";
import { Room, RoomPayload } from "@/feature/shared/@types/room";
import { get } from "../../../core/api-client";
import { extractErrors } from "@/lib/utils";
import { WorkspacePayload } from "@/feature/shared/@types/space";
import { CACHE_LIFE, CACHE_TAGS } from "../../../core/cache-config";

export const getAllRooms = async () => {
  try {
    return await get<Room[]>(`/v1/rooms/getAll`);
  } catch (error) {
    console.error("Error fetching all rooms", error);
    throw new Error(extractErrors(error));
  }
};

export const getRoomById = async (payload: Pick<RoomPayload, "id">) => {
  try {
    return await get<Room>(`/v1/rooms/${payload.id}`, {
      next: {
        revalidate: CACHE_LIFE.MEDIUM,
        tags: [CACHE_TAGS.ROOM.ONE(payload.id)],
      },
      cache: "force-cache",
    });
  } catch (error) {
    console.error("Error fetching room by id", error);
    throw new Error(extractErrors(error));
  }
};

export const getWorkspaceRooms = async (
  payload: Pick<WorkspacePayload, "id">
) => {
  try {
    return await get<Room[]>(`/v1/spaces/${payload.id}/rooms`, {
      next: {
        revalidate: CACHE_LIFE.MEDIUM,
        tags: [CACHE_TAGS.WORKSPACE.ROOMS(payload.id)],
      },
      cache: "force-cache",
    });
  } catch (error) {
    console.error("Error fetching workspace rooms", error);
    throw new Error(extractErrors(error));
  }
};

export const getRoomMembers = async (payload: Pick<RoomPayload, "id">) => {
  try {
    return await get<Room>(`/v1/rooms/${payload.id}/members`, {
      next: {
        revalidate: CACHE_LIFE.LONG,
        tags: [CACHE_TAGS.ROOM.MEMBERS(payload.id)],
      },
      cache: "force-cache",
    });
  } catch (error) {
    console.error("Error fetching room members", error);
    throw new Error(extractErrors(error));
  }
};
