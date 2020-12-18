package com.anton.gramophone.controller;

import com.anton.gramophone.controller.util.CurrentPrincipalDefiner;
import com.anton.gramophone.entity.Post;
import com.anton.gramophone.entity.User;
import com.anton.gramophone.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/newsFeed")
public class NewsFeedController {
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
    public List<Post> showNews() {
        User principal = currentPrincipalDefiner.getPrincipal();
        return postService.showSubscriptionPosts(principal);
    }
}
