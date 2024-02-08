/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

interface IStore {
    isLoading: boolean,
    books: any[];
    limit: number;
    page: number;

    userPoint: number;

    hasMore: boolean;

    setLimit: (data: number) => void;
    setPage: (data: number) => void;
    setBooks: (data: any) => void;

    setIsLoading: (load: boolean) => void;
    setHasMore: (data: boolean) => void;

    setUserPoint: (data: number) => void;
}
export const useStore = create<IStore>((set) => ({
    isLoading: false,
    books: [],
    limit: 12,
    page: 1,
    userPoint: 0,

    hasMore: true,

    setIsLoading: (load: boolean) => set({ isLoading: load }),
    setHasMore: (data: boolean) => set({ hasMore: data }),

    setLimit: (data) => set(({ limit: data })),
    setPage: (data: number) => set(({ page: data + 1 })),
    //setBooks: (data: any) => set(({ books: data })),
    setBooks: (data: any | any[]) => {
        set((state) => ({
            books: Array.isArray(data) ? [...state.books, ...data] : [...state.books, data],
        }));
    },
    setUserPoint: (data: any) => set(({ userPoint: data })),
}))