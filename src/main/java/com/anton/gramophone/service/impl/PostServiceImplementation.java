package com.anton.gramophone.service.impl;

import com.anton.gramophone.entity.Post;
import com.anton.gramophone.entity.User;
import com.anton.gramophone.entity.dto.IdDto;
import com.anton.gramophone.entity.dto.TextFileDto;
import com.anton.gramophone.repository.PostRepository;
import com.anton.gramophone.service.PostService;
import com.anton.gramophone.service.specification.PostSpecification;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PostServiceImplementation implements PostService {
    private PostRepository postRepository;
    private ModelMapper modelMapper = new ModelMapper();

    @Autowired
    public void setPostRepository(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Override
    public List<Post> findUserPosts(User user) {
        return postRepository.findAllByUser(user);
    }

    @Override
    public void addPost(User owner, TextFileDto textFileDto) {
        Post post = modelMapper.map(textFileDto, Post.class);
        post.setLikes(0);
        post.setUser(owner);
        post.setCreationDateTime(LocalDateTime.now());
        postRepository.save(post);
    }

    @Transactional
    @Override
    public boolean removePost(String id) {
        try {
            Long trueId = Long.parseLong(id);
            int amount = postRepository.removeAllById(trueId);
            return amount == 1;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    @Transactional
    @Override
    public boolean editPost(String postId, TextFileDto replacingPost) {
        boolean wasPostSaved = false;
        try {
            Long id = Long.parseLong(postId);
            Optional<Post> post = postRepository.findById(id);
            if (post.isPresent()) {
                post.get().setFileReference(replacingPost.getFileReference());
                post.get().setPictureReference(replacingPost.getPictureReference());
                post.get().setText(replacingPost.getText());
                postRepository.save(post.get());
                wasPostSaved = true;
            }
        } catch (NumberFormatException e) {
            wasPostSaved = false;
        }
        return wasPostSaved;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Post> showSubscriptionPosts(User user) {
        return postRepository.findAll(Specification.where(PostSpecification.findFriendPosts(user)));
    }

    @Override
    public Optional<Post> findById(String id) {
        Optional<Post> post = Optional.empty();
        try {
            Long postId = Long.parseLong(id);
            post = postRepository.findById(postId);
        } catch (NumberFormatException ignored) {

        }
        return post;
    }

    @Override
    public List<Post> likePost(IdDto postId, User currentUser) {
        try {
            Optional<Post> postToLike = postRepository.findById(postId.getId());
            if (postToLike.isPresent()) {
                postToLike.get().like();
                postRepository.save(postToLike.get());
            }
        } catch (NumberFormatException ignored) {

        }
        return postRepository.findAllByUser(currentUser);
    }

    @Override
    public List<Post> removeLikeFromPost(IdDto postId, User currentUser) {
        try {
            Optional<Post> postToLike = postRepository.findById(postId.getId());
            if (postToLike.isPresent() && postToLike.get().getLikes() > 0) {
                postToLike.get().removeLike();
                postRepository.save(postToLike.get());
            }
        } catch (NumberFormatException ignored) {

        }
        return postRepository.findAllByUser(currentUser);
    }
}
