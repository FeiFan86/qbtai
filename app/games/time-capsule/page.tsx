'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar, Clock, Users, Share2, Copy, Gift } from 'lucide-react';

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

  if (createdCapsule) {
    const daysUntilOpen = getDaysUntilOpen();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-100 py-8 px-4">
        <div className="max-w-md mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-blue-600 flex items-center justify-center">
                <Gift className="h-6 w-6 mr-2" />
                时光胶囊创建成功！
              </CardTitle>
              <CardDescription>你的时光胶囊已封存，将在指定时间开启</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{daysUntilOpen}</div>
                <div className="text-sm text-gray-600">天后开启</div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">{createdCapsule.title}</h3>
                <p className="text-sm text-blue-700 line-clamp-3">{createdCapsule.message}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>开启日期：{new Date(createdCapsule.openDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span>参与者：{createdCapsule.participants.length}人</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>创建时间：{createdCapsule.createdAt.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Share2 className="h-4 w-4 text-gray-500" />
                  <span>{createdCapsule.isPublic ? '公开' : '私密'}</span>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg border">
                <p className="text-sm text-gray-600 break-all">{createdCapsule.shareLink}</p>
              </div>

              <div className="flex space-x-2">
                <Button onClick={copyToClipboard} className="flex-1">
                  <Copy className="h-4 w-4 mr-2" />
                  复制链接
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="h-4 w-4 mr-2" />
                  邀请好友
                </Button>
              </div>

              <Button 
                variant="ghost" 
                onClick={() => setCreatedCapsule(null)}
                className="w-full"
              >
                创建新的时光胶囊
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 10);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-100 py-8 px-4">
      <div className="max-w-md mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-blue-600 flex items-center justify-center">
              <Gift className="h-6 w-6 mr-2" />
              创建时光胶囊
            </CardTitle>
            <CardDescription>写下对未来想说的话，设置开启时间与好友分享</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">胶囊标题</Label>
              <Input
                id="title"
                placeholder="给未来的自己/TA/我们..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">胶囊内容</Label>
              <Textarea
                id="message"
                placeholder="写下你想对未来的自己或TA说的话..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className="resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="openDate">开启时间</Label>
              <Input
                id="openDate"
                type="date"
                min={minDate.toISOString().split('T')[0]}
                max={maxDate.toISOString().split('T')[0]}
                value={openDate}
                onChange={(e) => setOpenDate(e.target.value)}
              />
              <p className="text-sm text-gray-500">至少选择明天及以后的日期</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="participants">邀请参与者（可选）</Label>
              <Input
                id="participants"
                placeholder="输入好友邮箱或用户名，用逗号分隔"
                value={participants}
                onChange={(e) => setParticipants(e.target.value)}
              />
              <p className="text-sm text-gray-500">留空则为个人胶囊</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="isPublic">公开分享</Label>
                <p className="text-sm text-gray-500">允许他人通过链接查看</p>
              </div>
              <input
                type="checkbox"
                id="isPublic"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>

            <Button 
              onClick={createTimeCapsule}
              disabled={!message.trim() || !openDate}
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              创建时光胶囊
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}