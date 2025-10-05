import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

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

const getStoredPosts = (): ForumPost[] => {
  const stored = localStorage.getItem('forumPosts');
  return stored ? JSON.parse(stored) : [];
};

const savePost = (post: ForumPost) => {
  const posts = getStoredPosts();
  const index = posts.findIndex(p => p.id === post.id);
  if (index >= 0) {
    posts[index] = post;
  } else {
    posts.push(post);
  }
  localStorage.setItem('forumPosts', JSON.stringify(posts));
};

export default function ForumThread() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<ForumPost | null>(null);
  const [replyContent, setReplyContent] = useState('');

  useEffect(() => {
    const posts = getStoredPosts();
    const found = posts.find(p => p.id === id);
    
    if (found) {
      const updatedPost = { ...found, views: found.views + 1 };
      savePost(updatedPost);
      setPost(updatedPost);
    }
  }, [id]);

  const handleAddReply = () => {
    if (!replyContent.trim()) {
      toast.error('Напишите ответ');
      return;
    }

    if (!post) return;

    const newReply: ForumReply = {
      id: Date.now().toString(),
      author: 'Вы',
      avatar: 'ВЫ',
      content: replyContent,
      timestamp: 'Только что',
      likes: 0
    };

    const updatedPost = {
      ...post,
      replies: [...post.replies, newReply]
    };

    setPost(updatedPost);
    savePost(updatedPost);
    setReplyContent('');
    toast.success('Ответ добавлен!');
  };

  const handleLikePost = () => {
    if (!post) return;
    const updatedPost = { ...post, likes: post.likes + 1 };
    setPost(updatedPost);
    savePost(updatedPost);
    toast.success('👍');
  };

  const handleLikeReply = (replyId: string) => {
    if (!post) return;
    const updatedPost = {
      ...post,
      replies: post.replies.map(reply =>
        reply.id === replyId
          ? { ...reply, likes: reply.likes + 1 }
          : reply
      )
    };
    setPost(updatedPost);
    savePost(updatedPost);
    toast.success('👍');
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
          <div className="container mx-auto px-4 py-6">
            <Button variant="ghost" onClick={() => navigate('/')}>
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Вернуться к форуму
            </Button>
          </div>
        </header>
        <div className="container mx-auto px-4 py-16 text-center">
          <Icon name="MessageSquareX" size={64} className="mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Тема не найдена</h1>
          <p className="text-muted-foreground mb-6">Возможно, она была удалена</p>
          <Button onClick={() => navigate('/')}>
            <Icon name="Home" size={18} className="mr-2" />
            На главную
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate('/')}>
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Вернуться к форуму
            </Button>
            <Badge variant="outline">{post.category}</Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="mb-6">
          <CardContent className="p-8">
            <div className="flex gap-4 mb-6">
              <div className="w-16 h-16 shrink-0 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">
                  {post.avatar}
                </span>
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="font-medium">{post.author}</span>
                  <span>•</span>
                  <span>{post.timestamp}</span>
                </div>
              </div>
            </div>

            <p className="text-lg mb-6 leading-relaxed">{post.content}</p>

            <div className="flex items-center gap-6 pt-4 border-t">
              <div 
                className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer"
                onClick={handleLikePost}
              >
                <Icon name="ThumbsUp" size={18} />
                <span className="font-semibold">{post.likes}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon name="MessageCircle" size={18} />
                <span className="font-semibold">{post.replies.length}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon name="Eye" size={18} />
                <span className="font-semibold">{post.views}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Icon name="MessageSquare" size={24} />
            Ответы ({post.replies.length})
          </h2>

          {post.replies.length > 0 ? (
            <div className="space-y-4 mb-6">
              {post.replies.map((reply) => (
                <Card key={reply.id}>
                  <CardContent className="p-5">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 shrink-0 rounded-full bg-accent flex items-center justify-center">
                        <span className="text-accent-foreground font-bold text-sm">
                          {reply.avatar}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold">{reply.author}</span>
                          <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                        </div>
                        <p className="text-sm mb-3">{reply.content}</p>
                        <div 
                          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary cursor-pointer w-fit"
                          onClick={() => handleLikeReply(reply.id)}
                        >
                          <Icon name="ThumbsUp" size={14} />
                          <span>{reply.likes}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Icon name="MessageSquare" size={48} className="mx-auto mb-3 opacity-30" />
              <p>Пока нет ответов. Будьте первым!</p>
            </div>
          )}
        </div>

        <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Icon name="PenSquare" size={20} />
              Написать ответ
            </h3>
            <div className="flex gap-3">
              <Textarea
                placeholder="Поделитесь своим мнением..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                rows={4}
                className="flex-1"
              />
            </div>
            <Button 
              onClick={handleAddReply}
              className="mt-4 w-full"
              size="lg"
            >
              <Icon name="Send" size={18} className="mr-2" />
              Отправить ответ
            </Button>
          </CardContent>
        </Card>
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
              <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                <Icon name="Home" size={20} />
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
