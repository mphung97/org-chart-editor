import dynamic from "next/dynamic";
const Flow = dynamic(() => import("@/components/flow"), {});

export default function Home() {
  return (
    <main>
      <Flow />
    </main>
  );
}
