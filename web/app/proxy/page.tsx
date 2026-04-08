import { Button } from "@/components/ui/button";
import { AuroraBackground } from "@/components/ui/aurora-background";

export default function LandingPage() {
    return (
        <AuroraBackground className="h-auto min-h-screen pt-16" showRadialGradient>
            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
                <div className="flex items-center justify-center gap-4">
                    <Button className="bg-gradient-to-r from-[#488D9F] to-[#3E7C8C] hover:from-[#3E7C8C] hover:to-[#356B79] text-white"> 
                       <span> <b> Join group  </b> </span>
                    </Button>
                    
                    <Button className="bg-gradient-to-r from-[#488D9F] to-[#3E7C8C] hover:from-[#3E7C8C] hover:to-[#356B79] text-white"> 
                        <span> <b> Create group </b> </span>
                    </Button>
                </div>
            </div>
      </AuroraBackground>
    );
  }
