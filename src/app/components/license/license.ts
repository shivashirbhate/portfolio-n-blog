import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-license',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './license.html',
  styleUrl: './license.css',
})
export class License implements OnInit {
  ngOnInit() {
    // Set page title and meta tags
    document.title = 'License - Shiva\'s Portfolio';
  }
}
