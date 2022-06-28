import { watch } from "vue";
export function useWatchCharacters(valueToWatch, maxChars = 100) {
  watch(valueToWatch, (newValue) => {
    if (newValue.note.length >= maxChars) {
      alert(`Only ${maxChars} character allowed`);
    }
  });
}
