import { TimelineFormDialog } from "@/components/timeline-form-dialog";
import { Button } from "@/components/ui/button";
import { Calendar, Check, ClipboardList, FileDown } from "lucide-react";

export default function Home() {
  return (
    <main className="max-w-5xl min-h-screen mx-auto px-6 xl:px-0">
      <section className="py-12 text-center">
        <h2 className="text-zinc-800 text-4xl font-medium mb-2">
          Ganhe um
          <br />
          cronograma <span className="text-primary">gratuito</span>
          <br />e <span className="text-primary">personalizado</span>
          <br />
          para o ENEM
        </h2>
        <p className="text-zinc-600 max-w-md mx-auto mt-6 mb-8">
          Responda apenas algumas perguntas e receba um plano de estudos com os assuntos mais cobrados com vídeos
        </p>

        <TimelineFormDialog>
          <Button className="bg-primary hover:bg-emerald-500 text-zinc-50 px-8" size="lg">Quero meu cronograma</Button>
        </TimelineFormDialog>
      </section>

      <section className="py-12">
        <h2 className="text-primary text-2xl font-medium mb-8">Como funciona</h2>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="flex items-start gap-4">
            <div className="text-primary mt-1">
              <ClipboardList size={40} strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-zinc-800 font-medium text-lg">Responda nosso questionário</h3>
              <p className="text-zinc-600">
                Diga quanto tempo tem, onde tem mais dificuldade, e qual sua prioridade.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="text-primary mt-1">
              <Calendar size={40} strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-zinc-800 font-medium text-lg">Receba um cronograma personalizado</h3>
              <p className="text-zinc-600">Organizado por semanas com foco nos assuntos mais cobrados.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="text-primary mt-1">
              <FileDown size={40} strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-zinc-800 font-medium text-lg">Baixe em PDF e comece a estudar</h3>
              <p className="text-zinc-600">Inclui links diretos para vídeos explicativos.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-primary text-2xl font-medium mb-6">Por que usar</h2>

        <ul className="space-y-3 mb-12">
          <li className="flex items-center gap-2">
            <Check className="text-primary size-5 flex-shrink-0" />
            <span className="text-zinc-800">Rápido e gratuito</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="text-primary size-5 flex-shrink-0" />
            <span className="text-zinc-800">Sem cadastro</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="text-primary size-5 flex-shrink-0" />
            <span className="text-zinc-800">Foco nos temas que mais caem</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="text-primary size-5 flex-shrink-0" />
            <span className="text-zinc-800">Vídeos de qualidade incluídos</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="text-primary size-5 flex-shrink-0" />
            <span className="text-zinc-800">Ideal para quem está sem tempo ou perdido nos estudos</span>
          </li>
        </ul>

        <div className="text-center mb-12 text-2xl">
          <p className="text-zinc-800 mb-1">
            Finalmente você vai conseguir <span className="text-primary font-medium">organizar seus estudos</span>!
          </p>
          <p className="text-zinc-800">Simples e direto ao ponto.</p>
        </div>

        <div className="text-center mb-8">
          <p className="text-zinc-800 text-2xl mb-1">
            Pronto para <span className="text-primary font-medium">começar a estudar com foco</span>?
          </p>
        </div>

        <div className="flex justify-center">
          <TimelineFormDialog>
            <Button className="bg-primary hover:bg-emerald-500 px-8" size="lg">Começar agora</Button>
          </TimelineFormDialog>
        </div>
      </section>
    </main>
  );
}
