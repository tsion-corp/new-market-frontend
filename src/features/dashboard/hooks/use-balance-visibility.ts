import { useState } from "react";

export function useBalanceVisibility(): { visible: boolean; toggle: () => void } {
  const [visible, setVisible] = useState(true);
  return { visible, toggle: () => setVisible((current) => !current) };
}
