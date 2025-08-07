import { useVersion } from '@/hooks/useVersion';
import { Badge } from '@/components/ui/badge';
import { GitBranch, Calendar, Hash } from 'lucide-react';

const Footer = () => {
  const { version, commit, branch, buildDate } = useVersion();

  return (
    <footer className="border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-auto">
      <div className="flex items-center justify-between px-6 py-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <span className="font-medium">Yoogapay</span>
            <Badge variant="outline" className="text-xs">
              v{version}
            </Badge>
          </div>
          
          <div className="flex items-center gap-1">
            <Hash className="w-3 h-3" />
            <span className="font-mono">{commit}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <GitBranch className="w-3 h-3" />
            <span>{branch}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{buildDate}</span>
          </div>
        </div>
        
        <div className="text-xs">
          © {new Date().getFullYear()} Yooga. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;