import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, LayoutDashboard, CreditCard, MessageSquare, ChevronDown } from "lucide-react";
import ParticleBackground from "@/components/ParticleBackground";

const Landing = () => {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
            <ParticleBackground />

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/50 backdrop-blur-md">
                <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                    <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
                        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
                            C
                        </div>
                        CRM Pro
                    </div>

                    <div className="flex items-center gap-4">
                        <Link to="/login" className="text-sm font-medium hover:text-primary transition-colors">
                            Login
                        </Link>
                        <Link to="/register">
                            <Button size="sm" className="rounded-full px-6">Get Started</Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex-1 flex flex-col pt-16 relative z-10">
                {/* Hero Section */}
                <section className="flex-1 flex items-center justify-center py-20 md:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">

                            {/* Small Logo/Text above headline */}
                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20 animate-fade-in-up">
                                New Features Available
                            </div>

                            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 pb-4 animate-fade-in-up delay-100">
                                Manage your business <br />
                                with absolute ease <br />
                            </h1>

                            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl animate-fade-in-up delay-200">
                                Streamline your leads, payments, and customer communications in one beautiful, intuitive platform.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in-up delay-300">
                                <Link to="/register">
                                    <Button size="lg" className="w-full sm:w-auto gap-2 rounded-full h-12 px-8 text-base">
                                        Start for free <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <Link to="/login">
                                    <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full h-12 px-8 text-base bg-transparent border-white/20 hover:bg-white/10">
                                        Live Demo
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section (kept for content, but styled to blend) */}
                <section id="features" className="py-20 border-t border-white/10 bg-black/20 backdrop-blur-sm">
                    <div className="container px-4 md:px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all group">
                                <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4 text-blue-400 group-hover:scale-110 transition-transform">
                                    <LayoutDashboard className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-foreground">Lead Management</h3>
                                <p className="text-muted-foreground">
                                    Track and organize your potential customers with our intuitive kanban and list views.
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-green-500/50 transition-all group">
                                <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4 text-green-400 group-hover:scale-110 transition-transform">
                                    <CreditCard className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-foreground">Smart Payments</h3>
                                <p className="text-muted-foreground">
                                    Handle transactions, track status, and manage financial records effortlessly.
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all group">
                                <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4 text-purple-400 group-hover:scale-110 transition-transform">
                                    <MessageSquare className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-foreground">WhatsApp Integration</h3>
                                <p className="text-muted-foreground">
                                    Connect with your clients directly through WhatsApp without leaving the platform.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-white/10 py-8 bg-black/40 backdrop-blur-md relative z-10">
                <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                        © 2024 CRM Pro. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-muted-foreground">
                        <Link to="#" className="hover:text-foreground transition-colors">Privacy</Link>
                        <Link to="#" className="hover:text-foreground transition-colors">Terms</Link>
                        <Link to="#" className="hover:text-foreground transition-colors">Contact</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
