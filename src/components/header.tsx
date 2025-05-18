import Link from "next/link";
import { Logo } from "./logo";
import { ScheduleQuestionsFormDialog } from "./schedule-questions-form-dialog";
import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="max-w-5xl mx-auto px-6 lg:px-0 flex justify-between items-center py-4">
      <Link href="/">
        <Logo />
      </Link>
      <ScheduleQuestionsFormDialog>
        <Button className="shadow-none">Quero meu cronograma</Button>
      </ScheduleQuestionsFormDialog>
    </header>
  )
}