import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <main className="relative mx-auto flex min-h-[calc(100vh-0px)] w-full max-w-6xl flex-col items-center justify-center px-6 py-20">
      <div className="flex flex-col items-center text-center gap-6 max-w-3xl">
        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="PrepWise" width={42} height={36} />
          <h1 className="text-3xl font-semibold tracking-tight text-primary-100">PrepWise</h1>
        </div>

        <h2 className="text-balance text-4xl sm:text-5xl font-bold leading-tight">
          Get Interview‑Ready with an AI Voice Interviewer
        </h2>
        <p className="text-muted-foreground text-lg">
          Generate tailored interview questions and practice them in a real-time voice call.
          Track your sessions and improve faster with a modern, focused experience.
        </p>

        <div className="mt-2 flex flex-col sm:flex-row gap-4">
          <Button asChild className="btn">
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/sign-up">Create an account</Link>
          </Button>
        </div>
      </div>

      <div className="mt-14 grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="card-border">
          <div className="card p-6 h-full flex flex-col gap-2 items-start">
            <Image src="/tech.svg" alt="AI" width={28} height={28} />
            <h3 className="text-xl font-semibold">AI‑Generated Sets</h3>
            <p className="text-sm text-muted-foreground">
              Create interview questions by role, level, and tech stack using Gemini.
            </p>
          </div>
        </div>
        <div className="card-border">
          <div className="card p-6 h-full flex flex-col gap-2 items-start">
            <Image src="/globe.svg" alt="Voice" width={28} height={28} />
            <h3 className="text-xl font-semibold">Real‑time Voice</h3>
            <p className="text-sm text-muted-foreground">
              Practice with a natural AI interviewer powered by Vapi’s voice SDK.
            </p>
          </div>
        </div>
        <div className="card-border">
          <div className="card p-6 h-full flex flex-col gap-2 items-start">
            <Image src="/file.svg" alt="History" width={28} height={28} />
            <h3 className="text-xl font-semibold">Keep Improving</h3>
            <p className="text-sm text-muted-foreground">
              Save sessions and pick from the latest finalized interviews anytime.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
