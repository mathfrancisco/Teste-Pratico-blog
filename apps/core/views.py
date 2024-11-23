from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from django.shortcuts import get_object_or_404
from .models import Post, Profile
from .serializers import PostSerializer, UserSerializer, CommentSerializer

class RegisterView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)
    http_method_names = ['post']


class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        # Para o feed, pegamos posts do usuário e dos que ele segue
        user_profile = Profile.objects.get(user=self.request.user)
        following_users = user_profile.followers.all()
        return Post.objects.filter(
            author__in=[self.request.user, *following_users]
        ).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        post = self.get_object()
        if request.user in post.likes.all():
            post.likes.remove(request.user)
        else:
            post.likes.add(request.user)
        return Response(status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def comment(self, request, pk=None):
        post = self.get_object()
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user, post=post)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import PostViewSet, RegisterView

router = DefaultRouter()
router.register(r'posts', PostViewSet, basename='post')
router.register(r'register', RegisterView, basename='register')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]


@action(detail=True, methods=['post'])
def follow(self, request, pk=None):
    user_to_follow = self.get_object()
    if user_to_follow == request.user:
        return Response(
            {'error': 'Você não pode seguir a si mesmo'},
            status=status.HTTP_400_BAD_REQUEST
        )

    profile = Profile.objects.get(user=request.user)
    if user_to_follow in profile.followers.all():
        return Response(
            {'error': 'Você já segue este usuário'},
            status=status.HTTP_400_BAD_REQUEST
        )

    profile.followers.add(user_to_follow)
    return Response(status=status.HTTP_200_OK)


@action(detail=True, methods=['post'])
def unfollow(self, request, pk=None):
    user_to_unfollow = self.get_object()
    profile = Profile.objects.get(user=request.user)

    if user_to_unfollow not in profile.followers.all():
        return Response(
            {'error': 'Você não segue este usuário'},
            status=status.HTTP_400_BAD_REQUEST
        )

    profile.followers.remove(user_to_unfollow)
    return Response(status=status.HTTP_200_OK)


class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Profile.objects.filter(user=self.request.user)