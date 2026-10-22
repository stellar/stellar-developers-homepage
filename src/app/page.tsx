import { Hero } from "@/components/sections/Hero";
import { LayerNav } from "@/components/sections/LayerNav";
import { Network } from "@/components/sections/Network";
import { Primitives } from "@/components/sections/Primitives";
import { Ramps } from "@/components/sections/Ramps";
import { Tooling } from "@/components/sections/Tooling";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { SupportAndStart } from "@/components/sections/SupportAndStart";

// Section order follows the V8 frame (Figma 2097:15398): the three-tile grid is replaced by the
// sticky layer nav, and Ramps moves ahead of Tooling so Network → Primitives → Ramps is one run.
export default function Home() {
  return (
    <>
      <Hero />
      <div className="layers">
        <LayerNav />
        <Network />
        <Primitives />
        <Ramps />
      </div>
      <Tooling />
      <Ecosystem />
      <SupportAndStart />
    </>
  );
}
