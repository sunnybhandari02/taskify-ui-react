import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight, Zap, Shield, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/10">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">Taskify</span>
          </div>
          <div className="space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/login">Sign in</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-6">
            Organize Your Life with Taskify
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            The beautiful, intuitive task manager that helps you stay productive and organized. 
            Manage your tasks, set priorities, and achieve your goals effortlessly.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="shadow-lg" asChild>
              <Link to="/register">
                Start Free Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-card rounded-xl shadow-sm border-0">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
            <p className="text-muted-foreground">
              Quick task creation and management with intuitive controls.
            </p>
          </div>

          <div className="text-center p-6 bg-card rounded-xl shadow-sm border-0">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Smartphone className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Mobile Ready</h3>
            <p className="text-muted-foreground">
              Fully responsive design that works perfectly on all devices.
            </p>
          </div>

          <div className="text-center p-6 bg-card rounded-xl shadow-sm border-0">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
            <p className="text-muted-foreground">
              Your tasks are safely stored and protected with modern security.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <CheckCircle2 className="h-5 w-5" />
            <span>© 2024 Taskify. Built with ❤️ for productivity.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
