package com.anton.gramophone.entity.dto;

import com.anton.gramophone.util.DontKnowWhereToStoreDateTimePatternRightNowSoJustLeaveItHereForAWhile;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class RegistrationDto {
    private String email;
    private String password;
    private String repeatedPassword;
    private String gender;
    private String firstName;
    private String lastName;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern =
            DontKnowWhereToStoreDateTimePatternRightNowSoJustLeaveItHereForAWhile.DATE_TIME_FORMAT)
    private LocalDateTime birthDay;
}
