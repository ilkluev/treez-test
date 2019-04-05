package com.treez.test.utils;

import com.treez.test.dto.AddressDto;
import com.treez.test.dto.UserDto;
import com.treez.test.models.Address;
import com.treez.test.models.User;

import java.util.Set;
import java.util.stream.Collectors;

import static java.util.Collections.emptySet;

public class ModelConvertUtils {

    public static UserDto toUserDto(User user) {
        Set<AddressDto> addressDtos = user.getAddresses().stream()
                .map(address -> new AddressDto(address.getCountry(),
                        address.getCity(),
                        address.getStreet(),
                        address.getHouseNumber(),
                        address.getZipCode())).collect(Collectors.toSet());

        return new UserDto(user.getId(), user.getFirstName(), user.getLastName(), user.getEmail(), user.getPhone(), addressDtos);
    }

    public static UserDto toUserDtoForList(User user) {
        return new UserDto(user.getId(), user.getFirstName(), user.getLastName(), user.getEmail(), user.getPhone(), emptySet());
    }

    public static User toUser(UserDto userDto) {
        Set<Address> addressSet = userDto.getAddresses().stream().map(addressDto -> new Address(addressDto.getCountry(),
                addressDto.getCity(),
                addressDto.getStreet(),
                addressDto.getHouseNumber(),
                addressDto.getZipCode())).collect(Collectors.toSet());

        return new User(userDto.getFirstName(), userDto.getLastName(), userDto.getEmail(), userDto.getPhone(), addressSet);
    }
}
