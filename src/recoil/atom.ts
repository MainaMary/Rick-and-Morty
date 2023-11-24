import { atom } from "recoil";

export const statusState = atom({
  key: "statusState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value
});
export const genderState = atom({
  key: "genderState",
  default: "",
});
