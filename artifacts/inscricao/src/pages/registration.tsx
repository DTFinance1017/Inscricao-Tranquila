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
} from "@workspace/api-client-react";
import { Loader2, CheckCircle2, ChevronRight, Trophy, Zap, MapPin, MessageCircle } from "lucide-react";

// Official Logos
import logoRaceman from "@/assets/brand/rkt-color.png";
import logoRacemanWhite from "@/assets/brand/rkt-white.png";
import logoPanther from "@/assets/brand/panther-white.png";
import logoAro from "@/assets/brand/aro.png";
import logoAroWhite from "@/assets/brand/aro-white.png";
import logoLeofran from "@/assets/brand/leofran.png";
import logoTatu from "@/assets/brand/tatu.png";
import logoTechZ from "@/assets/brand/techz.png";
import logoFioraiz from "@/assets/brand/fioraiz.png";
import logoPobreJuan from "@/assets/brand/pobrejuan-new.svg";
import logoUlson from "@/assets/brand/ulson.png";
import photoDriver from "@/assets/brand/photo-driver-kart.jpg";
import photoKart from "@/assets/brand/photo-kart.png";

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
  const [waLink, setWaLink] = useState("");
  const [waMessage, setWaMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const createRegistration = useCreateRegistration();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      whatsapp: "",
      email: "",
      city: "",
      birthYear: undefined,
      experienceLevel: "intermediario",
      message: "",
    },
  });

  function onSubmit(values: FormValues) {
    createRegistration.mutate(
      { data: values },
      {
        onSuccess: () => {
          setIsSuccess(true);
          
          const experienceLabels = {
            intermediario: "Intermediário",
            avancado: "Avançado",
            competidor: "Competidor Pro"
          };
          
          const msg = `Olá! Acabei de enviar minha inscrição para a Copa Raceman Kart 2027.\n\nNome: ${values.fullName}\nWhatsApp: ${values.whatsapp}\nCidade: ${values.city || 'Não informada'}\nExperiência: ${experienceLabels[values.experienceLevel]}\n\nAguardo o contato de vocês!`;
          
          const generatedWaLink = `https://wa.me/5519994173926?text=${encodeURIComponent(msg)}`;
          setWaLink(generatedWaLink);
          setWaMessage(msg);
          
          try {
            window.open(generatedWaLink, "_blank");
          } catch (e) {
            // fallback if blocked
          }
          
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
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 animate-in fade-in duration-700 font-sans">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 bg-[#F2B21C] rounded-full flex items-center justify-center mx-auto shadow-lg animate-in zoom-in-50 delay-150 duration-500 text-[#0C2C55]">
            <MessageCircle className="w-10 h-10" />
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl font-display font-black uppercase tracking-[-0.01em] text-[#0C2C55] leading-none">Falta só<br/><span className="text-[#1B5FA8]">um passo!</span></h1>
            <p className="text-[#3B4B62] text-[14.5px] leading-[1.6]">
              Para concluir sua inscrição, envie a mensagem no WhatsApp da diretoria.
              <span className="block mt-2 font-display font-bold text-[12px] tracking-[0.15em] text-[#CA4F24] uppercase">
                Sua inscrição só será analisada após o envio.
              </span>
            </p>
            <div className="font-display font-bold text-[18px] text-[#0C2C55] tracking-[0.08em] my-3 border border-[#DFE5EE] bg-white py-2 rounded-sm mx-8 shadow-sm">
              (19) 99417-3926
            </div>
          </div>
          <div className="pt-4 space-y-3 relative">
            {waLink && (
              <div className="relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0C2C55] text-[#F2B21C] font-display font-bold text-[9px] tracking-widest px-3 py-1 rounded-sm uppercase z-10 whitespace-nowrap shadow-md">
                  PASSO FINAL OBRIGATÓRIO
                </div>
                <Button 
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white h-16 font-display font-bold tracking-wide text-[13px] relative shadow-lg group hover:scale-[1.02] transition-transform animate-[pulse_2s_infinite]" 
                  size="lg"
                  onClick={() => window.open(waLink, "_blank")}
                >
                  <span className="flex items-center gap-2">
                    ENVIAR INSCRIÇÃO NO WHATSAPP
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </div>
            )}
            {waMessage && (
              <div className="space-y-1.5">
                <Button
                  className="w-full text-white h-14 font-display font-bold tracking-wide text-[13px] shadow-lg group hover:scale-[1.02] transition-transform"
                  style={{ background: "linear-gradient(45deg,#F58529,#DD2A7B,#8134AF,#515BD4)" }}
                  size="lg"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(waMessage);
                      setCopied(true);
                    } catch (e) {
                      // clipboard may be unavailable; still open the direct
                    }
                    window.open("https://ig.me/m/racemankart", "_blank");
                  }}
                >
                  <span className="flex items-center gap-2">
                    ENVIAR PELO DIRECT DO INSTAGRAM
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
                <p className="text-[11px] text-[#7D8EA6] leading-snug">
                  {copied
                    ? "Mensagem copiada! É só colar no Direct do @racemankart e enviar."
                    : "Ao tocar, seus dados são copiados — é só colar no Direct do @racemankart e enviar."}
                </p>
              </div>
            )}
            <Button 
              className="w-full bg-transparent hover:bg-[#DFE5EE] text-[#0C2C55] h-12 font-display font-bold border border-[#DFE5EE] tracking-wide" 
              size="lg"
              onClick={() => window.location.reload()}
            >
              VOLTAR
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden selection:bg-accent selection:text-accent-foreground font-sans text-[#0C2C55]">
      {/* Hero Section */}
      <section className="relative w-full">
        <div className="relative min-h-[70vh] w-full overflow-hidden bg-[#0C2C55] flex flex-col pb-8">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(155deg,#154C8C 0%,#0C2C55 55%,#071B36 100%)' }}></div>
          <img src={photoDriver} alt="" className="absolute right-[-10%] top-0 h-[80%] object-cover opacity-50 mix-blend-screen" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(100deg,#0C2C55 30%,rgba(12,44,85,0.85) 60%,rgba(7,27,54,0.55) 100%)' }}></div>

          {/* Top Strip */}
          <div className="absolute left-0 right-0 top-0 h-2.5 flex">
            <div className="flex-1 bg-[#F2B21C]"></div>
            <div className="w-24 bg-[#CA4F24]"></div>
          </div>

          <div className="relative z-30 pt-10 px-6 flex flex-col justify-between flex-1">
            <div className="flex justify-between items-start animate-in slide-in-from-top-4 fade-in duration-700 delay-150">
              <img 
                src={logoRaceman} 
                alt="Copa Raceman Kart" 
                className="w-32 drop-shadow-xl"
              />
              <div className="text-right font-display font-semibold text-[9px] tracking-[0.34em] text-[#9FBCE0] leading-loose">
                INSCRIÇÃO<br/>TEMPORADA 2027
              </div>
            </div>
            
            <div className="mt-14 animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-300">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-1 bg-[#F2B21C]"></div>
                <div className="font-display font-bold text-[10px] tracking-[0.3em] text-[#F2B21C]">CAMPEONATO OFICIAL DE KART</div>
              </div>

              <h1 className="text-white font-display font-black text-6xl leading-[0.88] tracking-[-0.015em] uppercase mb-4">
                Copa<br/>Raceman<br/>Kart
              </h1>
              
              <div className="flex items-end gap-3 mt-4">
                <div className="font-display font-black text-[70px] leading-[0.8] text-[#F2B21C] tracking-[-0.02em]">2027</div>
                <div className="pb-2 font-display font-bold text-[11px] tracking-[0.2em] text-white leading-[1.7]">
                  MESMO MOTOR.<br/>
                  MESMA CHANCE.<br/>
                  <span className="text-[#F2B21C]">VENÇA NA PILOTAGEM.</span>
                </div>
              </div>
              
              <div className="mt-8 h-3 w-64 opacity-90" style={{backgroundImage: 'repeating-conic-gradient(#F2B21C 0% 25%,transparent 0% 50%)', backgroundSize: '12px 12px'}}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-6 py-12 relative z-40 max-w-md mx-auto animate-in slide-in-from-bottom-12 fade-in duration-1000 delay-500 fill-mode-both">
        <div className="flex items-baseline gap-3 mb-2">
          <div className="font-display font-black text-sm tracking-[0.28em] text-[#B8C6DA]">01</div>
          <div className="font-display font-bold text-[10px] tracking-[0.3em] text-[#CA4F24]">O CAMPEONATO</div>
        </div>
        
        <h2 className="font-display font-black text-4xl leading-[0.95] tracking-[-0.01em] uppercase mb-8">
          Uma temporada<br/>feita de <span className="text-[#1B5FA8]">igualdade<br/>técnica</span>
        </h2>
        
        <div className="space-y-4 text-[13px] leading-[1.7] text-[#33465F]">
          <p>
            A Copa Raceman Kart entra na temporada 2027 com o mesmo princípio que consolidou o campeonato entre os pilotos amadores: motor forte, regulamento técnico rígido e uma estrutura que entrega padrão profissional.
          </p>
          <p>
            São <strong className="text-[#0C2C55]">11 etapas e 11 treinos oficiais</strong>, disputados com motores Honda RBC de 18HP lacrados e de propriedade exclusiva do campeonato.
          </p>
        </div>

        <div className="mt-8 border border-[#E1E7EF] border-t-[4px] border-t-[#F2B21C] bg-[#F7F9FC] p-5">
          <div className="font-display font-bold text-[9px] tracking-[0.28em] text-[#7D8EA6] mb-5">A TEMPORADA EM NÚMEROS</div>
          
          <div className="space-y-4">
            <div>
              <div className="font-display font-black text-3xl leading-none text-[#0C2C55]">11</div>
              <div className="font-display font-semibold text-[9px] tracking-[0.16em] text-[#5B6E88] mt-1">ETAPAS OFICIAIS</div>
            </div>
            <div className="h-px bg-[#E1E7EF]"></div>
            <div>
              <div className="font-display font-black text-3xl leading-none text-[#0C2C55]">18<span className="text-xl">HP</span></div>
              <div className="font-display font-semibold text-[9px] tracking-[0.16em] text-[#5B6E88] mt-1">MOTOR HONDA RBC</div>
            </div>
            <div className="h-px bg-[#E1E7EF]"></div>
            <div>
              <div className="font-display font-black text-3xl leading-none text-[#0C2C55]">2<span className="text-xl">×</span></div>
              <div className="font-display font-semibold text-[9px] tracking-[0.16em] text-[#5B6E88] mt-1">EQUALIZAÇÃO POR ANO</div>
            </div>
            <div className="h-px bg-[#E1E7EF]"></div>
            <div>
              <div className="font-display font-black text-3xl leading-none text-[#0C2C55]">3<span className="text-[14px] ml-1 uppercase tracking-wide">Etapas</span></div>
              <div className="font-display font-semibold text-[9px] tracking-[0.16em] text-[#5B6E88] mt-1">TROCA DE PNEUS A CADA 3 ETAPAS</div>
              <div className="font-display font-bold text-[9px] tracking-[0.16em] text-[#CA4F24] mt-0.5">CUSTO DO PILOTO</div>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-[#0C2C55] border-t-[4px] border-t-[#F2B21C] p-5">
          <div className="font-display font-bold text-[9px] tracking-[0.28em] text-[#9FBEDA] mb-5">INVESTIMENTO DA TEMPORADA</div>
          <div className="space-y-4">
            <div>
              <div className="font-display font-bold text-[9px] tracking-[0.2em] text-[#F2B21C] mb-1.5">ALUGUEL DO MOTOR OFICIAL 2027</div>
              <div className="font-display font-black text-3xl leading-none text-white">R$ 3.000<span className="text-base font-bold text-[#9FBEDA]">,00 à vista</span></div>
              <div className="inline-block bg-[#F2B21C] px-3 py-1.5 font-display font-black text-lg leading-none text-[#0C2C55] mt-2">ou até 4× de R$ 800,00</div>
              <div className="text-[11px] leading-relaxed text-[#9FBEDA] mt-2">Aluguel do motor Honda RBC 18HP para as <span className="text-white font-semibold">11 etapas + 11 treinos</span> da temporada.</div>
            </div>
            <div className="h-px bg-white/10"></div>
            <div>
              <div className="font-display font-bold text-[9px] tracking-[0.2em] text-[#F2B21C] mb-1.5">CUSTO DO CAMPEONATO</div>
              <div className="font-display font-black text-3xl leading-none text-white">R$ 11.000<span className="text-base font-bold text-[#9FBEDA]">,00 à vista</span></div>
              <div className="inline-block bg-[#F2B21C] px-3 py-1.5 font-display font-black text-lg leading-none text-[#0C2C55] mt-2">ou até 12× de R$ 990,00</div>
              <div className="text-[11px] leading-relaxed text-[#9FBEDA] mt-2">Dá acesso à estrutura completa de treinos, etapas e suporte técnico da temporada.</div>
            </div>
          </div>
          <div className="mt-5 pt-4 border-t border-white/10">
            <div className="font-display font-bold text-[9px] tracking-[0.28em] text-[#9FBEDA] mb-3">O QUE ESTÁ INCLUSO</div>
            <div className="space-y-2">
              {[
                "Motor oficial Honda RBC 18HP, lacrado, para toda a temporada",
                "Uso do motor oficial nos 11 treinos oficiais, um antes de cada etapa (custo da pista por conta do piloto)",
                "Piloto com motor próprio pode treinar em outras datas, exceto na semana da corrida, conforme regulamento",
                "Equalização completa dos motores duas vezes ao ano",
                "Sorteio dos motores em cada etapa",
                "Manutenção, revisão, transporte e logística dos motores",
                "Cronometragem eletrônica e resultados oficiais por etapa",
                "Premiação por etapa e classificação geral da temporada",
                "Cobertura de mídia, fotos e divulgação nos canais oficiais",
                "Transmissão ao vivo de algumas etapas, para amigos e familiares torcerem por você",
                "Box para o chassi durante toda a temporada",
                "Sala de pilotos climatizada nas etapas de Nova Odessa",
                "Suporte da Equipe Mecânica Raceman nas corridas e treinos oficiais",
                "Desconto especial na Kart Machine (peças e acessórios)",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 mt-[5px] bg-[#F2B21C] shrink-0"></div>
                  <div className="text-[11px] leading-snug text-[#C7D6E8]">{item}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 border-l-2 border-[#CA4F24] pl-3 text-[10px] leading-relaxed text-[#9FBEDA]">
            O motor oficial é lacrado e permanece propriedade do campeonato. Valores válidos para a temporada 2027; condições de pagamento tratadas com a diretoria.
          </div>
        </div>

        <div className="mt-4 border border-[#E1E7EF] border-t-[4px] border-t-[#CA4F24] bg-[#F7F9FC] p-5">
          <div className="font-display font-bold text-[9px] tracking-[0.28em] text-[#7D8EA6] mb-4">O QUE O PILOTO PRECISA TER</div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 mt-1.5 bg-[#CA4F24] shrink-0"></div>
              <div className="font-display font-semibold text-[12px] leading-snug text-[#0C2C55] uppercase tracking-wide">Chassi próprio, de qualquer marca</div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 mt-1.5 bg-[#CA4F24] shrink-0"></div>
              <div className="font-display font-semibold text-[12px] leading-snug text-[#0C2C55] uppercase tracking-wide">Dois jogos de rodas</div>
            </div>
          </div>
        </div>

        <div className="mt-4 border border-[#E1E7EF] border-t-[4px] border-t-[#F2B21C] bg-white p-5">
          <div className="font-display font-bold text-[9px] tracking-[0.28em] text-[#7D8EA6] mb-4">PREMIAÇÃO</div>
          <div className="space-y-4">
            <div>
              <div className="font-display font-black text-2xl leading-none text-[#0C2C55]">TOP <span className="text-[#F2B21C]">5</span></div>
              <div className="text-[12px] leading-snug text-[#3B4B62] mt-1.5">Troféus para os 5 melhores colocados de cada etapa, em cada categoria.</div>
            </div>
            <div className="h-px bg-[#E1E7EF]"></div>
            <div>
              <div className="font-display font-bold text-[10px] tracking-[0.2em] text-[#CA4F24] mb-2">VOUCHER RESTAURANTE POBRE JUAN — POR ETAPA</div>
              <div className="flex gap-3">
                <div className="flex-1 bg-[#F7F9FC] border border-[#E1E7EF] p-3">
                  <div className="font-display font-black text-xl leading-none text-[#0C2C55]">R$ 500</div>
                  <div className="font-display font-semibold text-[9px] tracking-[0.14em] text-[#5B6E88] mt-1">VENCEDOR CATEGORIA OURO</div>
                </div>
                <div className="flex-1 bg-[#F7F9FC] border border-[#E1E7EF] p-3">
                  <div className="font-display font-black text-xl leading-none text-[#0C2C55]">R$ 300</div>
                  <div className="font-display font-semibold text-[9px] tracking-[0.14em] text-[#5B6E88] mt-1">VENCEDOR CATEGORIA PRATA</div>
                </div>
              </div>
            </div>
            <div className="h-px bg-[#E1E7EF]"></div>
            <div>
              <div className="font-display font-bold text-[10px] tracking-[0.2em] text-[#CA4F24] mb-2">VANTAGENS DOS PATROCINADORES</div>
              <div className="space-y-2.5">
                <div className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 mt-[5px] bg-[#F2B21C] shrink-0"></div>
                  <div className="text-[12px] leading-snug text-[#3B4B62]">Descontos exclusivos para compras na <span className="font-semibold text-[#0C2C55]">TechZ Informática</span></div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 mt-[5px] bg-[#F2B21C] shrink-0"></div>
                  <div className="text-[12px] leading-snug text-[#3B4B62]">Cupom de desconto especial para tratamento contra calvície na <span className="font-semibold text-[#0C2C55]">Fio Raiz</span></div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 mt-[5px] bg-[#F2B21C] shrink-0"></div>
                  <div className="text-[12px] leading-snug text-[#3B4B62]">Encerramento de cada etapa com cerveja <span className="font-semibold text-[#0C2C55]">Ulson</span> para pilotos maiores de idade</div>
                </div>
              </div>
            </div>
            <div className="h-px bg-[#E1E7EF]"></div>
            <div className="bg-[#0C2C55] p-4">
              <div className="font-display font-black text-sm leading-snug text-white uppercase">Premiação final <span className="text-[#F2B21C]">surpresa e especial</span></div>
              <div className="text-[11px] leading-snug text-[#9FBEDA] mt-1">Reservada para o encerramento da temporada.</div>
            </div>
          </div>
        </div>

        <div className="mt-8 relative bg-[#0C2C55] overflow-hidden flex items-center min-h-[120px]">
          <img src={photoKart} alt="" className="absolute inset-0 w-full h-full object-cover opacity-55" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C2C55] via-[#0C2C55]/80 to-transparent"></div>
          <div className="relative p-5 max-w-[80%]">
            <div className="font-display font-black text-xl leading-[1.15] text-white uppercase">
              O motor é do campeonato.<br/>
              <span className="text-[#F2B21C]">O mérito é do piloto.</span>
            </div>
          </div>
        </div>
        
      </section>

      {/* Tracks Section */}
      <section className="px-6 py-12 relative z-40 max-w-md mx-auto animate-in slide-in-from-bottom-12 fade-in duration-1000 delay-600 fill-mode-both">
        <div className="flex items-baseline gap-3 mb-2">
          <div className="font-display font-black text-sm tracking-[0.28em] text-[#B8C6DA]">02</div>
          <div className="font-display font-bold text-[10px] tracking-[0.3em] text-[#CA4F24]">KARTÓDROMOS DA TEMPORADA</div>
        </div>
        
        <h2 className="font-display font-black text-4xl leading-[0.95] tracking-[-0.01em] uppercase mb-6 text-[#0C2C55]">
          Onde a copa<br/><span className="text-[#1B5FA8]">vai correr</span>
        </h2>
        
        <p className="text-[12.5px] leading-[1.65] text-[#4A5C74] mb-8">
          A temporada 2027 acontece prioritariamente no Kartódromo de Nova Odessa, sede principal do campeonato, com etapas itinerantes em pistas selecionadas da região.
        </p>

        {/* Sede Principal */}
        <div className="bg-[#0C2C55] text-white relative overflow-hidden flex flex-col min-h-[220px] mb-8">
          <img src={photoKart} className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen" alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071B36] to-transparent"></div>
          <div className="relative p-6 flex flex-col justify-end flex-1">
            <div className="font-display font-extrabold text-[10px] tracking-[0.3em] text-[#F2B21C] mb-3">SEDE PRINCIPAL</div>
            <div className="font-display font-black text-3xl leading-[0.95] uppercase">Kartódromo de<br/>Nova Odessa</div>
            <div className="mt-3 text-[12px] leading-[1.6] text-[#C4D5EA]">
              Casa da Copa Raceman Kart e palco da maior parte das 11 etapas da temporada, com a estrutura de box, cronometragem e guarda dos motores oficiais.
            </div>
          </div>
        </div>

        {/* Etapas Itinerantes */}
        <div className="font-display font-bold text-[11px] tracking-[0.3em] text-[#7D8EA6] mb-4">ETAPAS ITINERANTES</div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: "San Marino", city: "PAULÍNIA · SP" },
            { name: "Limeira", city: "LIMEIRA · SP" },
            { name: "Aldeia da Serra", city: "ALDEIA DA SERRA · SP" },
            { name: "Arujá", city: "ARUJÁ · SP" },
            { name: "Interlagos", city: "SÃO PAULO · SP", badge: "POTENCIAL NOVIDADE" }
          ].map((p, i) => (
            <div key={i} className={`border border-[#DFE5EE] p-4 flex flex-col justify-center bg-[#F8FAFC] ${p.badge ? 'col-span-2' : ''}`}>
              <div className="font-display font-extrabold text-[13.5px] leading-[1.15] uppercase text-[#0C2C55]">{p.name}</div>
              <div className="font-display font-semibold text-[9px] tracking-[0.16em] text-[#7D8EA6] mt-1">{p.city}</div>
              {p.badge && (
                <div className="mt-3 inline-block self-start bg-[#F2B21C] text-[#0C2C55] font-display font-bold text-[8.5px] tracking-[0.18em] px-2 py-1 uppercase">
                  {p.badge}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-5 text-[10.5px] leading-[1.6] text-[#8B99AC]">
          Calendário sujeito a confirmação das pistas e da diretoria. Interlagos entra como potencial novidade da temporada 2027.
        </div>
      </section>

      {/* Form Section */}
      <section className="px-6 max-w-md mx-auto py-8 animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-700 fill-mode-both">
        <div className="mb-8">
          <div className="flex items-baseline gap-3 mb-2">
            <div className="font-display font-black text-sm tracking-[0.28em] text-[#B8C6DA]">03</div>
            <div className="font-display font-bold text-[10px] tracking-[0.3em] text-[#CA4F24]">SOLICITAÇÃO DE VAGA</div>
          </div>
          <h2 className="text-4xl font-display font-black text-[#0C2C55] uppercase tracking-[-0.01em] leading-[0.95]">
            Ficha de<br/><span className="text-[#1B5FA8]">Inscrição</span>
          </h2>
          <p className="text-[#4A5C74] mt-4 text-[13px] leading-[1.7]">
            Inscreva-se para analisarmos seu ingresso no campeonato. Entraremos em contato via WhatsApp.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 bg-white p-6 border border-[#DFE5EE] shadow-sm">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#0C2C55] font-display text-[11px] tracking-[0.1em]">Nome Completo *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ayrton Senna" className="bg-[#F8FAFC] border-[#DFE5EE] focus-visible:ring-[#F2B21C]" {...field} />
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
                  <FormLabel className="text-[#0C2C55] font-display text-[11px] tracking-[0.1em]">WhatsApp (com DDD) *</FormLabel>
                  <FormControl>
                    <Input placeholder="(11) 99999-9999" type="tel" className="bg-[#F8FAFC] border-[#DFE5EE] focus-visible:ring-[#F2B21C]" {...field} />
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
                    <FormLabel className="text-[#0C2C55] font-display text-[11px] tracking-[0.1em]">E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="piloto@email.com" type="email" className="bg-[#F8FAFC] border-[#DFE5EE] focus-visible:ring-[#F2B21C]" {...field} />
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
                    <FormLabel className="text-[#0C2C55] font-display text-[11px] tracking-[0.1em]">Cidade</FormLabel>
                    <FormControl>
                      <Input placeholder="São Paulo" className="bg-[#F8FAFC] border-[#DFE5EE] focus-visible:ring-[#F2B21C]" {...field} />
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
                    <FormLabel className="text-[#0C2C55] font-display text-[11px] tracking-[0.1em]">Ano de Nasc.</FormLabel>
                    <FormControl>
                      <Input placeholder="1990" type="number" className="bg-[#F8FAFC] border-[#DFE5EE] focus-visible:ring-[#F2B21C]" {...field} value={field.value || ""} />
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
                    <FormLabel className="text-[#0C2C55] font-display text-[11px] tracking-[0.1em]">Experiência *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-[#F8FAFC] border-[#DFE5EE] focus-visible:ring-[#F2B21C]">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
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
                  <FormLabel className="text-[#0C2C55] font-display text-[11px] tracking-[0.1em]">Observações (Opcional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Fale um pouco sobre seu histórico no kart..." 
                      className="resize-none bg-[#F8FAFC] border-[#DFE5EE] focus-visible:ring-[#F2B21C]"
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
              className="w-full h-14 text-[15px] mt-6 group bg-[#0C2C55] hover:bg-[#071B36] text-white font-display font-bold tracking-wide"
              disabled={createRegistration.isPending}
            >
              {createRegistration.isPending ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  ENVIAR INSCRIÇÃO
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform text-[#F2B21C]" />
                </>
              )}
            </Button>
          </form>
        </Form>
      </section>

      {/* Sponsors Section */}
      <section className="bg-[#0C2C55] w-full pt-8 pb-16 relative">
        <div className="absolute left-0 right-0 top-0 h-2 flex">
          <div className="flex-1 bg-[#154C8C]"></div>
          <div className="w-24 bg-[#CA4F24]"></div>
        </div>
        
        <div className="px-6 max-w-md mx-auto pt-10">
          <div className="flex items-baseline gap-3 mb-2">
            <div className="font-display font-black text-sm tracking-[0.28em] text-[#5C7CA6]">04</div>
            <div className="font-display font-bold text-[10px] tracking-[0.3em] text-[#F2B21C]">APOIO OFICIAL</div>
          </div>
          
          <h2 className="text-4xl font-display font-black text-white uppercase tracking-[-0.01em] leading-[0.95] mb-8">
            Quem sustenta<br/>a temporada
          </h2>

          <div className="space-y-6">
            {/* Master Sponsors */}
            <div className="bg-white flex items-stretch min-h-[140px]">
              <div className="w-3 bg-[#CA4F24]"></div>
              <div className="flex-1 p-5 flex flex-col justify-center">
                <div className="font-display font-extrabold text-[9px] tracking-[0.3em] text-[#CA4F24] mb-4">MASTER TITLE</div>
                <div className="bg-[#0C2C55] p-5 flex items-center justify-center h-20 mb-3">
                  <img src={logoPanther} alt="Panther Lubrificantes" className="h-full object-contain" />
                </div>
                <div className="text-[11.5px] leading-[1.65] text-[#3B4B62]">
                  Panther Lubrificantes assina a temporada 2027 como Master Title.
                </div>
              </div>
            </div>

            <div className="bg-white/95 flex items-stretch min-h-[120px]">
              <div className="w-3 bg-[#F2B21C]"></div>
              <div className="flex-1 p-5 flex flex-col justify-center">
                <div className="font-display font-extrabold text-[9px] tracking-[0.3em] text-[#1B5FA8] mb-4">MASTER</div>
                <div className="flex items-center justify-center h-16 mb-3">
                  <img src={logoAro} alt="ARO Contabilidade" className="h-full object-contain" />
                </div>
                <div className="text-[11.5px] leading-[1.65] text-[#3B4B62]">
                  ARO Contabilidade acompanha o campeonato com destaque em todas as etapas.
                </div>
              </div>
            </div>

            {/* Supporting Sponsors */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="font-display font-bold text-[10px] tracking-[0.3em] text-[#9FBCE0] mb-6 text-center">DEMAIS PATROCINADORES</div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="border border-[#DFE5EE] bg-white h-20 flex items-center justify-center p-4">
                  <img src={logoLeofran} alt="Leofran Transportes" className="max-h-full max-w-full object-contain" />
                </div>
                <div className="border border-[#DFE5EE] bg-white h-20 flex items-center justify-center p-4">
                  <img src={logoTatu} alt="Tatu Shopping de Frutas" className="max-h-full max-w-full object-contain" />
                </div>
                <div className="border border-[#DFE5EE] bg-white h-20 flex items-center justify-center p-4">
                  <img src={logoTechZ} alt="Tech Z Informática" className="max-h-12 max-w-full object-contain" />
                </div>
                <div className="border border-[#DFE5EE] bg-white h-20 flex items-center justify-center p-4 flex-col gap-1">
                  <img src={logoFioraiz} alt="Fioraiz" className="max-h-8 max-w-full object-contain" />
                  <div className="font-display font-bold text-[7px] tracking-[0.14em] text-[#7D8EA6]">fioraiz.com.br</div>
                </div>
                <div className="border border-[#DFE5EE] bg-white h-20 flex items-center justify-center p-4">
                  <img src={logoUlson} alt="Ulson Cervejaria" className="max-h-full max-w-full object-contain brightness-0" />
                </div>
                <div className="border border-[#DFE5EE] bg-white h-20 flex items-center justify-center p-4">
                  <img src={logoPobreJuan} alt="Pobre Juan" className="max-h-full max-w-full object-contain brightness-0" />
                </div>
                <div className="border border-dashed border-[#DFE5EE]/60 bg-white h-20 flex items-center justify-center p-4">
                  <span className="font-display font-bold text-[9px] tracking-[0.2em] text-[#B8C6DA]">SEU LOGO AQUI</span>
                </div>
                <div className="border border-dashed border-[#DFE5EE]/60 bg-white h-20 flex items-center justify-center p-4">
                  <span className="font-display font-bold text-[9px] tracking-[0.2em] text-[#B8C6DA]">SEU LOGO AQUI</span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-[12.5px] leading-snug text-[#9FBCE0]">Entre em contato para ser um patrocinador e conheça todos os benefícios</p>
                <a
                  href={`https://wa.me/5511999556595?text=${encodeURIComponent("Olá! Tenho interesse em ser patrocinador da Copa Raceman Kart 2027.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 bg-[#F2B21C] text-[#0C2C55] font-display font-bold text-[12px] tracking-[0.12em] px-5 py-3 hover:scale-[1.03] transition-transform"
                >
                  QUERO SER PATROCINADOR
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-md mx-auto mt-16 pt-8 border-t border-white/10 text-center flex flex-col items-center">
            <p className="text-white text-[13px] font-display font-bold tracking-wide uppercase mb-2">Siga nossa página e fique por dentro das novidades</p>
            <a
              href="https://www.instagram.com/racemankart"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-display font-black text-lg text-white px-5 py-2 mb-8 hover:scale-[1.03] transition-transform"
              style={{ background: "linear-gradient(45deg,#F58529,#DD2A7B,#8134AF,#515BD4)" }}
            >
              @racemankart
            </a>
            <img src={logoRacemanWhite} alt="Copa Raceman Kart" className="w-28 opacity-40 mb-4" />
            <p className="text-[#8FAED5] text-[9px] font-display font-bold tracking-[0.24em] uppercase">COPA RACEMAN KART 2027 · MEDIA KIT OFICIAL</p>
        </div>
      </section>
    </div>
  );
}
