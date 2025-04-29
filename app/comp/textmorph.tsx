import { MorphingText } from "@/components/magicui/morphing-text";

const texts = [
  "FlowAI",
  "SmartNotes",
  "Study Assistant",
  "Study Planner",
  "Topic Tracker",
  "Last Minute Solution",
  "Exam Buddy",
  "Quick Review",
  "Brain Booster",
  "Your Final Prep",
  



];

export function MorphingTextDemo() {
  return <MorphingText className="max-w-9xl flex justify-center text-7xl mx-auto mt-40" texts={texts} />;
}
