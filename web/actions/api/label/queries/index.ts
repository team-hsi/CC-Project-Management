"use server";
import { Label, LabelPayload } from "@/feature/shared/@types/label";
import { get } from "../../../core/api-client";
import { extractErrors } from "@/lib/utils";
import { ProjectPayload } from "@/feature/shared/@types/projects";
import { CACHE_LIFE, CACHE_TAGS } from "../../../core/cache-config";

/**
 * Fetches all labels from the server.
 * Logs and rethrows a cleaned-up error if the request fails.
 */

export const getAllLabels = async () => {
  try {
    return await get<Label[]>(`/v1/labels/getAll`);
  } catch (error) {
    console.error("Error fetching all labels", error);
    throw new Error(extractErrors(error));
  }
};

export const getLabelById = async (payload: Pick<LabelPayload, "id">) => {
  try {
    return await get<Label>(`/v1/labels/${payload.id}`);
  } catch (error) {
    console.error("Error fetching label by id", error);
    throw new Error(extractErrors(error));
  }
};

export const getProjectLabels = async (payload: Pick<ProjectPayload, "id">) => {
  const { id } = payload;
  try {
    return await get<Label[]>(`/v1/projects/${id}/labels`, {
      next: {
        revalidate: CACHE_LIFE.LONG,
        tags: [CACHE_TAGS.PROJECT.LABELS(id)],
      },
      cache: "force-cache",
    });
  } catch (error) {
    console.error(`Error fetching project ${id} labels:`, error);
    throw new Error(extractErrors(error));
  }
};
