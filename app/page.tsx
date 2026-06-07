import { getContent } from "@/lib/content";
import { BioPage } from "@/components/BioPage";

export default function Home() {
  const content = getContent();
  return <BioPage content={content} />;
}
