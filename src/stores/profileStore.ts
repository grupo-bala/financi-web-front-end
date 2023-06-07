import { defineStore } from "pinia";
import { Profile } from "../types/Profile";

export const useProfileStore = defineStore("profile", {
  state: () => {
    return {
      data: [] as Profile[],
      imageUrl: new FormData,
    };
  },
  actions: {
    updateProfile(profile: Profile) {
      this.data[0].email = profile.email;
      this.data[0].name = profile.name;
      this.data[0].fixedIncome = profile.fixedIncome;
    },
    updateProfileImage(imageUrl: File) {
      this.imageUrl.append("imageUrl", imageUrl);
    },
  },
});
