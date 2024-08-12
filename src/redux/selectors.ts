import { RootState } from "./store";

export const selectRepositories = (state: RootState) => state.github.repositories;
export const selectLoading = (state: RootState) => state.github.loading;
export const selectError = (state: RootState) => state.github.error;
export const selectSelectedRepository = (state: RootState) => state.github.selectedRepository;