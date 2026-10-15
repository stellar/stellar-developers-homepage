import { Hero } from "@/components/sections/Hero";
import { PillarCards } from "@/components/sections/PillarCards";
import { Network } from "@/components/sections/Network";
import { Primitives } from "@/components/sections/Primitives";
import { Tooling } from "@/components/sections/Tooling";
import { Ramps } from "@/components/sections/Ramps";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { SupportAndStart } from "@/components/sections/SupportAndStart";

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
      <SupportAndStart />
    </>
  );
}
