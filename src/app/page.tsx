import { Placeholder } from "@/components/sections/Placeholder";
import { Hero } from "@/components/sections/Hero";
import { PillarCards } from "@/components/sections/PillarCards";
import { Network } from "@/components/sections/Network";
import { Primitives } from "@/components/sections/Primitives";
import { Tooling } from "@/components/sections/Tooling";
import { Ramps } from "@/components/sections/Ramps";
import { Ecosystem } from "@/components/sections/Ecosystem";

// Section order and numbering follow the V6 Figma frame (copy deck 10/13).
export default function Home() {
  return (
    <>
      <Hero />
      <PillarCards />
      <Network />
      <Primitives />
      <Tooling />
      <Ramps />
      <Ecosystem />
      <Placeholder id="support" num="08" title="Support" height={576} />
      <Placeholder id="previews" num="09" title="Developer Previews + 10 · Start building" height={286} />
    </>
  );
}
