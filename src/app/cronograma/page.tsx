'use client'

import { ScheduleContent } from "@/components/schedule-content";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useScheduleStore } from "@/store/schedule";

export default function Schedule() {
  const schedule = useScheduleStore(state => state.schedule);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);

    console.log('schedule', schedule);
    if (!schedule) {
      router.push('/');
    }
    
    setIsLoading(false);
  }, [schedule, router]);

  return (
    <main>
      {isLoading && (
        <div className="h-[50vh] flex items-center justify-center">
          <Loader2 className="animate-spin h-16 w-16 text-primary" />
        </div>
      )}

      {schedule && !isLoading && (
        <>
          <div className="text-center w-full space-y-2 mt-16">
            <h1 className="text-4xl font-medium text-primary">Seu cronograma foi gerado!</h1>
            <p className="text-zinc-600">Aproveite seus estudos</p>
          </div>

          <div className="mt-10">
            <ScheduleContent schedule={schedule} />
          </div>
        </>
      )}
    </main>
  )
}