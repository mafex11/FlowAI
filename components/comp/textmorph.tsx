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
  return (
    <MorphingText 
      className="w-full flex justify-center text-4xl md:text-7xl lg:text-9xl mx-auto" 
      texts={texts} 
    />
  );
}