'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Clock, Lock, Share2, Eye, EyeOff, Copy, Heart } from 'lucide-react';
import GlobalNavbar from '@/components/global-navbar';
import UsageGuard, { UsageStatus } from '@/components/usage-guard';
import GamePageTemplate from '@/components/game-page-template';
import GameCard from '@/components/game-card';

interface SecretMessage {
  id: string;
  content: string;
  password?: string;
  expireTime: Date;
  maxViews: number;
  isBurnAfterReading: boolean;
  shareLink: string;
}

export default function SecretLoveLetter() {
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const [expireHours, setExpireHours] = useState(24);
  const [maxViews, setMaxViews] = useState(1);
  const [isBurnAfterReading, setIsBurnAfterReading] = useState(true);
  const [createdMessage, setCreatedMessage] = useState<SecretMessage | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const createSecretMessage = () => {
    const id = Math.random().toString(36).substring(2, 15);
    const shareLink = `${window.location.origin}/games/secret-love-letter/view/${id}`;
    
    const newMessage: SecretMessage = {
      id,
      content: message,
      password: password || undefined,
      expireTime: new Date(Date.now() + expireHours * 60 * 60 * 1000),
      maxViews,
      isBurnAfterReading,
      shareLink
    };

    // 模拟保存到本地存储
    localStorage.setItem(`secret_message_${id}`, JSON.stringify(newMessage));
    setCreatedMessage(newMessage);
  };

  const copyToClipboard = async () => {
    if (createdMessage) {
      await navigator.clipboard.writeText(createdMessage.shareLink);
      alert('链接已复制到剪贴板！');
    }
  };

  const getDaysUntilExpire = () => {
    if (!createdMessage) return 0;
    const today = new Date();
    const expire = new Date(createdMessage.expireTime);
    const diffTime = expire.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <UsageGuard feature="games">
      {({ canUse, remainingUses, onUse, isLoading, usageText }) => (
        <GamePageTemplate
          title="秘密情书"
          description="创建加密情书，只有知道密码的人才能查看"
          icon={<Lock className="h-8 w-8 text-white" />}
          bgGradient="bg-gradient-to-br from-pink-50/80 via-white to-purple-50/80"
        >
          <div className="max-w-md mx-auto">
            {!createdMessage ? (
              // 创建情书界面
              <GameCard
                title="💌 创建秘密情书"
                description="写下你的心里话，生成加密链接分享给TA"
                icon={<Lock className="h-6 w-6 text-white" />}
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="message">情书内容</Label>
                    <Textarea
                      id="message"
                      placeholder="写下你想对TA说的话..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={6}
                      className="resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">访问密码（可选）</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="设置查看密码"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expireHours">有效期（小时）</Label>
                      <Input
                        id="expireHours"
                        type="number"
                        min="1"
                        max="168"
                        value={expireHours}
                        onChange={(e) => setExpireHours(Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxViews">最大查看次数</Label>
                      <Input
                        id="maxViews"
                        type="number"
                        min="1"
                        max="10"
                        value={maxViews}
                        onChange={(e) => setMaxViews(Number(e.target.value))}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="burnAfterReading">阅后即焚</Label>
                      <p className="text-sm text-gray-500">查看后自动销毁</p>
                    </div>
                    <Switch
                      id="burnAfterReading"
                      checked={isBurnAfterReading}
                      onCheckedChange={setIsBurnAfterReading}
                    />
                  </div>

                  <Button 
                    onClick={createSecretMessage}
                    disabled={!message.trim() || !canUse}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? '创建中...' : '创建秘密情书'}
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
                title="✨ 秘密情书创建成功！"
                description="你的秘密情书已加密，可以通过以下链接分享"
                icon={<Heart className="h-6 w-6 text-white" />}
              >
                <div className="space-y-4">
                  <div className="bg-gray-50 p-3 rounded-lg border">
                    <p className="text-sm text-gray-600 break-all">{createdMessage.shareLink}</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-600 mb-2">{getDaysUntilExpire()}</div>
                    <div className="text-sm text-gray-600">天后过期</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>有效期：{expireHours}小时</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Eye className="h-4 w-4 text-gray-500" />
                      <span>最大查看：{maxViews}次</span>
                    </div>
                    {createdMessage.password && (
                      <div className="flex items-center space-x-2">
                        <Lock className="h-4 w-4 text-gray-500" />
                        <span>密码保护：已启用</span>
                      </div>
                    )}
                    {isBurnAfterReading && (
                      <div className="flex items-center space-x-2">
                        <EyeOff className="h-4 w-4 text-gray-500" />
                        <span>阅后即焚：已启用</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-3">
                    <Button 
                      onClick={copyToClipboard}
                      className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      复制链接
                    </Button>
                    <Button 
                      onClick={() => setCreatedMessage(null)}
                      variant="outline"
                    >
                      创建新的情书
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