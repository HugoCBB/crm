import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const WhatsApp = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">WhatsApp</h1>
        <p className="text-muted-foreground mt-1">Integração com WhatsApp</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Conversas</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px]">
              <div className="space-y-2">
                <div className="p-3 rounded-lg bg-card hover:bg-muted/50 cursor-pointer border border-border">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <MessageCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">Cliente Exemplo</p>
                      <p className="text-xs text-muted-foreground truncate">
                        Última mensagem...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-center text-muted-foreground text-sm mt-4">
                Nenhuma conversa ativa
              </p>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Mensagens</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col h-[500px]">
              <ScrollArea className="flex-1 mb-4">
                <div className="space-y-4 p-4">
                  <p className="text-center text-muted-foreground text-sm">
                    Selecione uma conversa para começar
                  </p>
                </div>
              </ScrollArea>

              <div className="flex gap-2">
                <Input
                  placeholder="Digite sua mensagem..."
                  className="flex-1"
                />
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Enviar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WhatsApp;
