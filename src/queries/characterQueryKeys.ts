export const characterQueryKeys = {
  all: ["characters"] as const,
  ocid: (world: string, name: string) =>
    [...characterQueryKeys.all, "ocid", world, name] as const,
  details: (ocid: string) =>
    [...characterQueryKeys.all, "details", ocid] as const,
};
