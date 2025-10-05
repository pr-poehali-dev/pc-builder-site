import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Component {
  id: string;
  name: string;
  category: 'cpu' | 'gpu' | 'ram' | 'motherboard' | 'psu' | 'storage';
  price: number;
  specs: string;
  power?: number;
  socket?: string;
  compatible?: string[];
}

const components: Component[] = [
  { id: '1', name: 'Intel Core i7-12700K', category: 'cpu', price: 349.99, specs: '12 ядер, 20 потоков, 3.6 GHz', power: 125, socket: 'LGA1700' },
  { id: '2', name: 'AMD Ryzen 7 5800X', category: 'cpu', price: 299.99, specs: '8 ядер, 16 потоков, 3.8 GHz', power: 105, socket: 'AM4' },
  { id: '3', name: 'NVIDIA RTX 4070', category: 'gpu', price: 599.99, specs: '12GB GDDR6X, 5888 CUDA', power: 200 },
  { id: '4', name: 'AMD RX 7800 XT', category: 'gpu', price: 499.99, specs: '16GB GDDR6, 3840 потоков', power: 263 },
  { id: '5', name: 'Corsair Vengeance 32GB', category: 'ram', price: 129.99, specs: 'DDR5-5600, 2x16GB', power: 10 },
  { id: '6', name: 'G.Skill Trident Z5 32GB', category: 'ram', price: 149.99, specs: 'DDR5-6000, 2x16GB', power: 12 },
  { id: '7', name: 'ASUS ROG STRIX Z690', category: 'motherboard', price: 329.99, specs: 'ATX, Wi-Fi 6E, DDR5', socket: 'LGA1700', compatible: ['LGA1700'] },
  { id: '8', name: 'MSI B550 GAMING', category: 'motherboard', price: 159.99, specs: 'ATX, PCIe 4.0, DDR4', socket: 'AM4', compatible: ['AM4'] },
  { id: '9', name: 'Corsair RM850x', category: 'psu', price: 139.99, specs: '850W, 80+ Gold', power: 850 },
  { id: '10', name: 'EVGA SuperNOVA 750W', category: 'psu', price: 119.99, specs: '750W, 80+ Gold', power: 750 },
  { id: '11', name: 'Samsung 990 PRO 1TB', category: 'storage', price: 129.99, specs: 'NVMe M.2, 7450 MB/s', power: 5 },
];

const prebuiltConfigs = [
  {
    name: 'Gaming Starter',
    description: 'Для 1080p гейминга',
    components: ['2', '4', '5', '8', '10', '11'],
    price: 1360
  },
  {
    name: 'Workstation Pro',
    description: 'Рендеринг и монтаж',
    components: ['1', '3', '6', '7', '9', '11'],
    price: 1799
  },
];

export default function Index() {
  const [selectedComponents, setSelectedComponents] = useState<{ [key: string]: Component }>({});
  const [activeTab, setActiveTab] = useState('constructor');

  const categoryNames = {
    cpu: 'Процессор',
    gpu: 'Видеокарта',
    ram: 'Оперативная память',
    motherboard: 'Материнская плата',
    psu: 'Блок питания',
    storage: 'Накопитель'
  };

  const categoryIcons = {
    cpu: 'Cpu',
    gpu: 'Box',
    ram: 'MemoryStick',
    motherboard: 'Workflow',
    psu: 'Zap',
    storage: 'HardDrive'
  };

  const addComponent = (component: Component) => {
    setSelectedComponents(prev => ({
      ...prev,
      [component.category]: component
    }));
    toast.success(`${component.name} добавлен в сборку`);
  };

  const removeComponent = (category: string) => {
    setSelectedComponents(prev => {
      const updated = { ...prev };
      delete updated[category];
      return updated;
    });
    toast.info('Компонент удалён из сборки');
  };

  const loadPrebuilt = (config: typeof prebuiltConfigs[0]) => {
    const newSelection: { [key: string]: Component } = {};
    config.components.forEach(id => {
      const comp = components.find(c => c.id === id);
      if (comp) newSelection[comp.category] = comp;
    });
    setSelectedComponents(newSelection);
    setActiveTab('constructor');
    toast.success(`Загружена сборка "${config.name}"`);
  };

  const totalPrice = Object.values(selectedComponents).reduce((sum, comp) => sum + comp.price, 0);
  const totalPower = Object.values(selectedComponents).reduce((sum, comp) => sum + (comp.power || 0), 0);
  
  const psu = selectedComponents.psu;
  const isCompatible = !selectedComponents.cpu || !selectedComponents.motherboard || 
    selectedComponents.cpu.socket === selectedComponents.motherboard.socket;
  const isPowerSufficient = !psu || psu.power >= totalPower * 1.2;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">PC Builder</h1>
              <p className="text-muted-foreground mt-1">Собери идеальный компьютер</p>
            </div>
            <div className="flex gap-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Общая стоимость</p>
                <p className="text-2xl font-bold text-primary">${totalPrice.toFixed(2)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Потребление</p>
                <p className={`text-2xl font-bold ${isPowerSufficient ? 'text-accent' : 'text-destructive'}`}>
                  {totalPower}W
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="constructor">
              <Icon name="Hammer" size={16} className="mr-2" />
              Конструктор
            </TabsTrigger>
            <TabsTrigger value="prebuilt">
              <Icon name="Package" size={16} className="mr-2" />
              Готовые сборки
            </TabsTrigger>
            <TabsTrigger value="compatibility">
              <Icon name="CheckCircle2" size={16} className="mr-2" />
              Совместимость
            </TabsTrigger>
          </TabsList>

          <TabsContent value="constructor" className="space-y-6">
            {(Object.keys(categoryNames) as Array<keyof typeof categoryNames>).map((category) => (
              <Card key={category}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon name={categoryIcons[category]} className="text-primary" size={20} />
                      </div>
                      <div>
                        <CardTitle>{categoryNames[category]}</CardTitle>
                        {selectedComponents[category] && (
                          <CardDescription className="mt-1">
                            {selectedComponents[category].name} - ${selectedComponents[category].price}
                          </CardDescription>
                        )}
                      </div>
                    </div>
                    {selectedComponents[category] && (
                      <Button variant="outline" size="sm" onClick={() => removeComponent(category)}>
                        <Icon name="X" size={16} />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {components
                      .filter(c => c.category === category)
                      .map((component) => (
                        <div
                          key={component.id}
                          className={`p-4 border rounded-lg transition-all hover:border-primary ${
                            selectedComponents[category]?.id === component.id ? 'border-primary bg-primary/5' : ''
                          }`}
                        >
                          <h4 className="font-semibold mb-1">{component.name}</h4>
                          <p className="text-sm text-muted-foreground mb-3">{component.specs}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold">${component.price}</span>
                            <Button
                              size="sm"
                              onClick={() => addComponent(component)}
                              disabled={selectedComponents[category]?.id === component.id}
                            >
                              {selectedComponents[category]?.id === component.id ? 'Выбрано' : 'Добавить'}
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="prebuilt" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              {prebuiltConfigs.map((config) => (
                <Card key={config.name} className="hover:border-primary transition-colors">
                  <CardHeader>
                    <CardTitle>{config.name}</CardTitle>
                    <CardDescription>{config.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {config.components.map(id => {
                        const comp = components.find(c => c.id === id);
                        return comp ? (
                          <div key={id} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{comp.name}</span>
                            <span>${comp.price}</span>
                          </div>
                        ) : null;
                      })}
                    </div>
                    <div className="pt-4 border-t flex items-center justify-between">
                      <span className="text-xl font-bold">${config.price}</span>
                      <Button onClick={() => loadPrebuilt(config)}>
                        Загрузить сборку
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="compatibility" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Проверка совместимости</CardTitle>
                <CardDescription>Автоматическая валидация выбранных компонентов</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Icon name={isCompatible ? 'CheckCircle2' : 'AlertCircle'} 
                        className={isCompatible ? 'text-accent' : 'text-destructive'} size={24} />
                      <div>
                        <p className="font-medium">Совместимость процессора и материнской платы</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedComponents.cpu && selectedComponents.motherboard
                            ? `${selectedComponents.cpu.socket} - ${selectedComponents.motherboard.socket}`
                            : 'Выберите процессор и материнскую плату'
                          }
                        </p>
                      </div>
                    </div>
                    <Badge variant={isCompatible ? 'default' : 'destructive'}>
                      {isCompatible ? 'Совместимо' : 'Несовместимо'}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Icon name={isPowerSufficient ? 'CheckCircle2' : 'AlertCircle'} 
                        className={isPowerSufficient ? 'text-accent' : 'text-destructive'} size={24} />
                      <div>
                        <p className="font-medium">Мощность блока питания</p>
                        <p className="text-sm text-muted-foreground">
                          {psu 
                            ? `${totalPower}W потребление / ${psu.power}W доступно`
                            : 'Выберите блок питания'
                          }
                        </p>
                      </div>
                    </div>
                    <Badge variant={isPowerSufficient ? 'default' : 'destructive'}>
                      {isPowerSufficient ? 'Достаточно' : 'Недостаточно'}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Icon name="Info" className="text-primary" size={24} />
                      <div>
                        <p className="font-medium">Компоненты выбраны</p>
                        <p className="text-sm text-muted-foreground">
                          {Object.keys(selectedComponents).length} из {Object.keys(categoryNames).length}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">
                      {Math.round((Object.keys(selectedComponents).length / Object.keys(categoryNames).length) * 100)}%
                    </Badge>
                  </div>
                </div>

                {Object.keys(selectedComponents).length === Object.keys(categoryNames).length && isCompatible && isPowerSufficient && (
                  <div className="mt-6 p-6 bg-accent/10 border-accent border rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <Icon name="PartyPopper" className="text-accent" size={28} />
                      <div>
                        <h3 className="font-bold text-lg">Сборка готова!</h3>
                        <p className="text-sm text-muted-foreground">Все компоненты совместимы и готовы к заказу</p>
                      </div>
                    </div>
                    <Button className="w-full" size="lg">
                      Перейти к оформлению - ${totalPrice.toFixed(2)}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
