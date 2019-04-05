package com.treez.test.resources;

import com.treez.test.controllers.UserController;
import com.treez.test.models.User;
import lombok.Getter;
import org.springframework.hateoas.ResourceSupport;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

@Getter
public class UserResource extends ResourceSupport {
    private User user;

    public UserResource(User user) {
        this.user = user;
        add(linkTo(UserController.class).withRel("users"));
        add(linkTo(methodOn(UserController.class).getAll(user.getId())).withSelfRel());
    }
}
