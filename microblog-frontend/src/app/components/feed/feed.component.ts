import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    DatePipe,
    FormsModule,
    CommonModule
  ],
  templateUrl: './feed.component.html'
})
export class FeedComponent implements OnInit {
  posts: Post[] = [];
  newPostContent = '';

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadFeed();
  }

  loadFeed(): void {
    this.postService.getFeed().subscribe(posts => this.posts = posts);
  }

  createPost(): void {
    if (this.newPostContent.trim()) {
      this.postService.createPost(this.newPostContent).subscribe({
        next: (post) => {
          this.posts.unshift(post);
          this.newPostContent = '';
        }
      });
    }
  }

  likePost(postId: number): void {
    this.postService.likePost(postId).subscribe(() => {
      const post = this.posts.find(p => p.id === postId);
      if (post) {
        post.likes_count += 1;
      }
    });
  }

  commentPost(postId: number, content: string): void {
    this.postService.commentPost(postId, content).subscribe(comment => {
      const post = this.posts.find(p => p.id === postId);
      if (post) {
        post.comments.push(comment);
      }
    });
  }
}
