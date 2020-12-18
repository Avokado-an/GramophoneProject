package com.anton.gramophone.controller;

import com.anton.gramophone.controller.util.CurrentPrincipalDefiner;
import com.anton.gramophone.entity.Post;
import com.anton.gramophone.entity.User;
import com.anton.gramophone.entity.dto.*;
import com.anton.gramophone.service.CommentService;
import com.anton.gramophone.service.PostService;
import com.anton.gramophone.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("/profile")
public class PersonalProfileController {
    private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    private CommentService commentService;

    @Autowired
    public void setCommentService(CommentService commentService) {
        this.commentService = commentService;
    }

    private CurrentPrincipalDefiner currentPrincipalDefiner;

    @Autowired
    public void setCurrentPrincipalDefiner(CurrentPrincipalDefiner currentPrincipalDefiner) {
        this.currentPrincipalDefiner = currentPrincipalDefiner;
    }

    private PostService postService;

    @Autowired
    public void setPostService(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public UserProfileDto showProfile() {
        ModelMapper modelMapper = new ModelMapper();
        User user = currentPrincipalDefiner.getPrincipal();
        return modelMapper.map(user, UserProfileDto.class);
    }

    @GetMapping("/{id}")
    public Optional<UserProfileDto> showProfile(@PathVariable String id) {
        ModelMapper modelMapper = new ModelMapper();
        Optional<User> optUser = userService.findById(id);
        Optional<UserProfileDto> profile = Optional.empty();
        if (optUser.isPresent()) {
            profile = Optional.of(modelMapper.map(optUser.get(), UserProfileDto.class));
        }
        return profile;
    }

    @PostMapping("/{id}")
    public Optional<UserProfileDto> subscribe(@PathVariable String id) {
        ModelMapper modelMapper = new ModelMapper();
        Optional<User> optUser = userService.findById(id);
        Optional<UserProfileDto> profile = Optional.empty();
        if (optUser.isPresent()) {
            User user = currentPrincipalDefiner.getPrincipal();
            userService.subscribe(user, id);
            profile = Optional.of(modelMapper.map(optUser.get(), UserProfileDto.class));
        }
        return profile;
    }

    @DeleteMapping("/{id}")
    public Optional<UserProfileDto> unsubscribe(@PathVariable String id) {
        ModelMapper modelMapper = new ModelMapper();
        Optional<User> optUser = userService.findById(id);
        Optional<UserProfileDto> profile = Optional.empty();
        if (optUser.isPresent()) {
            User user = currentPrincipalDefiner.getPrincipal();
            userService.unsubscribe(user, id);
            profile = Optional.of(modelMapper.map(optUser.get(), UserProfileDto.class));
        }
        return profile;
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public UserProfileDto editProfile(@RequestBody EditProfileDto profile) {
        String currentUsername = currentPrincipalDefiner.currentUsername();
        return userService.updateUser(currentUsername, profile);
    }

    @GetMapping("/posts/{id}")
    public Optional<Post> viewPost(@PathVariable String id) {
        return postService.findById(id);
    }

    @PostMapping(value = "/posts", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<Post> addPost(@RequestBody TextFileDto textFileDto) {
        User user = currentPrincipalDefiner.getPrincipal();
        postService.addPost(user, textFileDto);
        return postService.findUserPosts(user);
    }

    @PostMapping(value = "/posts/like", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<Post> likePost(@RequestBody IdDto postId) {
        User user = currentPrincipalDefiner.getPrincipal();
        return postService.likePost(postId, user);
    }

    @DeleteMapping(value = "/posts/like", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<Post> removeLikeFromPost(@RequestBody IdDto postId) {
        User user = currentPrincipalDefiner.getPrincipal();
        return postService.removeLikeFromPost(postId, user);
    }

    @PutMapping(value = "/posts/{id}", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<Post> editPost(@RequestBody TextFileDto textFileDto, @PathVariable String id) {
        postService.editPost(id, textFileDto);
        User user = currentPrincipalDefiner.getPrincipal();
        return postService.findUserPosts(user);
    }

    @DeleteMapping("/posts/{id}")
    public List<Post> deletePost(@PathVariable String id) {
        postService.removePost(id);
        User user = currentPrincipalDefiner.getPrincipal();
        return postService.findUserPosts(user);
    }

    @PostMapping(value = "/posts/{id}/comments", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Optional<Post> addComment(@RequestBody TextFileDto textFileDto, @PathVariable String id) {
        User user = currentPrincipalDefiner.getPrincipal();
        commentService.addComment(textFileDto, user.getId(), id);
        return postService.findById(id);
    }

    @PutMapping(value = "/posts/{id}/comments", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Optional<Post> editComment(@RequestBody EditCommentDto editedComment, @PathVariable String id) {
        User user = currentPrincipalDefiner.getPrincipal();
        commentService.editComment(editedComment, user.getId());
        return postService.findById(id);
    }

    @DeleteMapping("/posts/{id}/comments")
    public Optional<Post> deleteComment(@RequestBody IdDto commentId, @PathVariable String id) {
        User user = currentPrincipalDefiner.getPrincipal();
        commentService.deleteComment(commentId.getId(), user.getId());
        return postService.findById(id);
    }
}
