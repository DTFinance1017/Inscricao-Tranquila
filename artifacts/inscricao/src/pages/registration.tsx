import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  useCreateRegistration, 
  useGetRegistrationStats
} from "@workspace/api-client-react";
import { Loader2, CheckCircle2, ChevronRight, Trophy, Zap, MapPin } from "lucide-react";
import kartHeroUrl from "@assets/generated_images/kart_hero.jpg";

const formSchema = z.object({
  fullName: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  whatsapp: z.string().min(8, "WhatsApp inválido"),
  email: z.string().email("E-mail inválido").optional().or(z.literal("")),
  city: z.string().optional(),
  birthYear: z.coerce
    .number()
    .min(1920, "Ano inválido")
    .max(2020, "Ano inválido")
    .optional()
    .or(z.literal(0).transform(() => undefined)),
  experienceLevel: z.enum([
    "nunca_corri",
    "iniciante",
    "intermediario",
    "avancado",
    "competidor",
  ]),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function RegistrationPage() {
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);

  const stats = useGetRegistrationStats();
  const createRegistration = useCreateRegistration();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      whatsapp: "",
      email: "",
      city: "",
      birthYear: undefined,
      experienceLevel: "iniciante",
      message: "",
    },
  });

  function onSubmit(values: FormValues) {
    createRegistration.mutate(
      { data: values },
      {
        onSuccess: () => {
          setIsSuccess(true);
          window.scrollTo({ top: 0, behavior: "smooth" });
        },
        onError: (err) => {
          toast({
            title: "Erro ao enviar",
            description: "Ocorreu um erro ao processar sua inscrição. Tente novamente.",
            variant: "destructive",
          });
        },
      }
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 animate-in fade-in duration-700">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg animate-in zoom-in-50 delay-150 duration-500">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-display font-black uppercase tracking-tight">Inscrição Recebida!</h1>
            <p className="text-muted-foreground text-lg">
              Vamos analisar seu ingresso no campeonato e entrar em contato pelo WhatsApp em breve.
            </p>
          </div>
          <Button 
            className="w-full mt-8" 
            size="lg"
            onClick={() => window.location.reload()}
          >
            Voltar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden selection:bg-primary selection:text-white">
      {/* Hero Section */}
      <section className="relative w-full">
        {/* Background Image Container */}
        <div className="relative h-[60vh] w-full overflow-hidden bg-black clip-diagonal">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
          {/* Noise overlay */}
          <div 
            className="absolute inset-0 z-20 opacity-[0.03] mix-blend-overlay pointer-events-none" 
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
          ></div>
          <img 
            src={kartHeroUrl} 
            alt="Racing Kart" 
            className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
          />
          <div className="absolute top-4 left-6 z-30 animate-in slide-in-from-top-4 fade-in duration-700 delay-150">
            <div className="text-white font-display font-black text-2xl tracking-tighter uppercase flex items-center gap-1">
              RACEMAN<span className="text-primary">KART</span>
              <span className="text-[10px] ml-1 px-1.5 py-0.5 border border-white/20">2027</span>
            </div>
          </div>
          
          <div className="absolute bottom-12 left-6 right-6 z-30">
            <h1 className="text-white font-display font-black text-4xl leading-[0.9] tracking-tighter uppercase mb-4 max-w-sm animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-300">
              MESMO MOTOR.<br/>
              <span className="text-primary">MESMA CHANCE.</span><br/>
              VENÇA NA PILOTAGEM.
            </h1>
            <p className="text-white/80 font-mono text-sm max-w-[280px] animate-in fade-in duration-1000 delay-700">
              A PISTA NÃO PERGUNTA O NOME DO SEU MOTOR.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-6 -mt-8 relative z-40 max-w-md mx-auto mb-12 animate-in slide-in-from-bottom-12 fade-in duration-1000 delay-500 fill-mode-both">
        <div className="bg-card border-2 border-border shadow-2xl p-6 relative">
          <div className="absolute top-0 right-0 w-12 h-12 bg-primary flex items-center justify-center text-white">
            <Trophy className="w-5 h-5" />
          </div>
          
          <h2 className="text-xl font-display font-black uppercase tracking-tight mb-6">A Temporada 2027</h2>
          
          <div className="space-y-4 font-sans">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm uppercase">Igualdade Absoluta</p>
                <p className="text-muted-foreground text-sm">Motores Honda RBC 21HP lacrados da organização. Sorteio filmado a cada etapa. Equalização 2x ao ano.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm uppercase">Formato & Sede</p>
                <p className="text-muted-foreground text-sm">11 etapas oficiais + 11 treinos. Kartódromo de Nova Odessa (SP).</p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-border">
              <p className="font-mono text-xs text-muted-foreground mb-1">INVESTIMENTO</p>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-sm">Aluguel do Motor</span>
                  <span className="font-mono font-bold text-primary">R$ 2.950/ano</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-sm">Mensalidade</span>
                  <span className="font-mono font-bold text-primary">R$ 990/mês</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {stats.data && (
          <div className="mt-4 flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground animate-in fade-in duration-1000 delay-700 fill-mode-both">
            <span>Pilotos na fila</span>
            <span className="text-foreground">{stats.data.total} registrados</span>
          </div>
        )}
      </section>

      {/* Form Section */}
      <section className="px-6 max-w-md mx-auto pb-24 animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-700 fill-mode-both">
        <div className="mb-8">
          <h2 className="text-3xl font-display font-black uppercase tracking-tight">Ficha de Inscrição</h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Inscreva-se para analisarmos seu ingresso no campeonato. Entraremos em contato via WhatsApp.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ayrton Senna" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="whatsapp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>WhatsApp (com DDD) *</FormLabel>
                  <FormControl>
                    <Input placeholder="(11) 99999-9999" type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="piloto@email.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input placeholder="São Paulo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="birthYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ano de Nasc.</FormLabel>
                    <FormControl>
                      <Input placeholder="1990" type="number" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="experienceLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experiência *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="nunca_corri">Nunca corri</SelectItem>
                        <SelectItem value="iniciante">Iniciante (Indoor)</SelectItem>
                        <SelectItem value="intermediario">Intermediário</SelectItem>
                        <SelectItem value="avancado">Avançado</SelectItem>
                        <SelectItem value="competidor">Competidor Pro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observações (Opcional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Fale um pouco sobre seu histórico no kart..." 
                      className="resize-none"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              size="lg" 
              className="w-full h-14 text-lg mt-4 group"
              disabled={createRegistration.isPending}
            >
              {createRegistration.isPending ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  ENVIAR INSCRIÇÃO
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>
        </Form>
      </section>
    </div>
  );
}
