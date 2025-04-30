'use client'

import { ScheduleContent } from "@/components/schedule-content";
import { Schedule as ScheduleModel } from "@/models/schedule";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Schedule() {
  const [schedule, setSchedule] = useState<ScheduleModel | null>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);

    const scheduleSaved = sessionStorage.getItem('cronoenem:schedule');
    console.log(scheduleSaved);
    if (scheduleSaved === null) {
      router.push('/');
    } else {
      setSchedule(JSON.parse(scheduleSaved));
    }
    
    setIsLoading(false);
  }, []);

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
            <ScheduleContent schedule={schedule!} />
          </div>
        </>
      )}
    </main>
  )
}