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

// Official Logos
import logoRaceman from "@/assets/brand/raceman-kart-logo.png";
import logoPanther from "@/assets/brand/panther-lubrificantes-logo.png";
import logoAro from "@/assets/brand/aro-contabilidade-logo.png";
import logoLeofran from "@/assets/brand/leofran-transportes-logo.png";
import logoTatu from "@/assets/brand/tatu-shopping-frutas-logo.png";
import logoTechZ from "@/assets/brand/tech-z-informatica-logo.png";
import logoFioraiz from "@/assets/brand/fioraiz-logo.png";
import logoPobreJuan from "@/assets/brand/pobre-juan-logo.png";

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
            <h1 className="text-3xl font-display font-black uppercase tracking-tight text-[#0B2B55]">Inscrição Recebida!</h1>
            <p className="text-muted-foreground text-lg">
              Vamos analisar seu ingresso no campeonato e entrar em contato pelo WhatsApp em breve.
            </p>
          </div>
          <Button 
            className="w-full mt-8 bg-[#0B2B55] hover:bg-[#082446] text-white h-14" 
            size="lg"
            onClick={() => window.location.reload()}
          >
            VOLTAR
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden selection:bg-accent selection:text-accent-foreground">
      {/* Hero Section */}
      <section className="relative w-full">
        <div className="relative h-[65vh] w-full overflow-hidden bg-[#0B2B55] clip-diagonal flex flex-col justify-between">
          <div className="absolute inset-0 bg-gradient-to-b from-[#082446] to-[#0B2B55]"></div>
          
          <div className="absolute top-0 inset-x-0 h-2 bg-checkered opacity-30"></div>

          <div className="relative z-30 pt-10 px-6 flex flex-col items-center animate-in slide-in-from-top-4 fade-in duration-700 delay-150">
            <img 
              src={logoRaceman} 
              alt="Copa Raceman Kart" 
              className="w-48 max-w-full drop-shadow-xl"
            />
            <div className="mt-3 text-[#F0B010] font-mono text-sm tracking-widest font-bold">TEMPORADA 2027</div>
          </div>
          
          <div className="relative z-30 pb-16 px-6 max-w-md mx-auto w-full">
            <div className="w-12 h-1 bg-[#EA4D1C] mb-6 animate-in slide-in-from-left-4 fade-in duration-1000 delay-300"></div>
            <h1 className="text-white font-display font-black text-[2.5rem] leading-[0.95] tracking-tighter uppercase mb-4 animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-300">
              MESMO MOTOR.<br/>
              <span className="text-[#3291CB]">MESMA CHANCE.</span><br/>
              VENÇA NA PILOTAGEM.
            </h1>
            <p className="text-white/80 font-mono text-[13px] uppercase max-w-[280px] animate-in fade-in duration-1000 delay-700 border-l-2 border-[#F0B010] pl-3 py-1">
              A pista não pergunta o nome do seu motor.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-6 -mt-10 relative z-40 max-w-md mx-auto mb-10 animate-in slide-in-from-bottom-12 fade-in duration-1000 delay-500 fill-mode-both">
        <div className="bg-card border border-border shadow-xl p-6 relative rounded-sm">
          <div className="absolute top-0 right-0 w-12 h-12 bg-primary flex items-center justify-center text-primary-foreground clip-diagonal">
            <Trophy className="w-5 h-5" />
          </div>
          
          <h2 className="text-xl font-display font-black text-foreground uppercase tracking-tight mb-6">A Temporada 2027</h2>
          
          <div className="space-y-4 font-sans text-card-foreground">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm uppercase text-primary">Igualdade Absoluta</p>
                <p className="text-muted-foreground text-sm">Motores Honda RBC 21HP lacrados da organização. Sorteio filmado a cada etapa. Equalização 2x ao ano.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm uppercase text-primary">Formato & Sede</p>
                <p className="text-muted-foreground text-sm">11 etapas oficiais + 11 treinos. Kartódromo de Nova Odessa (SP).</p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-border">
              <p className="font-mono text-[11px] font-bold text-primary mb-2">INVESTIMENTO DA TEMPORADA</p>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center bg-muted/30 p-2 rounded-sm border border-border/50">
                  <span className="font-bold text-[13px]">Aluguel do Motor (Ano)</span>
                  <span className="font-mono font-bold text-[#0B2B55]">R$ 2.950</span>
                </div>
                <div className="flex justify-between items-center bg-muted/30 p-2 rounded-sm border border-border/50">
                  <span className="font-bold text-[13px]">Mensalidade</span>
                  <span className="font-mono font-bold text-[#0B2B55]">R$ 990/mês</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {stats.data && (
          <div className="mt-4 px-1 flex items-center justify-between text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground animate-in fade-in duration-1000 delay-700 fill-mode-both">
            <span>Pilotos na fila de análise</span>
            <span className="text-primary bg-primary/10 px-2 py-0.5 rounded-sm">{stats.data.total} registrados</span>
          </div>
        )}
      </section>

      {/* Form Section */}
      <section className="px-6 max-w-md mx-auto pb-12 animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-700 fill-mode-both">
        <div className="mb-6">
          <h2 className="text-3xl font-display font-black text-[#0B2B55] uppercase tracking-tight">Ficha de Inscrição</h2>
          <p className="text-muted-foreground mt-1 text-[13px] leading-relaxed">
            Inscreva-se para analisarmos seu ingresso no campeonato. Entraremos em contato via WhatsApp.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 bg-card p-5 border border-border shadow-md rounded-sm">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#0B2B55]">Nome Completo *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ayrton Senna" className="bg-background" {...field} />
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
                  <FormLabel className="text-[#0B2B55]">WhatsApp (com DDD) *</FormLabel>
                  <FormControl>
                    <Input placeholder="(11) 99999-9999" type="tel" className="bg-background" {...field} />
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
                    <FormLabel className="text-[#0B2B55]">E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="piloto@email.com" type="email" className="bg-background" {...field} />
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
                    <FormLabel className="text-[#0B2B55]">Cidade</FormLabel>
                    <FormControl>
                      <Input placeholder="São Paulo" className="bg-background" {...field} />
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
                    <FormLabel className="text-[#0B2B55]">Ano de Nasc.</FormLabel>
                    <FormControl>
                      <Input placeholder="1990" type="number" className="bg-background" {...field} value={field.value || ""} />
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
                    <FormLabel className="text-[#0B2B55]">Experiência *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-background">
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
                  <FormLabel className="text-[#0B2B55]">Observações (Opcional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Fale um pouco sobre seu histórico no kart..." 
                      className="resize-none bg-background"
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
              className="w-full h-14 text-[15px] mt-4 group bg-[#0B2B55] hover:bg-[#082446] text-white"
              disabled={createRegistration.isPending}
            >
              {createRegistration.isPending ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  ENVIAR INSCRIÇÃO
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform text-[#F0B010]" />
                </>
              )}
            </Button>
          </form>
        </Form>
      </section>

      {/* Sponsors Section */}
      <section className="bg-[#0B2B55] w-full pt-12 pb-16 px-6 mt-12 clip-diagonal" style={{ clipPath: 'polygon(0 30px, 100% 0, 100% 100%, 0 100%)' }}>
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-[#F0B010] font-mono text-[11px] uppercase tracking-widest font-bold mb-2">Apoio Oficial</h3>
            <div className="w-12 h-1 bg-[#EA4D1C] mx-auto"></div>
          </div>
          
          <div className="space-y-10">
            {/* Master Sponsors */}
            <div>
              <p className="text-white/60 font-mono text-[10px] uppercase text-center mb-4">Patrocinadores Master</p>
              <div className="grid grid-cols-2 gap-4 items-center">
                {/* Panther (Dark BG) */}
                <div className="bg-[#082446] p-4 flex items-center justify-center rounded-sm h-24 border border-white/5">
                  <img src={logoPanther} alt="Panther Lubrificantes" className="max-h-full max-w-full object-contain drop-shadow-md" />
                </div>
                {/* ARO (Light BG) */}
                <div className="bg-white p-4 flex items-center justify-center rounded-sm h-24 shadow-inner">
                  <img src={logoAro} alt="ARO Contabilidade" className="max-h-full max-w-full object-contain" />
                </div>
              </div>
            </div>

            {/* Supporting Sponsors */}
            <div>
              <p className="text-white/60 font-mono text-[10px] uppercase text-center mb-4">Demais Patrocinadores</p>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white p-3 flex items-center justify-center rounded-sm h-16">
                  <img src={logoLeofran} alt="Leofran Transportes" className="max-h-full max-w-full object-contain" />
                </div>
                <div className="bg-white p-3 flex items-center justify-center rounded-sm h-16">
                  <img src={logoTatu} alt="Tatu Shopping de Frutas" className="max-h-full max-w-full object-contain" />
                </div>
                <div className="bg-white p-3 flex items-center justify-center rounded-sm h-16">
                  <img src={logoTechZ} alt="Tech Z Informática" className="max-h-full max-w-full object-contain" />
                </div>
                <div className="bg-white p-3 flex items-center justify-center rounded-sm h-16">
                  <img src={logoFioraiz} alt="Fioraiz" className="max-h-full max-w-full object-contain" />
                </div>
                <div className="bg-white p-3 flex items-center justify-center rounded-sm h-16 col-span-2">
                  <img src={logoPobreJuan} alt="Pobre Juan" className="max-h-full max-w-full object-contain" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-md mx-auto mt-12 pt-6 border-t border-white/10 text-center flex flex-col items-center">
            <img src={logoRaceman} alt="Copa Raceman Kart" className="w-24 opacity-50 grayscale mb-3" />
            <p className="text-white/40 text-[10px] font-mono">© 2027 COPA RACEMAN KART. TODOS OS DIREITOS RESERVADOS.</p>
        </div>
      </section>
    </div>
  );
}
