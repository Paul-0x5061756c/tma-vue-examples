import { ref } from "vue";
import { defineStore } from "pinia";
import type { user } from "~/types/user/userType";

export const useUserStore = defineStore("user", () => {
  const isLoggedIn = ref<boolean>(false);
  const loggedInUser = ref<user | undefined>();

  const clearLoggedInUser = () => {
    loggedInUser.value = undefined;
    isLoggedIn.value = false;
  };

  function signIn(username: string, password: string) {
    const validUserName = import.meta.env.VITE_DEFAULT_USERNAME;
    const validPassword = import.meta.env.VITE_DEFAULT_PASSWORD;

    loggedInUser.value = {
      username,
      password,
    };

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === validUserName && password === validPassword) {
          isLoggedIn.value = true;
          resolve(true);
        } else {
          reject(new Error("Invalid username or password"));
        }
      }, 1500);
    });
  }

  return {
    isLoggedIn,
    signIn,
    loggedInUser,
    clearLoggedInUser,
    $resetState: () => {
      clearLoggedInUser();
    },
    $persist: {
      paths: ["isLoggedIn", "loggedInUser"],
    },
  };
});
