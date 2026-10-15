import { Placeholder } from "@/components/sections/Placeholder";

// Section order and numbering follow the V6 Figma frame (copy deck 10/13).
export default function Home() {
  return (
    <>
      <Placeholder id="hero" num="01" title="Hero" height={745} />
      <Placeholder id="build" num="02" title="Pillar cards" height={551} />
      <Placeholder id="network" num="03" title="Network" height={673} />
      <Placeholder id="primitives" num="04" title="Primitives" height={961} />
      <Placeholder id="tooling" num="05" title="Tooling" height={806} />
      <Placeholder id="ramps" num="06" title="Ramps" height={829} />
      <Placeholder id="ecosystem" num="07" title="Ecosystem" height={673} />
      <Placeholder id="support" num="08" title="Support" height={576} />
      <Placeholder id="previews" num="09" title="Developer Previews + 10 · Start building" height={286} />
    </>
  );
}
