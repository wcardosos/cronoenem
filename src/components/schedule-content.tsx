import { Schedule } from "@/models/schedule";
import { Logo } from "./logo";
import { Button } from "./ui/button";

interface ScheduleContentProps {
  schedule: Schedule
}

export function ScheduleContent({ schedule }: Readonly<ScheduleContentProps>) {
  const daysMapped: Record<string, string> = {
    'Sunday': 'Domingo',
    'Monday': 'Segunda',
    'Tuesday': 'Terça',
    'Wednesday': 'Quarta',
    'Thursday': 'Quinta',
    'Friday': 'Sexta',
    'Saturday': 'Sábado',
  }

  // TODO: refatorar para uma server action
  const downloadPDF = async () => {
    const element = document.getElementById('schedule');
    if (!element) {
      console.warn('Elemento do cronograma não encontrado');
      return;
    }

    const response = await fetch('http://localhost:3333/pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ htmlContent: element.innerHTML }),
    });

    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'Cronograma de estudos - cronoenem.pdf'
    a.click()
    URL.revokeObjectURL(url)
    a.remove()
  }

  return (
    <div id="schedule" className="w-full p-6 bg-emerald-50">
      <header className="flex justify-center">
        <Logo />
      </header>

      <section className="my-6">
        <strong className="text-primary">Cronograma de estudos para o ENEM</strong>
        <span className="block text-xs text-zinc-500">Data de criação: {new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: '2-digit', year: 'numeric' })}</span>
      </section>

      <div>
        <div className="fixed right-16 lg:right-32 bottom-6 mx-auto">
          <Button onClick={downloadPDF}>Baixar cronograma</Button>
        </div>
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