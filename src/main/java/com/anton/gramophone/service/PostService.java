package com.anton.gramophone.service;

import com.anton.gramophone.entity.Post;
import com.anton.gramophone.entity.User;
import com.anton.gramophone.entity.dto.IdDto;
import com.anton.gramophone.entity.dto.TextFileDto;

import java.util.List;
import java.util.Optional;

public interface PostService {
    List<Post> findUserPosts(User user);

    void addPost(User user, TextFileDto post);

    boolean removePost(String id);

    boolean editPost(String postId, TextFileDto replacingPost);

    List<Post> showSubscriptionPosts(User user);

    Optional<Post> findById(String id);

    List<Post> likePost(IdDto postId, User currentUser);

    List<Post> removeLikeFromPost(IdDto postId, User currentUser);
}
