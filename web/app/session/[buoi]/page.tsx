import { notFound } from "next/navigation";
import { SessionFlow } from "@/components/SessionFlow";
import { getContentPack } from "@/lib/content";

interface SessionPageProps {
  params: Promise<{ buoi: string }>;
}

export default async function SessionPage({ params }: SessionPageProps) {
  const { buoi: buoiStr } = await params;
  const buoi = Number(buoiStr);

  if (Number.isNaN(buoi) || buoi < 1 || buoi > 12) {
    notFound();
  }

  const pack = getContentPack(buoi);
  if (!pack) {
    notFound();
  }

  return <SessionFlow pack={pack} />;
}
