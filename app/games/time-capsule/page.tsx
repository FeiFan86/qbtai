'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Calendar, Clock, Users, Share2, Copy, Gift } from 'lucide-react';
import GlobalNavbar from '@/components/global-navbar';
import UsageGuard, { UsageStatus } from '@/components/usage-guard';
import GamePageTemplate from '@/components/game-page-template';
import GameCard from '@/components/game-card';

interface TimeCapsule {
  id: string;
  title: string;
  message: string;
  openDate: Date;
  participants: string[];
  isPublic: boolean;
  shareLink: string;
  createdAt: Date;
}

export default function TimeCapsule() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [openDate, setOpenDate] = useState('');
  const [participants, setParticipants] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [createdCapsule, setCreatedCapsule] = useState<TimeCapsule | null>(null);

  const createTimeCapsule = () => {
    const id = Math.random().toString(36).substring(2, 15);
    const shareLink = `${window.location.origin}/games/time-capsule/view/${id}`;
    
    const participantList = participants 
      ? participants.split(',').map(p => p.trim()).filter(p => p)
      : [];

    const newCapsule: TimeCapsule = {
      id,
      title: title || '未命名时光胶囊',
      message,
      openDate: new Date(openDate),
      participants: participantList,
      isPublic,
      shareLink,
      createdAt: new Date()
    };

    // 模拟保存到本地存储
    localStorage.setItem(`time_capsule_${id}`, JSON.stringify(newCapsule));
    setCreatedCapsule(newCapsule);
  };

  const copyToClipboard = async () => {
    if (createdCapsule) {
      await navigator.clipboard.writeText(createdCapsule.shareLink);
      alert('链接已复制到剪贴板！');
    }
  };

  const getDaysUntilOpen = () => {
    if (!createdCapsule) return 0;
    const today = new Date();
    const open = new Date(createdCapsule.openDate);
    const diffTime = open.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <UsageGuard feature="games">
      {({ canUse, remainingUses, onUse, isLoading, usageText }) => (
        <GamePageTemplate
          title="时光胶囊"
          description="封存美好回忆，在未来某个时刻一起开启"
          icon={<Gift className="h-8 w-8 text-white" />}
          bgGradient="bg-gradient-to-br from-blue-50/80 via-white to-teal-50/80"
        >
          <div className="max-w-md mx-auto">
            {!createdCapsule ? (
              // 创建时光胶囊界面
              <GameCard
                title="📦 创建时光胶囊"
                description="封存现在的美好，让未来的你们一起回忆"
                icon={<Gift className="h-6 w-6 text-white" />}
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">胶囊标题</Label>
                    <Input
                      id="title"
                      placeholder="给这个时光胶囊起个名字"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">胶囊内容</Label>
                    <Textarea
                      id="message"
                      placeholder="写下你想对未来的自己和TA说的话..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={6}
                      className="resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="openDate">开启日期</Label>
                    <Input
                      id="openDate"
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={openDate}
                      onChange={(e) => setOpenDate(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="participants">参与者（用逗号分隔）</Label>
                    <Input
                      id="participants"
                      placeholder="添加参与者的名字或邮箱"
                      value={participants}
                      onChange={(e) => setParticipants(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="isPublic">公开可见</Label>
                      <p className="text-sm text-gray-500">允许其他人看到这个胶囊</p>
                    </div>
                    <Switch
                      id="isPublic"
                      checked={isPublic}
                      onCheckedChange={setIsPublic}
                    />
                  </div>

                  <Button 
                    onClick={createTimeCapsule}
                    disabled={!message.trim() || !openDate || !canUse}
                    className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? '创建中...' : '封存时光胶囊'}
                  </Button>
                  
                  {!canUse && (
                    <p className="text-sm text-amber-600 text-center mt-2">
                      使用次数已用完，请登录或等待重置
                    </p>
                  )}
                </div>
              </GameCard>
            ) : (
              // 创建成功界面
              <GameCard
                title="✨ 时光胶囊创建成功！"
                description="你的时光胶囊已封存，将在指定时间开启"
                icon={<Gift className="h-6 w-6 text-white" />}
              >
                <div className="space-y-4">
                  <div className="bg-gray-50 p-3 rounded-lg border">
                    <p className="text-sm text-gray-600 break-all">{createdCapsule.shareLink}</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">{getDaysUntilOpen()}</div>
                    <div className="text-sm text-gray-600">天后开启</div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">胶囊信息</h4>
                    <p className="text-sm text-blue-700 mb-2">标题：{createdCapsule.title}</p>
                    <p className="text-sm text-blue-700 mb-2">开启时间：{new Date(createdCapsule.openDate).toLocaleDateString()}</p>
                    <p className="text-sm text-blue-700 mb-2">参与者：{createdCapsule.participants.length > 0 ? createdCapsule.participants.join(', ') : '仅自己'}</p>
                    <p className="text-sm text-blue-700">可见性：{createdCapsule.isPublic ? '公开' : '私密'}</p>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button 
                      onClick={copyToClipboard}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      复制链接
                    </Button>
                    <Button 
                      onClick={() => setCreatedCapsule(null)}
                      variant="outline"
                    >
                      创建新的胶囊
                    </Button>
                  </div>
                </div>
              </GameCard>
            )}
          </div>
        </GamePageTemplate>
      )}
    </UsageGuard>
  );
}