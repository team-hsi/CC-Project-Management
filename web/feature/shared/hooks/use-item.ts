"use client";

import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getQueryClient } from "@/lib/query-client/get-query-client";
import { toast } from "sonner";
import {
  createItem,
  updateItem,
  deleteItem,
} from "../../../actions/api/item/mutations";
import { Bucket } from "../@types/bucket";
import { Item } from "../@types/item";

export const useItem = () => {
  const queryClient = getQueryClient();
  const { projectId } = useParams<{ projectId: string }>();

  // Create item mutation
  const create = useMutation({
    mutationFn: createItem,
    onMutate: async (newItemData) => {
      await queryClient.cancelQueries({ queryKey: [projectId, "items"] });
      const previousItems = queryClient.getQueryData([projectId, "items"]);
      const bucketsQueryKey = [projectId, "buckets"];

      const buckets =
        (queryClient.getQueryData(bucketsQueryKey) as Bucket[]) || [];
      const bucket = buckets.find((b) => b.id === newItemData.bucketId);
      if (!bucket) {
        return { previousItems };
      }
      const optimisticItem: Item = {
        id: `temp-${Date.now()}`,
        name: newItemData.name || "New Item",
        description: newItemData.description || "",
        bucket: {
          id: bucket.id,
          name: bucket.name,
          color: bucket.color,
          project: {
            name: "",
            ownerId: "",
            id: "",
            createdAt: "",
            updatedAt: "",
          },
          createdAt: "",
          updatedAt: "",
        },
        status: newItemData.status || "incomplete",
        position: 0,
        priority: newItemData.priority || null,
        dueDate: newItemData.dueDate || "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        startDate: null,
        labels: [],
        checklist: [],
      };
      queryClient.setQueryData([projectId, "items"], (old: Item[] = []) => {
        return [...old, optimisticItem];
      });
      return { previousItems };
    },
    onError: (error, variables, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData([projectId, "items"], context.previousItems);
      }
      toast.error(error.name, {
        description: error.message,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [projectId, "items"] });
      toast.success("Item created successfully!");
    },
  });

  // Update item mutation
  const update = useMutation({
    mutationFn: updateItem,
    onMutate: async (updatedItemData) => {
      await queryClient.cancelQueries({ queryKey: [projectId, "items"] });
      const previousItems = queryClient.getQueryData([projectId, "items"]);
      // const newItemData = previousItems.map((item: { id: string }) => {
      //   return item.id === updatedItemData.id
      //     ? {
      //         ...item,
      //         ...updatedItemData,
      //       }
      //     : item;
      // });
      // console.log("newItemData", newItemData);
      queryClient.setQueryData([projectId, "items"], (old: Item[] = []) => {
        return old.map((item) =>
          item.id === updatedItemData.id
            ? {
                ...item,
                ...updatedItemData,
                updatedAt: new Date().toISOString(),
              }
            : item
        );
      });
      return { previousItems };
    },
    onError: (error, variables, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData([projectId, "items"], context.previousItems);
      }
      toast.error(error.name, {
        description: error.message,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [projectId, "items"] });
      toast.success("Item updated successfully!");
    },
  });

  // Delete item mutation
  const remove = useMutation({
    mutationFn: deleteItem,
    onMutate: async (deleteItem) => {
      await queryClient.cancelQueries({ queryKey: [projectId, "items"] });
      const previousItems = queryClient.getQueryData([projectId, "items"]);
      queryClient.setQueryData([projectId, "items"], (old: Item[] = []) => {
        return old.filter((item) => item.id !== deleteItem.id);
      });
      return { previousItems };
    },
    onError: (error, variables, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData([projectId, "items"], context.previousItems);
      }
      toast.error(error.message || "Failed to delete item");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [projectId, "items"] });
      toast.success("Item deleted successfully!");
    },
  });

  return {
    // Mutations
    create,
    update,
    remove,
  };
};
