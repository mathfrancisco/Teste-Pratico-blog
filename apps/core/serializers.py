from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Post, Comment

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        Profile.objects.create(user=user)
        return user

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    followers_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()
    following = serializers.SerializerMethodField()  # Novo campo
    bio = serializers.CharField(source='user.profile.bio', read_only=True, allow_null=True)  # biografia

    class Meta:
        model = Profile
        fields = ('id', 'username', 'bio', 'followers_count', 'following_count', 'following')

    def get_followers_count(self, obj):
        return obj.followers.count()

    def get_following_count(self, obj):
        return Profile.objects.filter(followers=obj.user).count()

    def get_following(self, obj):
        return [user.id for user in obj.user.following.all()]

class CommentSerializer(serializers.ModelSerializer):
    author_username = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Comment
        fields = ('id', 'author', 'author_username', 'content', 'created_at')
        read_only_fields = ('author',)

class PostSerializer(serializers.ModelSerializer):
    author_username = serializers.ReadOnlyField(source='author.username')
    likes_count = serializers.SerializerMethodField()
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ('id', 'author', 'author_username', 'content',
                 'likes_count', 'comments', 'created_at')
        read_only_fields = ('author',)

    def get_likes_count(self, obj):
        return obj.likes.count()
# apps/core/serializers.py