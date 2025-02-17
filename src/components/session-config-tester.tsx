"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"
import { z } from "zod"
import { v4 as uuidv4 } from "uuid"
import { Navbar } from "./navbar"

// Session creation schema definition
const createSessionRequestSchema = z.object({
  sessionId: z.string().uuid().optional(),
  userAgent: z.string().optional(),
  useProxy: z.boolean().optional(),
  proxyUrl: z.string().optional(),
  blockAds: z.boolean().optional(),
  solveCaptcha: z.boolean().optional(),
  sessionContext: z
    .object({
      cookies: z.array(z.record(z.any())).optional(),
      localStorage: z.array(z.record(z.any())).optional(),
    })
    .optional(),
  timeout: z.number().int().optional(),
  concurrency: z.number().int().optional(),
  isSelenium: z.boolean().optional(),
  dimensions: z
    .object({
      width: z.number().int(),
      height: z.number().int(),
    })
    .optional(),
})

type SessionConfig = z.infer<typeof createSessionRequestSchema>

interface ConfigWithMetadata extends SessionConfig {
  name: string
  description: string
  tags: string[]
  lastUpdated: string
}

const configs: ConfigWithMetadata[] = [
  {
    name: "Basic Session",
    description: "A simple session with just a UUID",
    tags: ["basic", "uuid"],
    lastUpdated: "2024-02-09",
    sessionId: uuidv4(),
  },
  {
    name: "High Resolution",
    description: "Session with 1920x1080 resolution",
    tags: ["display", "resolution"],
    lastUpdated: "2024-02-08",
    dimensions: { width: 1920, height: 1080 },
  },
  {
    name: "Proxy Session",
    description: "Session using a proxy server",
    tags: ["proxy", "network"],
    lastUpdated: "2024-02-07",
    useProxy: true,
    proxyUrl: "http://test:test@proxy.example.com:8080",
  },
  {
    name: "Custom Context",
    description: "Session with custom cookies and local storage",
    tags: ["storage", "cookies"],
    lastUpdated: "2024-02-06",
    sessionContext: {
      cookies: [{ name: "test", value: "value", domain: "example.com" }],
      localStorage: [{ key: "testKey", value: "testValue" }],
    },
  },
  {
    name: "Selenium Session",
    description: "Long-running Selenium session",
    tags: ["selenium", "automation"],
    lastUpdated: "2024-02-05",
    isSelenium: true,
    timeout: 600000,
  },
  {
    name: "Full Featured",
    description: "Session with all features enabled",
    tags: ["complete", "advanced"],
    lastUpdated: "2024-02-04",
    sessionId: uuidv4(),
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    useProxy: true,
    blockAds: true,
    solveCaptcha: true,
    dimensions: { width: 1440, height: 900 },
    timeout: 300000,
    concurrency: 1,
  },
]

export function SessionConfigTester() {
  const [selectedConfig, setSelectedConfig] = useState<ConfigWithMetadata | null>(null)

  const handleConfigClick = (config: ConfigWithMetadata) => {
    setSelectedConfig(config)
  }

  const handleCopyJson = () => {
    if (selectedConfig) {
      const { ...configData } = selectedConfig
      const validatedConfig = createSessionRequestSchema.parse(configData)
      navigator.clipboard.writeText(JSON.stringify(validatedConfig, null, 2))
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="flex gap-4">
          <div className="w-1/3">
            <ScrollArea className="h-[calc(100vh-150px)]">
              {configs.map((config, index) => (
                <Card
                  key={index}
                  className={`mb-4 cursor-pointer hover:bg-zinc-800/50 transition-colors duration-200 bg-zinc-900/50 border-zinc-800 ${
                    selectedConfig === config ? "border-zinc-600" : ""
                  }`}
                  onClick={() => handleConfigClick(config)}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl text-zinc-100">{config.name}</CardTitle>
                    <CardDescription className="text-base text-zinc-400">{config.description}</CardDescription>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {config.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700/50 px-3 py-1 rounded-full"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mt-3 text-xs text-zinc-500">
                      <Clock className="w-3 h-3" />
                      <span>{config.lastUpdated}</span>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </ScrollArea>
          </div>
          <div className="w-2/3">
            {selectedConfig ? (
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <div>
                    <CardTitle className="text-xl text-zinc-100">{selectedConfig.name}</CardTitle>
                    <CardDescription className="text-base text-zinc-400">{selectedConfig.description}</CardDescription>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedConfig.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700/50 px-3 py-1 rounded-full"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[calc(100vh-300px)] rounded-md bg-zinc-950/50 p-4">
                    <pre className="text-sm text-zinc-300 whitespace-pre-wrap">
                      {JSON.stringify(selectedConfig, null, 2)}
                    </pre>
                  </ScrollArea>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleCopyJson} className="bg-zinc-800 text-zinc-100 hover:bg-zinc-700">
                    Copy JSON
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-zinc-100">Select a Configuration</CardTitle>
                  <CardDescription className="text-zinc-400">
                    Click on a configuration from the left to view its details
                  </CardDescription>
                </CardHeader>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
