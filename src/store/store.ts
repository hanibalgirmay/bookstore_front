/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

interface IFilter {
    value: string;
    label: string
}

interface IStore {
    isLoading: boolean,
    filterOption: IFilter[],
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

    resetBooks: () => void;
}
export const useStore = create<IStore>((set) => ({
    isLoading: false,
    books: [],
    limit: 12,
    page: 1,
    userPoint: 0,

    hasMore: true,

    filterOption: [
        { value: 'FICTION', label: 'Fiction' },
        { value: 'NON_FICTION', label: 'Non-Fiction' },
        { value: 'SCIENCE', label: 'Science' },
        { value: 'ESSAY', label: 'Essay' },
    ],

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

    resetBooks: () => {
        set({ books: [] });
    },
}))