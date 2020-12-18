package com.anton.gramophone.service.impl;

import com.anton.gramophone.entity.Comment;
import com.anton.gramophone.entity.Post;
import com.anton.gramophone.entity.dto.EditCommentDto;
import com.anton.gramophone.entity.dto.TextFileDto;
import com.anton.gramophone.repository.CommentRepository;
import com.anton.gramophone.repository.PostRepository;
import com.anton.gramophone.service.CommentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class CommentServiceImplementation implements CommentService {
    private CommentRepository commentRepository;
    private PostRepository postRepository;
    private final ModelMapper modelMapper;

    public CommentServiceImplementation() {
        this.modelMapper = new ModelMapper();
    }

    @Autowired
    public void setCommentRepository(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @Autowired
    public void setPostRepository(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Override
    public void addComment(TextFileDto commentContent, Long authorId, String postId) {
        try {
            Long postIdNumber = Long.parseLong(postId);
            Optional<Post> parentPost = postRepository.findById(postIdNumber);
            if (parentPost.isPresent()) {
                Comment comment = modelMapper.map(commentContent, Comment.class);
                comment.setPhotoReference(commentContent.getPictureReference());
                comment.setLikes(0);
                comment.setCreationTime(LocalDateTime.now());
                comment.setOwnerId(authorId);
                comment.setPost(parentPost.get());
                commentRepository.save(comment);
            }
        } catch (NumberFormatException ignored) {

        }
    }

    @Override
    public void editComment(EditCommentDto editedComment, Long userId) {
        Optional<Comment> commentToEdit = commentRepository.findById(editedComment.getId());
        if (commentToEdit.isPresent() && commentToEdit.get().getOwnerId().equals(userId)) {
            commentToEdit.get().setText(editedComment.getText());
            commentToEdit.get().setFileReference(editedComment.getFileReference());
            commentToEdit.get().setPhotoReference(editedComment.getPhotoReference());
            commentRepository.save(commentToEdit.get());
        }
    }

    @Override
    public void deleteComment(Long commentId, Long userId) {
        Optional<Comment> commentToDelete = commentRepository.findById(commentId);
        if (commentToDelete.isPresent() && commentToDelete.get().getOwnerId().equals(userId)) {
            commentRepository.delete(commentToDelete.get());
        }
    }
}
