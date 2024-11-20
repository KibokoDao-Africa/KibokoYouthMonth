"use client"

import { GlobeDemo } from "./world"

export default function Component() {
    return (
        <div className="space-y-8 bg-[#0A0B1E] p-6">
            {/* Color Pattern Samples */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Primary Background */}
                <div className="rounded-lg bg-[#0A0B1E] p-4">
                    <div className="text-sm text-white/60">Primary Background</div>
                    <div className="mt-1 font-mono text-xs text-white/40">#0A0B1E</div>
                </div>

                {/* Card Background */}
                <div className="rounded-lg bg-[#12132D] p-4">
                    <div className="text-sm text-white/60">Card Background</div>
                    <div className="mt-1 font-mono text-xs text-white/40">#12132D</div>
                </div>

                {/* Accent Blue */}
                <div className="rounded-lg bg-[#0095FF] p-4">
                    <div className="text-sm text-white">Accent Blue</div>
                    <div className="mt-1 font-mono text-xs text-white/70">#0095FF</div>
                </div>

                {/* Gradient Example */}
                <div className="rounded-lg bg-gradient-to-r from-[#00E1FF] to-[#00B8FF] p-4">
                    <div className="text-sm text-white">Gradient</div>
                    <div className="mt-1 font-mono text-xs text-white/70">#00E1FF → #00B8FF</div>
                </div>
            </div>

            {/* Gradient Examples */}
            <div className="grid gap-4 md:grid-cols-2">
                {/* Chart Gradient */}
                <div className="rounded-lg bg-[#12132D] p-4">
                    <div className="mb-2 text-sm text-white/60">Chart Gradient</div>
                    <div className="h-32 rounded bg-gradient-to-t from-[#0095FF]/10 via-[#0095FF]/5 to-transparent" />
                </div>

                {/* Glow Effect */}
                <div className="rounded-lg bg-[#12132D] p-4">
                    <div className="mb-2 text-sm text-white/60">Glow Effect</div>
                    <div className="flex justify-center">
                        <div className="h-16 w-16 rounded-full bg-[#0095FF] shadow-lg shadow-[#0095FF]/50" />
                    </div>
                </div>
            </div>

            {/* Text Colors */}
            <div className="rounded-lg bg-[#12132D] p-4">
                <div className="mb-4 text-sm text-white/60">Typography</div>
                <div className="space-y-2">
                    <div className="text-white">Primary Text (100%)</div>
                    <div className="text-white/60">Secondary Text (60%)</div>
                    <div className="text-white/40">Tertiary Text (40%)</div>
                    <div className="text-[#0095FF]">Accent Text</div>
                    <div className="bg-gradient-to-r from-[#00E1FF] to-[#00B8FF] bg-clip-text text-transparent">
                        Gradient Text
                    </div>
                </div>
            </div>

            <GlobeDemo />
        </div>
    )
}
