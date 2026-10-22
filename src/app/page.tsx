import { Hero } from "@/components/sections/Hero";
import { Network } from "@/components/sections/Network";
import { Primitives } from "@/components/sections/Primitives";
import { Ramps } from "@/components/sections/Ramps";
import { Tooling } from "@/components/sections/Tooling";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { SupportAndStart } from "@/components/sections/SupportAndStart";

// Section order follows the V8 frame (Figma 2097:15398) minus the layer nav, which Maz removed on 22 Oct
// pending Edison's redesign of the pillars (#21). The hero runs straight into Network.
// Backgrounds alternate gray-01 / gray-02 down the page (Maz, 22 Oct): hero, Network, Primitives, Ramps, Tooling, Ecosystem, Support, footer.
export default function Home() {
  return (
    <>
      <Hero />
      <Network />
      <Primitives />
      <Ramps />
      <Tooling />
      <Ecosystem />
      <SupportAndStart />
    </>
  );
}
