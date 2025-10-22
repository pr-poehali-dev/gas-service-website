import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isCallMasterOpen, setIsCallMasterOpen] = useState(false);
  const [selectedMaster, setSelectedMaster] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const master = formData.get('master');
    const comment = formData.get('comment');
    
    const message = `🔥 Новая заявка с сайта ГазСервис\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n👨‍🔧 Мастер: ${master}\n💬 Комментарий: ${comment}`;
    
    try {
      await fetch(`https://api.telegram.org/bot7838323823:AAFdL-azJPqTQhKYP4zvO_xQhvl78DkrUVg/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: '@rostok_lepistok',
          text: message
        })
      });
      
      toast({
        title: "Заявка отправлена",
        description: "Мы свяжемся с вами в ближайшее время",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Попробуйте позвонить нам напрямую",
        variant: "destructive"
      });
    }
    
    setIsCallMasterOpen(false);
  };

  const masters = [
    {
      name: 'Ростокин Алексей Алексеевич',
      role: 'Директор, ведущий специалист',
      description: 'Допуск ко всем газовым котлам и оборудованию, пуско-наладочные работы',
      phone: '+7 910 822 09 29',
      certificates: 'Сертификаты BAXI, Protherm, Valtec'
    },
    {
      name: 'Шаров Кирилл Алексеевич',
      role: 'Мастер по обслуживанию',
      description: 'Допуск ко всем видам газовых котлов и колонок',
      phone: '+7 910 822 09 29',
      certificates: 'Сертифицированный специалист'
    },
    {
      name: 'Кирсанов Евгений Русланович',
      role: 'Монтажник',
      description: 'Монтажные работы: полипропилен, нержавейка, медь',
      phone: '+7 910 822 09 29',
      certificates: 'Специалист по монтажу'
    }
  ];

  const services = [
    { name: 'Диагностика газового котла', price: 'от 1500 ₽' },
    { name: 'Чистка теплообменника', price: 'от 2500 ₽' },
    { name: 'Техническое обслуживание', price: 'от 3000 ₽' },
    { name: 'Ремонт газовой колонки', price: 'от 2000 ₽' },
    { name: 'Установка газового котла', price: 'от 15000 ₽' },
    { name: 'Пуско-наладочные работы', price: 'от 5000 ₽' }
  ];

  const certificates = [
    { name: 'BAXI', url: 'https://cdn.poehali.dev/files/943e8e6d-d531-4e07-a269-ac2788ac3bd7.jpg' },
    { name: 'Protherm', url: 'https://cdn.poehali.dev/files/d7e99ad6-0318-4a2e-9f72-502193c2fbf6.jpg' },
    { name: 'Valtec', url: 'https://cdn.poehali.dev/files/6f2758af-4755-475d-b94f-0c97cbd9730c.jpg' }
  ];

  const reviews = [
    { name: 'Михаил С.', text: 'Отличная работа! Быстро приехали, оперативно устранили неисправность котла. Цены адекватные.', rating: 5 },
    { name: 'Елена К.', text: 'Профессиональный подход. Мастер все объяснил, дал рекомендации по эксплуатации. Спасибо!', rating: 5 },
    { name: 'Андрей П.', text: 'Молодцы ребята! Установили новый котел, все работает отлично. Рекомендую!', rating: 5 }
  ];

  return (
    <div className="min-h-screen">
      <div className="bg-[#1a5952] text-white py-2">
        <div className="container mx-auto px-4 flex items-center justify-center gap-4">
          <Icon name="Phone" size={20} />
          <a href="tel:+79108220929" className="font-medium text-lg hover:text-primary transition-colors">
            +7 910 822 09 29
          </a>
        </div>
      </div>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Flame" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">ООО ГазСервис</h1>
                <p className="text-sm text-muted-foreground">Ремонт и обслуживание газовых котлов</p>
              </div>
            </div>
            <Button onClick={() => setIsCallMasterOpen(true)} size="lg" className="bg-primary hover:bg-primary/90">
              <Icon name="Phone" size={24} className="mr-2" />
              Вызвать мастера
            </Button>
          </div>
        </div>
      </header>

      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a5952] via-[#1f6b62] to-[#1a5952]">
          <div className="absolute inset-0 opacity-20">
            <img 
              src="https://cdn.poehali.dev/projects/20529954-e13a-4960-94c8-f34546f869da/files/6aaf0645-ee8a-4eb0-813f-38eca550e0fa.jpg" 
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Flame" className="text-white" size={32} />
                </div>
                <h1 className="text-3xl font-bold text-white">РЕМОНТ И ОБСЛУЖИВАНИЕ КОТЛОВ</h1>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
                Профессиональный ремонт газовых котлов
              </h2>
              <p className="text-2xl text-white/90 mb-8 font-medium">Вернем тепло и уют  в Ваш дом</p>
              <div className="flex flex-wrap gap-4">
                <Button onClick={() => setIsCallMasterOpen(true)} size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">Оставить заявку</Button>
                <Button variant="outline" size="lg" asChild className="border-2 border-white text-white hover:bg-white hover:text-[#1a5952] text-lg px-8 py-6">
                  <a href="tel:+79108220929" className="flex items-center">
                    <Icon name="Phone" size={20} className="mr-2" />
                    +7 910 822 09 29
                  </a>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-[#1a5952] p-8 rounded-lg text-white space-y-6">
                <h3 className="text-2xl font-bold uppercase">Промывка</h3>
                <h3 className="text-2xl font-bold uppercase">Сервисное обслуживание</h3>
                <h3 className="text-2xl font-bold uppercase">Запчасти на котлы</h3>
                <h3 className="text-2xl font-bold uppercase">Установка</h3>
                <h3 className="text-2xl font-bold uppercase text-primary">Ремонт</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Наши услуги</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-4">
              {services.map((service, idx) => (
                <Card key={idx} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 flex justify-between items-center">
                    <span className="font-medium">{service.name}</span>
                    <span className="text-primary font-bold">{service.price}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="masters" className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Выберите мастера</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {masters.map((master, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Icon name="User" size={32} className="text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-center">{master.name}</h3>
                  <p className="text-sm text-primary font-medium mb-2 text-center">{master.role}</p>
                  <p className="text-sm text-muted-foreground mb-4">{master.description}</p>
                  <p className="text-xs text-muted-foreground mb-4">{master.certificates}</p>
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90" 
                    onClick={() => {
                      setSelectedMaster(master.name);
                      window.location.href = `tel:${master.phone.replace(/\s/g, '')}`;
                    }}
                  >
                    <Icon name="Phone" size={16} className="mr-2" />
                    Позвонить
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="certificates" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Лицензии и сертификаты</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {certificates.map((cert, idx) => (
              <Card key={idx} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <img 
                    src={cert.url} 
                    alt={`Сертификат ${cert.name}`}
                    className="w-full h-auto rounded-md"
                  />
                  <p className="text-center font-medium mt-3">{cert.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Отзывы клиентов</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {reviews.map((review, idx) => (
              <Card key={idx}>
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="text-primary fill-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{review.text}</p>
                  <p className="font-medium text-sm">{review.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Контакты</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">Адрес офиса</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Icon name="MapPin" size={20} className="text-primary mt-1" />
                    <div>
                      <p className="font-medium">г. Ярославль</p>
                      <p className="text-sm text-muted-foreground">ул. Большая Федоровская д. 29, офис 13</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Phone" size={20} className="text-primary" />
                    <a href="tel:+79108220929" className="font-medium hover:text-primary transition-colors">
                      +7 910 822 09 29
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">Реквизиты организации</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="text-muted-foreground">ОГРН:</span> <span className="font-medium">1167627083975</span></p>
                  <p><span className="text-muted-foreground">ИНН:</span> <span className="font-medium">7612047537</span></p>
                  <p><span className="text-muted-foreground">КПП:</span> <span className="font-medium">760601001</span></p>
                  <p><span className="text-muted-foreground">ОКПО:</span> <span className="font-medium">03872999</span></p>
                  <Separator className="my-3" />
                  <p className="font-medium">Директор: Ростокин Алексей Алексеевич</p>
                  <p><span className="text-muted-foreground">ИНН директора:</span> <span className="font-medium">760608527422</span></p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-[#1a5952] text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Flame" className="text-white" size={20} />
            </div>
            <span className="font-bold text-lg">ООО ГазСервис</span>
          </div>
          <p className="text-sm text-white/70">© 2024 ООО ГазСервис. Все права защищены.</p>
        </div>
      </footer>

      <Dialog open={isCallMasterOpen} onOpenChange={setIsCallMasterOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Вызвать мастера</DialogTitle>
            <DialogDescription>
              Оставьте ваши контакты, и мы свяжемся с вами в ближайшее время
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Имя</Label>
              <Input id="name" name="name" placeholder="Введите ваше имя" required />
            </div>
            <div>
              <Label htmlFor="phone">Номер телефона</Label>
              <Input id="phone" name="phone" type="tel" placeholder="+7 (___) ___-__-__" required />
            </div>
            <div>
              <Label htmlFor="master">Выберите мастера</Label>
              <Select name="master" required>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите мастера" />
                </SelectTrigger>
                <SelectContent>
                  {masters.map((master, idx) => (
                    <SelectItem key={idx} value={master.name}>
                      {master.name} - {master.phone}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="comment">Комментарий</Label>
              <Textarea id="comment" name="comment" placeholder="Опишите вашу проблему..." rows={4} />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              Отправить заявку
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;