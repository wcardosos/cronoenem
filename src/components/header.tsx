import { Logo } from "./logo";
import { TimelineFormDialog } from "./timeline-form-dialog";
import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="max-w-5xl mx-auto px-6 lg:px-0 flex justify-between items-center py-4">
      <Logo />
      <TimelineFormDialog>
        <Button className="shadow-none">Quero meu cronograma</Button>
      </TimelineFormDialog>
    </header>
  )
}