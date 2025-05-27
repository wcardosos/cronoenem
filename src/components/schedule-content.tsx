import { Schedule } from "@/models/schedule";
import { Logo } from "./logo";
import { Button } from "./ui/button";
import { Download, Loader2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { useState } from "react";
import { toast } from "sonner";
import { useReward } from 'react-rewards';
import { generateSchedulePDF } from "@/actions/generate-schedule-pdf";
import { trackEventWhenReady } from "@/lib/umami";

interface ScheduleContentProps {
  schedule: Schedule
}

export function ScheduleContent({ schedule }: Readonly<ScheduleContentProps>) {
  const [isDownloadingPDF, setIsDownloadingPDF] = useState<boolean>(false);
  const { reward } = useReward('juicy', 'confetti')

  const daysMapped: Record<string, string> = {
    'Sunday': 'Domingo',
    'Monday': 'Segunda',
    'Tuesday': 'Terça',
    'Wednesday': 'Quarta',
    'Thursday': 'Quinta',
    'Friday': 'Sexta',
    'Saturday': 'Sábado',
  }

  const downloadPDF = async () => {
    setIsDownloadingPDF(true);

    try {
      const element = document.getElementById('schedule');
      if (!element) {
        console.warn('Elemento do cronograma não encontrado');
        return;
      }
  
      const blob = await generateSchedulePDF(element.innerHTML);
      
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'Cronograma de estudos - cronoenem.pdf'
      a.click()
      URL.revokeObjectURL(url)
      a.remove()

      reward();
      trackEventWhenReady("ScheduleDownloaded");
      toast.success('PDF baixado com sucesso!', {
        description: 'Seu cronograma foi baixado com sucesso.',
        duration: 3000,
      });
    } catch (error) {
      console.error('Erro ao baixar o PDF:', error);
      toast.error('Ocorreu um erro ao baixar o PDF. Por favor, tente novamente em alguns instantes.');
    } finally {
      setIsDownloadingPDF(false);
    }
  }

  return (
    <div>
      <div className="flex w-full justify-end">
        <div className="fixed flex lg:top-auto bottom-[5%] lg:bottom-auto z-10 pr-2 pt-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={downloadPDF} disabled={isDownloadingPDF}>
                  Baixar {isDownloadingPDF ? <Loader2 className="animate-spin h-4 w-4" /> : <Download /> }
                </Button>
              </TooltipTrigger>
              <TooltipContent>Baixar cronograma</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span id="juicy" />
        </div>
      </div>
      <div id="schedule" className="w-full p-6 bg-emerald-50">
        <header className="flex justify-center">
          <Logo />
        </header>

        <section className="my-6">
          <strong className="text-primary">Cronograma de estudos para o ENEM</strong>
          <span className="block text-xs text-zinc-500">Data de criação: {new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: '2-digit', year: 'numeric' })}</span>
        </section>

        <div className="grid gap-6 w-full overflow-x-auto">
          {schedule.map(weekSchedule => (
            <div key={weekSchedule.week} className="flex flex-col gap-4">
              <strong className="font-medium">Semana {weekSchedule.week}</strong>
              <div className="border border-zinc-200 rounded-xl">
                <table className="table-auto border-separate border-spacing-0 w-full">
                  <thead className="bg-primary text-zinc-50 rounded">
                    <tr>
                      <th className="text-center p-4">Dia</th>
                      <th className="text-center p-4">Área</th>
                      <th className="text-center p-4">Matéria</th>
                      <th className="text-center p-4">Assunto</th>
                      <th className="text-center p-4">Vídeo-aula</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weekSchedule.days.flatMap(daySchedule => {
                      return daySchedule.contents.map((content, index) => (
                        <tr key={`${weekSchedule.week}-${daySchedule.day}-${index}`}>
                          <td className="text-center p-4">{daysMapped[daySchedule.day]}</td>
                          <td className="text-center p-4">{content.area}</td>
                          <td className="text-center p-4">{content.subject}</td>
                          <td className="text-center p-4">{content.topic}</td>
                          <td className="text-center p-4"><a href={content.url} target="_blank" className="text-blue-500" rel="noreferrer">Assistir</a></td>
                        </tr>
                      ))
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}