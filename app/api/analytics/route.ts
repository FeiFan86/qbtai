import { NextRequest, NextResponse } from 'next/server'

// 模拟数据统计存储
let analyticsData = {
  // 用户统计
  users: {
    total: 0,
    activeToday: 0,
    newToday: 0,
    retention: {
      day1: 0,
      day7: 0,
      day30: 0
    }
  },
  
  // 游戏统计
  games: {
    totalPlays: 0,
    averageSessionTime: 0,
    popularGames: [] as any[],
    completionRate: {
      overall: 0,
      byGame: {} as { [gameId: string]: number }
    }
  },
  
  // 社交统计
  social: {
    totalChats: 0,
    averageChatsPerUser: 0,
    friendshipCount: 0
  },
  
  // 成就统计
  achievements: {
    totalUnlocked: 0,
    averagePerUser: 0,
    mostPopular: [] as any[]
  },
  
  // 时间序列数据
  timeSeries: {
    dailyActiveUsers: [] as any[],
    dailyGamePlays: [] as any[],
    dailyChats: [] as any[]
  }
}

// 获取数据统计概览
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // overview, games, social, achievements
    const period = searchParams.get('period') || '7d' // 1d, 7d, 30d, all
    
    // 根据类型返回不同的统计数据
    let data
    
    switch (type) {
      case 'games':
        data = {
          games: analyticsData.games,
          timeSeries: analyticsData.timeSeries.dailyGamePlays
        }
        break
        
      case 'social':
        data = {
          social: analyticsData.social,
          timeSeries: analyticsData.timeSeries.dailyChats
        }
        break
        
      case 'achievements':
        data = {
          achievements: analyticsData.achievements,
          timeSeries: analyticsData.timeSeries.dailyActiveUsers
        }
        break
        
      default: // overview
        data = {
          overview: {
            totalUsers: analyticsData.users.total,
            activeUsersToday: analyticsData.users.activeToday,
            totalGamePlays: analyticsData.games.totalPlays,
            totalChats: analyticsData.social.totalChats,
            averageSessionTime: analyticsData.games.averageSessionTime
          },
          users: analyticsData.users,
          games: analyticsData.games,
          social: analyticsData.social,
          achievements: analyticsData.achievements
        }
    }
    
    return NextResponse.json({
      success: true,
      data: {
        ...data,
        period,
        lastUpdated: new Date().toISOString()
      }
    })
    
  } catch (error) {
    console.error('获取统计数据失败:', error)
    return NextResponse.json({
      success: false,
      error: '服务器内部错误'
    }, { status: 500 })
  }
}

// 记录数据统计事件
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { eventType, data } = body
    
    if (!eventType) {
      return NextResponse.json({
        success: false,
        error: '事件类型不能为空'
      }, { status: 400 })
    }
    
    const today = new Date().toISOString().split('T')[0]
    
    // 处理不同的事件类型
    switch (eventType) {
      case 'user_register':
        analyticsData.users.total += 1
        analyticsData.users.newToday += 1
        break
        
      case 'user_login':
        analyticsData.users.activeToday += 1
        break
        
      case 'game_play':
        analyticsData.games.totalPlays += 1
        analyticsData.games.averageSessionTime = 
          (analyticsData.games.averageSessionTime * (analyticsData.games.totalPlays - 1) + (data.duration || 0)) / analyticsData.games.totalPlays
        
        // 更新游戏热度统计
        const gameId = data.gameId
        if (gameId) {
          const gameIndex = analyticsData.games.popularGames.findIndex(g => g.id === gameId)
          if (gameIndex >= 0) {
            analyticsData.games.popularGames[gameIndex].plays += 1
          } else {
            analyticsData.games.popularGames.push({
              id: gameId,
              name: data.gameName || gameId,
              plays: 1
            })
          }
          // 按播放次数排序
          analyticsData.games.popularGames.sort((a, b) => b.plays - a.plays)
        }
        break
        
      case 'chat_message':
        analyticsData.social.totalChats += 1
        analyticsData.social.averageChatsPerUser = 
          analyticsData.social.totalChats / Math.max(analyticsData.users.total, 1)
        break
        
      case 'achievement_unlock':
        analyticsData.achievements.totalUnlocked += 1
        analyticsData.achievements.averagePerUser = 
          analyticsData.achievements.totalUnlocked / Math.max(analyticsData.users.total, 1)
        
        // 更新成就热度统计
        const achievementId = data.achievementId
        if (achievementId) {
          const achievementIndex = analyticsData.achievements.mostPopular.findIndex(a => a.id === achievementId)
          if (achievementIndex >= 0) {
            analyticsData.achievements.mostPopular[achievementIndex].unlocks += 1
          } else {
            analyticsData.achievements.mostPopular.push({
              id: achievementId,
              name: data.achievementName || achievementId,
              unlocks: 1
            })
          }
          // 按解锁次数排序
          analyticsData.achievements.mostPopular.sort((a, b) => b.unlocks - a.unlocks)
        }
        break
        
      case 'friendship_create':
        analyticsData.social.friendshipCount += 1
        break
    }
    
    // 更新时间序列数据
    updateTimeSeriesData(eventType, today)
    
    return NextResponse.json({
      success: true,
      data: {
        message: '统计事件已记录'
      }
    })
    
  } catch (error) {
    console.error('记录统计事件失败:', error)
    return NextResponse.json({
      success: false,
      error: '服务器内部错误'
    }, { status: 500 })
  }
}

// 更新时间序列数据
function updateTimeSeriesData(eventType: string, date: string) {
  const getTimeSeriesArray = (type: string) => {
    switch (type) {
      case 'user_login': return analyticsData.timeSeries.dailyActiveUsers
      case 'game_play': return analyticsData.timeSeries.dailyGamePlays
      case 'chat_message': return analyticsData.timeSeries.dailyChats
      default: return []
    }
  }
  
  const timeSeriesArray = getTimeSeriesArray(eventType)
  if (timeSeriesArray.length > 0) {
    const todayIndex = timeSeriesArray.findIndex(item => item.date === date)
    if (todayIndex >= 0) {
      timeSeriesArray[todayIndex].count += 1
    } else {
      timeSeriesArray.push({ date, count: 1 })
    }
  }
  
  // 保留最近30天的数据
  if (timeSeriesArray.length > 30) {
    timeSeriesArray.splice(0, timeSeriesArray.length - 30)
  }
}