// "use client"

// import { useTheme } from "next-themes"
// import { Button } from "@/components/ui/button"
// import { Moon, Sun } from "lucide-react"
// import { useEffect, useState } from "react"

// export function ThemeToggle({ variant = "ghost", size = "icon" }) {
//   const { theme, setTheme } = useTheme()
//   const [mounted, setMounted] = useState(false)

//   // Avoid hydration mismatch by only rendering after mount
//   useEffect(() => {
//     setMounted(true)
//   }, [])

//   if (!mounted) {
//     return <Button variant={variant} size={size} disabled className="px-0" />
//   }

//   return (
//     <Button
//       variant={variant}
//       size={size}
//       onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//       title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
//       className="hover:bg-transparent hover:border hover:border-gray-200 hover:text-orange-500"
//     >
//       {theme === "dark" ? <Sun className="h-3 w-3" /> : <Moon className="h-2 w-2" />}
//       <span className="sr-only">{theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}</span>
//     </Button>
//   )
// }



"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export function ThemeToggle({
  variant = "ghost",
  size = "icon",
  showLabel = false // New prop to control label visibility
}: {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  showLabel?: boolean // Optional prop
}) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Button variant={variant} size={size} disabled className="px-0" />
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={variant}
        size={size}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        className="flex items-center p-2 hover:bg-transparent hover:border hover:border-gray-200 text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-200"
      >
        {theme === "dark" ? <Sun className="h-3 w-3" /> : <Moon className="h-2 w-2" />}
        <span className="sr-only">{theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}</span>

        {/* Conditionally render label */}
      {showLabel && (
        <span className="text-sm p-0 flex items-center text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-200">
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </span>
      )}
      </Button>
      
      
    </div>
  )
}