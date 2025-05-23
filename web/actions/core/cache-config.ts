export const CACHE_TIME = (min: number) => 60 * min;
export const CACHE_LIFE = {
    REALTIME: CACHE_TIME(0.5),
    MINUTE: CACHE_TIME(1),
    VERY_SHORT: CACHE_TIME(3),
    SHORT: CACHE_TIME(5),
    MEDIUM: CACHE_TIME(15), // 15 minutes
    LONG: CACHE_TIME(30), // 30 minutes
    HOUR: CACHE_TIME(60), // 1 hour
    EXTENDED: CACHE_TIME(360), // 6 hours
}
export const CACHE_TAGS = {
  USER: {
    WORKSPACES: (id: string) => `user-${id}-workspaces`,
  },
  WORKSPACE: {
    ALL: "workspaces",
    ONE: (id: string) => `workspace-${id}`,
    MEMBERS: (id: string) => `workspace-${id}-members`,
    PROJECTS: (id: string) => `workspace-${id}-projects`,
    ROOMS: (id: string) => `workspace-${id}-rooms`,
  },
  ROOM: {
    ALL: "rooms",
    ONE: (id: string) => `room-${id}`,
    MEMBERS: (id: string) => `room-${id}-members`,
    MESSAGES: (id: string) => `room-${id}-messages`,
  },
  PROJECT: {
    ALL: "projects",
    ONE: (id: string) => `project-${id}`,
    BUCKETS: (id: string) => `project-${id}-buckets`,
    ITEMS: (id: string) => `project-${id}-items`,
    LABELS: (id: string) => `project-${id}-labels`,
  },
  BUCKET: {
    ALL: "buckets",
    ONE: (id: string) => `bucket-${id}`,
    ITEMS: (id: string) => `bucket-${id}-items`,
  },
  ITEM: {
    ALL: "items",
    ONE: (id: string) => `item-${id}`,
  },
};
