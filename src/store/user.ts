import { defineStore } from "pinia";
import { RetrieveUser, SignIn, SignUp, SignOut, sendCode } from "../api/index";
export const useUserStore = defineStore("user", {
  actions: {
    async fetchUser() {
      const { user } = await RetrieveUser();
      this.user = user || null;
    },
    async login(email: string, password: string) {
      await SignIn(email, password);

      await this.fetchUser();
    },
    async sendCode(email: string, password: string) {
      await sendCode(email, password);
    },
    async register(email: string, token: string) {
      await SignUp(email, token);
    },
    async logout() {
      await SignOut();
      this.user = null;
    },
  },

  state() {
    return {
      user: null as null | any,
    };
  },
});
