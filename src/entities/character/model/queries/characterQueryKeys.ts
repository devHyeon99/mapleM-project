export const characterQueryKeys = {
  all: ["characters"] as const,
  ocid: (world: string, name: string) =>
    [...characterQueryKeys.all, "ocid", world, name] as const,
};
