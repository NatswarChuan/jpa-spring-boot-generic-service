package com.natswarchuan.genericservice.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.util.regex.Pattern;

/**
 * Lớp Validator cho annotation {@link PhoneNumber}.
 * 
 * <p>
 * Kiểm tra chuỗi nhập vào có đúng định dạng số điện thoại quốc tế (9-15 số) hay
 * không.
 *
 *
 * 
 * @author NatswarChuan
 */
public class PhoneNumberValidator implements ConstraintValidator<PhoneNumber, String> {

  private static final Pattern PHONE_PATTERN = Pattern.compile("^\\+?[0-9]{9,15}$");

  @Override
  public boolean isValid(String value, ConstraintValidatorContext context) {
    if (value == null || value.trim().isEmpty()) {
      return true;
    }
    return PHONE_PATTERN.matcher(value).matches();
  }
}
