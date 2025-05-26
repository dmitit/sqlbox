import { useEffect } from 'react';

type ShortcutHandler = (e: KeyboardEvent) => void;

export function useShortcut(keys: string[], handler: ShortcutHandler) {
   useEffect(() => {
      const onKeyDown = (e: KeyboardEvent) => {
         const keySet = new Set(keys.map((k) => k.toLowerCase()));
         const pressed = [
            e.ctrlKey ? 'ctrl' : null,
            e.metaKey ? 'meta' : null,
            e.altKey ? 'alt' : null,
            e.shiftKey ? 'shift' : null,
            e.key.toLowerCase(),
         ].filter(Boolean) as string[];

         if (
            keySet.size === pressed.length &&
            pressed.every((k) => keySet.has(k))
         ) {
            handler(e);
         }
      };
      window.addEventListener('keydown', onKeyDown);
      return () => window.removeEventListener('keydown', onKeyDown);
   }, [keys, handler]);
}
