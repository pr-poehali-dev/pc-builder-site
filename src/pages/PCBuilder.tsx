import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Component {
  id: string;
  name: string;
  price: number;
  image: string;
  specs: string[];
}

interface ComponentCategory {
  id: string;
  title: string;
  icon: string;
  required: boolean;
  components: Component[];
}

const PCBuilder = () => {
  const { toast } = useToast();
  const [selectedComponents, setSelectedComponents] = useState<Record<string, Component>>({});
  const [activeCategory, setActiveCategory] = useState<string>('cpu');

  const categories: ComponentCategory[] = [
    {
      id: 'cpu',
      title: 'Процессор',
      icon: 'Cpu',
      required: true,
      components: [
        {
          id: 'cpu1',
          name: 'Intel Core i5-13400F',
          price: 18990,
          image: '🔷',
          specs: ['10 ядер', '20 потоков', '4.6 GHz']
        },
        {
          id: 'cpu2',
          name: 'AMD Ryzen 5 7600',
          price: 19990,
          image: '🔶',
          specs: ['6 ядер', '12 потоков', '5.1 GHz']
        },
        {
          id: 'cpu3',
          name: 'Intel Core i7-13700K',
          price: 35990,
          image: '🔷',
          specs: ['16 ядер', '24 потока', '5.4 GHz']
        }
      ]
    },
    {
      id: 'motherboard',
      title: 'Материнская плата',
      icon: 'CircuitBoard',
      required: true,
      components: [
        {
          id: 'mb1',
          name: 'MSI B760M PRO',
          price: 12990,
          image: '⚡',
          specs: ['LGA1700', 'DDR5', 'PCIe 4.0']
        },
        {
          id: 'mb2',
          name: 'ASUS ROG STRIX B650',
          price: 16990,
          image: '⚡',
          specs: ['AM5', 'DDR5', 'PCIe 5.0']
        },
        {
          id: 'mb3',
          name: 'Gigabyte Z790 AORUS',
          price: 24990,
          image: '⚡',
          specs: ['LGA1700', 'DDR5', 'WiFi 6E']
        }
      ]
    },
    {
      id: 'ram',
      title: 'Оперативная память',
      icon: 'MemoryStick',
      required: true,
      components: [
        {
          id: 'ram1',
          name: 'Kingston Fury 16GB',
          price: 5490,
          image: '💾',
          specs: ['16GB', 'DDR5', '5200 MHz']
        },
        {
          id: 'ram2',
          name: 'Corsair Vengeance 32GB',
          price: 10990,
          image: '💾',
          specs: ['32GB', 'DDR5', '5600 MHz']
        },
        {
          id: 'ram3',
          name: 'G.Skill Trident Z5 64GB',
          price: 21990,
          image: '💾',
          specs: ['64GB', 'DDR5', '6000 MHz']
        }
      ]
    },
    {
      id: 'gpu',
      title: 'Видеокарта',
      icon: 'MonitorPlay',
      required: false,
      components: [
        {
          id: 'gpu1',
          name: 'NVIDIA RTX 4060',
          price: 35990,
          image: '🎮',
          specs: ['8GB GDDR6', 'Ray Tracing', '1080p']
        },
        {
          id: 'gpu2',
          name: 'AMD RX 7700 XT',
          price: 45990,
          image: '🎮',
          specs: ['12GB GDDR6', 'Ray Tracing', '1440p']
        },
        {
          id: 'gpu3',
          name: 'NVIDIA RTX 4080',
          price: 99990,
          image: '🎮',
          specs: ['16GB GDDR6X', 'DLSS 3.0', '4K']
        }
      ]
    },
    {
      id: 'storage',
      title: 'Накопитель',
      icon: 'HardDrive',
      required: true,
      components: [
        {
          id: 'ssd1',
          name: 'Samsung 970 EVO 500GB',
          price: 4990,
          image: '💿',
          specs: ['500GB', 'NVMe', '3500 MB/s']
        },
        {
          id: 'ssd2',
          name: 'WD Black SN850 1TB',
          price: 8990,
          image: '💿',
          specs: ['1TB', 'NVMe', '7000 MB/s']
        },
        {
          id: 'ssd3',
          name: 'Samsung 990 PRO 2TB',
          price: 16990,
          image: '💿',
          specs: ['2TB', 'NVMe', '7450 MB/s']
        }
      ]
    },
    {
      id: 'psu',
      title: 'Блок питания',
      icon: 'Zap',
      required: true,
      components: [
        {
          id: 'psu1',
          name: 'Cooler Master 650W',
          price: 6990,
          image: '🔋',
          specs: ['650W', '80+ Bronze', 'Modular']
        },
        {
          id: 'psu2',
          name: 'Corsair RM850x',
          price: 12990,
          image: '🔋',
          specs: ['850W', '80+ Gold', 'Full Modular']
        },
        {
          id: 'psu3',
          name: 'Seasonic Prime TX 1000W',
          price: 24990,
          image: '🔋',
          specs: ['1000W', '80+ Titanium', 'Fanless']
        }
      ]
    },
    {
      id: 'case',
      title: 'Корпус',
      icon: 'Box',
      required: true,
      components: [
        {
          id: 'case1',
          name: 'NZXT H510',
          price: 7990,
          image: '📦',
          specs: ['Mid Tower', 'Tempered Glass', '2x USB 3.0']
        },
        {
          id: 'case2',
          name: 'Fractal Design Meshify C',
          price: 9990,
          image: '📦',
          specs: ['Mid Tower', 'High Airflow', 'USB-C']
        },
        {
          id: 'case3',
          name: 'Lian Li O11 Dynamic',
          price: 14990,
          image: '📦',
          specs: ['Full Tower', 'Dual Glass', 'RGB Hub']
        }
      ]
    }
  ];

  const handleSelectComponent = (categoryId: string, component: Component) => {
    setSelectedComponents(prev => ({
      ...prev,
      [categoryId]: component
    }));
    
    toast({
      title: "Компонент добавлен",
      description: `${component.name} добавлен в сборку`,
    });
  };

  const handleRemoveComponent = (categoryId: string) => {
    setSelectedComponents(prev => {
      const newComponents = { ...prev };
      delete newComponents[categoryId];
      return newComponents;
    });
  };

  const getTotalPrice = () => {
    return Object.values(selectedComponents).reduce((sum, component) => sum + component.price, 0);
  };

  const getCompletionPercentage = () => {
    const requiredCategories = categories.filter(cat => cat.required);
    const selectedRequired = requiredCategories.filter(cat => selectedComponents[cat.id]);
    return Math.round((selectedRequired.length / requiredCategories.length) * 100);
  };

  const isConfigComplete = () => {
    const requiredCategories = categories.filter(cat => cat.required);
    return requiredCategories.every(cat => selectedComponents[cat.id]);
  };

  const handleSaveConfig = () => {
    if (!isConfigComplete()) {
      toast({
        title: "Конфигурация неполная",
        description: "Добавьте все обязательные компоненты",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Конфигурация сохранена! 🎉",
      description: `Сборка на ${getTotalPrice().toLocaleString('ru-RU')} ₽ готова`,
    });
  };

  const activeCateg = categories.find(c => c.id === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Конструктор ПК
          </h1>
          <p className="text-muted-foreground">Соберите компьютер своей мечты</p>
        </div>

        {/* Progress Bar */}
        <Card className="p-6 mb-6 bg-card/50 backdrop-blur">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold">Прогресс сборки</span>
            <span className="text-sm text-muted-foreground">{getCompletionPercentage()}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-primary to-purple-600 h-full transition-all duration-500"
              style={{ width: `${getCompletionPercentage()}%` }}
            />
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1 space-y-2">
            <Card className="p-4 bg-card/50 backdrop-blur">
              <h2 className="font-bold mb-4 flex items-center gap-2">
                <Icon name="Settings" size={20} />
                Категории
              </h2>
              <div className="space-y-2">
                {categories.map(category => {
                  const isSelected = !!selectedComponents[category.id];
                  const isActive = activeCategory === category.id;
                  
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                        isActive 
                          ? 'bg-primary text-primary-foreground shadow-md' 
                          : 'bg-muted/50 hover:bg-muted'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon name={category.icon as any} size={18} />
                        <span className="font-medium text-sm">{category.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {category.required && !isSelected && (
                          <Badge variant="destructive" className="text-xs">!</Badge>
                        )}
                        {isSelected && (
                          <Icon name="CheckCircle2" size={16} className="text-green-500" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </Card>

            {/* Summary */}
            <Card className="p-4 bg-card/50 backdrop-blur">
              <h2 className="font-bold mb-4 flex items-center gap-2">
                <Icon name="ShoppingCart" size={20} />
                Итого
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Компонентов:</span>
                  <span className="font-semibold">{Object.keys(selectedComponents).length}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold">Сумма:</span>
                    <span className="text-2xl font-bold text-primary">
                      {getTotalPrice().toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                  <Button 
                    onClick={handleSaveConfig}
                    className="w-full"
                    disabled={!isConfigComplete()}
                  >
                    <Icon name="Save" size={16} className="mr-2" />
                    Сохранить сборку
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Component Selection */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-card/50 backdrop-blur">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Icon name={activeCateg?.icon as any} size={24} />
                    {activeCateg?.title}
                  </h2>
                  {activeCateg?.required && (
                    <p className="text-sm text-muted-foreground mt-1">Обязательный компонент</p>
                  )}
                </div>
                {selectedComponents[activeCategory] && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemoveComponent(activeCategory)}
                  >
                    <Icon name="Trash2" size={14} className="mr-1" />
                    Убрать
                  </Button>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {activeCateg?.components.map(component => {
                  const isSelected = selectedComponents[activeCategory]?.id === component.id;
                  
                  return (
                    <Card 
                      key={component.id}
                      className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
                        isSelected 
                          ? 'border-primary border-2 bg-primary/5' 
                          : 'border hover:border-primary/50'
                      }`}
                      onClick={() => handleSelectComponent(activeCategory, component)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-4xl">{component.image}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="font-semibold text-sm leading-tight">{component.name}</h3>
                            {isSelected && (
                              <Icon name="CheckCircle2" size={18} className="text-primary shrink-0" />
                            )}
                          </div>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {component.specs.map((spec, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {spec}
                              </Badge>
                            ))}
                          </div>
                          <div className="text-lg font-bold text-primary">
                            {component.price.toLocaleString('ru-RU')} ₽
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </Card>

            {/* Selected Components Summary */}
            {Object.keys(selectedComponents).length > 0 && (
              <Card className="p-6 mt-6 bg-card/50 backdrop-blur">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Icon name="Package" size={20} />
                  Выбранные компоненты
                </h3>
                <div className="space-y-2">
                  {categories.map(category => {
                    const component = selectedComponents[category.id];
                    if (!component) return null;
                    
                    return (
                      <div key={category.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{component.image}</span>
                          <div>
                            <div className="text-xs text-muted-foreground">{category.title}</div>
                            <div className="font-medium text-sm">{component.name}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{component.price.toLocaleString('ru-RU')} ₽</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PCBuilder;
