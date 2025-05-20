import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export function useMessages(directoryId: string) {
  const key = `msgs_${directoryId}`;
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(key)
      .then((stored) => {
        setMessages(stored ? JSON.parse(stored) : []);
      })
      .finally(() => setLoading(false));
  }, [directoryId]);

  const save = async (msgs: string[]) => {
    setMessages(msgs);
    await AsyncStorage.setItem(key, JSON.stringify(msgs));
  };

  const addMessage = (text: string) => save([...messages, text]);
  const updateMessage = (i: number, text: string) => {
    const copy = [...messages];
    copy[i] = text;
    save(copy);
  };
  const deleteMessage = (i: number) => {
    const copy = messages.filter((_, idx) => idx !== i);
    save(copy);
  };

  return { messages, loading, addMessage, updateMessage, deleteMessage };
}
