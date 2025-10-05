import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
  brand?: string;
}

const generateComponents = (): Component[] => {
  const cpus: Component[] = [
    { id: 'cpu1', name: 'Intel Core i9-14900K', category: 'cpu', price: 589.99, specs: '24 ядра, 5.8 GHz', power: 253, socket: 'LGA1700', brand: 'Intel' },
    { id: 'cpu2', name: 'Intel Core i7-14700K', category: 'cpu', price: 419.99, specs: '20 ядер, 5.6 GHz', power: 253, socket: 'LGA1700', brand: 'Intel' },
    { id: 'cpu3', name: 'Intel Core i5-14600K', category: 'cpu', price: 319.99, specs: '14 ядер, 5.3 GHz', power: 181, socket: 'LGA1700', brand: 'Intel' },
    { id: 'cpu4', name: 'AMD Ryzen 9 7950X', category: 'cpu', price: 549.99, specs: '16 ядер, 5.7 GHz', power: 170, socket: 'AM5', brand: 'AMD' },
    { id: 'cpu5', name: 'AMD Ryzen 9 7900X', category: 'cpu', price: 429.99, specs: '12 ядер, 5.4 GHz', power: 170, socket: 'AM5', brand: 'AMD' },
    { id: 'cpu6', name: 'AMD Ryzen 7 7800X3D', category: 'cpu', price: 449.99, specs: '8 ядер, 5.0 GHz, 3D Cache', power: 120, socket: 'AM5', brand: 'AMD' },
    { id: 'cpu7', name: 'AMD Ryzen 7 7700X', category: 'cpu', price: 299.99, specs: '8 ядер, 5.4 GHz', power: 105, socket: 'AM5', brand: 'AMD' },
    { id: 'cpu8', name: 'AMD Ryzen 5 7600X', category: 'cpu', price: 229.99, specs: '6 ядер, 5.3 GHz', power: 105, socket: 'AM5', brand: 'AMD' },
  ];

  const gpus: Component[] = [
    { id: 'gpu1', name: 'NVIDIA RTX 4090', category: 'gpu', price: 1599.99, specs: '24GB GDDR6X, 16384 CUDA', power: 450, brand: 'NVIDIA' },
    { id: 'gpu2', name: 'NVIDIA RTX 4080 SUPER', category: 'gpu', price: 999.99, specs: '16GB GDDR6X, 10240 CUDA', power: 320, brand: 'NVIDIA' },
    { id: 'gpu3', name: 'NVIDIA RTX 4070 Ti SUPER', category: 'gpu', price: 799.99, specs: '16GB GDDR6X, 8448 CUDA', power: 285, brand: 'NVIDIA' },
    { id: 'gpu4', name: 'NVIDIA RTX 4070 SUPER', category: 'gpu', price: 599.99, specs: '12GB GDDR6X, 7168 CUDA', power: 220, brand: 'NVIDIA' },
    { id: 'gpu5', name: 'NVIDIA RTX 4070', category: 'gpu', price: 549.99, specs: '12GB GDDR6X, 5888 CUDA', power: 200, brand: 'NVIDIA' },
    { id: 'gpu6', name: 'AMD RX 7900 XTX', category: 'gpu', price: 899.99, specs: '24GB GDDR6, 6144 потоков', power: 355, brand: 'AMD' },
    { id: 'gpu7', name: 'AMD RX 7900 XT', category: 'gpu', price: 749.99, specs: '20GB GDDR6, 5376 потоков', power: 300, brand: 'AMD' },
    { id: 'gpu8', name: 'AMD RX 7800 XT', category: 'gpu', price: 499.99, specs: '16GB GDDR6, 3840 потоков', power: 263, brand: 'AMD' },
    { id: 'gpu9', name: 'AMD RX 7700 XT', category: 'gpu', price: 449.99, specs: '12GB GDDR6, 3456 потоков', power: 245, brand: 'AMD' },
  ];

  const rams: Component[] = [
    { id: 'ram1', name: 'Corsair Vengeance RGB 64GB DDR5-6000', category: 'ram', price: 249.99, specs: '2x32GB, CL30', power: 12, brand: 'Corsair' },
    { id: 'ram2', name: 'G.Skill Trident Z5 RGB 32GB DDR5-6400', category: 'ram', price: 169.99, specs: '2x16GB, CL32', power: 10, brand: 'G.Skill' },
    { id: 'ram3', name: 'Kingston Fury Beast 32GB DDR5-5600', category: 'ram', price: 129.99, specs: '2x16GB, CL36', power: 10, brand: 'Kingston' },
    { id: 'ram4', name: 'Corsair Vengeance 32GB DDR4-3600', category: 'ram', price: 89.99, specs: '2x16GB, CL18', power: 8, brand: 'Corsair' },
  ];

  const motherboards: Component[] = [
    { id: 'mb1', name: 'ASUS ROG MAXIMUS Z790', category: 'motherboard', price: 599.99, specs: 'ATX, Wi-Fi 7, DDR5', socket: 'LGA1700', brand: 'ASUS' },
    { id: 'mb2', name: 'MSI MPG Z790 EDGE', category: 'motherboard', price: 399.99, specs: 'ATX, Wi-Fi 6E, DDR5', socket: 'LGA1700', brand: 'MSI' },
    { id: 'mb3', name: 'ASUS TUF GAMING B760', category: 'motherboard', price: 229.99, specs: 'ATX, Wi-Fi 6, DDR5', socket: 'LGA1700', brand: 'ASUS' },
    { id: 'mb4', name: 'ASUS ROG STRIX X670E', category: 'motherboard', price: 499.99, specs: 'ATX, Wi-Fi 6E, DDR5', socket: 'AM5', brand: 'ASUS' },
    { id: 'mb5', name: 'MSI MAG B650 TOMAHAWK', category: 'motherboard', price: 249.99, specs: 'ATX, Wi-Fi 6, DDR5', socket: 'AM5', brand: 'MSI' },
    { id: 'mb6', name: 'ASRock B650 Pro RS', category: 'motherboard', price: 179.99, specs: 'ATX, DDR5', socket: 'AM5', brand: 'ASRock' },
  ];

  const psus: Component[] = [
    { id: 'psu1', name: 'Corsair HX1200i', category: 'psu', price: 279.99, specs: '1200W, 80+ Platinum', power: 1200, brand: 'Corsair' },
    { id: 'psu2', name: 'Corsair RM1000x', category: 'psu', price: 189.99, specs: '1000W, 80+ Gold', power: 1000, brand: 'Corsair' },
    { id: 'psu3', name: 'EVGA SuperNOVA 850W', category: 'psu', price: 139.99, specs: '850W, 80+ Gold', power: 850, brand: 'EVGA' },
    { id: 'psu4', name: 'Seasonic FOCUS 750W', category: 'psu', price: 109.99, specs: '750W, 80+ Gold', power: 750, brand: 'Seasonic' },
  ];

  const storages: Component[] = [
    { id: 'ssd1', name: 'Samsung 990 PRO 2TB', category: 'storage', price: 199.99, specs: 'NVMe M.2, 7450 MB/s', power: 6, brand: 'Samsung' },
    { id: 'ssd2', name: 'WD Black SN850X 1TB', category: 'storage', price: 129.99, specs: 'NVMe M.2, 7300 MB/s', power: 5, brand: 'Western Digital' },
    { id: 'ssd3', name: 'Crucial P5 Plus 1TB', category: 'storage', price: 99.99, specs: 'NVMe M.2, 6600 MB/s', power: 5, brand: 'Crucial' },
  ];

  return [...cpus, ...gpus, ...rams, ...motherboards, ...psus, ...storages];
};

const components = generateComponents();

const prebuiltConfigs = [
  { name: 'Gaming Starter', description: '1080p гейминг', components: ['cpu8', 'gpu8', 'ram3', 'mb6', 'psu4', 'ssd3'], price: 1590 },
  { name: 'High-End Gaming', description: '4K ультра', components: ['cpu6', 'gpu2', 'ram2', 'mb4', 'psu2', 'ssd1'], price: 3279 },
  { name: 'Workstation Pro', description: 'Рендеринг 3D', components: ['cpu1', 'gpu1', 'ram1', 'mb1', 'psu1', 'ssd1'], price: 3919 },
];

interface ForumReply {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
}

interface ForumPost {
  id: string;
  author: string;
  avatar: string;
  title: string;
  content: string;
  category: string;
  replies: ForumReply[];
  views: number;
  likes: number;
  timestamp: string;
}

const forumPosts: ForumPost[] = [
  {
    id: '1',
    author: 'TechMaster',
    avatar: 'TM',
    title: 'Лучшая сборка для игр в 2024?',
    content: 'Собираю новый ПК для игр в 4K. Стоит ли брать RTX 4090 или подождать новое поколение?',
    category: 'Обсуждение',
    replies: [
      { id: 'r1', author: 'ProGamer', avatar: 'PG', content: 'Я взял 4090, не жалею! Все игры на ультра в 4K идут на 120+ fps', timestamp: '1 час назад', likes: 5 },
      { id: 'r2', author: 'TechExpert', avatar: 'TE', content: 'Советую подождать. Новое поколение выйдет через 6 месяцев с лучшим соотношением цена/производительность', timestamp: '45 мин назад', likes: 3 }
    ],
    views: 1542,
    likes: 18,
    timestamp: '2 часа назад'
  },
  {
    id: '2',
    author: 'BuilderPro',
    avatar: 'BP',
    title: 'Помогите с выбором охлаждения',
    content: 'Взял i9-14900K, не могу определиться между водянкой и башенным кулером. Что посоветуете?',
    category: 'Вопросы',
    replies: [
      { id: 'r3', author: 'CoolingKing', avatar: 'CK', content: 'Для i9 однозначно водянка 360мм минимум', timestamp: '4 часа назад', likes: 8 }
    ],
    views: 892,
    likes: 12,
    timestamp: '5 часов назад'
  },
  {
    id: '3',
    author: 'GamerX',
    avatar: 'GX',
    title: 'Собрал свою первую сборку!',
    content: 'Спасибо сообществу за помощь! Ryzen 7 7800X3D + RTX 4070 Ti. Всё работает отлично!',
    category: 'Сборки',
    replies: [],
    views: 654,
    likes: 32,
    timestamp: '1 день назад'
  },
  {
    id: '4',
    author: 'PCEnthusiast',
    avatar: 'PE',
    title: 'DDR5 vs DDR4: стоит ли переплачивать?',
    content: 'Разница в цене существенная. Действительно ли DDR5 даёт такой прирост производительности?',
    category: 'Обсуждение',
    replies: [],
    views: 2103,
    likes: 25,
    timestamp: '2 дня назад'
  },
  {
    id: '5',
    author: 'OverclockerKing',
    avatar: 'OK',
    title: 'Разогнал 7950X до 5.9 GHz!',
    content: 'Делюсь результатами разгона на воде. Температуры стабильные, бенчмарки прилагаю.',
    category: 'Разгон',
    replies: [],
    views: 1876,
    likes: 45,
    timestamp: '3 дня назад'
  }
];

export default function Index() {
  const [selectedComponents, setSelectedComponents] = useState<{ [key: string]: Component }>({});
  const [activeTab, setActiveTab] = useState('constructor');
  const [openPopovers, setOpenPopovers] = useState<{ [key: string]: boolean }>({});
  const [filters, setFilters] = useState<{ [key: string]: { priceRange: [number, number]; brand: string; sortBy: string } }>({});
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Обсуждение');
  const [posts, setPosts] = useState(forumPosts);
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState<{ [key: string]: string }>({});
  const forumRef = useRef<HTMLDivElement>(null);

  const scrollToForum = () => {
    forumRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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

  const getFilteredComponents = (category: string) => {
    const categoryComponents = components.filter(c => c.category === category);
    const filter = filters[category] || { priceRange: [0, 2000], brand: 'all', sortBy: 'price-asc' };
    
    let filtered = categoryComponents.filter(
      c => c.price >= filter.priceRange[0] && c.price <= filter.priceRange[1]
    );

    if (filter.brand !== 'all') {
      filtered = filtered.filter(c => c.brand === filter.brand);
    }

    filtered.sort((a, b) => {
      if (filter.sortBy === 'price-asc') return a.price - b.price;
      if (filter.sortBy === 'price-desc') return b.price - a.price;
      if (filter.sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

    return filtered;
  };

  const getBrands = (category: string) => {
    const categoryComponents = components.filter(c => c.category === category);
    const brands = [...new Set(categoryComponents.map(c => c.brand).filter(Boolean))];
    return brands as string[];
  };

  const updateFilter = (category: string, key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [category]: { ...prev[category], [key]: value }
    }));
  };

  const selectComponent = (component: Component) => {
    setSelectedComponents(prev => ({ ...prev, [component.category]: component }));
    setOpenPopovers(prev => ({ ...prev, [component.category]: false }));
    toast.success(`${component.name} добавлен`);
  };

  const loadPrebuilt = (config: typeof prebuiltConfigs[0]) => {
    const newSelection: { [key: string]: Component } = {};
    config.components.forEach(id => {
      const comp = components.find(c => c.id === id);
      if (comp) newSelection[comp.category] = comp;
    });
    setSelectedComponents(newSelection);
    setActiveTab('constructor');
    toast.success(`Загружена "${config.name}"`);
  };

  const handleCreatePost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      toast.error('Заполните все поля');
      return;
    }

    const newPost: ForumPost = {
      id: Date.now().toString(),
      author: 'Вы',
      avatar: 'ВЫ',
      title: newPostTitle,
      content: newPostContent,
      category: selectedCategory,
      replies: [],
      views: 0,
      likes: 0,
      timestamp: 'Только что'
    };

    setPosts([newPost, ...posts]);
    setNewPostTitle('');
    setNewPostContent('');
    toast.success('Пост создан!');
  };

  const handleAddReply = (postId: string) => {
    const content = replyContent[postId]?.trim();
    if (!content) {
      toast.error('Напишите ответ');
      return;
    }

    const newReply: ForumReply = {
      id: Date.now().toString(),
      author: 'Вы',
      avatar: 'ВЫ',
      content,
      timestamp: 'Только что',
      likes: 0
    };

    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, replies: [...post.replies, newReply] }
        : post
    ));

    setReplyContent({ ...replyContent, [postId]: '' });
    toast.success('Ответ добавлен!');
  };

  const handleLikePost = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
    toast.success('👍');
  };

  const handleLikeReply = (postId: string, replyId: string) => {
    setPosts(posts.map(post => 
      post.id === postId
        ? {
            ...post,
            replies: post.replies.map(reply =>
              reply.id === replyId
                ? { ...reply, likes: reply.likes + 1 }
                : reply
            )
          }
        : post
    ));
    toast.success('👍');
  };

  const totalPrice = Object.values(selectedComponents).reduce((sum, comp) => sum + comp.price, 0);
  const totalPower = Object.values(selectedComponents).reduce((sum, comp) => sum + (comp.power || 0), 0);
  const psu = selectedComponents.psu;
  const isCompatible = !selectedComponents.cpu || !selectedComponents.motherboard || selectedComponents.cpu.socket === selectedComponents.motherboard.socket;
  const isPowerSufficient = !psu || psu.power >= totalPower * 1.2;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">PC Builder</h1>
              <p className="text-sm text-muted-foreground">Собери идеальный компьютер</p>
            </div>
            <div className="flex gap-6">
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Стоимость</p>
                <p className="text-xl font-bold text-primary">${totalPrice.toFixed(2)}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Мощность</p>
                <p className={`text-xl font-bold ${isPowerSufficient ? 'text-accent' : 'text-destructive'}`}>{totalPower}W</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="constructor"><Icon name="Hammer" size={16} className="mr-2" />Конструктор</TabsTrigger>
            <TabsTrigger value="prebuilt"><Icon name="Package" size={16} className="mr-2" />Готовые</TabsTrigger>
            <TabsTrigger value="compatibility"><Icon name="CheckCircle2" size={16} className="mr-2" />Проверка</TabsTrigger>
          </TabsList>

          <TabsContent value="constructor" className="space-y-3">
            {(Object.keys(categoryNames) as Array<keyof typeof categoryNames>).map((category) => {
              const filteredComponents = getFilteredComponents(category);
              const selected = selectedComponents[category];
              const currentFilter = filters[category] || { priceRange: [0, 2000], brand: 'all', sortBy: 'price-asc' };
              const brands = getBrands(category);

              return (
                <div key={category} className="flex items-center gap-3 p-3 border rounded-lg bg-card">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon name={categoryIcons[category]} className="text-primary" size={20} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium mb-1">{categoryNames[category]}</p>
                    {selected ? (
                      <p className="text-xs text-muted-foreground truncate">{selected.name} - ${selected.price}</p>
                    ) : (
                      <p className="text-xs text-muted-foreground">Не выбрано</p>
                    )}
                  </div>

                  <Popover open={openPopovers[category]} onOpenChange={(open) => setOpenPopovers(prev => ({ ...prev, [category]: open }))}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="shrink-0">
                        <Icon name="Search" size={16} className="mr-1" />
                        Выбрать
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-[480px]" align="end">
                      <div className="p-3 border-b space-y-3 bg-muted/30">
                        <div className="space-y-2">
                          <Label className="text-xs font-medium">Цена: ${currentFilter.priceRange[0]} - ${currentFilter.priceRange[1]}</Label>
                          <Slider
                            value={currentFilter.priceRange}
                            onValueChange={(value) => updateFilter(category, 'priceRange', value)}
                            max={2000}
                            step={50}
                            className="w-full"
                          />
                        </div>
                        
                        <div className="flex gap-2">
                          <div className="flex-1">
                            <Label className="text-xs font-medium">Бренд</Label>
                            <Select value={currentFilter.brand} onValueChange={(value) => updateFilter(category, 'brand', value)}>
                              <SelectTrigger className="h-8 text-xs mt-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">Все бренды</SelectItem>
                                {brands.map(brand => (
                                  <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="flex-1">
                            <Label className="text-xs font-medium">Сортировка</Label>
                            <Select value={currentFilter.sortBy} onValueChange={(value) => updateFilter(category, 'sortBy', value)}>
                              <SelectTrigger className="h-8 text-xs mt-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="price-asc">Цена ↑</SelectItem>
                                <SelectItem value="price-desc">Цена ↓</SelectItem>
                                <SelectItem value="name">По имени</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                      
                      <Command className="border-0">
                        <CommandInput placeholder={`Поиск ${categoryNames[category].toLowerCase()}...`} />
                        <CommandList>
                          <CommandEmpty>Не найдено</CommandEmpty>
                          <CommandGroup>
                            {filteredComponents.map((comp) => (
                              <CommandItem
                                key={comp.id}
                                value={comp.name}
                                onSelect={() => selectComponent(comp)}
                                className="flex justify-between"
                              >
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium truncate">{comp.name}</p>
                                  <p className="text-xs text-muted-foreground">{comp.specs}</p>
                                </div>
                                <span className="ml-3 font-semibold text-primary shrink-0">${comp.price}</span>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              );
            })}
          </TabsContent>

          <TabsContent value="prebuilt" className="grid md:grid-cols-3 gap-4">
            {prebuiltConfigs.map((config) => (
              <Card key={config.name} className="hover:border-primary transition-colors">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{config.name}</CardTitle>
                  <CardDescription className="text-xs">{config.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1">
                    {config.components.slice(0, 3).map(id => {
                      const comp = components.find(c => c.id === id);
                      return comp ? (
                        <div key={id} className="flex justify-between text-xs">
                          <span className="text-muted-foreground truncate">{comp.name}</span>
                          <span className="ml-2 shrink-0">${comp.price}</span>
                        </div>
                      ) : null;
                    })}
                    <p className="text-xs text-muted-foreground">+ещё {config.components.length - 3} компонентов</p>
                  </div>
                  <div className="pt-3 border-t flex items-center justify-between">
                    <span className="font-bold">${config.price}</span>
                    <Button size="sm" onClick={() => loadPrebuilt(config)}>Загрузить</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="compatibility" className="space-y-3">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-4 border rounded-lg">
                <Icon name={isCompatible ? 'CheckCircle2' : 'AlertCircle'} className={isCompatible ? 'text-accent' : 'text-destructive'} size={24} />
                <div className="flex-1">
                  <p className="font-medium">Совместимость CPU/MB</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedComponents.cpu && selectedComponents.motherboard
                      ? `${selectedComponents.cpu.socket} - ${selectedComponents.motherboard.socket}`
                      : 'Выберите компоненты'}
                  </p>
                </div>
                <Badge variant={isCompatible ? 'default' : 'destructive'}>{isCompatible ? 'OK' : 'Несовместимо'}</Badge>
              </div>

              <div className="flex items-center gap-3 p-4 border rounded-lg">
                <Icon name={isPowerSufficient ? 'CheckCircle2' : 'AlertCircle'} className={isPowerSufficient ? 'text-accent' : 'text-destructive'} size={24} />
                <div className="flex-1">
                  <p className="font-medium">Мощность БП</p>
                  <p className="text-sm text-muted-foreground">
                    {psu ? `${totalPower}W / ${psu.power}W` : 'Выберите БП'}
                  </p>
                </div>
                <Badge variant={isPowerSufficient ? 'default' : 'destructive'}>{isPowerSufficient ? 'OK' : 'Мало'}</Badge>
              </div>

              <div className="flex items-center gap-3 p-4 border rounded-lg">
                <Icon name="Info" className="text-primary" size={24} />
                <div className="flex-1">
                  <p className="font-medium">Прогресс сборки</p>
                  <p className="text-sm text-muted-foreground">{Object.keys(selectedComponents).length} из {Object.keys(categoryNames).length}</p>
                </div>
                <Badge variant="outline">{Math.round((Object.keys(selectedComponents).length / Object.keys(categoryNames).length) * 100)}%</Badge>
              </div>
            </div>

            {Object.keys(selectedComponents).length === Object.keys(categoryNames).length && isCompatible && isPowerSufficient && (
              <div className="p-6 bg-accent/10 border-accent border rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Icon name="PartyPopper" className="text-accent" size={28} />
                  <div>
                    <h3 className="font-bold text-lg">Сборка готова!</h3>
                    <p className="text-sm text-muted-foreground">Все совместимо, можно заказывать</p>
                  </div>
                </div>
                <Button className="w-full" size="lg">Оформить заказ - ${totalPrice.toFixed(2)}</Button>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div ref={forumRef} className="mt-16 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <Icon name="MessageSquare" size={32} className="text-primary" />
                Форум сообщества
              </h2>
              <p className="text-muted-foreground mt-1">Обсуждайте сборки, делитесь опытом и получайте советы</p>
            </div>
            <Button size="lg" onClick={scrollToForum}>
              <Icon name="PenSquare" size={18} className="mr-2" />
              Создать тему
            </Button>
          </div>

          <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="PenSquare" size={20} />
                Создать новую тему
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Заголовок</Label>
                <Input 
                  placeholder="О чём хотите рассказать?"
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Категория</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Обсуждение">Обсуждение</SelectItem>
                    <SelectItem value="Вопросы">Вопросы</SelectItem>
                    <SelectItem value="Сборки">Сборки</SelectItem>
                    <SelectItem value="Разгон">Разгон</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Сообщение</Label>
                <Textarea 
                  placeholder="Расскажите подробнее..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  rows={4}
                />
              </div>
              <Button onClick={handleCreatePost} size="lg" className="w-full">
                <Icon name="Send" size={18} className="mr-2" />
                Опубликовать
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-3">
            {posts.map((post) => {
              const isExpanded = expandedPost === post.id;
              
              return (
                <Card key={post.id} className="hover:shadow-lg transition-all">
                  <CardContent className="p-5">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 shrink-0 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-sm">
                          {post.avatar}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-lg hover:text-primary transition-colors truncate cursor-pointer"
                                onClick={() => setExpandedPost(isExpanded ? null : post.id)}>
                              {post.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                              <span className="font-medium">{post.author}</span>
                              <span>•</span>
                              <span>{post.timestamp}</span>
                              <span>•</span>
                              <Badge variant="outline" className="text-xs">{post.category}</Badge>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{post.content}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                          <div 
                            className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer"
                            onClick={() => handleLikePost(post.id)}
                          >
                            <Icon name="ThumbsUp" size={14} />
                            <span>{post.likes}</span>
                          </div>
                          <div 
                            className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer"
                            onClick={() => setExpandedPost(isExpanded ? null : post.id)}
                          >
                            <Icon name="MessageCircle" size={14} />
                            <span>{post.replies.length}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon name="Eye" size={14} />
                            <span>{post.views}</span>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 text-xs ml-auto"
                            onClick={() => setExpandedPost(isExpanded ? null : post.id)}
                          >
                            {isExpanded ? 'Свернуть' : 'Ответить'}
                            <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={14} className="ml-1" />
                          </Button>
                        </div>

                        {isExpanded && (
                          <div className="mt-4 pt-4 border-t space-y-3">
                            {post.replies.length > 0 && (
                              <div className="space-y-3 mb-4">
                                {post.replies.map((reply) => (
                                  <div key={reply.id} className="flex gap-3 p-3 bg-muted/30 rounded-lg">
                                    <div className="w-8 h-8 shrink-0 rounded-full bg-accent flex items-center justify-center">
                                      <span className="text-accent-foreground font-bold text-xs">
                                        {reply.avatar}
                                      </span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold text-sm">{reply.author}</span>
                                        <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                                      </div>
                                      <p className="text-sm mb-2">{reply.content}</p>
                                      <div 
                                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary cursor-pointer w-fit"
                                        onClick={() => handleLikeReply(post.id, reply.id)}
                                      >
                                        <Icon name="ThumbsUp" size={12} />
                                        <span>{reply.likes}</span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            <div className="flex gap-3">
                              <Textarea
                                placeholder="Написать ответ..."
                                value={replyContent[post.id] || ''}
                                onChange={(e) => setReplyContent({ ...replyContent, [post.id]: e.target.value })}
                                rows={3}
                                className="flex-1"
                              />
                              <Button 
                                onClick={() => handleAddReply(post.id)}
                                className="h-auto"
                              >
                                <Icon name="Send" size={16} />
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="flex justify-center pt-4">
            <Button variant="outline" size="lg">
              Показать ещё
              <Icon name="ChevronDown" size={18} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>

      <footer className="mt-16 border-t bg-card/50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Icon name="Cpu" className="text-primary-foreground" size={24} />
              </div>
              <div>
                <p className="font-bold">PC Builder</p>
                <p className="text-xs text-muted-foreground">© 2024 Все права защищены</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" onClick={scrollToForum}>
                <Icon name="MessageSquare" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Github" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Twitter" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}