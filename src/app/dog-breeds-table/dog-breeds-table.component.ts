import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DogBreedsService } from '../services/dog-breeds.service';
import { DogBreed, PaginationInfo } from '../models/dog-breed.model';

@Component({
  selector: 'app-dog-breeds-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dog-breeds-table.component.html',
  styleUrls: ['./dog-breeds-table.component.css']
})
export class DogBreedsTableComponent implements OnInit {
  private readonly dogBreedsService = inject(DogBreedsService);
  
  breeds = signal<DogBreed[]>([]);
  pagination = signal<PaginationInfo>({
    currentPage: 0,
    itemsPerPage: 10,
    totalItems: 0,
    totalPages: 0
  });
  loading = signal(false);
  error = signal<string | null>(null);

  totalPages = computed(() => this.pagination().totalPages);
  currentPage = computed(() => this.pagination().currentPage);
  hasNextPage = computed(() => this.currentPage() < this.totalPages() - 1);
  hasPrevPage = computed(() => this.currentPage() > 0);

//   Math = Math;

  ngOnInit(): void {
    this.loadBreeds(0);
    
    
    this.dogBreedsService.paginations.subscribe(paginationInfo => {
      this.pagination.set(paginationInfo);
    });
  }

  loadBreeds(page: number): void {
    this.loading.set(true);
    this.error.set(null);
    
    this.dogBreedsService.getBreeds(page, this.pagination().itemsPerPage)
      .subscribe({
        next: (breeds) => {
          this.breeds.set(breeds);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Error loading breeds:', err);
          this.error.set('Failed to load dog breeds. Please try again.');
          this.loading.set(false);
        }
      });
  }

  onPageChange(page: number): void {
    if (page >= 0 && page < this.totalPages()) {
      this.loadBreeds(page);
    }
  }

  onNextPage(): void {
    if (this.hasNextPage()) {
      this.onPageChange(this.currentPage() + 1);
    }
  }

  onPrevPage(): void {
    if (this.hasPrevPage()) {
      this.onPageChange(this.currentPage() - 1);
    }
  }

  getPageNumbers(): number[] {
    const total = this.totalPages();
    const current = this.currentPage();
    const pages: number[] = [];
    
    const startPage = Math.max(0, current - 2);
    const endPage = Math.min(total - 1, current + 2);
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  trackByBreedId(index: number, breed: DogBreed): number {
    return breed.id;
  }
}
