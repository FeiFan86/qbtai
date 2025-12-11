'use client'

import { useState, useCallback } from 'react'
import { GameLayout } from '@/components/game/GameLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Users, Play, Crown, Target } from 'lucide-react'

interface Player {
  id: number
  name: string
  gender: 'male' | 'female'
  position: number
  color: string
  avatar: string
}

interface Cell {
  id: number
  type: 'normal' | 'truth' | 'dare' | 'kiss' | 'hug' | 'forward' | 'backward' | 'special'
  task?: string
  description: string
}

const BOARD_SIZE = 30
const PLAYER_COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4']
const PLAYER_AVATARS = ['👦', '👧', '👨', '👩']

const CELL_TYPES: Record<string, Cell> = {
  normal: { id: 0, type: 'normal', description: '普通格子' },
  truth: { id: 1, type: 'truth', task: '真心话', description: '回答一个真心话问题' },
  dare: { id: 2, type: 'dare', task: '大冒险', description: '完成一个大冒险任务' },
  kiss: { id: 3, type: 'kiss', task: '亲亲', description: '给对方一个甜蜜的吻' },
  hug: { id: 4, type: 'hug', task: '抱抱', description: '给对方一个温暖的拥抱' },
  forward: { id: 5, type: 'forward', task: '前进3格', description: '前进3个格子' },
  backward: { id: 6, type: 'backward', task: '后退2格', description: '后退2个格子' },
  special: { id: 7, type: 'special', description: '特殊事件' }
}

const TRUTH_QUESTIONS = [
  '你最喜欢我的哪一点？',
  '我们第一次见面时你对我有什么印象？',
  '你最想和我一起做什么事情？',
  '你觉得我们之间最美好的回忆是什么？',
  '你希望我们未来是什么样的关系？'
]

const DARE_TASKS = [
  '给对方一个深情的拥抱',
  '说一句真心的话给对方',
  '模仿对方的习惯动作',
  '一起唱一首情歌',
  '对视10秒钟不笑场'
]

export default function CoupleAirChess() {
  const [gameMode, setGameMode] = useState<'local' | 'online'>('local')
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: '玩家1', gender: 'male', position: 0, color: PLAYER_COLORS[0], avatar: PLAYER_AVATARS[0] },
    { id: 2, name: '玩家2', gender: 'female', position: 0, color: PLAYER_COLORS[1], avatar: PLAYER_AVATARS[1] }
  ])
  const [currentPlayer, setCurrentPlayer] = useState(0)
  const [diceValue, setDiceValue] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [currentTask, setCurrentTask] = useState<string>('')
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [roomCode, setRoomCode] = useState('')

  // 创建棋盘
  const createBoard = useCallback((): Cell[] => {
    const board: Cell[] = []
    for (let i = 0; i < BOARD_SIZE; i++) {
      if (i === 5 || i === 10 || i === 15 || i === 20) {
        board.push({ ...CELL_TYPES.truth, id: i })
      } else if (i === 3 || i === 8 || i === 13 || i === 18) {
        board.push({ ...CELL_TYPES.dare, id: i })
      } else if (i === 7 || i === 14 || i === 21) {
        board.push({ ...CELL_TYPES.kiss, id: i })
      } else if (i === 4 || i === 12 || i === 19) {
        board.push({ ...CELL_TYPES.hug, id: i })
      } else if (i === 6 || i === 11) {
        board.push({ ...CELL_TYPES.forward, id: i })
      } else if (i === 9 || i === 16) {
        board.push({ ...CELL_TYPES.backward, id: i })
      } else {
        board.push({ ...CELL_TYPES.normal, id: i })
      }
    }
    return board
  }, [])

  const [board] = useState<Cell[]>(createBoard())

  const rollDice = () => {
    const value = Math.floor(Math.random() * 6) + 1
    setDiceValue(value)
    
    setTimeout(() => {
      movePlayer(value)
    }, 1000)
  }

  const movePlayer = (steps: number) => {
    setPlayers(prev => {
      const newPlayers = [...prev]
      const playerIndex = currentPlayer
      const newPosition = Math.min(newPlayers[playerIndex].position + steps, BOARD_SIZE - 1)
      
      newPlayers[playerIndex] = {
        ...newPlayers[playerIndex],
        position: newPosition
      }

      // 检查是否到达终点
      if (newPosition === BOARD_SIZE - 1) {
        setGameOver(true)
        return newPlayers
      }

      // 检查格子类型并触发任务
      const currentCell = board[newPosition]
      if (currentCell.type !== 'normal') {
        triggerTask(currentCell)
      }

      return newPlayers
    })

    // 切换到下一个玩家
    setCurrentPlayer((currentPlayer + 1) % players.length)
  }

  const triggerTask = (cell: Cell) => {
    let task = ''
    
    switch (cell.type) {
      case 'truth':
        task = TRUTH_QUESTIONS[Math.floor(Math.random() * TRUTH_QUESTIONS.length)]
        break
      case 'dare':
        task = DARE_TASKS[Math.floor(Math.random() * DARE_TASKS.length)]
        break
      case 'forward':
        task = '前进3格！'
        movePlayer(3)
        break
      case 'backward':
        task = '后退2格！'
        setPlayers(prev => {
          const newPlayers = [...prev]
          const playerIndex = currentPlayer
          newPlayers[playerIndex] = {
            ...newPlayers[playerIndex],
            position: Math.max(0, newPlayers[playerIndex].position - 2)
          }
          return newPlayers
        })
        break
      default:
        task = cell.task || cell.description
    }

    setCurrentTask(task)
    setShowTaskModal(true)
  }

  const startGame = () => {
    setGameStarted(true)
    setGameOver(false)
    setPlayers(prev => prev.map(p => ({ ...p, position: 0 })))
    setCurrentPlayer(0)
    setDiceValue(0)
  }

  const resetGame = () => {
    setGameStarted(false)
    setGameOver(false)
    setPlayers(prev => prev.map(p => ({ ...p, position: 0 })))
    setCurrentPlayer(0)
    setDiceValue(0)
  }

  const createRoom = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase()
    setRoomCode(code)
    setGameMode('online')
  }

  const joinRoom = () => {
    if (roomCode.length === 6) {
      setGameMode('online')
      startGame()
    }
  }

  if (!gameStarted) {
    return (
      <GameLayout title="情侣飞行棋" description="一起玩飞行棋，增进感情的游戏">
        <div className="max-w-md mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                选择游戏模式
              </CardTitle>
              <CardDescription>选择本地双人或在线对战模式</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup value={gameMode} onValueChange={(value: 'local' | 'online') => setGameMode(value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="local" id="local" />
                  <Label htmlFor="local">本地双人游戏</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="online" id="online" />
                  <Label htmlFor="online">在线对战</Label>
                </div>
              </RadioGroup>

              {gameMode === 'online' && (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Button onClick={createRoom} className="flex-1">
                      创建房间
                    </Button>
                    <Button variant="outline" onClick={joinRoom} className="flex-1">
                      加入房间
                    </Button>
                  </div>
                  {roomCode && (
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-sm text-muted-foreground">房间号</div>
                      <div className="text-2xl font-bold">{roomCode}</div>
                      <div className="text-xs text-muted-foreground">分享给朋友一起玩</div>
                    </div>
                  )}
                  <Input
                    placeholder="输入6位房间号"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                    maxLength={6}
                  />
                </div>
              )}

              <Button onClick={startGame} className="w-full" size="lg">
                <Play className="h-4 w-4 mr-2" />
                开始游戏
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>游戏规则</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>• 轮流掷骰子，按点数前进</div>
              <div>• 不同格子触发不同任务</div>
              <div>• 先到达终点的玩家获胜</div>
              <div>• 真心话：回答情感问题</div>
              <div>• 大冒险：完成互动任务</div>
            </CardContent>
          </Card>
        </div>
      </GameLayout>
    )
  }

  return (
    <GameLayout title="情侣飞行棋" description="飞行棋游戏进行中">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* 游戏状态栏 */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="text-lg font-semibold">
                  当前玩家：{players[currentPlayer].name}
                </div>
                <div className={`w-6 h-6 rounded-full`} style={{ backgroundColor: players[currentPlayer].color }} />
              </div>
              
              {gameOver ? (
                <div className="flex items-center gap-2 text-green-600">
                  <Crown className="h-5 w-5" />
                  <span className="font-bold">游戏结束！{players.find(p => p.position === BOARD_SIZE - 1)?.name}获胜！</span>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold">{diceValue}</div>
                  <Button onClick={rollDice} disabled={diceValue > 0}>
                    掷骰子
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 游戏棋盘 */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-6 gap-2">
              {board.map((cell, index) => (
                <div
                  key={cell.id}
                  className={`relative h-16 rounded-lg border-2 flex items-center justify-center text-xs font-medium transition-all ${
                    cell.type === 'normal' ? 'bg-gray-100 border-gray-300' :
                    cell.type === 'truth' ? 'bg-blue-100 border-blue-300 text-blue-800' :
                    cell.type === 'dare' ? 'bg-red-100 border-red-300 text-red-800' :
                    cell.type === 'kiss' ? 'bg-pink-100 border-pink-300 text-pink-800' :
                    cell.type === 'hug' ? 'bg-purple-100 border-purple-300 text-purple-800' :
                    cell.type === 'forward' ? 'bg-green-100 border-green-300 text-green-800' :
                    'bg-yellow-100 border-yellow-300 text-yellow-800'
                  }`}
                >
                  <div className="text-center">
                    <div className="font-bold">{index + 1}</div>
                    <div className="text-[10px]">{cell.type !== 'normal' ? cell.type : ''}</div>
                  </div>
                  
                  {/* 显示玩家位置 */}
                  {players.map(player => (
                    player.position === index && (
                      <div
                        key={player.id}
                        className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        style={{ backgroundColor: player.color }}
                      >
                        {player.avatar}
                      </div>
                    )
                  ))}
                  
                  {/* 终点标记 */}
                  {index === BOARD_SIZE - 1 && (
                    <Target className="absolute w-4 h-4 text-red-500" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 玩家信息 */}
        <div className="grid grid-cols-2 gap-4">
          {players.map(player => (
            <Card key={player.id} className={currentPlayer === player.id - 1 ? 'ring-2 ring-primary' : ''}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{player.avatar}</div>
                    <div>
                      <div className="font-semibold">{player.name}</div>
                      <div className="text-sm text-muted-foreground">位置: {player.position + 1}</div>
                    </div>
                  </div>
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: player.color }}
                  />
                </div>
                <div className="mt-2 text-sm">
                  {player.position === BOARD_SIZE - 1 ? (
                    <span className="text-green-600 font-bold">🏆 到达终点！</span>
                  ) : (
                    `距离终点: ${BOARD_SIZE - player.position - 1}格`
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 控制按钮 */}
        <div className="flex gap-3">
          <Button onClick={resetGame} variant="outline" className="flex-1">
            重新开始
          </Button>
          <Button onClick={startGame} variant="outline" className="flex-1">
            新游戏
          </Button>
        </div>

        {/* 任务弹窗 */}
        {showTaskModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="max-w-md mx-4">
              <CardHeader>
                <CardTitle>任务时间！</CardTitle>
                <CardDescription>请完成以下任务：</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-medium text-center py-4">{currentTask}</div>
              </CardContent>
              <div className="p-6 pt-0">
                <Button onClick={() => setShowTaskModal(false)} className="w-full">
                  完成任务
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </GameLayout>
  )
}