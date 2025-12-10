'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Clock, Lock, Share2, Eye, EyeOff, Copy } from 'lucide-react';
import GlobalNavbar from '@/components/global-navbar';
import UsageGuard, { UsageStatus } from '@/components/usage-guard';

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

  if (createdMessage) {
    return (
      <UsageGuard feature="games">
        {({ canUse, remainingUses, onUse, isLoading, usageText }) => (
          <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
            <GlobalNavbar />
            
            <main className="pt-16">
              <div className="container py-8">
                {/* 使用状态提示 */}
                <div className="max-w-md mx-auto mb-6">
                  <UsageStatus feature="games" className="justify-center" />
                </div>
                
                <div className="max-w-md mx-auto">
                  <Card className="shadow-lg">
                    <CardHeader className="text-center">
                      <CardTitle className="text-2xl text-pink-600">✨ 秘密情书创建成功！</CardTitle>
                      <CardDescription>你的秘密情书已加密，可以通过以下链接分享</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-gray-50 p-3 rounded-lg border">
                        <p className="text-sm text-gray-600 break-all">{createdMessage.shareLink}</p>
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
                            <span>阅后即焚：已开启</span>
                          </div>
                        )}
                      </div>

                      <div className="flex space-x-2">
                        <Button onClick={copyToClipboard} className="flex-1">
                          <Copy className="h-4 w-4 mr-2" />
                          复制链接
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Share2 className="h-4 w-4 mr-2" />
                          分享
                        </Button>
                      </div>

                      <Button 
                        variant="ghost" 
                        onClick={() => setCreatedMessage(null)}
                        className="w-full"
                      >
                        创建新的情书
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </main>
          </div>
        )}
      </UsageGuard>
    );
  }

  return (
    <UsageGuard feature="games">
      {({ canUse, remainingUses, onUse, isLoading, usageText }) => (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
          <GlobalNavbar />
          
          <main className="pt-16">
            <div className="container py-8">
              {/* 页面标题 */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-pink-200 mb-4">
                  <Lock className="h-5 w-5 text-pink-500 mr-2" />
                  <span className="text-sm font-medium text-pink-700">秘密情书</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  创建加密情书
                </h1>
                <p className="text-gray-600">
                  创建加密情书，生成专属链接分享给TA
                </p>
              </div>

              {/* 使用状态提示 */}
              <div className="max-w-md mx-auto mb-6">
                <UsageStatus feature="games" className="justify-center" />
              </div>
              
              <div className="max-w-md mx-auto">
                <Card className="shadow-lg">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl text-pink-600">💌 创建秘密情书</CardTitle>
                    <CardDescription>写下你的心里话，生成加密链接分享给TA</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
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
                      className="w-full bg-pink-500 hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? '创建中...' : '创建秘密情书'}
                    </Button>
                    
                    {!canUse && (
                      <p className="text-sm text-amber-600 text-center">
                        使用次数已用完，请登录或等待重置
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      )}
    </UsageGuard>
  );
}