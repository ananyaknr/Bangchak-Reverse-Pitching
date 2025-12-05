import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { motion } from 'framer-motion';

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  breadcrumb?: string[];
}

export function DashboardLayout({ children, title, breadcrumb }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      {/* Main Content */}
      <main className="lg:pl-64 pt-16 lg:pt-0">
        <div className="hero-gradient border-b border-border">
          <div className="p-6 lg:p-8">
            {/* Breadcrumb */}
            {breadcrumb && breadcrumb.length > 0 && (
              <nav className="mb-2 text-sm text-muted-foreground">
                {breadcrumb.map((item, idx) => (
                  <span key={idx}>
                    {idx > 0 && <span className="mx-2">/</span>}
                    <span className={idx === breadcrumb.length - 1 ? 'text-foreground' : ''}>
                      {item}
                    </span>
                  </span>
                ))}
              </nav>
            )}
            
            {/* Title */}
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground tracking-tight">
              {title}
            </h1>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6 lg:p-8"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
