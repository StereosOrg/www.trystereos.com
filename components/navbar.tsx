"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { NavigationMenuItems } from "@/components/navigation-menu"
import { Menu, X, PhoneCallIcon, User, LogOut } from "lucide-react"
import { useSession, signOut } from "@/lib/auth-client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session } = useSession()

  const scheduleCall = () => {
    window.open("https://cal.com/team/atelierlogos/vendorless-intro", "_blank")
  }

  const learnMore = () => {
    window.open("https://www.atelierlogos.studio/about", "_blank")
  }

  const handleSignOut = async () => {
    await signOut()
    window.location.href = "/"
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b-4 border-black bg-background shadow-[0px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Stereos Logo " width={90} height={90} className="dark:brightness-110" />
            <span className="text-xl font-bold">Stereos</span>
          </Link>
        </div>

        <NavigationMenuItems className="hidden md:flex" />

        <div className="hidden md:flex items-center gap-3">
          <Button
            className="gap-2 bg-primary border-4 border-black text-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
            onClick={scheduleCall}
          >
            <PhoneCallIcon size={16} />
            Schedule a call
          </Button>

          {/* {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  {session.user?.email || "My Account"}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" asChild className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-bold">
              <Link href="/sign-in">Sign In</Link>
            </Button>
          )} */}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            className="p-2 hover:bg-accent rounded-md transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t-4 border-black bg-background">
          <div className="container py-4">
            <NavigationMenuItems variant="mobile" onNavigate={() => setIsMenuOpen(false)} />

            <div className="pt-4 mt-4 border-t-4 border-black space-y-2">
              <Button
                variant="outline"
                className="w-full gap-2 bg-white border-4 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                onClick={() => {
                  scheduleCall()
                  setIsMenuOpen(false)
                }}
              >
                <PhoneCallIcon size={16} />
                View Pricing
              </Button>
              <Button
                className="w-full gap-2 bg-primary border-4 border-black text-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                onClick={() => {
                  learnMore()
                  setIsMenuOpen(false)
                }}
              >
                Learn more
              </Button>

              {session ? (
                <Button
                  variant="outline"
                  className="w-full border-4 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                  onClick={() => {
                    handleSignOut()
                    setIsMenuOpen(false)
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="w-full border-4 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                  asChild
                >
                  <Link href="/sign-in" onClick={() => setIsMenuOpen(false)}>
                    Sign In
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
