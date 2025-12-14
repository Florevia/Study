import { defineStore } from "pinia";
import { ref } from "vue";

export const useSonStore = defineStore("sonStore", () => {
  const username = ref("son");
  const sing = () => {
    ElMessage.success("I am singing");
  };
  return {
    username,
    sing,
  };
});
