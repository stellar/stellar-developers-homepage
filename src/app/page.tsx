import { Placeholder } from "@/components/sections/Placeholder";
import { Hero } from "@/components/sections/Hero";
import { PillarCards } from "@/components/sections/PillarCards";
import { Network } from "@/components/sections/Network";
import { Primitives } from "@/components/sections/Primitives";
import { Tooling } from "@/components/sections/Tooling";

// Section order and numbering follow the V6 Figma frame (copy deck 10/13).
export default function Home() {
  return (
    <>
      <Hero />
      <PillarCards />
      <Network />
      <Primitives />
      <Tooling />
      <Placeholder id="ramps" num="06" title="Ramps" height={829} />
      <Placeholder id="ecosystem" num="07" title="Ecosystem" height={673} />
      <Placeholder id="support" num="08" title="Support" height={576} />
      <Placeholder id="previews" num="09" title="Developer Previews + 10 · Start building" height={286} />
    </>
  );
}
