"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  GraduationCap,
  BookOpen,
  PlayCircle,
  Award,
  TrendingUp,
  DollarSign,
  Coins,
  BarChart3,
  ArrowLeft,
  CheckCircle,
  Lock,
  Star,
  Calendar,
} from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function LearnPage() {
  const [completedCourses, setCompletedCourses] = useState(3)

  const courses = [
    {
      title: "Cryptocurrency Basics",
      lessons: 8,
      duration: "45 min",
      reward: "5 π",
      completed: 8,
      icon: Coins,
      difficulty: "Beginner",
      description: "Learn the fundamentals of blockchain and cryptocurrency",
    },
    {
      title: "Stock Market Investing",
      lessons: 10,
      duration: "60 min",
      reward: "7 π",
      completed: 6,
      icon: TrendingUp,
      difficulty: "Beginner",
      description: "Master the basics of stock trading and portfolio building",
    },
    {
      title: "Precious Metals Trading",
      lessons: 6,
      duration: "30 min",
      reward: "4 π",
      completed: 6,
      icon: Award,
      difficulty: "Beginner",
      description: "Understand gold, silver, and precious metals markets",
    },
    {
      title: "Advanced DeFi Strategies",
      lessons: 12,
      duration: "90 min",
      reward: "15 π",
      completed: 0,
      icon: BarChart3,
      difficulty: "Advanced",
      description: "Deep dive into decentralized finance and yield farming",
    },
    {
      title: "Risk Management",
      lessons: 8,
      duration: "50 min",
      reward: "6 π",
      completed: 0,
      icon: DollarSign,
      difficulty: "Intermediate",
      description: "Learn to protect your investments and minimize losses",
    },
  ]

  const glossaryTerms = [
    {
      term: "Market Cap",
      definition: "Total value of a company's outstanding shares or cryptocurrency in circulation",
      category: "Stocks",
    },
    {
      term: "APY",
      definition: "Annual Percentage Yield - the rate of return earned on an investment over one year",
      category: "DeFi",
    },
    {
      term: "Blockchain",
      definition: "A distributed ledger technology that records transactions across multiple computers",
      category: "Crypto",
    },
    {
      term: "P/E Ratio",
      definition: "Price-to-Earnings ratio - measures a company's share price relative to its earnings",
      category: "Stocks",
    },
    {
      term: "Staking",
      definition: "Locking up cryptocurrency to support network operations and earn rewards",
      category: "Crypto",
    },
    {
      term: "Dividend Yield",
      definition: "Annual dividend payment divided by stock price, expressed as a percentage",
      category: "Stocks",
    },
  ]

  const articles = [
    {
      title: "African Crypto Regulations: 2024 Update",
      author: "Dr. Amina Hassan",
      date: "2 days ago",
      readTime: "8 min read",
      category: "Regulation",
    },
    {
      title: "Top 5 Stocks for African Investors",
      author: "John Okafor",
      date: "5 days ago",
      readTime: "12 min read",
      category: "Stocks",
    },
    {
      title: "Gold vs Bitcoin: Which Store of Value?",
      author: "Sarah Mensah",
      date: "1 week ago",
      readTime: "10 min read",
      category: "Analysis",
    },
  ]

  const upcomingWebinars = [
    {
      title: "Building Wealth in Africa with Pi Network",
      expert: "Emmanuel Adeyemi",
      role: "Financial Advisor",
      date: "March 15, 2024",
      time: "6:00 PM WAT",
      spots: 150,
    },
    {
      title: "Diversification Strategies for 2024",
      expert: "Fatima El-Sayed",
      role: "Investment Analyst",
      date: "March 22, 2024",
      time: "7:00 PM CAT",
      spots: 200,
    },
  ]

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-primary text-primary-foreground p-4">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Learn & Earn</h1>
              <p className="text-xs opacity-90">Master investing and earn rewards</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        <Card className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 border-violet-200 dark:border-violet-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-violet-900 dark:text-violet-100">{completedCourses} Courses</h2>
                <p className="text-sm text-violet-700 dark:text-violet-300">Completed</p>
              </div>
              <div className="text-right">
                <h2 className="text-2xl font-bold text-violet-900 dark:text-violet-100">22 π</h2>
                <p className="text-sm text-violet-700 dark:text-violet-300">Total Earned</p>
              </div>
              <div className="w-16 h-16 bg-violet-500 rounded-full flex items-center justify-center">
                <Award className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="courses" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="courses">
              <GraduationCap className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="glossary">
              <BookOpen className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="articles">
              <Star className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="webinars">
              <Calendar className="h-4 w-4" />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-4 mt-6">
            <div className="space-y-4">
              {courses.map((course, index) => {
                const progress = (course.completed / course.lessons) * 100
                const isCompleted = course.completed === course.lessons
                const isLocked = index > 3 && completedCourses < 2

                return (
                  <Card key={index} className={isLocked ? "opacity-60" : ""}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div
                            className={`w-12 h-12 rounded-lg ${isCompleted ? "bg-emerald-100 dark:bg-emerald-950" : "bg-primary/10"} flex items-center justify-center`}
                          >
                            {isLocked ? (
                              <Lock className="h-6 w-6 text-muted-foreground" />
                            ) : isCompleted ? (
                              <CheckCircle className="h-6 w-6 text-emerald-600" />
                            ) : (
                              <course.icon className="h-6 w-6 text-primary" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-bold">{course.title}</h3>
                              {isCompleted && <Badge className="bg-emerald-500">Completed</Badge>}
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">{course.description}</p>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span>{course.lessons} lessons</span>
                              <span>•</span>
                              <span>{course.duration}</span>
                              <span>•</span>
                              <Badge variant="secondary" className="text-xs">
                                {course.difficulty}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-secondary text-secondary-foreground">
                            <Coins className="h-3 w-3 mr-1" />
                            {course.reward}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    {!isLocked && (
                      <CardContent className="space-y-3">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>Progress</span>
                            <span>
                              {course.completed}/{course.lessons} lessons
                            </span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                        <Button className="w-full" variant={isCompleted ? "outline" : "default"}>
                          {isCompleted ? (
                            <>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Review Course
                            </>
                          ) : course.completed > 0 ? (
                            "Continue Learning"
                          ) : (
                            <>
                              <PlayCircle className="h-4 w-4 mr-2" />
                              Start Course
                            </>
                          )}
                        </Button>
                      </CardContent>
                    )}
                    {isLocked && (
                      <CardContent>
                        <p className="text-sm text-muted-foreground text-center py-2">
                          Complete 2 beginner courses to unlock
                        </p>
                      </CardContent>
                    )}
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="glossary" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Investment Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {glossaryTerms.map((item, index) => (
                  <div key={index} className="p-3 rounded-lg border border-border hover:bg-muted/50 transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold">{item.term}</h3>
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.definition}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="articles" className="space-y-4 mt-6">
            {articles.map((article, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <Badge variant="secondary" className="mb-3">
                    {article.category}
                  </Badge>
                  <h3 className="font-bold text-lg mb-2">{article.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <span>{article.author}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Read Article
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="webinars" className="space-y-4 mt-6">
            {upcomingWebinars.map((webinar, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{webinar.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <GraduationCap className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{webinar.expert}</p>
                      <p className="text-sm text-muted-foreground">{webinar.role}</p>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50 space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{webinar.date}</span>
                      <span>•</span>
                      <span>{webinar.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{webinar.spots} spots remaining</p>
                  </div>
                  <Button className="w-full">
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Register for Webinar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
