import type { LucideIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export interface SocialLink {
  icon: LucideIcon;
  href: string;
}

export interface TeamMember {
  name: string;
  designation: string;
  description?: string;
  imageSrc: string;
  socialLinks?: SocialLink[];
}

export function TeamMemberCard({
  name,
  designation,
  description,
  imageSrc,
}: TeamMember) {
  return (
    <div className="bg-card overflow-hidden rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="aspect-square w-full overflow-hidden">
        {/* PLACEHOLDER: foto ilustrativa — substituir por foto real do profissional. */}
        <img src={imageSrc} alt={name} className="h-full w-full object-cover" />
      </div>
      <div className="p-4 text-center sm:p-5">
        <h3 className="font-heading text-foreground text-lg font-medium">
          {name}
        </h3>
        <p className="text-accent mt-1 text-sm font-medium">{designation}</p>
        {description && (
          <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">
            {description}
          </p>
        )}

        <Dialog>
          <DialogTrigger
            render={
              <button
                type="button"
                aria-label={`Conhecer mais sobre ${name}`}
              />
            }
            className="text-accent mt-3 text-sm font-medium hover:underline"
          >
            Conhecer
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <div className="aspect-square w-full overflow-hidden rounded-lg">
              <img
                src={imageSrc}
                alt={name}
                className="h-full w-full object-cover"
              />
            </div>
            <DialogHeader>
              <DialogTitle>{name}</DialogTitle>
              <p className="text-accent text-sm font-medium">{designation}</p>
            </DialogHeader>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
