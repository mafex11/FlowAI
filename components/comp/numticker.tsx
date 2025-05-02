import { NumberTicker } from "@/components/magicui/number-ticker";

export function NumberTickerDemo() {
  return (
    <NumberTicker
      value={586}
      
      className="whitespace-pre-wrap text-6xl font-extrabold tracking-tighter text-black dark:text-white"
    />
  );
}
