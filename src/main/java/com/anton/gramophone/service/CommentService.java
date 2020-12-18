package com.anton.gramophone.service;

import com.anton.gramophone.entity.dto.EditCommentDto;
import com.anton.gramophone.entity.dto.TextFileDto;

public interface CommentService {
    void addComment(TextFileDto comment, Long authorId, String postId);

    void editComment(EditCommentDto newComment, Long userId);

    void deleteComment(Long commentId, Long userId);
}
