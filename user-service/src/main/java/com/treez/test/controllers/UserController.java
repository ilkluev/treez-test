package com.treez.test.controllers;

import com.treez.test.dto.UserDto;
import com.treez.test.exception.CommonEmptyResultException;
import com.treez.test.models.User;
import com.treez.test.resources.UserResource;
import com.treez.test.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.treez.test.utils.ModelConvertUtils.*;

@RestController
@RequestMapping(value = "/users")
public class UserController {

    private UserService userService;
    private PagedResourcesAssembler<UserDto> pagedResourcesAssembler;

    @Autowired
    public UserController(UserService userService, PagedResourcesAssembler<UserDto> pagedResourcesAssembler) {
        this.userService = userService;
        this.pagedResourcesAssembler = pagedResourcesAssembler;
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = "application/hal+json")
    public ResponseEntity<UserResource> createUser(@RequestBody UserDto userDto) {
        User user = userService.save(toUser(userDto));
        return ResponseEntity.ok(new UserResource(user));
    }

    @GetMapping(produces = "application/hal+json")
    public PagedResources<Resource<UserDto>> getAll(@PageableDefault(size = 50) Pageable pageable) {
        return pagedResourcesAssembler.toResource(userService.findAll(pageable).map(user -> toUserDtoForList(user)));
    }

    @GetMapping(value = {"/{id}"}, produces = "application/hal+json")
    public ResponseEntity<UserResource> getAll(@PathVariable(name = "id") Integer id) {
        User user = userService.findById(id).orElseThrow(() -> new CommonEmptyResultException(""));
        return ResponseEntity.ok(new UserResource(user));
    }
}
