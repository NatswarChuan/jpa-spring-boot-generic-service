package com.natswarchuan.genericservice.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.util.regex.Pattern;

/**
 * Lớp Validator cho annotation {@link NoSpecialChars}.
 *
 * <p>
 * Sử dụng regex để kiểm tra chỉ chứa chữ cái, số và khoảng trắng.
 *
 * @author NatswarChuan
 */
public class NoSpecialCharsValidator implements ConstraintValidator<NoSpecialChars, String> {

  private static final Pattern PATTERN = Pattern.compile("^[\\p{L}0-9\\s]+$");

  @Override
  public boolean isValid(String value, ConstraintValidatorContext context) {
    if (value == null || value.isEmpty()) {
      return true;
    }
    return PATTERN.matcher(value).matches();
  }
}
