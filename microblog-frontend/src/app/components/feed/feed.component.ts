import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.loadFeed();
  }

  loadFeed(): void {
    this.postService.getFeed().subscribe((posts: Post[]) => {
      this.posts = posts.map(post => ({...post, newComment: '', is_liked: false})); // Inicializa newComment e is_liked
    });
  }

  createPost(): void {
    if (this.newPostContent.trim()) {
      this.postService.createPost(this.newPostContent).subscribe({
        next: (post) => {
          this.posts.unshift({...post, newComment: '', is_liked: false}); // Adiciona newComment e is_liked ao novo post
          this.newPostContent = '';
        }
      });
    }
  }

  likePost(post: Post): void {
    this.postService.likePost(post).subscribe();
  }

  commentPost(post: Post): void {
    if (post.newComment && post.newComment.trim() !== '') {
      this.postService.commentPost(post, post.newComment).subscribe((comment: any) => {
        post.comments.push(comment);
        post.newComment = ''; // Limpa o input após comentar
      });
    }
  }

}

