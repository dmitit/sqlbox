export const setItem = (key: string, value: unknown) => {
   try {
      window.localStorage.setItem(key, JSON.stringify(value));
   } catch (error) {
      console.error(error);
   }
};

export const getItem = (key: string) => {
   try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
   } catch (error) {
      console.error(error);
   }
};
