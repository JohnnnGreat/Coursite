import { ISession } from "@/components/Auth/RegisterComponent";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

interface IUser extends ISession {}

interface IUserStore {
   user: IUser | null;
   isAuthenticated: boolean;
   login: (user: IUser) => void;
   logout: () => void;
   // isLoading: boolean;
}

const userState = create<IUserStore>()(
   persist(
      immer((set, get) => ({
         user: null,
         isAuthenticated: false,

         login: (user: IUser) => {
            console.log(user);
            set((state) => ({
               user: user,
               isAuthenticated: state.isAuthenticated,
            }));
         },

         logout: () => {
            set({
               user: null,
               isAuthenticated: false,
            });
         },
      })),
      {
         name: "User",
         partialize: (state) => ({
            user: state.user,
         }),
      },
   ),
);

export default userState;
