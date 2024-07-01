export const createFishSlice = (set: any) => ({
  fishes: 0,
  addFish: () => set((state: any) => ({ fishes: state.fishes + 1 })),
});
