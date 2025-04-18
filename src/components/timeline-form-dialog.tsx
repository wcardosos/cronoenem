"use client"

import type React from "react"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

const formSchema = z.object({
  daysPerWeek: z.string({
    required_error: "Selecione quantos dias por semana você pode estudar.",
  }),
  hoursPerDay: z.string({
    required_error: "Selecione quantas horas por dia você pode estudar.",
  }),
  hardSubjects: z.array(z.string()).min(1, {
    message: "Selecione pelo menos uma matéria.",
  }),
  enemAreaFocus: z.string().optional(),
})

const subjects = [
  { id: "math", label: "Matemática" },
  { id: "portuguese", label: "Português" },
  { id: "chemistry", label: "Química" },
  { id: "biology", label: "Biologia" },
  { id: "phisics", label: "Física" },
  { id: "history", label: "História" },
  { id: "geography", label: "Geografia" },
  { id: "sociology", label: "Sociologia" },
  { id: "philosofy", label: "Filosofia" },
  { id: "essay", label: "Redação" },
]

export function TimelineFormDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hardSubjects: [],
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    setOpen(false)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Cronograma personalizado para o ENEM</DialogTitle>
          <DialogDescription>
            Responda algumas perguntas para criarmos seu cronograma de estudos personalizado.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="daysPerWeek"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantos dias por semana você pode estudar para o ENEM?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione os dias" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="2">2 dias</SelectItem>
                      <SelectItem value="3">3 dias</SelectItem>
                      <SelectItem value="4">4 dias</SelectItem>
                      <SelectItem value="5">5 dias</SelectItem>
                      <SelectItem value="6">6 dias</SelectItem>
                      <SelectItem value="7">7 dias</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hoursPerDay"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantas horas por dia?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione as horas" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">1h</SelectItem>
                      <SelectItem value="2">2h</SelectItem>
                      <SelectItem value="3">3h</SelectItem>
                      <SelectItem value="4">4h ou mais</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hardSubjects"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>Quais matérias são mais difíceis para você?</FormLabel>
                    <FormDescription>Selecione todas as matérias que você tem dificuldade.</FormDescription>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {subjects.map((subject) => (
                      <FormField
                        key={subject.id}
                        control={form.control}
                        name="hardSubjects"
                        render={({ field }) => {
                          return (
                            <FormItem key={subject.id} className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(subject.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, subject.id])
                                      : field.onChange(field.value?.filter((value) => value !== subject.id))
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">{subject.label}</FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="enemAreaFocus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Se tivesse que focar mais em uma área, qual seria? (opcional)</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma área (opcional)" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="linguagens">Linguagens</SelectItem>
                      <SelectItem value="humanas">Ciências Humanas</SelectItem>
                      <SelectItem value="natureza">Ciências da Natureza</SelectItem>
                      <SelectItem value="matematica">Matemática</SelectItem>
                      <SelectItem value="redacao">Redação</SelectItem>
                      <SelectItem value="nenhuma">Sem preferência</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full bg-primary hover:bg-emerald-500">
              Gerar meu cronograma
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
