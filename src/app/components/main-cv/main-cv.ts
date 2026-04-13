import { CommonModule } from '@angular/common';
import { Component, signal, OnInit } from '@angular/core';

interface TechSkill {
  category: string;
  items: string[];
}

interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  link?: string;
}

interface Experience {
  company: string;
  role: string;
  period: string;
  highlights: string[];
}

interface Contact {
  label: string;
  value: string;
  icon: string;
}

interface PortfolioData {
  fullName: string;
  currentRole: string;
  headline: string;
  summary: string;
  techStack: TechSkill[];
  workingOn: { title: string; description: string; status: string }[];
  personalProjects: Project[];
  professionalExperience: Experience[];
  contact: Contact[];
}

@Component({
  selector: 'app-main-cv',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-cv.html',
  styleUrl: './main-cv.css',
})
export class MainCv implements OnInit {
  readonly data = signal<PortfolioData | null>(null);
  readonly loading = signal(true);
  readonly error = signal('');

  ngOnInit() {
    this.loadPortfolioData();
  }

  private async loadPortfolioData() {
    this.loading.set(true);
    this.error.set('');

    try {
      const response = await fetch('/portfolio-data.json');
      if (!response.ok) {
        throw new Error('Failed to load portfolio data');
      }

      const portfolioData = (await response.json()) as PortfolioData;
      this.data.set(portfolioData);
    } catch (error) {
      this.error.set('Unable to load portfolio data.');
      console.error(error);
    } finally {
      this.loading.set(false);
    }
  }

  // Computed properties for template access
  get fullName() {
    return this.data()?.fullName || '';
  }

  get currentRole() {
    return this.data()?.currentRole || '';
  }

  get headline() {
    return this.data()?.headline || '';
  }

  get summary() {
    return this.data()?.summary || '';
  }

  get techStack() {
    return this.data()?.techStack || [];
  }

  get workingOn() {
    return this.data()?.workingOn || [];
  }

  get personalProjects() {
    return this.data()?.personalProjects || [];
  }

  get professionalExperience() {
    return this.data()?.professionalExperience || [];
  }

  get contact() {
    return this.data()?.contact || [];
  }
}

